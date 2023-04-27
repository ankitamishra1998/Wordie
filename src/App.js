import React, { Component } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
    this.state = {
      gameInProgress: true,
    }
  }

  resetGame = () => {
    this.setState({
      gameInProgress: false,
    });
    this.boardRef.current.rerender();
  }

  render() {
    return (
      <div className="game-container">
        <div className="game-content">
          <Header className="header" resetGame={this.resetGame}/>
          <Board ref={this.boardRef}/>
        </div>
      </div>
    );
  }
}

export default App;