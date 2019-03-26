import React from 'react';
import {Howl} from 'howler';
import uuidv4 from 'uuidv4';

class MazeAudioSprite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finalPositionCallback: props.finalPositionCallback,
            currentPositionCallback: props.currentPositionCallback,
            audio: new Howl({
                src: [props.filename],
            }),
            name: props.name,
            uuid: uuidv4(),
        };
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

    update1DAudioPos = () => {
        let current = this.state.currentPositionCallback(), final = this.state.finalPositionCallback();
        let audioVolume = this.audioScaling(current.getDistanceFromStart(), final.getDistanceFromStart());
        this.state.audio.pos(audioVolume, 0, 1);
    };

    audioScaling = (start, finish) => {
        return Math.pow(start - finish, 1);
    };

    playAudio = () => {
        this.updateAudioPos();
        this.state.audio.play();
    };

    play1DAudio = () => {
        this.update1DAudioPos();
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
}

export default MazeAudioSprite;