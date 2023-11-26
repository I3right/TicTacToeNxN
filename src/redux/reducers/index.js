import { combineReducers } from "redux";
import history from './history'
import games from './games'

const rootReducer = combineReducers({
    history: history,
    games: games,
})

export default rootReducer