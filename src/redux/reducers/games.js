import { GAME_START, SET_PLAYER, SET_IS_WIN } from 'reduxs/actions/games'

const initialState = {
  isStart: false,
  isWin: '',
  player: 'X',
  scores: {
    'X':{score: 0},
    'O':{score: 0}
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    case GAME_START:
      return {
        ...state,
        isStart: true
      }

    case SET_PLAYER:
      return {
        ...state,
        player: payload.value
      };
      
    case SET_IS_WIN:
      return {
        ...state,
        isWin: payload.value
      };
    
    default:
      return state;
  }
}
