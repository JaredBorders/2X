// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/security/Pausable.sol";
import "./Wager.sol";

/// @author jaredborders
/// @title WagerFactory - Factory that creates and manages Wager contracts
contract WagerFactory is Pausable {

    /* STATE VARIABLES */
    address[] public wagerAddresses;

    /* EVENTS */
    event WagerCreated(address wagerer, address factory);

    /* CONSTRUCTOR */
    constructor() {}

    /* FUNCTIONS */
    /// Create a new Wager if contract is not paused
    /// @dev The new Wager is then saved in the array of this contract for future reference
    function createWagerContract() 
        public 
        whenNotPaused
        payable
    {
        Wager newWager = new Wager(msg.sender, address(this));
        address wagerAddress = address(newWager);
        wagerAddresses.push(wagerAddress); // Update with new contract info

        emit WagerCreated(wagerAddress, address(this));
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