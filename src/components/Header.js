import React, { Component } from 'react';
import './Header.css'

class Header extends Component {
    handleClick = () => {
        this.props.resetGame();
    }

    render() {
      return (
        <header className="header">
          <h1 className="header-title">Word Mine</h1>
          <button className="new-game-button" onClick={this.handleClick}>New Game</button>
        </header>
      );
    }
  }
  
  export default Header;