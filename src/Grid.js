import React, { Component } from 'react';
import Player from './Player.js';
import GridSprite from './GridSprite.js';
import GridController from "./GridController";


class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maxX: props.maxX,
            maxY: props.maxY,
            player: new Player({x: 0,y: 0}),
            gridSprites: this.props.spriteVals.map(elm => new GridSprite(
                {
                    pos: elm.pos,
                    filename: elm.audioFile,
                    name: elm.name,
                    playerPositionCallback: this.getPlayerPosition,
                })),
        };
    }

    setPlayerPosition = (pos) => {
      this.state.player.setPosition(pos, () => {
          this.state.gridSprites.forEach(sprite => sprite.updateAudioPos());
      });
    };

    updatePlayerPosition = (deltaX, deltaY) => {
        let playerPosition = this.state.player.getPlayerPosition();
        let newX = playerPosition.x + deltaX;
        let newY = playerPosition.y + deltaY;

        if (0 <= newX <= this.state.maxX && 0 <= newY <= this.state.maxY) {
            let updatedPlayer = this.state.player.setPosition({x: newX, y: newY});
            this.setState({
                player: updatedPlayer,
            }, () => {
                this.state.gridSprites.forEach(sprite => sprite.updateAudioPos());
            });
        }


    };

    addGridSprite = (audioFile, pos, name) => {
        this.setState({
            gridSprites: this.state.gridSprites.concat(new GridSprite({
                pos: pos,
                filename: audioFile,
                name: name,
                playerPositionCallback: this.getPlayerPosition,
            }))
        })
    };

    getGridSprites = () => {
        return this.state.gridSprites;
    };

    getPlayerPosition = () => {
        return this.state.player.getPlayerPosition();
    };

    getPlayer = () => {
        return this.state.player;
    };

    initAudio = () => {
        this.state.gridSprites.forEach(sprite => sprite.playAudio());
    };



    componentDidMount(){
        this.initAudio();
    }



    render() {
        return (
            <div>
                <GridController gridCallback={this.updatePlayerPosition}/>
                <p>{"Player position (" + this.state.player + ")"}</p>
                <p>{"Sound position: (" + this.state.gridSprites.map(sprite => sprite.toString()).join() + ")"}</p>
            </div>
        );
    }
}

export default Grid;