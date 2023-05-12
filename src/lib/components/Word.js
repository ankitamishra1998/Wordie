import React from "react";
import './Word.css';
import './WordBlock';
import WordBlock from "./WordBlock";

class Word extends React.Component {
  render() {
    const { word } = this.props;
    let wordArr = word.key.split('');
    wordArr = wordArr.splice(0, word.key.length);
    const meaningsArr = word.value;

    return (
      <div>
        <div className="wordContainer">
          {
              wordArr.map((character) => 
                  <WordBlock letter={character.toUpperCase()} />   
          )}
        </div>
        {
          meaningsArr.map(val => 
            <div className="infoContainer">
              <h2>{val.partOfSpeech}</h2>
              <h3>{val.firstUsage}</h3>
              <h3>{val.firstSentence}</h3>
              <h3>{val.secondUsage}</h3>
              <h3>{val.secondSentence}</h3>
            </div>   
          )
        }
      </div>
    );
  }
}

export default Word;