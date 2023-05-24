import React, { Component } from 'react';
import BoardItem from './BoardItem';
import './Board.css';
import Modal from './Modal';
import { randomWalkAlgorithm } from '../utils';

class Board extends Component {
    rows = 5;
    cols = 5;

    constructor(props) {
        super(props);

        let board = this.createBoard();
        this.setBoardValues(board);
        this.state = {
            boardState: board,
            position: {
                x: 0,
                y: 0
            },
            isFoundBomb: false,
            isGameWon: false,
            // direction: '',
        };

        this.touchStartX = 0;
        this.touchStartY = 0;
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('touchstart', this.handleTouchStart);
        document.addEventListener('touchend', this.handleTouchEnd);
        document.addEventListener('touchmove', this.handleTouchMove);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('touchstart', this.handleTouchStart);
        document.removeEventListener('touchend', this.handleTouchEnd);
        document.removeEventListener('touchmove', this.handleTouchMove);
    }

    handleTouchStart = (event) => {
        this.touchStartX = event.touches[0].clientX;
        this.touchStartY = event.touches[0].clientY;
        // this.setState({ direction: '' });
    };
    
    handleTouchEnd = () => {
        // this.setState({ direction: '' });
    };

    checkIfWithinTouchableArea = (x, y) => {
        const touchableAreaElement = document.getElementById('board');
        if (touchableAreaElement) {
          const { top, left, width, height } = touchableAreaElement.getBoundingClientRect();
          return (
            x >= left &&
            x <= left + width &&
            y >= top &&
            y <= top + height
          );
        }
        return false;
    };

    handleTouchMove = (event) => {
        const touch = event.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;

        const isWithinTouchableArea = this.checkIfWithinTouchableArea(x, y);

        if (isWithinTouchableArea) {
            const deltaX = x - this.touchStartX;
            const deltaY = y - this.touchStartY;
            const sensitivity = 150;

            let cur_x = this.state.position.x;
            let cur_y = this.state.position.y;
            let new_x = 0;
            let new_y = 0;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > sensitivity) {
                    // this.setState({ direction: 'right' });
                    new_x = cur_x;
                    new_y = cur_y + 1;
                } else if (deltaX < -sensitivity) {
                    // this.setState({ direction: 'left' });
                    new_x = cur_x;
                    new_y = cur_y - 1;
                }
            } else {
                if (deltaY > sensitivity) {
                    // this.setState({ direction: 'down' });
                    new_x = cur_x + 1;
                    new_y = cur_y;
                } else if (deltaY < -sensitivity) {
                    // this.setState({ direction: 'up' });
                    new_x = cur_x - 1;
                    new_y = cur_y;
                }
            }

            this.updateBoard(new_x, new_y);
        }
    };

    rerender = () => {
        this.resetBoard();
        this.forceUpdate();
    }

    createBoard = () => {
        let rows = this.rows;
        let cols = this.cols;

        let myBoard = new Array(rows);
        for (let i = 0; i < rows; i++) {
            myBoard[i] = new Array(cols);
            for (let j = 0; j < cols; j++) {
                myBoard[i][j] = { 
                    row: i, 
                    col: j, 
                    isClicked: false, 
                    isRevealed: false, 
                    isBomb: true, 
                    noOfBombNeighbors: 0, 
                    isMarkedBomb: false 
                };
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
            isFoundBomb: false,
            isGameWon: false,
            // direction: '',
        });
    }

    resetBoard = () => {
        let board = this.createBoard();
        this.setBoardValues(board);
        this.setBoard(board);
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
                if (i > 0 && board[i - 1][j].isBomb === true) {
                    bombNeighbors++;
                }

                if (i < 4 && board[i + 1][j].isBomb === true) {
                    bombNeighbors++;
                }

                if (j > 0 && board[i][j - 1].isBomb === true) {
                    bombNeighbors++;
                }

                if (j < 4 && board[i][j + 1].isBomb === true) {
                    bombNeighbors++;
                }
                board[i][j].noOfBombNeighbors = bombNeighbors;
            }
        }
    }

    markAndUnmarkBomb = (row, col, val) => {
        let newBoardState = [...this.state.boardState];
        newBoardState[row][col].isMarkedBomb = val;
        this.setState({
            boardState: newBoardState
        })
    }

    updateBoard = (new_x, new_y) => {
        if (!this.state.isFoundBomb && !this.state.isGameWon) {
            let newBoardState = [...this.state.boardState];

            if (new_x >= 0 && new_x <= 4 && new_y >= 0 && new_y <= 4) {
                newBoardState[new_x][new_y].isClicked = true;
                newBoardState[new_x][new_y].isRevealed = true;

                if (new_x + 1 <= 4 && new_y <= 4) {
                    newBoardState[new_x + 1][new_y].isRevealed = true;
                }

                if (new_x <= 4 && new_y + 1 <= 4) {
                    newBoardState[new_x][new_y + 1].isRevealed = true;
                }

                if (new_x - 1 >= 0 && new_y >= 0) {
                    newBoardState[new_x - 1][new_y].isRevealed = true;
                }

                if (new_x >= 0 && new_y - 1 >= 0) {
                    newBoardState[new_x][new_y - 1].isRevealed = true;
                }
                

                let isFoundBomb = this.state.isFoundBomb;
                if (this.state.boardState[new_x][new_y].isBomb) { 
                    isFoundBomb = true;
                }

                let isGameWon = this.state.isGameWon;
                if (new_x === this.rows-1 && new_y === this.cols-1) { 
                    isGameWon = true;
                    this.props.setStreakAndBestScore();
                }

                this.setState({
                    boardState: newBoardState,
                    position: {
                        x: new_x,
                        y: new_y
                    },
                    isFoundBomb,
                    isGameWon,
                });
            }
        }
    }

    handleKeyDown = (event) => {
        event.preventDefault();
        
        let cur_x = this.state.position.x;
        let cur_y = this.state.position.y;
        let new_x = 0;
        let new_y = 0;

        switch (event.keyCode) {
            case 37: // left arrow
                new_x = cur_x;
                new_y = cur_y - 1;
                break;
            case 38: // up arrow
                new_x = cur_x - 1;
                new_y = cur_y;
                break;
            case 39: // right arrow
                new_x = cur_x;
                new_y = cur_y + 1;
                break;
            case 40: // down arrow
                new_x = cur_x + 1;
                new_y = cur_y;
                break;
            default:
                break;
        }

        this.updateBoard(new_x, new_y);
    };

    render() {
        return (
            <div style={{ touchAction: 'none' }}>
                {this.state.isFoundBomb && <Modal title={"Game over!"} buttonText={"Try again"} resetGame={this.props.resetGame} />}
                {this.state.isGameWon && <Modal title={"Congratulations!"} buttonText={"Play again"} resetGame={this.props.resetGame} isGameWon={this.state.isGameWon} word={this.props.word}/>}
                <div className="board-container" id="board" onKeyDown={this.handleKeyDown}>
                    {
                        this.state.boardState.map((row, i) =>
                            row.map((item, j) =>
                                <BoardItem 
                                    key={i * 5 + j} 
                                    row={i} 
                                    col={j} 
                                    isClicked={item.isClicked} 
                                    isRevealed={item.isRevealed} 
                                    isBomb={item.isBomb} 
                                    noOfBombNeighbors={item.noOfBombNeighbors} 
                                    posX={this.state.position.x} 
                                    posY={this.state.position.y} 
                                    isMarkedBomb={item.isMarkedBomb}
                                    markAndUnmarkBomb={this.markAndUnmarkBomb}
                                />
                            )
                        )}
                </div>
            </div>
        );
    }
}

export default Board;
