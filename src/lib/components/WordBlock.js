import React from "react";
import './WordBlock.css';

class WordBlock extends React.Component {
  render() {
    const { letter } = this.props;

    return (
      <div className="letterContainer">
        {letter}
      </div>
    );
  }
}

export default WordBlock;