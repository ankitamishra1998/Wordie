import React, { Component } from 'react';
import Board from './lib/components/Board';
import Header from './lib/components/Header';
import './App.css';
import { ReactComponent as MySvg } from './ankita.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faHashtag, faCrown, faBomb, faClover, faFlag, faHeart } from '@fortawesome/free-solid-svg-icons';

const wordJson = require('./lib/meaningsV2.json');

class App extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
    const wordObj = this.generateRandomWord();
    const best = this.getBestScore();
    const streak = this.getStreak();
    this.state = {
      gameInProgress: true,
      word: wordObj,
      best,
      streak,
    }
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
    const words = Object.keys(wordJson)
    const randomNumber = Math.floor(Math.random() * (words.length+1)); 
    const randomWord = words[randomNumber];
    const wordie = {
      'key': randomWord,
      'value': wordJson[randomWord]
    }
    return wordie;
  }

  getBestScore() {
    const best = localStorage.getItem('best');
    if (best) return best;
    localStorage.setItem('best', 0);
    return '0';
  }

  getStreak() {
    const streak = localStorage.getItem('streak');
    if (streak) return streak;
    localStorage.setItem('streak', 0);
    return '0';
  }

  setStreakAndBestScore() {
    const streak = localStorage.getItem('streak');
    const val = parseInt(streak) + 1;
    localStorage.setItem('streak', val.toString());

    const best = localStorage.getItem('best');

    if (parseInt(val) > parseInt(best)) {
      localStorage.setItem('best', val);
    }
  }

  resetGame = () => {
    const wordObj = this.generateRandomWord();
    const best = this.getBestScore();
    const streak = this.getStreak();
    this.setState({
      gameInProgress: false,
      word: wordObj,
      best,
      streak,
    });
    this.boardRef.current.rerender();
  }

  render() {
    return (
      <div className="page">
        <div className="game-container">
          <div className="game-content">
            <Header className="header" resetGame={this.resetGame} streak={this.state.streak} best={this.state.best} />
            <Board ref={this.boardRef} word={this.state.word} resetGame={this.resetGame} setStreakAndBestScore={this.setStreakAndBestScore}/>
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
          <p style={{marginRight: "5px", fontWeight: "bold", marginTop: "2px", color: "#B38445" }}>Made with 
          <FontAwesomeIcon style={{ color: 'indianred', marginLeft: "5px", marginRight: "5px" }} icon={faHeart}/>
           by Ankita Mishra</p>
          <MySvg style={{width: "20px", height: "20px", marginTop: "4px" }} />
        </div>
      </div>
    );
  }
}

export default App;