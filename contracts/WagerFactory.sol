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

    /// Find index of address in state variable wagerAddresses
    function findIndexOfAddress(address _address) public view returns(uint) {
        for (uint i = 0; i < wagerAddresses.length; i++) {
            if (wagerAddresses[i] == _address) return i;
        }
        return 0; // never will reach this but we still want early exit
    }

    /// Delete address at index given IF the Wager has been challenged
    /// @param index of element to delete
    function removeAddress(uint index) public {
        if (index >= wagerAddresses.length) return;
        Wager wager = Wager(wagerAddresses[index]);
        
        if (wager.wagerAmount() != 0) return; // Wager is still active; i.e. has not been challenged

        // Remove challenged Wager address
        for (uint i = index; i < wagerAddresses.length - 1; i++) {
            wagerAddresses[i] = wagerAddresses[i+1];
        }
        wagerAddresses.pop();
    }

}