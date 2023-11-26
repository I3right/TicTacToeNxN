# React Tic Tac Toe

A Tic Tac Toe game built with ReactJS, Tailwind, and Redux for state management.

## Overview

This project implements a Tic Tac Toe game with the following features:

- Two main UI components:
  - **Board Game:** Displays the current state of the game.
  - **Game Controller:** Provides controls for the game, such as a restart button, a toggle history button, and an exit option.

## Redux State

There are two main states in Redux:

- **History:**
  - Stores the history of the board, players' moves, the current state of the board, and the total number of moves.

- **Games:**
  - Stores the status of the game, the current player, and the scores of both players.

## How to Play

1. Set the size of the board.
2. Play the game by clicking on a square on the board.
3. The player who gets the same value in a row, column, or diagonal wins the game.
4. After finishing a game, click "Restart" to play again or "Exit" to go back to set a new board size and start a new game.
5. The game includes a history system, allowing users to go back to any moves. If edited after going back, it will replace the old value with the new moves.

## How it Works

1. Get the board size from the input (in the range of 3-25) and create a matrix array with a size of `size x size`, storing the matrix in the Redux history state. Map this matrix to the game board.
2. Start with player 'X,' and when a user clicks on a square, check if it already has a value. If not, add the player's value to that position, increase the move count, update the last move in history, and update the list of player moves.
3. Check after each move for win or tie conditions. If there's a win or tie, display a banner, update the score, and swap between players 'X' and 'O' if no player wins.
4. The history keeps a record of the game. Clicking on it updates the current board state, moves, current player, history board, history player, and count with the value of that move.

## How to Run

1. Install dependencies:
   `npm install`

2. Run development server:
   `npm run dev`

3. Open http://localhost:5173 to view the application in your browser.

## NEXT PHASE
- System that select to play with PC or other User.
- System that select to be 'X' or 'O' (go first, or after).
* Pattern move to let PC check the next move.