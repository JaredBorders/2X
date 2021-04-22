// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./openzeppelin-solidity/contracts/access/Ownable.sol";
import "./openzeppelin-solidity/contracts/security/Pausable.sol";

/// @author jaredborders
/// @title Wager2
contract Wager2 is Pausable, Ownable {

    /* STATE VARIABLES */
    address public wagerer; // Wager creator
    uint constant MIN_WAGER = 0.001 ether;
    uint public wagerAmount; // Amount staked by wagerer
    uint constant MIN_DURATION = 300; // Duration of wager >= 5 minutes
    uint public wagerExpireTime; // To be determined by Wagerer

    /* MODIFIERS */
    modifier validWagerAmount {
        require(msg.value >= MIN_WAGER, "Must wager at least 0.001 ether");
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
    constructor(uint _wagerDuration) 
        validWagerAmount // Checks if Wagerer staked enough eth 
        payable 
    {
        require(_wagerDuration >= MIN_DURATION, "Duration of wager availability is too short (<5 minutes");

        wagerer = msg.sender;
        wagerAmount = uint(msg.value);
        wagerExpireTime = _wagerDuration + block.timestamp; // ex. if _wagerDuration = 300 then wagerExpireTime = currentTime + 5 minutes
    }

    /* FUNCTIONS */
    function challenge() 
        external
        validWagerAvailability // Checks if wager is still available
        matchesWagerAmount // Checks if challenger staked same amount of eth
        payable
    {
        wagerAmount += uint(msg.value);
        findWinner(msg.sender);
    }

    function findWinner(address challenger) 
        internal
    {
        getRandom() == 0 ? 
            payable(wagerer).transfer(wagerAmount) : 
            payable(challenger).transfer(wagerAmount);
    }

    function getRandom() 
        internal 
        view
        returns(uint) 
    {
        return uint(keccak256(abi.encodePacked(block.timestamp, block.number,block.difficulty))) % 2;
        /* Change Request: Above code may be subject to manipulation; use ChainLink VRF Oracle */
    }

}