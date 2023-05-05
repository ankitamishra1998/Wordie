import React, { Component } from 'react';
import './Header.css'
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    gameInstructions = "Navigate using arrow keys. \n\nYour goal is to reach the bottom-rightmost tile to reveal the word of the day. \n\n The numbers on each tile tell you the number of mines that surrounds it. \n \n Click on a tile to mark it as a potential mine. \n\n Step on a mine, and you lose. \n\n So, thread carefully and good luck!";

    constructor(props) {
        super(props);
        this.state = {
            showHelp: false,
        }
    }

    handleClick = () => {
        this.props.resetGame();
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

    render() {
      return (
        <div>
            {this.state.showHelp && <Modal 
                title={"How to play?"} 
                content={this.gameInstructions} 
                buttonText={"Got it"} 
                isHelpModal={this.state.showHelp} 
                closeGameInstructions={this.closeGameInstructions}/>}
            <header className="header">
            <div className="sub-header">
                <div className="sub-sub-header">
                    <h1 className="header-title">Turnstile</h1>
                    <FontAwesomeIcon className="helpIcon" icon={faCircleQuestion} onClick={this.showGameInstructions}/>
                </div>
                <h3 className="header-content">Mine the word of the day</h3>
            </div>
            <button className="new-game-button" onClick={this.handleClick}>New Game</button>
            </header>
        </div>
      );
    }
  }
  
  export default Header;