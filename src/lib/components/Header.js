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
                <h3 className="header-content">Discover the word of the day</h3>
            </div>
            <div className="score">
                <div className="sub-score">
                    <div className="streak">
                        <p style={{ fontWeight: "600", fontSize: "x-small", margin: "0%" }}>STREAK</p>
                        <p style={{ marginTop: "5%", fontWeight: "900" }}>{this.props.streak}</p>
                    </div>
                    <div className="best">
                        <p style={{ fontWeight: "600", fontSize: "x-small", margin: "0%" }}>BEST</p>
                        <p style={{ marginTop: "5%", fontWeight: "900" }}>{this.props.best}</p>
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