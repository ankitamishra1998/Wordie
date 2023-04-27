import React, { Component } from 'react';
import BoardItem from './BoardItem';
import './Board.css';
import Modal from './Modal';
import { randomWalkAlgorithm } from '../utils';

class Board extends Component {
    rows;
    cols;
    new_x = 0;
    new_y = 0;

    constructor(props) {
        super(props);
        let newBoard = this.createBoard();
        this.setBoardValues(newBoard);
        this.state = { 
            boardState: newBoard,
            position: {
                x: 0, 
                y: 0
            },
            isFoundBomb: false
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    rerender = () => {
        console.log("CHECKPOINT 2");
        this.resetBoard();
        this.forceUpdate();
    }

    createBoard = () => {
        this.rows = 5;
        this.cols = 5;
        let myBoard = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            myBoard[i] = new Array(this.cols);
            for (let j = 0; j < this.cols; j++) {
                myBoard[i][j] = {row: i, col: j, isClicked: false, isRevealed: false, isBomb: true, noOfBombNeighbors: 0};
            }
        }

        return myBoard;
    }

    setBoardValues = (board) => {
        this.setPath(board);
        this.setBombs(board);
        board[0][0].isRevealed = true;
        board[1][0].isRevealed = true;
        board[0][1].isRevealed = true;
        board[0][0].isClicked = true;
    }

    setBoard = (board) => {
        this.setState({ 
            boardState: board,
            position: {
                x: 0, 
                y: 0
            },
            isFoundBomb: false
        });
    }

    resetBoard = () => {
        let newBoard = this.createBoard();
        this.setBoardValues(newBoard);
        this.setBoard(newBoard);
    }

    setPath(board) {
        const pathArr = randomWalkAlgorithm();

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const arr = new Array(2);
                arr[0] = i;
                arr[1] = j;
                for (let path of pathArr) {
                    if (path[0] === arr[0] && path[1] === arr[1]) {
                        board[i][j].isBomb = false;
                    }
                }
            }
        }
    }

    setBombs(board) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
              // calculate bomb neighbors
              let bombNeighbors = 0;
              if (i > 0 && board[i-1][j].isBomb === true) {
                  bombNeighbors++;
              }
          
              if (i < 4 && board[i+1][j].isBomb ===true) {
                  bombNeighbors++;
              }
          
              if (j > 0 && board[i][j-1].isBomb === true) {
                  bombNeighbors++;
              }
          
              if (j < 4 && board[i][j+1].isBomb === true) {
                  bombNeighbors++;
              }
              board[i][j].noOfBombNeighbors = bombNeighbors;
            }
          }
    }

    handleKeyDown = (event) => {
        let cur_x = this.state.position.x;
        let cur_y = this.state.position.y;

        switch (event.keyCode) {
          case 37: // left arrow
            this.new_x = cur_x;
            this.new_y = cur_y - 1;
            break;
          case 38: // up arrow
            this.new_x = cur_x - 1;
            this.new_y = cur_y;
            break;
          case 39: // right arrow
            this.new_x = cur_x;
            this.new_y = cur_y + 1;
            break;
          case 40: // down arrow
            this.new_x = cur_x + 1;
            this.new_y = cur_y;
            break;
          default:
            break;
        }

        let newBoardState = [...this.state.boardState];

        if (this.new_x >= 0 && this.new_x <=4 && this.new_y >= 0 && this.new_y <= 4) {
            newBoardState[this.new_x][this.new_y].isClicked = true;
            newBoardState[this.new_x][this.new_y].isRevealed = true;

            if (this.new_x + 1 <= 4 && this.new_y <= 4) {
                newBoardState[this.new_x + 1][this.new_y].isRevealed = true;
            }

            if (this.new_x <= 4 && this.new_y + 1 <= 4) {
                newBoardState[this.new_x][this.new_y + 1].isRevealed = true;
            }

            if (this.new_x === 4) {
                newBoardState[this.new_x - 1][this.new_y].isRevealed = true;
            }

            if (this.new_y === 4) {
                newBoardState[this.new_x][this.new_y - 1].isRevealed = true;
            }

            let isFoundBomb = this.state.isFoundBomb;
            if (this.state.boardState[this.new_x][this.new_y].isBomb) { isFoundBomb = true; }
            
            this.setState({ 
                boardState: newBoardState,
                position: {
                    x: this.new_x,
                    y: this.new_y
                },
                isFoundBomb
            });
        }
    };

  render() {
    return (
        <div>
            {this.state.isFoundBomb && <Modal title={"Test title"} content={"test content"} rerender={this.rerender}/>}
            <div className="board-container" onKeyDown={this.handleKeyDown}>
                {
                this.state.boardState.map((row, i) =>
                    row.map((item, j) =>
                    <BoardItem key={i * 5 + j} row={i} col={j} isClicked={item.isClicked} isRevealed={item.isRevealed} isBomb={item.isBomb} noOfBombNeighbors={item.noOfBombNeighbors} posX={this.state.position.new_x} posY={this.state.position.new_y}/>
                    )
                )}
            </div>
        </div>
      );
  }
}


export default Board;
