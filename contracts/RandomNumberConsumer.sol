// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/dev/VRFConsumerBase.sol";
import "./WagerFactory.sol";

/// @title RandomNumberConsumer - Random number generator
contract RandomNumberConsumer is VRFConsumerBase {

    /* STATE VARIABLES */
    address public factory;
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;

    /* Required addresses (Kovan Network) */
    address private VRFCoordinatorAddress = 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9;
    address private LINKTokenAddress = 0xa36085F69e2889c224210F603D836748e7dC0088;
    
    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     */
    constructor(address _factory) 
        VRFConsumerBase(VRFCoordinatorAddress, LINKTokenAddress)
    {
        factory = _factory;
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }
    
    /** 
     * Requests randomness from a user-provided seed
     ************************************************************************************
     *                                    STOP!                                         * 
     *         THIS FUNCTION WILL FAIL IF THIS CONTRACT DOES NOT OWN LINK               *
     *         ----------------------------------------------------------               *
     *         Learn how to obtain testnet LINK and fund this contract:                 *
     *         ------- https://docs.chain.link/docs/acquire-link --------               *
     *         ---- https://docs.chain.link/docs/fund-your-contract -----               *
     *                                                                                  *
     ************************************************************************************/
    function getRandomNumber(uint256 userProvidedSeed) public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        require(msg.sender == factory, "Only the Wager Factory can retrieve random numbers");
        
        return requestRandomness(keyHash, fee, userProvidedSeed);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        // Callback to WagerFactory to set the random number that was generated
        randomResult = randomness % 2;
        WagerFactory(factory).setRandomNumber(uint16(randomResult), requestId);
    }

    /**
     * @return amount of LINK contract has
     */
    function getAmountOfLink() public view returns (uint256 amount) {
        return LINK.balanceOf(address(this));
    }
}