import React from "react";
import './Modal.css';

class Modal extends React.Component {
  handleClick = () => {
    this.props.rerender();
  };

  closeHelpModal = () => {
    this.props.closeGameInstructions();
  }

  render() {
    const { title, content } = this.props;

    return (
      <div className="modal-container">
        <div className="modal-content">
          <h1 className="modal-title">{title}</h1>
          {this.props.isHelpModal && <h1 className="modal-help-section">{this.props.gameInstructions}</h1>}
          {!this.props.isHelpModal  && <button className="modal-button" onClick={() => this.handleClick()}>{content}</button>}
          {this.props.isHelpModal  && <button className="modal-button" onClick={() => this.closeHelpModal()}>{content}</button>}
        </div>
      </div>
    );
  }
}

export default Modal;
