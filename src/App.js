import React, { Component } from 'react';
import Board from './lib/components/Board';
import Header from './lib/components/Header';
import './App.css';
import { WORDLIST } from './lib/wordsList';

class App extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
    this.state = {
      gameInProgress: true,
      word: null
    }
    this.generateRandomWord();
  }

  generateRandomWord() {
    const randomNumber = Math.floor(Math.random() * (WORDLIST.length+1)); 
    this.setState({ word: WORDLIST[randomNumber] });
  }

  resetGame = () => {
    this.setState({
      gameInProgress: false,
      word: null
    });
    this.generateRandomWord();
    this.boardRef.current.rerender();
  }

  render() {
    return (
      <div className="game-container">
        <div className="game-content">
          <Header className="header" resetGame={this.resetGame}/>
          <Board ref={this.boardRef} word={this.state.word} resetGame={this.resetGame}/>
        </div>
      </div>
    );
  }
}

export default App;