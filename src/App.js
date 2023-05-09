import React, { Component } from 'react';
import Board from './lib/components/Board';
import Header from './lib/components/Header';
import './App.css';
import { WORDLIST } from './lib/wordsList';
import { ReactComponent as MySvg } from './ankita.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faHashtag, faCrown, faBomb, faClover, faFlag } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
    this.state = {
      gameInProgress: true,
      word: 'Impish'
    }
    this.generateRandomWord();
  }

  gameInstructions = {
    step1: "Navigate using the arrow keys",
    step2: "Move to reveal the number of adjacent mines",
    step3: "Click on a tile to flag it as a potential mine",
    step4: "Reach the crown to discover the wotd",
    step5: "Step on a mine, and you lose",
    step6: "So, tread carefully and goodluck!"
  }

  generateRandomWord() {
    const randomNumber = Math.floor(Math.random() * (WORDLIST.length+1)); 
    this.setState({ word: WORDLIST[randomNumber] });
  }

  resetGame = () => {
    this.setState({
      gameInProgress: false,
      word: 'Impish'
    });
    this.generateRandomWord();
    this.boardRef.current.rerender();
  }

  render() {
    return (
      <div className="page">
        <div className="game-container">
          <div className="game-content">
            <Header className="header" resetGame={this.resetGame}/>
            <Board ref={this.boardRef} word={this.state.word} resetGame={this.resetGame}/>
          </div>
        </div>
        <div className="gameInstructions">
          <h1 className="instructions-title" style={{ paddingRight: "42%" }}>How to play?</h1>
          <div className="instructionContainer">
            <FontAwesomeIcon className="icon" style={{ color: '#11727e' }} icon={faKeyboard}/>
            <h1 className="modal-help-section">{this.gameInstructions.step1}</h1>  
          </div>
          <div className="instructionContainer">
            <FontAwesomeIcon className="icon" style={{ color: 'gray' }} icon={faHashtag}/>
            <h1 className="modal-help-section">{this.gameInstructions.step2}</h1>  
          </div>
          <div className="instructionContainer">
            <FontAwesomeIcon className="icon" style={{ color: 'indianred' }} icon={faFlag}/>
            <h1 className="modal-help-section">{this.gameInstructions.step3}</h1>  
          </div>
          <div className="instructionContainer">
            <FontAwesomeIcon className="icon" style={{ color: '#c8a019' }} icon={faCrown}/>
            <h1 className="modal-help-section">{this.gameInstructions.step4}</h1>  
          </div>
          <div className="instructionContainer">
            <FontAwesomeIcon className="icon" style={{ color: 'black' }} icon={faBomb}/>
            <h1 className="modal-help-section">{this.gameInstructions.step5}</h1>  
          </div>
          <div className="instructionContainer">
            <FontAwesomeIcon className="icon" style={{ color: 'green' }} icon={faClover}/>
            <h1 className="modal-help-section">{this.gameInstructions.step6}</h1>  
          </div>
        </div>
        <div className="author">
          <p style={{marginRight: "5px", fontWeight: "bold", marginTop: "2px", color: "#B38445" }}>Created by: </p>
          <p style={{marginTop: "2px", marginRight: "5px", color: "#B38445"}}> Ankita Mishra</p>
          <MySvg style={{width: "25px", height: "25px" }} />
        </div>
      </div>
    );
  }
}

export default App;