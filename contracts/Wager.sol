// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/security/Pausable.sol";

/* Change Request: getRandom() may be subject to manipulation; use ChainLink VRF Oracle */
/* Change Request: After duration, send eth back to wagerer */

/// @author jaredborders
/// @title Wager - Creates contract for 1-1 betting
contract Wager is Pausable {

    /* STATE VARIABLES */
    address public wagerer; // Wager creator
    uint constant MIN_WAGER = 100000000000000 wei; // Minimum stake of wager (0.0001 ETH)
    uint public wagerAmount; // Amount staked by wagerer
    uint constant MIN_DURATION = 300; // Duration of wager >= 5 minutes
    uint public wagerExpireTime; // To be determined by Wagerer

    /* MODIFIERS */
    modifier isOwner {
        require(msg.sender == wagerer, "Initializing a wager on another's contract is prohibited");
        _;
    }

    modifier validWagerDuration(uint _wagerDuration) {
        require(_wagerDuration >= MIN_DURATION, "Duration of wager availability is too short (<5 minutes)");
        _;
    }

    modifier validWagerAmount {
        require(msg.value >= MIN_WAGER, "Must wager at least 0.0001 ether");
        _;
    }

    modifier validWagerAvailability {
        require(block.timestamp < wagerExpireTime, "Wager has expired");
        _;
    }

    modifier matchesWagerAmount {
        require(msg.value == wagerAmount, "You must wager the same amount");
        _;
    }

    /* CONSTRUCTOR */
    /// Set wagerer address to be the contract caller
    /// @param _owner - the owner to be recognized by this contract. Not necessarily `msg.sender` nor `tx.origin`
    constructor(address _owner) 
        payable 
    {
        wagerer = _owner;
    }

    /* FUNCTIONS */
    /// Allow participant to establish a wager
    /// @param _wagerDuration - length of time wager is 'open' for challenge
    /// @dev Checks for valid wager amount and duration
    function establishWager(uint _wagerDuration) 
        public
        validWagerAmount // is wager > MIN_WAGER
        validWagerDuration(_wagerDuration) // is duration > MIN_DURATION
        isOwner // Must be creator of contract to initialize wager
        whenNotPaused
        payable
    {
        require(wagerAmount == 0, "Wager has already been placed"); // prevent more than two max participants
        wagerAmount = msg.value;
        wagerExpireTime = _wagerDuration + block.timestamp; // ex. if _wagerDuration = 300 then wagerExpireTime = currentTime + 5 minutes
    }

    /// Allow participant to withdraw money
    /// @param _challenger - participant who wishes to accept wager proposal
    /// @dev Checks for matching amount of eth and that wager is still active
    function challenge(address _challenger) 
        external
        validWagerAvailability // Checks if wager is still available based on duration
        matchesWagerAmount // Checks if challenger staked same amount of eth
        whenNotPaused
        payable
    {
        paused(); // pause contract (i.e. don't allow any more calls to establishWager nor challenge)
        wagerAmount += uint(msg.value);
        findWinner(_challenger);
    }

    /// Determine who wins
    /// @param _challenger - participant who accepted wager proposal
    /// @dev findWinner will pay one of the participants randomly
    function findWinner(address _challenger) 
        internal
    {
        getRandom() == 0 ? 
            payable(wagerer).transfer(wagerAmount) : 
            payable(_challenger).transfer(wagerAmount);
    }

    /// Generate a random value
    /// @return 0 or 1, "randomly"
    function getRandom() 
        internal 
        view
        returns(uint) 
    {
        return uint(keccak256(abi.encodePacked(block.timestamp, block.number,block.difficulty))) % 2;
    }

    /// Withdraw wager
    /// @dev sends wagered money back to wagerer if wager hasn't completed
    function withdrawWager() 
        external 
        whenNotPaused
    {
        payable(wagerer).transfer(wagerAmount);
        paused();
    }

    /// Get Wager data
    /// @dev an easy way to get all relevant wager data
    /// @return wagerer address, wager amount, and wager expire time
    function getWagerData() public view returns(address, uint, uint) {
        return(wagerer, wagerAmount, wagerExpireTime);
    }

}