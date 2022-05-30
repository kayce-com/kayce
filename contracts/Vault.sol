// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Clone} from "clones/Clone.sol";
import "openzeppelin/access/AccessControl.sol";
import "openzeppelin/utils/structs/EnumerableSet.sol";

import { ERC20 } from "solmate/tokens/ERC20.sol";
import {SafeTransferLib} from "solmate/utils/SafeTransferLib.sol";

import {FullMath} from "./lib/FullMath.sol";
import {Multicall} from "./lib/Multicall.sol";
import {Ownable} from "./lib/Ownable.sol";
import {StateMachine} from "./lib/StateMachine.sol";

/// @title Multi-type pool contract
/// @author dave.kayce@gmail.com
/// @notice A modern, gas optimized staking pool contract for rewarding ERC20 stakers
/// with ERC20 tokens periodically and continuously

contract Vault is Clone, Multicall, Ownable, StateMachine {
    using SafeTransferLib for ERC20;
    using EnumerableSet for EnumerableSet.AddressSet;

    /// Errors ----------------------------------

    error Error_ZeroOwner();
    error Error_AlreadyInitialized();
    error Error_NotRewardDistributor();
    error Error_AmountTooLarge();
    error Error_WrongStakeType();

    /// Events ----------------------------------

    event RewardAdded(uint256 reward);
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    /// Constants --------------------------------

    uint256 internal constant PRECISION = 1e30;
    address internal constant BURN_ADDRESS = address(0xdead);

    /// Data representation -----------------------

    struct Account {
        address accountAddress;
        /// @notice Tracks if an address can call notifyReward()
        bool isRewardDistributor;
        /// @notice The amount of tokens staked by an account
        uint256 balance;
        /// @notice The rewardPerToken value when an account last staked/withdrew/withdrew rewards
        uint256 stakingReward;
        /// @notice The earned() value when an account last staked/withdrew/withdrew rewards
        uint256 earnedReward;
    }

    enum StakeType {
        TokenStaking,
        NFTStaking,
    }

    /// Storage variables -------------------------

    uint256 public rewardPerToken;
    uint256 public rewardRate; // per second rate at which rewardPerToken increases

    uint64 public rewardUpdateTimestamp;
    uint64 public rewardEndTimestamp;

    /// @notice The total tokens staked in the pool
    uint256 public totalSupply;

    mapping(address => Account) public poolMembers;

    /// Clone variables -------------------------
    /// @notice This calls functions from the clone library that allows you to initialize multiple contracts
    /// with the same code cheaply.

    /// @notice The token being rewarded to stakers
    function REWARDTOKEN() public pure returns (ERC20 STAKETOKEN_) {
        return ERC20(_getArgAddress(0));
    }

    /// @notice The token being staked in the pool
    function STAKETOKEN() public pure returns (ERC20 STAKETOKEN_) {
        return ERC20(_getArgAddress(0x14));
    }

    /// @notice The length of each reward period, in seconds
    function DURATION() public pure returns (uint64 DURATION_) {
        return _getArgUint64(0x28);
    }

    /// Clone variables -------------------------

    /// Initialization --------------------------

    /// @notice Initializes the owner, called by PoolFactory
    /// @param initialOwner The initial owner of the contract
    function initialize(address initialOwner) external {
        if (owner() != address(0)) {
            revert Error_AlreadyInitialized();
        }

        if (initialOwner == address(0)) {
            revert Error_ZeroOwner();
        }

        _transferOwnership(initialOwner);

        /// @notice setup state machine transitions
        _createTransition("RAISING", "SETUP");
        _createTransition("LIVE", "RAISING");
        _createTransition("CLOSED", "LIVE");
    }

    /// Methods ----------------------------------

    /// @notice Stakes tokens in the pool to earn rewards
    /// @param amount The amount of tokens to stake
    function stake(uint256 amount) external {
        if (amount == 0) {
            return;
        }

        /// -----------------------------------------------------------------------
        /// Storage loads
        /// -----------------------------------------------------------------------

        uint64 lastTimeRewardApplicable_ = lastTimeRewardApplicable();
        uint256 accountBalance = poolMembers[msg.sender].balance;
        uint256 totalSupply_ = totalSupply;
        uint256 rewardPerToken_ = _rewardPerToken(
            totalSupply_,
            lastTimeRewardApplicable_,
            rewardRate
        );

        /// -----------------------------------------------------------------------
        /// State updates
        /// -----------------------------------------------------------------------

        // accrue rewards
        rewardPerToken = rewardPerToken_;
        rewardUpdateTimestamp = lastTimeRewardApplicable_;
        rewards[msg.sender] = _earned(
            msg.sender,
            accountBalance,
            rewardPerToken_,
            rewards[msg.sender]
        );
        userRewardPerTokenPaid[msg.sender] = rewardPerToken_;

        // stake
        totalSupply = totalSupply_ + amount;
        balanceOf[msg.sender] = accountBalance + amount;

        /// -----------------------------------------------------------------------
        /// Effects
        /// -----------------------------------------------------------------------

        stakeToken().safeTransferFrom(msg.sender, address(this), amount);

        emit Staked(msg.sender, amount);
    }

    /// @notice Withdraws staked tokens from the pool
    /// @param amount The amount of tokens to withdraw
    function withdraw(uint256 amount) external {
        if (amount == 0) {
            return;
        }

        uint256 accountBalance = balanceOf[msg.sender];
        uint64 lastTimeRewardApplicable_ = lastTimeRewardApplicable();
        uint256 totalSupply_ = totalSupply;
        uint256 rewardPerToken_ = _rewardPerToken(
            totalSupply_,
            lastTimeRewardApplicable_,
            rewardRate
        );

        // accrue rewards
        rewardPerTokenStored = rewardPerToken_;
        rewardUpdateTimestamp = lastTimeRewardApplicable_;
        rewards[msg.sender] = _earned(
            msg.sender,
            accountBalance,
            rewardPerToken_,
            rewards[msg.sender]
        );
        userRewardPerTokenPaid[msg.sender] = rewardPerToken_;

        // withdraw stake
        balanceOf[msg.sender] = accountBalance - amount;
        // total supply has 1:1 relationship with staked amounts
        // so can't ever underflow
        unchecked {
            totalSupply = totalSupply_ - amount;
        }

        stakeToken().safeTransfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    /// @notice Withdraws all staked tokens and earned rewards
    function exit() external {
        uint256 accountBalance = balanceOf[msg.sender];

        uint64 lastTimeRewardApplicable_ = lastTimeRewardApplicable();
        uint256 totalSupply_ = totalSupply;
        uint256 rewardPerToken_ = _rewardPerToken(
            totalSupply_,
            lastTimeRewardApplicable_,
            rewardRate
        );

        // give rewards
        uint256 reward = _earned(
            msg.sender,
            accountBalance,
            rewardPerToken_,
            rewards[msg.sender]
        );
        if (reward > 0) {
            rewards[msg.sender] = 0;
        }

        // accrue rewards
        rewardPerTokenStored = rewardPerToken_;
        rewardUpdateTimestamp = lastTimeRewardApplicable_;
        userRewardPerTokenPaid[msg.sender] = rewardPerToken_;

        // withdraw stake
        balanceOf[msg.sender] = 0;
        // total supply has 1:1 relationship with staked amounts
        // so can't ever underflow
        unchecked {
            totalSupply = totalSupply_ - accountBalance;
        }

        // transfer stake
        stakeToken().safeTransfer(msg.sender, accountBalance);
        emit Withdrawn(msg.sender, accountBalance);

        // transfer rewards
        if (reward > 0) {
            rewardToken().safeTransfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }

    /// @notice Withdraws all earned rewards
    function getReward() external {
        uint256 accountBalance = balanceOf[msg.sender];
        uint64 lastTimeRewardApplicable_ = lastTimeRewardApplicable();
        uint256 totalSupply_ = totalSupply;
        uint256 rewardPerToken_ = _rewardPerToken(
            totalSupply_,
            lastTimeRewardApplicable_,
            rewardRate
        );

        uint256 reward = _earned(
            msg.sender,
            accountBalance,
            rewardPerToken_,
            rewards[msg.sender]
        );

        // accrue rewards
        rewardPerTokenStored = rewardPerToken_;
        rewardUpdateTimestamp = lastTimeRewardApplicable_;
        userRewardPerTokenPaid[msg.sender] = rewardPerToken_;

        // withdraw rewards
        if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardToken().safeTransfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }

    /// Getters ----------------------------------

    /// @notice The latest time at which stakers are earning rewards.
    function lastTimeRewardApplicable() public view returns (uint64) {
        return
            block.timestamp < rewardEndTimestamp
                ? uint64(block.timestamp)
                : rewardEndTimestamp;
    }

    /// @notice The amount of reward tokens each staked token has earned so far
    function rewardPerToken() external view returns (uint256) {
        return
            _rewardPerToken(
                totalSupply,
                lastTimeRewardApplicable(),
                rewardRate
            );
    }

    /// @notice The amount of reward tokens an account has accrued so far. Does not
    /// include already withdrawn rewards.
    function earned(address account) external view returns (uint256) {
        return
            _earned(
                account,
                balanceOf[account],
                _rewardPerToken(
                    totalSupply,
                    lastTimeRewardApplicable(),
                    rewardRate
                ),
                rewards[account]
            );
    }

    /// Owner actions ----------------------------------

    /// @notice Lets a reward distributor start a new reward period. The reward tokens must have already
    /// been transferred to this contract before calling this function. If it is called
    /// when a reward period is still active, a new reward period will begin from the time
    /// of calling this function, using the leftover rewards from the old reward period plus
    /// the newly sent rewards as the reward.
    /// @dev If the reward amount will cause an overflow when computing rewardPerToken, then
    /// this function will revert.
    /// @param reward The amount of reward tokens to use in the new reward period.
    function notifyRewardAmount(uint256 reward) external {
        /// -----------------------------------------------------------------------
        /// Validation
        /// -----------------------------------------------------------------------

        if (reward == 0) {
            return;
        }
        if (!isRewardDistributor[msg.sender]) {
            revert Error_NotRewardDistributor();
        }

        uint256 rewardRate_ = rewardRate;
        uint64 periodFinish_ = rewardEndTimestamp;
        uint64 lastTimeRewardApplicable_ = block.timestamp < periodFinish_
            ? uint64(block.timestamp)
            : periodFinish_;
        uint64 DURATION_ = DURATION();
        uint256 totalSupply_ = totalSupply;

        // accrue rewards
        rewardPerToken = _rewardPerToken(
            totalSupply_,
            lastTimeRewardApplicable_,
            rewardRate_
        );
        rewardUpdateTimestamp = lastTimeRewardApplicable_;

        // record new reward
        uint256 newRewardRate;
        if (block.timestamp >= periodFinish_) {
            newRewardRate = reward / DURATION_;
        } else {
            uint256 remaining = periodFinish_ - block.timestamp;
            uint256 leftover = remaining * rewardRate_;
            newRewardRate = (reward + leftover) / DURATION_;
        }
        // prevent overflow when computing rewardPerToken
        if (newRewardRate >= ((type(uint256).max / PRECISION) / DURATION_)) {
            revert Error_AmountTooLarge();
        }
        rewardRate = newRewardRate;
        rewardUpdateTimestamp = uint64(block.timestamp);
        rewardEndTimestamp = uint64(block.timestamp + DURATION_);

        emit RewardAdded(reward);
    }

    /// @notice Lets the owner add/remove accounts from the list of reward distributors.
    /// Reward distributors can call notifyRewardAmount()
    /// @param rewardDistributor The account to add/remove
    /// @param isRewardDistributor_ True to add the account, false to remove the account
    function setRewardDistributor(
        address rewardDistributor,
        bool isRewardDistributor_
    ) external onlyOwner {
        isRewardDistributor[rewardDistributor] = isRewardDistributor_;
    }

    /// -----------------------------------------------------------------------
    /// Internal functions
    /// -----------------------------------------------------------------------

    function _earned(
        address account,
        uint256 accountBalance,
        uint256 rewardPerToken_,
        uint256 accountRewards
    ) internal view returns (uint256) {
        return
            FullMath.mulDiv(
                accountBalance,
                rewardPerToken_ - userRewardPerTokenPaid[account],
                PRECISION
            ) + accountRewards;
    }

    function _rewardPerToken(
        uint256 totalSupply_,
        uint256 lastTimeRewardApplicable_,
        uint256 rewardRate_
    ) internal view returns (uint256) {
        if (totalSupply_ == 0) {
            return rewardPerToken;
        }
        return
            rewardPerToken +
            FullMath.mulDiv(
                (lastTimeRewardApplicable_ - lastUpdateTime) * PRECISION,
                rewardRate_,
                totalSupply_
            );
    }

    /// Generat a wrappd value for their tokens and make it available for transfer

    function _getImmutableVariablesOffset()
        internal
        pure
        returns (uint256 offset)
    {
        assembly {
            offset := sub(
                calldatasize(),
                add(shr(240, calldataload(sub(calldatasize(), 2))), 2)
            )
        }
    }
}
