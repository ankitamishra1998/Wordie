import React from "react";
import './Modal.css';
import Word from './Word';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faHashtag, faCrown, faBomb, faClover, faFlag } from '@fortawesome/free-solid-svg-icons';

class Modal extends React.Component {
  gameInstructions = {
    step1: "Navigate using the arrow keys",
    step2: "Move to reveal the number of adjacent mines",
    step3: "Click on a tile to flag it as a potential mine",
    step4: "Reach the crown to discover the wotd",
    step5: "Step on a mine, and you lose",
    step6: "So, tread carefully and goodluck!"
  }

  titlePadding = this.props.isHelpModal ? '45%' : '0%';

  handleClick = () => {
    if (this.props.isGameWon) return;

    if (this.props.isHelpModal) {
      this.props.closeGameInstructions();
    } else {
      this.props.resetGame();
    }
  };

  handleButtonClick = () => {
    if (this.props.isHelpModal) {
      this.props.closeGameInstructions();
    } else {
      this.props.resetGame();
    }
  }

  render() {
    const { title, buttonText } = this.props;

    return (
      <div className="modal-container" onClick={() => this.handleClick()}>
        <div className="modal-content">
          <h1 className="modal-title" style={{ paddingRight: this.titlePadding }}>{title}</h1>
          {
            this.props.isHelpModal && 
            <div>
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
          }
          {this.props.isGameWon && <Word word={this.props.word} /> }
          {!this.props.isHelpModal && <button className="modal-button" onClick={() => this.handleButtonClick()}>{buttonText}</button>}
        </div>
      </div>
    );
  }
}

export default Modal;
