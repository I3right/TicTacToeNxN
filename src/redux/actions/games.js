export const GAME_START = 'GAME_START'
export const GAME_RESET = 'GAME_RESET'
export const SET_PLAYER = 'SET_PLAYER'
export const SET_IS_WIN = 'SET_IS_WIN'

export function dispatchGame (param) {
    return {
        type: param.type,
        payload: param.payload
    }
}

