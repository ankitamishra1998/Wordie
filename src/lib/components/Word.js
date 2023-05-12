import React from "react";
import './Word.css';
import './WordBlock';
import WordBlock from "./WordBlock";

class Word extends React.Component {
  render() {
    const { word } = this.props;
    console.log("PROPSSS: ", this.props);
    console.log("WORDDDD: ", this.props.word);
    let wordArr = word.key.split('');
    wordArr = wordArr.splice(0, word.key.length);

    return (
      <div>
        <div className="wordContainer">
          {
              wordArr.map((character) => 
                  <WordBlock letter={character.toUpperCase()} />   
          )}
        </div>
        <div className="infoContainer">
          <h2>{word.value.partOfSpeech}</h2>
          <h3>{word.value.firstUsage}</h3>
          <h3>{word.value.firstSentence}</h3>
          <h3>{word.value.secondUsage}</h3>
          <h3>{word.value.secondSentence}</h3>
        </div>
      </div>
    );
  }
}

export default Word;