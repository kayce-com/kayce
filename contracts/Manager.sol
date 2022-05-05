// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/access/Ownable.sol";
import "@openzeppelin/access/AccessControl.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import "@openzeppelin/utils/structs/EnumerableSet.sol";

/// @title Manager of the financial operations
/// @author davidkayce
/// @notice This contract serves as a manager for the financial operations and is the pool factory for staking

contract Manager is Ownable, ReentrancyGuard, IReceiver {
    using EnumerableSet for EnumerableSet.AddressSet;

    // Get the native token of the platform, and the stable coins
    IERC20 public stablecoin;
    IERC20 public nativeToken;

    int8 private stakeFee;
    int8 private unstakeFee;

    EnumerableSet.AddressSet internal users; // People who have staked
    EnumerableSet.AddressSet internal pools; // Investable pools
    EnumerableSet.AddressSet internal investments; // Investments
    EnumerableSet.AddressSet internal stakingTokens; // Arbitrage pools

    mapping(address => Stakes []) internal stakes; // Stake of each user
    mapping(address => uint256) internal tokenStakedAmount; // Total value staked per 

    enum Investment {
        Arbitrage,
        TokenStaking,
        NFTStaking
    } 

    constructor(address _stableCoin, address _nativeToken, int8 _stakeFee, int8 _unstakeFee ) Ownable() {
        stablecoin = IERC20(_stableCoin);
        nativeToken = IERC20(_nativeToken);
        stakeFee = _stakeFee;
        unstakeFee = _unstakeFee;
    }

    // <!------------ Data Structure -------------------------------> //

    /* A pool is a DEFI instrument for making yields through various
     * protocols, strategies and contracts. */
    struct Pool {
        
    }

    struct Investment {
        
    }

    struct Stakes {
        address tokenAddress;
        uint256 amount;
        uint256 timestamp;
    }

    // <!------------ Events -------------------------------> //

    event PoolCreated(
        int256 indexed orderId,
        int256 indexed tokenId,
        address indexed assetNFT,
        int256 price,
        address owner,
        bool forSale
    );
    event InvestmentCreated(
        int256 indexed listingId,
        address indexed assetManager,
        int256 unitPrice,
        int256 supply,
        int8 interestRate
    );



    // <!------------ Staking -------------------------------> //

    function stake(address _token) payable external {
        require(msg.value > stakefee, "You must stake at least " + stakeFee + " wei");
        stakingTokens.add(_token);
        users.add(msg.sender);
        stakes[msg.sender].push(Stakes(_token, (msg.value - stakeFee), block.timestamp));
        tokenStakedAmount[_token] += (msg.value - stakeFee);
    }

    /// @notice Allow users to stake NFTs and we find their value.
    /// @param _stakeholder The stakeholder to add.
    function stakeNFT(address _stakeholder) public {
        (bool _isStakeholder, ) = isStakeholder(_stakeholder);
        if (!_isStakeholder) stakeholders.push(_stakeholder);
    }


    /// @notice A method to remove a stakeholder.
    /// @param _stakeholder The stakeholder to remove.
    function unstake(address _stakeholder) external {
        (bool _isStakeholder, uint256 s) = isStakeholder(_stakeholder);
        if (_isStakeholder) {
            stakeholders[s] = stakeholders[stakeholders.length - 1];
            stakeholders.pop();
        }
    }

    // <!------------ Util functions -------------------------------> //

    /// @notice A method to check if an address is a stakeholder.
    /// @param _address The address to verify.
    /// @return bool, uint256 Whether the address is a stakeholder, 
    ///  and if so its position in the stakeholders array.
    function _isStakeholder(address _address) view returns (bool, uint256) {
        for (uint256 s = 0; s < stakeholders.length; s += 1) {
            if (_address == stakeholders[s]) return (true, s);
        }
        return (false, 0);
    }
}

