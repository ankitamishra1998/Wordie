import React from "react";
import './Modal.css';
import Word from './Word';

class Modal extends React.Component {
  gameInstructions = {
    step1: "Navigate using the arrow keys",
    step2: "Move to reveal the number of adjacent mines",
    step3: "Click on a tile to flag it as a potential mine",
    step4: "Reach the crown to discover the wotd",
    step5: "Step on a mine, and you lose",
    step6: "So, tread carefully and goodluck!"
  }

  handleClick = () => {
    // if (this.props.isGameWon) return;

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
      <div className="modal-container">
        <div className="modal-content">
          <h1 className="modal-title">{title}</h1>
          {this.props.isGameWon && <Word word={this.props.word} /> }
          {!this.props.isHelpModal && <button className="modal-button" onClick={() => this.handleButtonClick()}>{buttonText}</button>}
        </div>
      </div>
    );
  }
}

export default Modal;
