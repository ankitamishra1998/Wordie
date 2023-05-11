import React from "react";
import './WordBlock.css';

class WordBlock extends React.Component {
  isLetter = (char) => {
    if (char === ' ' || char === '-') {
      return false;
    }
    return true;
  }

  render() {
    const { letter } = this.props;

    return (
      <div>
        {this.isLetter(letter) && <div className="letterContainer">{letter}</div>}
        {!this.isLetter(letter) && <div className="letterContainer" style={{ opacity: "0%" }}>{letter}</div>}
      </div>
    );
  }
}

export default WordBlock;