import React, { Component } from 'react';
import {Howl} from 'howler';
import uuidv4 from 'uuidv4';

class GridSprite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerPositionCallback: props.playerPositionCallback,
            x: props.pos.x,
            y: props.pos.y,
            audio: new Howl({
                src: [props.filename],
                loop: true,
            }),
            name: props.name,
            uuid: uuidv4(),
        }
    }

    getUUID = () => {
        return this.state.uuid;
    };

    setX = (x) => {
        this.setState({
            x: x
        }, this.updateAudioPos())
    };

    setY = (y) => {
        this.setState({
            y: y
        }, this.updateAudioPos())
    };


    getGridSpritePosition = () => {
        return {
            x : this.state.x,
            y : this.state.y,
        }
    };

    getSpriteX = () => {
        return this.state.x;
    };

    getSpriteY = () => {
        return this.state.y;
    };

    getName = () => {
        return this.state.name;
    };

    updateAudioPos = () => {
        let playerPosition = this.state.playerPositionCallback();
        this.state.audio.pos(this.state.x - playerPosition.x, this.state.y - playerPosition.y, 1);
    };

    playAudio = () => {
        this.updateAudioPos();
        this.state.audio.play();
    };

    pauseAudio = () => {
        this.state.audio.pause();
    };

    stopAudio = () => {
        this.state.audio.stop();
    };

    componentWillUnmount(){
        this.state.audio.unload();
    }

    toString(){
        return `${ this.state.name } : (${this.state.x}, ${this.state.y})`;
    }
}

export default GridSprite;