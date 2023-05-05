import React from "react";
import './Word.css';
import './WordBlock';
import WordBlock from "./WordBlock";

class Word extends React.Component {
  render() {
    const { word } = this.props;
    let wordArr = word.split('');
    wordArr = wordArr.splice(0,9);
    console.log("WORD: ", wordArr);

    return (
      <div className="wordContainer">
        {
            wordArr.map((character) => 
                <WordBlock letter={character.toUpperCase()} />   
        )}
      </div>
    );
  }
}

export default Word;