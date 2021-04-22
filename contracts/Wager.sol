// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./openzeppelin-solidity/contracts/access/Ownable.sol";
import "./openzeppelin-solidity/contracts/security/Pausable.sol";

/// @author jaredborders
/// @title A wager (1v1) contract
contract Wager is Pausable, Ownable {
    
    /* STATE VARIABLES */

    uint constant MIN_DURATION = 300; // Duration of wager >= 5 minutes
    string public wagerName; // Name given to wager
    uint public closedDateTime; // Amount of time wager is "good" for
    uint public wagerAmount; // Wei wagered

    // Managed state of current wager contract
    enum WagerState { open, closed, stakeWithdrawn }
    WagerState public wagerState;
    
    // Address of the winning participant
    address public winner;

    // Store of all wagers 
    address public storeAddr;

    // Collections of challengers & wagers
    mapping(address => uint) private participantStakes;
    address[] public participants;

    /* EVENTS */

    event ParticipantJoin(address indexed participant);
    event ParticipantWithdraw(address indexed participant);
    event WinnerDetermined(address indexed winner);
    event WinnerWithdraw(address indexed winner, uint indexed wagerAmount);

    /* CONSTRUCTOR */

    /// Create a new Wager contract
    /// @param _wagerName - Name of the Wager
    /// @param _duration - The duration of the wager `open` period
    /// @param _owner - the owner to be recognized by this contract. Not necessarily `msg.sender` nor `tx.origin` for flexibility.
    constructor (
        string memory _wagerName, 
        uint _duration, 
        address _owner
    ) 
        payable 
    {
        require(msg.value > 0, "The minimum wager has to be greater than 0.");
        require (_duration >= MIN_DURATION);

        wagerName = _wagerName;
        closedDateTime = block.timestamp + _duration; 
        wagerAmount = msg.value;
        wagerState = WagerState.open;

        // Wager creation should be called from its store.
        storeAddr = msg.sender;
        wagerAmount = 0;

        // Transfer ownership to the owner, because it defaults to msg.sender
        //   by OpenZeppelin
        if (_owner != msg.sender) {
            transferOwnership(_owner);
        }

        // The creator also need to participate in the game.
        participate(_owner);
    }

    /* MODIFIERS */

    modifier aboveMinStake {
        require(msg.value == wagerAmount, "You must wager the same amount");
        _;
    }

    modifier timeTransitions {
        if (block.timestamp > closedDateTime && wagerState == WagerState.open) {
            nextState();
        }
        _;
    }

    modifier atState(WagerState state) {
        require(wagerState == state);
        _;
    }

    modifier notAtState(WagerState state) {
        require(wagerState != state);
        _;
    }

    modifier onlyBy(address addr) {
        require(addr != address(0) && addr == msg.sender);
        _;
    }

    modifier participantHasStake(address sender) {
        require(participantStakes[sender] > 0);
        _;
    }

    modifier transitionNext() {
        _;
        nextState();
    }

    /* PUBLIC FUNCTIONS */

    /// For a player to challenge a current wager (i.e. enter the bet).
    /// @param participant - address of the challenger
    function participate(address participant) 
        public 
        payable 
        timeTransitions 
        aboveMinStake 
        whenNotPaused 
        atState(WagerState.open) 
    {
        // This is a new participant, push into the array
        if (participantStakes[participant] == 0 && wagerState == WagerState.open) {
            participants.push(participant);
            participantStakes[participant] = participantStakes[participant] + msg.value;
            wagerAmount = wagerAmount + msg.value;
            wagerState = WagerState.closed;
        }
        
        emit ParticipantJoin(participant);
    }

    function makeWager() 
        public 
        payable 
        whenNotPaused 
    {
        require(msg.value >= 0.001 ether, "Must wager at least 0.001 ether");
        wagerAmount = uint(msg.value);
    }

    /// Allowing winner to withdraw money.
    /// @dev in order to prevent withdrawal address is a malicious contract, we use check-effect-interaction pattern inside.
    function winnerWithdraw() 
        public 
        whenNotPaused 
        atState(WagerState.closed) 
        onlyBy(winner) 
        transitionNext 
    {
        // Using check-effect-interaction pattern
        // 1. Check - done by modifiers
        // Invariant check: make sure the contract has enough balance to be withdrawn from.
        assert(address(this).balance >= wagerAmount);

        // 2. Effect
        // But we still want to transition to next state only after successful
        // winner withdrawal.
        uint stake = wagerAmount;

        // 3. Interaction
        (bool success, ) = msg.sender.call {value: stake} ("");
        require(success, "Transfer failed.");
        emit WinnerWithdraw(msg.sender, stake);
    }

    /// Allow participant to check his own stake
    /// @return stake of the `msg.sender` in the wager
    function myStake() 
        public 
        view 
        returns(uint) 
    {
        return participantStakes[msg.sender];
    }

    /// Allow participant to withdraw money
    /// @dev Also want to check participant is not withdrawing from a wager that has all stakes withdrawn.
    function participantWithdraw() 
        public 
        timeTransitions 
        whenNotPaused 
        notAtState(WagerState.stakeWithdrawn) 
        participantHasStake(msg.sender) 
    {
        // Using check-effect-interaction pattern
        // 1. Check - done by modifiers
        // Invariant check: make sure the contract has enough balance to be withdrawn from.
        assert(address(this).balance >= participantStakes[msg.sender]);

        // 2. Effect - set the participantStake = 0
        uint stake = participantStakes[msg.sender];
        participantStakes[msg.sender] = 0;

        // 3. Interaction - tranfer
        (bool success, ) = msg.sender.call {value: stake} ("");
        require(success, "Transfer failed.");
        emit ParticipantWithdraw(msg.sender);
    }

    /* EXTERNAL FUNCTIONS */

    /// Retrieving number of participants in the game
    /// @return Number of participants in the game
    function totalParticipants() 
        external 
        view 
        whenNotPaused 
        returns(uint) 
    {
        return participants.length;
    }
    
    /* INTERNAL FUNCTIONS */

    /// Determine the winner of the wager
    /// @return Address of the winner
    function determineWinner() 
        internal 
        timeTransitions 
        whenNotPaused 
        atState(WagerState.closed) 
        returns(address) 
    {
        if (winner != address(0)) return winner;

        winner = determineWinnerInternal();
        emit WinnerDetermined(winner);
        return winner;
    }

    /// Advancing the Wager state.
    function nextState() 
        internal 
    {
        wagerState = WagerState(uint(wagerState) + 1);
    }

    /// Determine the winner of the Wager
    /// @return Address of the winner
    function determineWinnerInternal() 
        internal 
        view 
        returns(address) 
    {
        uint index = getRandom(participants.length);
        return participants[index];
    }

    /// Generate a random value
    /// @param len - the generated value is between 0 to len, exclusively.
    /// @return A random number
    function getRandom(uint len) 
        internal 
        view 
        returns(uint) 
    {
        return uint(keccak256(abi.encodePacked(block.timestamp, block.number,block.difficulty))) % len;
        // CHANGE TO ORACLE LATER!! ^Above code may be subject to manipulation
    }
}
