import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGamesState, getHistoryState } from 'src/redux/selector'
import { ADD_HISTORY, CREATE_BOARD, SET_CURRENT_BOARD, SET_MOVE, SET_PLAYER_HISTORY } from 'src/redux/actions/history'
import { GAME_RESET, GAME_START, SET_IS_WIN, SET_PLAYER } from 'src/redux/actions/games'
import Square from 'components/Square'

const Boards = (props) => {
  const {
    resetGame,
    handleClickSquare,
    gameBanner,
    currentBoard,
  } = useBoards(props)
 
  const { isUpdateSize } = props

  return (
    <>
    {isUpdateSize && <div id='games'>
      <span className='title'>Tic Tac Toe Games</span>

      <div className='board'>
        {currentBoard.map((row,rowIndex) => {
          return (
            <div  key={`row-${rowIndex}`}
                  className='row'
            >
              {row.map((column,columnIndex)=> {
              return (
                <Square key={`column-${columnIndex}`} square={column} handleClick={handleClickSquare}/>
              )})}
            </div>
            );
        })}
      </div>
      {gameBanner()}

    </div>}
    
    </>
  )
}

const useBoards = (props) => {
  const dispatch = useDispatch()
  const historyState = useSelector(getHistoryState)
  const gameState = useSelector(getGamesState);
  const { boardHistory, playerHistory, currentBoard, move } = historyState
  const { isWin, player, scores } = gameState;
  const { size, resetGame, createBoardGame, setisWin } = props
  
  console.log('size :>> ', size);

  useEffect(()=>{
    createBoardGame()
  },[size.value])

  const handleClickSquare = (square) => {
    if(!isWin){
      const selectSQ = currentBoard[square.Y][square.X];
      if(selectSQ.value === '') {
        const currentArr = [...JSON.parse(JSON.stringify(currentBoard))]
        currentArr[square.Y][square.X].value = player
        addHistory(currentArr,boardHistory)  
        dispatch({type: SET_CURRENT_BOARD, payload:{value: currentArr} })
        dispatch({type: SET_MOVE, payload:{value: move+1 } })
        if(checkWin(currentArr)) {
          setisWin('WIN')
        } else {
          switchPlayer()
        }
      }
    }
  }

  const addHistory = (currentArr,board) => {
    const tempArr =  [...board];
    const oldBoard = tempArr.slice(0,move+1)
    const history  = [...oldBoard,JSON.parse(JSON.stringify(currentArr))]
    dispatch({type: ADD_HISTORY, payload:{value: history}})
    
    const tempPlayerArr = [...playerHistory]
    const oldPlayerArr = tempPlayerArr.slice(0,move)
    const setPlayerArr = [...oldPlayerArr,player]
    dispatch({type: SET_PLAYER_HISTORY, payload:{value: setPlayerArr}})
  }

  const switchPlayer = () => {
    if(player === 'X') {
      dispatch({type: SET_PLAYER, payload:{value:'O'}})
    } else{
      dispatch({type: SET_PLAYER, payload:{value:'X'}})
    }
  }

  const checkWin = (currentArr) => {
    // check Row => every row are same value?
    for (let Y = 0; Y < size.value; Y++) {
      const rowValue = currentArr[Y].map(col => col.value);
      if(rowValue.every(val => val === rowValue[0] && val !== '' )) return true;
    }
  
    // check column => every column are same value?
    for (let X = 0; X < size.value; X++) {
      const columnValue = currentArr.map(row => row[X].value);
      if(columnValue.every(val => val === columnValue[0] && val !== '' )) return true;
    }
  
    // check diagonal (\) => every row = column are same value?
    const diagonalBackSlashValue = [];
    for (let D = 0; D < size.value; D++) {
      diagonalBackSlashValue.push(currentArr[D][D].value);
    }
    if(diagonalBackSlashValue.every(val => val === diagonalBackSlashValue[0] && val !== '' )) return true;

    // check diagonal (/) => every row = column are same value?
    const diagonalSlashValue = [];
    for (let D = 0; D < size.value; D++) {
      diagonalSlashValue.push(currentArr[size.value-1-D][D].value);
    }
    if(diagonalSlashValue.every(val => val === diagonalSlashValue[0] && val !== '' )) return true;
    
    // check TIE => value all board
    const entireBoard = []
    for (let Y = 0; Y < size.value; Y++) {
      const rowValue = currentArr[Y].map(col => col.value);
      entireBoard.push(...rowValue)
    }
    if(entireBoard.every(val => val !== '' )) {
      setisWin('TIE')
    };

    return false
  }

  const gameBanner = () => {
    switch (isWin) {
      case 'WIN':
        return (
          <p className='fixed w-full h-[200px] bg-red-300 text-gray-800 text-[100px] flex justify-center items-center'>
            {player} - Won
          </p>
        );
      case 'TIE':
        return (
          <p className='fixed w-full h-[200px] bg-red-300 text-gray-800 text-[100px] flex justify-center items-center'>
            TIE
          </p>
        );
      default:
        return null;
    }
  };

  return {
    resetGame,
    handleClickSquare,
    gameBanner,
    currentBoard,
  }
}

export default Boards