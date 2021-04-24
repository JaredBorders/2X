// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./openzeppelin-solidity/contracts/security/Pausable.sol";
import "./openzeppelin-solidity/contracts/access/Ownable.sol";
import "./Wager2.sol";

/* Change Request: Integrate Ownable and Pausable */

/// @author jaredborders
/// @title WagerStore2
contract WagerStore2 is Pausable, Ownable {

    /* STATE VARIABLES */
    mapping(address => bool) activeWagers;
    address[] public wagerAddresses;

    /* MODIFIERS */
    modifier createdByThisStore(address wagerAddress) {
        require(activeWagers[wagerAddress]); // true if address has been added to mapping
        _;
    }

    /* CONSTRUCTOR */
    constructor() {}

    /* FUNCTIONS */
    /// Create a new Wager
    /// @dev The new Wager is then saved in the array of this contract for future reference
    /// @param _duration - Duration of the wager `open` period
    /// @return The created Wager
    function createWagerContract(uint _duration) 
        public 
        payable 
        returns(Wager2) 
    {
        Wager2 newWager = (new Wager2) {value: msg.value} 
            ({
                _owner: msg.sender,
                _wagerDuration: _duration
                
            });

        address wagerAddress = address(newWager);

        // Update with new contract info
        wagerAddresses.push(wagerAddress);
        activeWagers[wagerAddress] = true;
        return newWager;
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