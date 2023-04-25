import React, { useState }  from 'react';
import './BoardItem.css';

function BoardItem(props) {
    const [bgColor, setBgColor] = useState("#008080");

    const handleClick = () => {
        props.onClick(props.row, props.col);
        setBgColor("indianred");
    }

    return (
        <div style={{ backgroundColor: bgColor }} className="board-item" onClick={handleClick}>
        {props.isRevealed && <div className="reveal">{props.noOfBombNeighbors}</div>}
        {props.isClicked && props.isBomb && <div className="bomb"></div>}
        </div>
    );
}

export default BoardItem;
