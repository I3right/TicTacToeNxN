import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GAME_RESET, GAME_START, SET_IS_WIN, SET_PLAYER } from './redux/actions/games'
import Boards from 'components/Boards'
import ModalHistory from 'src/components/ModalHistory'
import { getGamesState } from './redux/selector'
import './app.scss'
import { ADD_HISTORY, CREATE_BOARD, SET_MOVE } from './redux/actions/history'

function App() {
  const {
    startGame,
    handleChangeSizeBoard,
    resetGame,
    createBoardGame,
    setisWin,
    setIsOpenModalHistory,
    size,
    isUpdateSize,
    isOpenModalHistory,
    isError,
  } = useTicTacToe ()
  return (
    <div id='container'>
      <section className='game flex justify-between max-w-[1000px]'>
        <Boards 
          size={size} 
          isUpdateSize={isUpdateSize} 
          resetGame={resetGame} 
          createBoardGame={createBoardGame}
          setisWin={setisWin} />
      </section>

      <section className='game-controller'>
        {!isUpdateSize && <div className='size-controller flex flex-col'>
          <div className='input-group'>
            <input 
              className={`input-size ${isError? 'input-error':''}`}
              type='number' 
              min={3}
              max={50}
              onChange={(val)=>handleChangeSizeBoard(parseInt(val.target.value))} 
              value={size.value}
              placeholder='Please enter the size of the board'
              />
            <button onClick={()=>startGame()}>START GAME</button>
          </div>
          <p className='text-xs text-red-700'>FYI: Size of the board 3 - 15 for the best gaming experience.</p>
        </div>}
        {isUpdateSize && <div className='control-group'>
          <div>
            <button onClick={()=>resetGame()}>Reset</button>
          </div>
          <button onClick={()=>setIsOpenModalHistory(prev=>!prev)}>View history</button>
        </div>}
      </section>
      <ModalHistory isOpen={isOpenModalHistory} toggle={()=>setIsOpenModalHistory(prev=>!prev)}/>
    </div>
  )
}

const useTicTacToe = () => {
  const dispatch = useDispatch()
  const gameState = useSelector(getGamesState);
  const { isWin, player, scores } = gameState;
  const [size, setSize] = useState({value:3, isEdit: false})
  const [isUpdateSize, setIsUpdateSize] = useState(false)
  const [isOpenModalHistory, setIsOpenModalHistory] = useState(false)
  const [isError, setIsError] = useState(false)

  const startGame = () => {
    if(size.value >= 3 && size.value <= 15){
      dispatch({type: GAME_START })
      setIsUpdateSize(true)
    } else {
      setIsError(true)
    }
  }

  const resetGame = () => {
    dispatch({type: GAME_RESET })
    createBoardGame()
    setisWin(false)
    dispatch({type: SET_PLAYER, payload:{value:'X'}})
    dispatch({type: SET_MOVE,   payload:{value: 0} })
    dispatch({type: SET_IS_WIN, payload:{value: ''} })
  }

  const createBoardGame = () => {
    if(size.value){
      // Create Row of Matrix with height and width and use only index 
      const newBoard = Array.from({ length: size.value }, (_, rowIndex) =>
      Array.from({ length: size.value }, (_, columnIndex) => ({ value: '', Y: rowIndex, X: columnIndex })));
      const history = [JSON.parse(JSON.stringify(newBoard))]
      if(newBoard){
        dispatch({type: CREATE_BOARD, payload: { currentBoard: newBoard} })
        dispatch({type: ADD_HISTORY, payload:{value: history}})
      }
    }
  }
  
  const setisWin = (value) => {
    dispatch({type: SET_IS_WIN, payload:{value: value} })
  };

  const handleChangeSizeBoard = (val) => {
    if(val >= 3 && val <= 15 ) {
      setSize((prev) => ({ 
        ...prev,
        value   : parseInt(val),
        isEdit  : true
      }))
    }
    setIsError(false)
  }
  
  return {
    startGame,
    handleChangeSizeBoard,
    resetGame,
    createBoardGame,
    setisWin,
    setIsOpenModalHistory,
    size,
    isUpdateSize,
    isOpenModalHistory,
    isError,
  }
}

export default App
