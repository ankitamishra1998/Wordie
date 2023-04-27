import React, { Component }  from 'react';
import './BoardItem.css';

class  BoardItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origBgColor: "indianred",
            clickedBgColor: "#2C8E8E",
            hoverBgColor: "#5CCDCD",
            bombBgColor: "black",
        };
    }

    selectBgColor() {
        if (this.props.isClicked && this.props.isBomb) {
            return this.state.bombBgColor;
        } else if (this.props.row === this.props.posX && this.props.col === this.props.posY) {
            return this.state.hoverBgColor;
        } else if (this.props.isClicked) {
            return this.state.clickedBgColor;
        } else {
            return this.state.origBgColor;
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: this.selectBgColor() }} className="board-item">
            {this.props.isRevealed && <div className="reveal">{this.props.noOfBombNeighbors}</div>}
            {this.props.isClicked && this.props.isBomb && <div className="bomb"></div>}
            </div>
        );
    }
}

export default BoardItem;
