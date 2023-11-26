import { 
  ADD_HISTORY, 
  CREATE_BOARD,
  SET_CURRENT_BOARD, 
  SET_MOVE,
  SET_PLAYER_HISTORY,
} from 'reduxs/actions/history'

const initialState = {
  boardHistory: [],
  playerHistory: [],
  currentBoard: [],
  move: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_BOARD:
      return {
      ...state,
      ...payload
      };
    
    case SET_CURRENT_BOARD:
      return {
      ...state,
      currentBoard: payload.value
      };
      
    case SET_PLAYER_HISTORY:
      return{
      ...state,
      playerHistory: payload.value
      };
      
    case ADD_HISTORY:
      return{
      ...state,
      boardHistory: payload.value
      };
      
    case SET_MOVE:
      return{
      ...state,
      move: payload.value
      };

    default:
      return state;
  }
}
