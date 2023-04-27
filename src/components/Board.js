import React, { Component } from 'react';
import BoardItem from './BoardItem';
import './Board.css';
import { randomWalkAlgorithm } from '../utils';

class Board extends Component {
    rows;
    cols;
    myBoard;
    new_x = 0;
    new_y = 0;

    constructor(props) {
        super(props);
        this.rows = 5;
        this.cols = 5;
        this.myBoard = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.myBoard[i] = new Array(this.cols);
            for (let j = 0; j < this.cols; j++) {
                this.myBoard[i][j] = {row: i, col: j, isClicked: false, isRevealed: false, isBomb: true, noOfBombNeighbors: 0 };
            }
        }
        this.state = { 
            boardState: this.myBoard,
            position: {
                x: 0, 
                y: 0
            },
        };

        this.setPath();
        this.setBombs();
        this.myBoard[0][0].isRevealed = true;
        this.myBoard[1][0].isRevealed = true;
        this.myBoard[0][1].isRevealed = true;
        this.myBoard[0][0].isClicked = true;

    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    setPath() {
        const pathArr = randomWalkAlgorithm();

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const arr = new Array(2);
                arr[0] = i;
                arr[1] = j;
                for (let path of pathArr) {
                    if (path[0] === arr[0] && path[1] === arr[1]) {
                        this.myBoard[i][j].isBomb = false;
                    }
                }
            }
        }
    }

    setBombs() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
              // calculate bomb neighbors
              let bombNeighbors = 0;
              if (i > 0 && this.myBoard[i-1][j].isBomb === true) {
                  bombNeighbors++;
              }
          
              if (i < 4 && this.myBoard[i+1][j].isBomb ===true) {
                  bombNeighbors++;
              }
          
              if (j > 0 && this.myBoard[i][j-1].isBomb === true) {
                  bombNeighbors++;
              }
          
              if (j < 4 && this.myBoard[i][j+1].isBomb === true) {
                  bombNeighbors++;
              }
              this.myBoard[i][j].noOfBombNeighbors = bombNeighbors;
            }
          }
    }

    handleKeyDown = (event) => {
        console.log(`Prev Row: ${this.state.position.x}, Prev Col: ${this.state.position.y}`);

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

        console.log(`New Row: ${this.new_x}, New Col: ${this.new_y}`);


        if (this.new_x >= 0 && this.new_x <=4 && this.new_y >= 0 && this.new_y <= 4) {
            newBoardState[this.new_x][this.new_y].isClicked = true;
            newBoardState[this.new_x][this.new_y].isRevealed = true;

            if (this.new_x + 1 <= 4 && this.new_y <= 4) {
                newBoardState[this.new_x + 1][this.new_y].isRevealed = true;
            }

            if (this.new_x <= 4 && this.new_y + 1 <= 4) {
                newBoardState[this.new_x][this.new_y + 1].isRevealed = true;
            }
            
            this.setState({ 
                boardState: newBoardState,
                position: {
                    x: this.new_x,
                    y: this.new_y
                }
            });
        }
    };

  render() {
    return (
        <div className="board-container" onKeyDown={this.handleKeyDown}>
          {
          this.state.boardState.map((row, i) =>
            row.map((item, j) =>
              <BoardItem key={i * 5 + j} row={i} col={j} isClicked={item.isClicked} isRevealed={item.isRevealed} isBomb={item.isBomb} noOfBombNeighbors={item.noOfBombNeighbors} posX={this.new_x} posY={this.new_y}/>
            )
          )}
        </div>
      );
  }
}


export default Board;
