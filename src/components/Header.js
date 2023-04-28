import React, { Component } from 'react';
import './Header.css'
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    gameInstructions = "Navigate using arrow keys. \n\nYour goal is to reach the bottom-rightmost tile to reveal the word of the day. \n\n The numbers on each tile tell you the number of mines that surrounds it. Step on a mine, and you lose. \n \n Click on a tile to mark it as a potential mine. \n\n So, thread carefully and good luck!";

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
                gameInstructions={this.gameInstructions} 
                content={"Got it"} 
                isHelpModal={this.state.showHelp} 
                closeGameInstructions={this.closeGameInstructions}/>}
            <header className="header">
            <div className="sub-header">
                <h1 className="header-title">Word Mine</h1>
                <h3 className="header-content">Streak: 0</h3>
            </div>
            <FontAwesomeIcon className="helpIcon" icon={faQuestionCircle} onClick={this.showGameInstructions}/>
            <button className="new-game-button" onClick={this.handleClick}>New Game</button>
            </header>
        </div>
      );
    }
  }
  
  export default Header;