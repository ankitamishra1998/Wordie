import React from "react";
import './WordBlock.css';

class WordBlock extends React.Component {
  ascii = (a) => { return a.charCodeAt(0); }

  isLetter = (char) => {
    if (char === ' ' || char === '-' || this.ascii(char) === 160) {
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