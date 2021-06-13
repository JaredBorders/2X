// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./WagerFactory.sol";

/* Change Request: getRandom() may be subject to manipulation; use ChainLink VRF Oracle */
/* Change Request: After duration, send eth back to wagerer */

/// @author jaredborders
/// @title Wager - Creates contract for 1-1 betting
contract Wager {

    /* STATE VARIABLES */
    bool public hasBeenChallenged = false;
    address public factory;
    address public wagerer; // Wager creator
    address public challenger;
    uint constant MIN_WAGER = 100000000000000 wei; // Minimum stake of wager (0.0001 ETH)
    uint public wagerAmount = 0; // Amount staked by wagerer
    uint constant MIN_DURATION = 300; // Duration of wager >= 5 minutes
    uint public wagerExpireTime; // To be determined by Wagerer

    /* CHAINLINK VRF */
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;

    /* MODIFIERS */
    modifier isOwner {
        require(msg.sender == wagerer, "Must be the original wagerer");
        _;
    }

    modifier wagerNotEstablished {
        require(wagerAmount == 0, "Wager has already been placed");
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

    modifier notChallenged {
        require(hasBeenChallenged == false, "Wager has already been challenged");
        _;
    }

    modifier matchesWagerAmount {
        require(msg.value == wagerAmount, "You must wager the same amount");
        _;
    }

    modifier calledByFactory {
        require(msg.sender == factory, "Only the Factory can set the randomNumber!");
        _;
    }
    
    /* CONSTRUCTOR */
    /// Set wagerer address to be the contract caller
    /// @param _owner - the owner address to be recognized by this contract. Not necessarily `msg.sender` nor `tx.origin`
    /// @param _factory - the WagerFactory address which created this contract
    constructor(address _owner, address _factory)
        payable
    {
        factory = _factory;
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
        wagerNotEstablished // Only allow for two participants
        payable
    {
        wagerAmount = msg.value;
        wagerExpireTime = _wagerDuration + block.timestamp; // ex. if _wagerDuration = 300 then wagerExpireTime = currentTime + 5 minutes
    }

    /// Allow participant to withdraw money
    /// @param _challenger - participant who wishes to accept wager proposal
    /// @dev Checks for matching amount of eth and that wager is still active
    function challenge(address _challenger) 
        external
        validWagerAvailability // Checks if wager is still available based on duration
        notChallenged // Checks that wager hasn't previously been challenged
        matchesWagerAmount // Checks if challenger staked same amount of eth
        payable
    {
        hasBeenChallenged = true;
        wagerAmount += uint(msg.value);
        findWinner(_challenger);
    }

    /// Determine who wins
    /// @param _challenger - participant who accepted wager proposal
    /// @dev findWinner will pay one of the participants randomly
    function findWinner(address _challenger) 
        internal
    {
        challenger = _challenger;
        WagerFactory(factory).rng();
    }

    /// Callback function that is called once WagerFactory gets a random number generated via Chainlink's Oracle
    function PayWinner(uint16 randomNumber) 
        public 
        calledByFactory // Only the Factory can return random values; no other contract should be able to call PayWinner
    {
        randomNumber == 0 ? 
            payable(wagerer).transfer(wagerAmount) : 
            payable(challenger).transfer(wagerAmount);

        wagerAmount = 0; // reset wager amount
    }

    /// Withdraw wager if Wagerer
    /// @dev way for the wagerer to get amount wagered out of contract safely
    function withdrawFunds() 
        external
        isOwner
        notChallenged
    {
        payable(wagerer).transfer(wagerAmount);
        wagerAmount = 0;
        removeWager();
    }

    /// Get Wager data
    /// @dev an easy way to get all relevant wager data
    /// @return wagerer address, wager amount, and wager expire time
    function getWagerData()
        external 
        view 
        returns(address, uint, uint, bool) 
    {
        return(wagerer, wagerAmount, wagerExpireTime, hasBeenChallenged);
    }

    /// Remove address from list of active Wager contract addresses from WagerFactory
    /// @dev convenient way for front-end to remove this contracts address from the factory
    function removeWager()
        internal 
    {
        WagerFactory(factory).removeAddress(
            uint(WagerFactory(factory).findIndexOfAddress(
                address(this)
            ))
        );
    }

}