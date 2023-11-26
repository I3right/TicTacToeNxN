export const ADD_HISTORY = 'ADD_HISTORY'
export const SET_CURRENT_BOARD = 'SET_CURRENT_BOARD'
export const SET_PLAYER_HISTORY = 'SET_PLAYER_HISTORY'
export const SET_MOVE = 'SET_MOVE'
export const CREATE_BOARD = 'CREATE_BOARD'

export function dispatchMove (param) {
    return {
        type: param.type,
        payload: param.payload
    }
}

