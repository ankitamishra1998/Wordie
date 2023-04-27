import React from "react";

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    console.log("CHECKPOINT 1");
    this.props.rerender();
  };

  render() {
    const { title, content } = this.props;

    return (
      <div>
          <div className="modal">
            <div className="modal-content">
              <h2>{title}</h2>
              <p>{content}</p>
              <button onClick={() => this.handleClick()}>Close</button>
            </div>
          </div>
      </div>
    );
  }
}

export default Modal;
