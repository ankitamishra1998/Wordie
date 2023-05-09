import React, { Component } from 'react';
import './Header.css'
import Modal from './Modal';
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

    scrollToBottom = () => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
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
                    <h1 className="header-title">Mumble</h1>
                    <FontAwesomeIcon className="helpIcon" icon={faCircleQuestion} onClick={this.scrollToBottom}/>
                </div>
                <h3 className="header-content">Discover the word of the day</h3>
            </div>
            <button className="new-game-button" onClick={this.handleClick}>New Game</button>
            </header>
        </div>
      );
    }
  }
  
  export default Header;