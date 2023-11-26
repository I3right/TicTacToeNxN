import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_PLAYER } from 'src/redux/actions/games'
import { SET_CURRENT_BOARD, SET_MOVE } from 'src/redux/actions/history'
import { getGamesState, getHistoryState } from 'src/redux/selector'


const ModalHistory = (props) => {
  const {
    handleMoveback,
    boardHistory,
  } = useHistory(props)
  const { isOpen, toggle } = props

  return (
    <>
    {isOpen && 
    <div id='history'>
      <header>
        <h2 toggle={toggle}>History</h2>
        <button className='btn-close' onClick={()=>toggle()}>X</button>
      </header>
      <div>
        <ul>
          {boardHistory.map((val,index)=>{
            return(
              <li key={`list history - ${index}`} 
                  onClick={() => handleMoveback(val,index) }> 
                  {index === 0 ? '@ - Start Game' : `Go to move - ${index}`}
              </li>
            )
          })}
        </ul>
      </div>
      </div>}
    </>
  )
}

const useHistory = (props) => {
  const dispatch = useDispatch()
  const historyState = useSelector(getHistoryState)
  const gameState = useSelector(getGamesState)
  const {boardHistory, playerHistory, currentBoard, move} = historyState
  const { isWin, player, score} = gameState

  const handleMoveback = (board, index) => {
    if(!isWin) {
      dispatch({type: 'tetstststs'})
      dispatch({type: SET_MOVE, payload:{ value: index }})
      dispatch({type: SET_CURRENT_BOARD, payload:{ value: board }})
      const playerAtPOS = playerHistory[index] === undefined ? playerHistory[0] : playerHistory[index]; 
      dispatch({type: SET_PLAYER, payload:{ value: playerAtPOS }})
    }
  }
  
  return {
    handleMoveback,
    boardHistory,
  }
}

export default ModalHistory