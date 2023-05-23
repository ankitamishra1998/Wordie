import React, { Component } from 'react';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHelp: false,
        }
    }

    handleClick = () => {
        this.props.resetGame(true);
    }

    showGameInstructions = () => {
        this.setState({
            showHelp: true,
        })
    }

    closeGameInstructions = () => {
        this.setState({
            showHelp: false,
        })
    }

    scrollToBottom = () => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }

    render() {
      return (
        <div>
            <header className="header">
            <div className="sub-header">
                <div className="sub-sub-header">
                    <h1 className="header-title">Wordie</h1>
                    <FontAwesomeIcon className="helpIcon" icon={faCircleQuestion} onClick={this.scrollToBottom}/>
                </div>
                <h3 className="header-content">Build your vocabulary</h3>
            </div>
            <div className="score">
                <div className="sub-score">
                    <div className="streak">
                        <p className="streakTitle">STREAK</p>
                        <p className="streakContent">{this.props.streak}</p>
                    </div>
                    <div className="best">
                        <p className="bestTitle">BEST</p>
                        <p className="bestContent">{this.props.best}</p>
                    </div>
                </div>
                <button className="new-game-button" onClick={this.handleClick}>New Game</button>
            </div>
            </header>
        </div>
      );
    }
  }
  
  export default Header;