import React, { useState } from 'react';
import BoardItem from './BoardItem';
import './Board.css';
import { randomWalkAlgorithm } from '../utils';

function Board() {
    let rows = 5;
    let cols = 5;
    let myBoard = new Array(rows);
    for (let i = 0; i < rows; i++) {
        myBoard[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        myBoard[i][j] = {row: i, col: j, isClicked: false, isRevealed: false, isBomb: true, noOfBombNeighbors: 0};
      }
    }

    const [boardState, setBoardState] = useState(myBoard);

    const pathArr = randomWalkAlgorithm();

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const arr = new Array(2);
        arr[0] = i;
        arr[1] = j;
        for (let path of pathArr) {
            if (path[0] === arr[0] && path[1] === arr[1]) {
                myBoard[i][j].isBomb = false;
            }
        }
      }
    }

    console.log("Path Arr: ", pathArr);
    console.log("My board: ", myBoard);

    // hard coding bombs
    // myBoard[1][0].isBomb = true;
    // myBoard[3][1].isBomb = true;
    // myBoard[0][2].isBomb = true;
    // myBoard[0][3].isBomb = true;
    // myBoard[0][4].isBomb = true;
    // myBoard[1][2].isBomb = true;
    // myBoard[1][3].isBomb = true;
    // myBoard[1][4].isBomb = true;
    // myBoard[2][2].isBomb = true;
    // myBoard[2][3].isBomb = true;
    // myBoard[2][4].isBomb = true;
    // myBoard[3][2].isBomb = true;
    // myBoard[3][3].isBomb = true;
    // myBoard[3][4].isBomb = true;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // calculate bomb neighbors
        let bombNeighbors = 0;
        if (i > 0 && myBoard[i-1][j].isBomb === true) {
            bombNeighbors++;
        }
    
        if (i < 4 && myBoard[i+1][j].isBomb ===true) {
            bombNeighbors++;
        }
    
        if (j > 0 && myBoard[i][j-1].isBomb === true) {
            bombNeighbors++;
        }
    
        if (j < 4 && myBoard[i][j+1].isBomb === true) {
            bombNeighbors++;
        }
        myBoard[i][j].noOfBombNeighbors = bombNeighbors;
      }
    }

    const handleBoardItemClick = (row, col) => {
    let newBoardState = [...boardState];

    newBoardState[row][col].isClicked = true;
    newBoardState[row][col].isRevealed = true;
    
    if (row > 0) {
        newBoardState[row-1][col].isRevealed = true;
    }

    if (row < 4) {
        newBoardState[row+1][col].isRevealed = true;
    }

    if (col > 0) {
        newBoardState[row][col-1].isRevealed = true;
    }

    if (col < 4) {
        newBoardState[row][col+1].isRevealed = true;
    }
    

    console.log("New Board State: ", newBoardState);
    setBoardState(newBoardState);
  }

  return (
    <div className="board-container">
      {
      boardState.map((row, i) =>
        row.map((item, j) =>
          <BoardItem key={i * 5 + j} row={i} col={j} isClicked={item.isClicked} isRevealed={item.isRevealed} isBomb={item.isBomb} noOfBombNeighbors={item.noOfBombNeighbors} onClick={handleBoardItemClick} />
        )
      )}
    </div>
  );
}

export default Board;
