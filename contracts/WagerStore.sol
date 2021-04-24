// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./openzeppelin-solidity/contracts/security/Pausable.sol";
import "./openzeppelin-solidity/contracts/access/Ownable.sol";
import "./Wager.sol";

/// @author jaredborders
/// @title A store for managing Wager contracts
contract WagerStore is Pausable, Ownable {

    /* STATE VARIABLES */
    mapping(address => bool) wagersMapping;
    address[] public wagers;

    /* MODIFIERS */
    modifier createdByThisStore(address potAddr) {
        require(wagersMapping[potAddr]);
        _;
    }

    /* CONSTRUCTOR */
    constructor() {}

    /* FUNCTIONS */
    /// Create a new Wager contract
    /// @dev The new Wager contract is then saved in the array of this contract for future reference.
    /// @param _wagerName - Name of the Wager
    /// @param _duration - Duration of the wager `open` period
    /// @return The created Wager contract
    function createWagerContract(
        string memory _wagerName, 
        uint _duration
    ) 
        public 
        payable 
        whenNotPaused 
        returns(Wager) 
    {
        Wager newWagerContract = (new Wager) {value: msg.value} 
        ({
            _wagerName: _wagerName,
            _duration: _duration,
            _owner: msg.sender
        });

        address newContractAddr = address(newWagerContract);

        // Update with new contract info
        wagers.push(newContractAddr);
        wagersMapping[newContractAddr] = true;
        return newWagerContract;
    }

    /// Retrieve the the array of created contracts
    /// @return An array of all created Wager contracts
    function getWagers() 
        public 
        view 
        whenNotPaused 
        returns(address[] memory) 
    {
        return wagers;
    }
}