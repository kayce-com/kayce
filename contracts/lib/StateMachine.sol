pragma solidity ^0.8.13;

/**
 * @title StateMachine 
 * @author Alberto Cuesta Canada
 
 *  - All states exist by default.
 *  - No transitions exist by default.
 *  - The state machine starts at "SETUP".
 *  - New transitions can be created while in the "SETUP state".
 *    To interact with bytes32 from javascript you can use these two functions:
        function stringToBytes32(_string: String) {
            return web3.utils.fromAscii(_string);
        }
        function bytes32ToString(_bytes32: String) {
            return web3.utils.toAscii(_bytes32).replace(/\0/g, '');
        }
 */

contract StateMachine {
    event TransitionCreated(bytes32 originState, bytes32 targetState);
    event CurrentState(bytes32 state);

    bytes32 public constant SETUP_STATE = "SETUP";
    bytes32 public currentState;
    mapping(bytes32 => mapping(bytes32 => bool)) internal _transitions;

    /// @notice The contract constructor. It sets the current state to "SETUP".
    constructor() public {
        currentState = SETUP_STATE;
        emit CurrentState(SETUP_STATE);
    }

    /// @dev Verify if a transition exists.
    function transitionExists(bytes32 originState, bytes32 targetState)
        public
        view
        virtual
        returns (bool)
    {
        return (_transitions[originState][targetState] == true);
    }

    /// @dev Create a transition between two states.
    function _createTransition(bytes32 originState, bytes32 targetState)
        internal
    {
        require(currentState == SETUP_STATE, "State machine not in SETUP.");
        require(
            !transitionExists(originState, targetState),
            "Transition already exists."
        );
        _transitions[originState][targetState] = true;
        emit TransitionCreated(originState, targetState);
    }

    /// @dev Transition the state machine between states
    function _transition(bytes32 targetState) internal {
        require(
            transitionExists(currentState, targetState),
            "Transition doesn't exist."
        );
        currentState = targetState;
        emit CurrentState(targetState);
    }
}
