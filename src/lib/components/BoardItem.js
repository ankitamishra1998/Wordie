import React, { Component }  from 'react';
import './BoardItem.css';
import { BACKGROUND_COLORS } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

class  BoardItem extends Component {
    selectBgColor() {
        let bgColor;
        if (this.props.isClicked && this.props.isBomb) {
            bgColor = BACKGROUND_COLORS.bombBgColor;
        } else if (this.props.row === this.props.posX && this.props.col === this.props.posY) {
            bgColor =  BACKGROUND_COLORS.hoverBgColor;
        } else if (this.props.isClicked) {
            bgColor =  BACKGROUND_COLORS.clickedBgColor;
        } else if (this.props.isMarkedBomb) {
            bgColor =  BACKGROUND_COLORS.markBomb;
        } else {
            bgColor =  BACKGROUND_COLORS.origBgColor;
        }

        return bgColor;
    }

    handleBoardItemClick = () => {
        const { row, col, isMarkedBomb } = this.props;
        if (isMarkedBomb) {
            this.props.markAndUnmarkBomb(row, col, false);
        } else {
            this.props.markAndUnmarkBomb(row, col, true);
        }
    }

    render() {
        const { isClicked, isRevealed, isBomb, noOfBombNeighbors, row, col } = this.props;
        return (
            <div style={{ backgroundColor: this.selectBgColor() }} className="board-item" onClick={this.handleBoardItemClick}>
            {isRevealed && !(row === 4 && col === 4) && <div className="reveal">{noOfBombNeighbors}</div>}
            {row === 4 && col === 4 && <div className="reveal">
                <FontAwesomeIcon style={{ color: 'tan' }} icon={faCrown}/>
                </div>}
            {isClicked && isBomb && <div className="bomb"></div>}
            </div>
        );
    }
}

export default BoardItem;
