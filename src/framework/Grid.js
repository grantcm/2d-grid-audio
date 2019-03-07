import React, { Component } from 'react';
import Player from './Player.js';
import GridAudioSprite from './GridAudioSprite.js';
import GridController from "./GridController";

import '../style/Grid.css';


class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maxX: props.maxX,
            maxY: props.maxY,
            player: new Player({x: 0,y: 0}),
            gridSprites: this.props.spriteVals.map(elm => new GridAudioSprite(
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

        if (0 <= newX && newX < this.state.maxX && 0 <= newY && newY < this.state.maxY) {
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
            gridSprites: this.state.gridSprites.concat(new GridAudioSprite({
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

    findMatchingSprite = (x, y) => {
        return this.state.gridSprites.find(function(sprite) {
            return sprite.getSpriteX() === x && sprite.getSpriteY() === y;
        });
    };

    generateGameBoard() {
        let boardRows = [];
        for(let i=0; i < this.state.maxX; i++){
            let boardRow = [];

            for(let j=0; j < this.state.maxY; j++) {
                if (j === this.state.player.getComponentX() && i === this.state.player.getComponentY()){
                    boardRow.push(
                        <td>Player</td>
                    );

                    continue;
                }

                let sprite = this.findMatchingSprite(j, i);

                if (sprite) {
                    boardRow.push(
                        <td>{sprite.getName()}</td>
                    )
                } else {
                    boardRow.push(
                        <td/>
                    );
                }

            }

            boardRows.push(
                <tr>
                    {boardRow}
                </tr>

            );
        }

        return boardRows;
    }


    render() {
        return (
            <div>
                <GridController gridCallback={this.updatePlayerPosition}/>
                <table>
                    <tbody>
                        {this.generateGameBoard()}
                    </tbody>
                </table>
                <p>{"Player position (" + this.state.player + ")"}</p>
                <p>{"Sound position: (" + this.state.gridSprites.map(sprite => sprite.toString()).join() + ")"}</p>
            </div>
        );
    }
}

export default Grid;