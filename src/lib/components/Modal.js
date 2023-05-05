import React from "react";
import './Modal.css';
import Word from './Word';

class Modal extends React.Component {
  handleClick = () => {
    if (this.props.isGameWon) return;

    if (this.props.isHelpModal) {
      this.props.closeGameInstructions();
    } else {
      this.props.rerender();
    }
  };

  handleButtonClick = () => {
    if (this.props.isHelpModal) {
      this.props.closeGameInstructions();
    } else {
      this.props.rerender();
    }
  }

  render() {
    const { title, buttonText } = this.props;

    return (
      <div className="modal-container" onClick={() => this.handleClick()}>
        <div className="modal-content">
          <h1 className="modal-title">{title}</h1>
          {this.props.isHelpModal && <h1 className="modal-help-section">{this.props.content}</h1>}
          {this.props.isGameWon && <Word word={this.props.word} /> }
          <button className="modal-button" onClick={() => this.handleClick()}>{buttonText}</button>
        </div>
      </div>
    );
  }
}

export default Modal;
