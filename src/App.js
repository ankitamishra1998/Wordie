import React, { Component } from 'react';
import Board from './lib/components/Board';
import Header from './lib/components/Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
    this.state = {
      gameInProgress: true,
      word: null,
    }
  }

  componentDidMount() {
    const url = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';
    fetch(url)
      .then(response => response.text())
      .then(data => {
          const words = data.split('\n').filter(word => word.length >= 5 && word.length <= 9);
          const randomNumber = Math.floor(Math.random() * (words.length+1)); 
          this.setState({ word: words[randomNumber] });
      })
      .catch(error => console.error(error));
  }

  resetGame = () => {
    this.setState({
      gameInProgress: false,
      word: null,
    });
    this.boardRef.current.rerender();
  }

  render() {
    if (!this.state.word) return;

    return (
      <div className="game-container">
        <div className="game-content">
          <Header className="header" resetGame={this.resetGame}/>
          <Board ref={this.boardRef} word={this.state.word}/>
        </div>
      </div>
    );
  }
}

export default App;