import React from 'react';


class GridController extends React.Component {
    constructor(props){
        super(props)
    }

    moveUp = () => {
        this.props.gridCallback(0, 1);
    };

    moveLeft = () => {
        this.props.gridCallback(-1, 0);
    };

    moveRight = () => {
        this.props.gridCallback(1, 0);
    };

    moveDown = () => {
        this.props.gridCallback(0, -1);
    };


    render(){
        return (
            <div>
                <button onClick={this.moveUp}>Up</button>
                <button onClick={this.moveDown}>Down</button>
                <button onClick={this.moveLeft}>Left</button>
                <button onClick={this.moveRight}>Right</button>
            </div>
        );

    }
}

export default GridController;