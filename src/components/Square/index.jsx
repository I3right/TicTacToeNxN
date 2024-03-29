import React from 'react'

const Square = (props) => {
  const { square, handleClick } = props

  return (
    <div 
      onClick={()=>handleClick(square)}
      className='square-container'>
      <div 
        className='square-item'
        style={{color: square.value === 'X'? 'red' : 'blue'}}
        >
          {square.value}
      </div>
    </div>
  )
}

export default Square