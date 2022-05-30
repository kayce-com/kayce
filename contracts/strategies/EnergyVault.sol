// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/access/Ownable.sol";
import "@openzeppelin/access/AccessControl.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import "@openzeppelin/utils/Counters.sol";
import "@openzeppelin/utils/structs/EnumerableSet.sol";
import "../utils/StateMachine.sol";

/// @title Kayce Investment
/// @author davidkayce
/// @notice A contract that handles investment for an energy project

contract Investment is StateMachine {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.AddressSet;

    Counters.Counter private _investorIds;
    EnumerableSet.AddressSet internal currentInvestors;
    EnumerableSet.AddressSet internal projectOwners;
    mapping(address => Investment) public investors;
    mapping(address => uint256) public ownersStakeMap;

    int8 public immutable state;
    int256 public immutable startDate;
    int8 public immutable planDuration;
    int8 public currentMonth;

    int256 public ownersStake;
    int256 public totalInvestment;
    uint256 private profit;
    int8 public dividendPercentage;

    uint8 public forecastVariance;
    uint256 public revenueForecast;
    uint256 public totalBudget;
    uint256 public totalRevenue;
    uint256 public balance;


    address private manager;

    constructor(
        address _manager,
        int256 _startDate,
        int256 _totalInvestment
    ) {
        totalInvestment = 0;
        startDate = block.timestamp;
        manager = _manager;
        _createTransition("RAISING", "SETUP");
        _createTransition("LIVE", "RAISING");
        _createTransition("CLOSED", "LIVE");

        _investorIds.increment();
        investors[_investorIds.current()] = Investor(false, payable(_manager), 0, 0, 0);
        currentInvestors.add(_manager);
    }

    // <!------------ Data Structure -------------------------------> //
    struct Investment {
        uint256 investment;
        uint256 accruedDividend;
        uint256 collectedDividend;
    }

    struct Owner {
        address ownerAddress;
        uint256 stake;
    }


    modifier onlyOwner() {
        require(!projectOwners.has(msg.sender), "Only project owners can call this function");
        _;
    }

    modifier investmentStageOnly(bytes32 _state) {
        require(currentState == _state, "You cannot carry out this action at this investment stage");
        _;
    }

    function setup(
        Owner[10] _owners, // for now we only allow 10 people to co-own a project
        int256 _amountRequested,
        int8 _stakingPercentage,
        int8 _duration,
        uint256 _revenueForecast,
        uint8 _forecastVariance, // in percentage
        uint256 _dividendPayout, // in percentage
        uint256 _stakingAPY // in perrcentage
    ) investmentStageOnly("SETUP") public {
        require(_owners.length <= 10, "A maximum of 10 project owners are permitted per investment");
        
        ownersStake = 0;
        for (int256 i = 0; i < _owners.length; ++i) {
            // Check the general market if the owner has that value in a staking pool
            // Check if staked value is greater than the amount assigned as their stake
            // create a reward pool for owners where fees from buying/selling investment are collected 
            ownersStake += _owners[i].stake;
            projectOwners.add(_owners[i].investorAddress);
            ownersStakeMap[_owners[i].investorAddress] = _owners[i].stake;
        }

        require(totalStake <= _amountRequested,"Total stake cannot exceed the amount requested");
        require(totalStake >= _amountRequested * _stakingPercentage / 100, "Owners must meet the minimum stake requirement");

        planDurationInMonths = _durationInMonths;
        forecastVariance = _forecastVariance;
        dividendPercentage = _dividendPayout;
        totalBudget += _amountRequested;
        revenueForecast = _revenueForecast;

        _transition("RAISING");
    }

    function invest () public payable investmentStageOnly("RAISING") {
        require(msg.value > 0, "Investment must be greater than 0");
        require(totalInvestment + msg.value <= totalBudget * 1.2, "You cannot invest more than 120% of the budget");
        require(!projectOwners.has(msg.sender), "Project owners cannot invest after setup");

        /// @dev TODO: Check if the investment amount is available from the staked balance with the manager

        totalInvestment += msg.value;
        if (currentInvestors.has(msg.sender)) {
            investors[msg.sender].investment += msg.value;
        } else {
            investors[msg.sender] = Investment(msg.value, 0, 0);
            currentInvestors.add(msg.sender);
        }

        if (totalInvestment == totalBudget * 1.2) {
            balance = totalInvestment;
            _transition("LIVE");
        }
    }

    function transferOwnership (address _beneficiary, int256 _amount) public onlyOwner investmentStageOnly("LIVE") {
        require(ownersStakeMap[msg.sender] >= _amount, "You do not have enough stake to transfer ownership");

        if (!projectOwners.has(_beneficiary)) {
            require(projectOwners.length < 10, "A maximum of 10 project owners are permitted per investment");
            projectOwners.add(_beneficiary);
            ownersStakeMap[_beneficiary] = _amount;
        } 

        ownersStakeMap[msg.sender] -= _amount;
        ownersStakeMap[_beneficiary] += _amount;
    }

    function transferInvestment (address _beneficiary, int256 _amount) public investmentStageOnly("LIVE") {
        require(investors[msg.sender].investment >= _amount, "You do not have enough investment to transfer");

        if (!currentInvestors.has(_beneficiary)) {
            currentInvestors.add(_beneficiary);
            investors[_beneficiary] = Investment(0,0,0);
        } 

        investors[msg.sender].investment -= _amount;
        investors[_beneficiary].investment += _amount;
    }

    function createInvoice (int256 _amount, address _receipient) public onlyOwner investmentStageOnly("LIVE") {
        // store invoice records off-chain 
        require(totalInvestment >= _amount, "You cannot create an invoice for more than is available");
        manager.transfer(_amount, _receipient);
        balance -= _amount;
    }
    

    function reportRevenue (int256 _amount) public onlyOwner investmentStageOnly("LIVE") payable {
        

    }

    function cancelInvestment () public nonReentrant  {
    }

    /// @dev Get the dividends from the manager for the current period
    function releaseDividends() external virtual payable {
        _releaseDividends(msg.value);
    }

    /// @dev Function to update the account of the sender
    /// @notice Will revert if account need not be updated
    function claimDividends() public virtual returns(uint256){
        return _claimDividends(msg.sender);
    }

    /// @dev Release an `amount` of ether in the contract as dividends.
    function _releaseDividends(uint256 amount) internal {
        require(address(this).balance >= amount, "Not enough funds.");
        int256 releasedDPT = amount.divd(this.totalSupply()).toInt();
        dividendsPerToken = dividendsPerToken.addd(releasedDPT);
        claimedDPT[address(0)] = dividendsPerToken; // Mint tokens at DPT
    }

    /// @dev Transfer owed dividends to its account.
    function _claimDividends(address payable account) internal returns(uint256) {
        uint256 owing = _dividendsOwing(account);
        require(owing > 0, "Account need not be updated now.");
        account.transfer(owing);
        claimedDPT[account] = dividendsPerToken;
        return owing;
    }

    /// @dev Internal function to compute dividends owing to an account
    /// @param account The account for which to compute the dividends
    function _dividendsOwing(address account) internal view returns(uint256) {
        int256 owedDPT = dividendsPerToken.subd(claimedDPT[account]);
        return owedDPT.toUint().muld(this.balanceOf(account));
    }
}
