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
      <div className="mainContainer">
        <div className="wordContainer">
          {
              wordArr.map((character) => 
                  <WordBlock letter={character.toUpperCase()} />   
          )}
        </div>
        <div className="meaningContainer">
          {
            meaningsArr.map((val, index1) => {
                  if (index1 <= 1) {
                    return <div className="infoContainer">
                        <h2>{val.pos}</h2>
                        {
                          val.meanings.map((meaningObj, index) => {
                              if (index < 1 || (meaningsArr.length === 1 && index <= 1)) {
                                return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left", maxWidth: "80%" }}>
                                  {
                                    meaningObj.meaning.map((meaning, index) => {
                                        if (index < 1) {
                                          return <div style={{ display: "flex", flexDirection: "row" }}>
                                            <h4 style={{ paddingRight: "10px", marginBottom: "0px" }}>:</h4>
                                            <h4 style={{ marginBottom: "0px" }}>{meaning}</h4>
                                          </div>
                                        }
                                      }
                                    )
                                  }
                                  {
                                    meaningObj.usage.map((usage, index) => {
                                        if (index < 1) {
                                          return <div style={{ display: "flex", flexDirection: "row" }}>
                                            <p style={{fontStyle: "italic", marginTop: "10px", fontWeight: "500"}}>{usage}</p>
                                          </div>
                                        }
                                      }
                                    )
                                  }
                                </div>
                              }
                            }
                          )
                        }
                    </div>
                  }
              }   
            )
          }
        </div>
      </div>
    );
  }
}

export default Word;