// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./Wager.sol";

/* Change Request: Integrate Ownable and Pausable */

/// @author jaredborders
/// @title WagerStore2
contract WagerStore is Pausable, Ownable {

    /* STATE VARIABLES */
    address[] public wagerAddresses;

    /* CONSTRUCTOR */
    constructor() {}

    /* FUNCTIONS */
    /// Create a new Wager
    /// @dev The new Wager is then saved in the array of this contract for future reference
    function createWagerContract() 
        public 
        payable 
    {
        Wager newWager = Wager(msg.sender);
        address wagerAddress = address(newWager);
        wagerAddresses.push(wagerAddress); // Update with new contract info
    }

    /// Retrieve the the array of created contracts
    /// @return An array of all created Wager contracts
    function getWagers() 
        public 
        view 
        returns(address[] memory) 
    {
        return wagerAddresses;
    }

}