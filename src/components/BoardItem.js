import React, { Component }  from 'react';
import './BoardItem.css';
import { BACKGROUND_COLORS } from '../constants';

class  BoardItem extends Component {
    constructor(props) {
        super(props);
        this.state = { isMarkedBomb: false };
    }

    selectBgColor() {
        let bgColor;
        if (this.props.isClicked && this.props.isBomb) {
            bgColor = BACKGROUND_COLORS.bombBgColor;
        } else if (this.props.row === this.props.posX && this.props.col === this.props.posY) {
            bgColor =  BACKGROUND_COLORS.hoverBgColor;
        } else if (this.props.isClicked) {
            bgColor =  BACKGROUND_COLORS.clickedBgColor;
        } else if (this.state.isMarkedBomb) {
            bgColor =  BACKGROUND_COLORS.markBomb;
        } else {
            bgColor =  BACKGROUND_COLORS.origBgColor;
        }

        return bgColor;
    }

    handleBoardItemClick = () => {
        if (this.state.isMarkedBomb) {
            this.setState({ isMarkedBomb: false });
        } else {
            this.setState({ isMarkedBomb: true });
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: this.selectBgColor() }} className="board-item" onClick={this.handleBoardItemClick}>
            {this.props.isRevealed && <div className="reveal">{this.props.noOfBombNeighbors}</div>}
            {this.props.isClicked && this.props.isBomb && <div className="bomb"></div>}
            </div>
        );
    }
}

export default BoardItem;
