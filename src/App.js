import React, { Component } from 'react';
import {Howl, Howler} from 'howler';
import waterAudioFile from './resources/water.wav';
import zombieAudioFile from './resources/zombie.wav';
//From: "Waterfall, Large, A.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org
import waterFallAudioFile from './resources/waterfall.wav'
import Grid from './framework/Grid';
import './style/App.css';
import Maze from "./games/maze/Maze";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        maxX: 10,
        maxY: 10,
        spriteVals: [
            {
                pos: this.getRandomPos(10, 10),
                audioFile: waterFallAudioFile,
                name: "Waterfall",
            },
            {
                pos: this.getRandomPos(10, 10),
                audioFile: zombieAudioFile,
                name: "Zombie",
            }
        ],
    }
  }

  getRandomPos = (x, y) => {
    return {
          x: Math.floor(Math.random() * x),
          y: Math.floor(Math.random() * y),
      };
  };

  render() {
    return (
      <div className="body">
          <Maze maxX={this.state.maxX} maxY={this.state.maxY}/>
          {/*<Grid maxX={this.state.maxX} maxY={this.state.maxY} spriteVals={this.state.spriteVals}/>*/}
      </div>
    );
  }
}

export default App;
