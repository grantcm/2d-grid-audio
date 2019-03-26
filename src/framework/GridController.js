import React from 'react';


class GridController extends React.Component {

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

    spaceBar = () => {
        if(!this.props.spaceBarCallback)
            return;
        this.props.spaceBarCallback();
    };

    arrowKeyListener = (e) => {
        let key = e.keyCode ? e.keyCode : e.which;
        switch(key) {
            case 37:
                this.moveLeft();
                break;
            case 38:
                this.moveDown();
                break;
            case 39:
                this.moveRight();
                break;
            case 40:
                this.moveUp();
                break;
            case 87:
                this.moveDown();
                break;
            case 65:
                this.moveLeft();
                break;
            case 83:
                this.moveUp();
                break;
            case 68:
                this.moveRight();
                break;
            case 32:
                this.spaceBar();
                break;
            default:
        }
    };

    componentDidMount(){
        document.addEventListener("keydown", this.arrowKeyListener);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.arrowKeyListener);
    }

    render(){
        return (
            <div>
                {/*<button onClick={this.moveUp}>Right</button>*/}
                {/*<button onClick={this.moveDown}>Left</button>*/}
                {/*<button onClick={this.moveLeft}>Up</button>*/}
                {/*<button onClick={this.moveRight}>Down</button>*/}
            </div>
        );

    }
}

export default GridController;