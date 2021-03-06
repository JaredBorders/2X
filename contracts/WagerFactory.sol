// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Wager.sol";
import "./RandomNumberConsumer.sol";

/// @author jaredborders
/// @title WagerFactory - Factory that creates and manages Wager contracts
contract WagerFactory {

    /* STATE VARIABLES */
    address[] public wagerAddresses;
    address public randomNumberConsumerAddress;
    uint16 private randomNumber;
    mapping(bytes32 => address) public rngMapping;

    /* EVENTS */
    event WagerCreated(address wagerer, address factory);

    /* CONSTRUCTOR */
    constructor() {
        RandomNumberConsumer randomNumberConsumer = new RandomNumberConsumer(address(this));
        randomNumberConsumerAddress = address(randomNumberConsumer);
    }

    /* FUNCTIONS */
    /// Create a new Wager
    /// @dev The new Wager is then saved in the wagerAddresses array for future reference
    function createWagerContract() 
        public 
        payable
    {
        Wager newWager = new Wager(msg.sender, address(this));
        address wagerAddress = address(newWager);
        wagerAddresses.push(wagerAddress); // Update with new contract address

        emit WagerCreated(wagerAddress, address(this));
    }

    /// @return An array of all created Wager contracts
    function getWagers() 
        public 
        view 
        returns(address[] memory) 
    {
        return wagerAddresses;
    }

    /// Find index of address in state variable wagerAddresses
    function findIndexOfAddress(address _address) public view returns(int) {
        for (uint i = 0; i < wagerAddresses.length; i++) {
            if (wagerAddresses[i] == _address) return int(i);
        }
        return -1;
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

    /// Public rng for use by deployed Wager contracts ONLY
    function rng() public {
        require(findIndexOfAddress(msg.sender) >= 0, "rng() can only be called by deployed Wager contracts");

        // Using Chainlink VRF Oracle; Random already contains LINK
        bytes32 requestId = RandomNumberConsumer(randomNumberConsumerAddress).getRandomNumber( 
            uint(keccak256(abi.encodePacked(block.timestamp, block.number, block.difficulty)))
        );

        rngMapping[requestId] = msg.sender; // used later to identify which Wager to send the random number to
    }

    /// Callback function which then makes a call to a Wager with the corresponding requestId
    /// @param _randomNumber the random number generated via Chainlink's Oracle
    /// @param requestId the id mapped previously to a deployed Wager's address
    function setRandomNumber(uint16 _randomNumber, bytes32 requestId) public {
        require(msg.sender == randomNumberConsumerAddress, "Only RandomNumberConsumer can set the randomNumber state");

        Wager(rngMapping[requestId]).PayWinner(_randomNumber);
        removeAddress(uint(findIndexOfAddress(rngMapping[requestId])));
    }

}