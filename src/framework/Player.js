import React, { Component } from 'react';

class Player {
    constructor(props) {
        this.state = {
            x : props.x,
            y : props.y,
        }
    }

    setPosition = (pos) => {
        return new Player(pos);
    };

    getPlayerX = () => {
        return this.state.x;
    };

    getPlayerY = () => {
        return this.state.y;
    };

    getPlayerPosition = () => {
      return {
          x : this.state.x,
          y : this.state.y,
      }
    };

    toString(){
        return `Player : (${this.state.x}, ${this.state.y})`;
    }
}

export default Player;