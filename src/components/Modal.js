import React from "react";

class Modal extends React.Component {
  handleClick = () => {
    this.props.rerender();
  };

  render() {
    const { title, content } = this.props;

    return (
      <div className="modal-container">
        <div className="modal-content">
          <h1 className="modal-title">{title}</h1>
          <button className="modal-button" onClick={() => this.handleClick()}>{content}</button>
        </div>
      </div>
    );
  }
}

export default Modal;
