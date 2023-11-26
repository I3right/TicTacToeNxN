import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { END_GAME, GAME_RESET, GAME_START, SET_IS_WIN, SET_PLAYER, SET_SCORE } from './redux/actions/games'
import { ADD_HISTORY, CREATE_BOARD, SET_MOVE } from './redux/actions/history'
import Boards from 'components/Boards'
import ModalHistory from 'src/components/ModalHistory'
import { getGamesState } from './redux/selector'
import resetIcon from 'src/images/resetIcon.png'
import historyIcon from 'src/images/historyIcon.png'
import exitIcon from 'src/images/exitIcon.png'
import './app.scss'

function App() {
  const {
    startGame,
    handleChangeSizeBoard,
    resetGame,
    createBoardGame,
    setisWin,
    setScore,
    setIsOpenModalHistory,
    closegame,
    size,
    isUpdateSize,
    isOpenModalHistory,
    isError,
    scores,
  } = useTicTacToe ()

  return (
    <div id='container'>
      <section className='game flex justify-between'>
        <Boards 
          size={size} 
          isUpdateSize={isUpdateSize} 
          resetGame={resetGame} 
          createBoardGame={createBoardGame}
          setisWin={setisWin}
          setScore={setScore} />
      </section>

      <section className='game-controller'>
        <div className='container'>
          {!isUpdateSize && <div className='size-controller flex flex-col'>
            <div className='input-group'>
              <input 
                className={`input-size ${isError? 'input-error':''}`}
                type='number' 
                onChange={(val)=>handleChangeSizeBoard(parseInt(val.target.value))} 
                value={size.value}
                placeholder='Please enter the size of the board'
                />
              <button onClick={()=>startGame()}>START GAME</button>
            </div>
            <p className='text-xs text-red-700'>FYI: Size of the board 3 - 15 for the best gaming experience.</p>
          </div>}
          {isUpdateSize && <>
          <div className='control-group'>
            <div>
              <img src={resetIcon} alt='reset icon'/>
              <button onClick={()=>resetGame()}>Reset</button>
            </div>
            <div>
              <img src={historyIcon} alt='reset icon'/>
              <button onClick={()=>setIsOpenModalHistory(prev=>!prev)}>View history</button>
            </div>
            <div>
              <img src={exitIcon} alt='reset icon'/>
              <button onClick={()=>closegame()}>END GAME</button>
            </div>
          </div>
          <div className='score-container'>
            <div className='score score-x'>
              <h2 className='text-[red] text-[50px]'> X : {scores['X'].score } </h2>
            </div>
            <div className='score score-y'>
              <h2 className='text-[blue] text-[50px]'> O : {scores['O'].score } </h2>
            </div>
          </div>
          </>}
        </div>
      </section>
      <ModalHistory isOpen={isOpenModalHistory} toggle={()=>setIsOpenModalHistory(prev=>!prev)}/>
    </div>
  )
}

const useTicTacToe = () => {
  const dispatch = useDispatch()
  const gameState = useSelector(getGamesState)
  const {scores} = gameState
  const [size, setSize] = useState({value:'', isEdit: false})
  const [isUpdateSize, setIsUpdateSize] = useState(false)
  const [isOpenModalHistory, setIsOpenModalHistory] = useState(false)
  const [isError, setIsError] = useState(false)

  const startGame = () => {
    if(size.value >= 3 && size.value <= 25){
      dispatch({type: GAME_START })
      setIsUpdateSize(true)
    } else {
      setIsError(true)
    }
  }

  const resetGame = () => {
    dispatch({type: GAME_RESET })
    createBoardGame()
    setisWin('')
    dispatch({type: SET_PLAYER, payload:{value:'X'}})
    dispatch({type: SET_MOVE,   payload:{value: 0} })
    dispatch({type: SET_IS_WIN, payload:{value: ''} })
  }

  const closegame = () => {
    setIsUpdateSize(false)
    dispatch({type: END_GAME})
    setIsError(false)
    setIsOpenModalHistory(false)
    setSize({value:'', isEdit: false})
    resetGame()
    resetScore()
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
  
  const setScore = (player, score) => {
    dispatch({type: SET_SCORE, payload:{key: player, value: score} })
  }

  const resetScore = () => {
    dispatch({type: SET_SCORE, payload:{key: 'X', value: 0} })
    dispatch({type: SET_SCORE, payload:{key: 'O', value: 0} })
  }

  const handleChangeSizeBoard = (val) => {
    if(val > 0 && val <= 25 ) {
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
    setScore,
    setIsOpenModalHistory,
    closegame,
    size,
    isUpdateSize,
    isOpenModalHistory,
    isError,
    scores,
  }
}

export default App
