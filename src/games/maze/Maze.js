import React from "react";
import Grid from "../../framework/Grid";
import GridComponent from "../../framework/GridComponent";
import Player from "../../framework/Player";
import GridSprite from "../../framework/GridSprite";
import GridController from "../../framework/GridController";
import generateMaze from "./MazeGenerator";

class Maze extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            maxX: props.maxX,
            maxY: props.maxY,
            player: new Player({x: 0,y: 0}),
            gridSprites: props.spriteVals.map(elm => new GridSprite(
                {
                    pos: elm.pos,
                    filename: elm.audioFile,
                    name: elm.name,
                    playerPositionCallback: this.getPlayerPosition,
                })),
            mazeMap: generateMaze(props.maxX, props.maxY),
        };
    }

    loadMaze = (maxX, maxY, spriteElms) => {

        let maze = generateMaze(maxX, maxY);

        for(let i = 0; i < maxX; i++) {
            for(let j = 0; j < maxY; j++) {
                let barrier = Math.floor(Math.random() * 100);
                if(spriteElms.map(elm => elm.pos !== {x: j, y: i}) && barrier < 30){
                    maze[j][i] = new GridComponent({x: j, y: i, impassable: true});
                } else {
                    maze[j][i] = new GridComponent({x: j, y: i, impassable: false});
                }
            }
        }

        return maze;
    };

    updatePlayerPosition = (deltaX, deltaY) => {
        let playerPosition = this.state.player.getPlayerPosition();
        let newX = playerPosition.x + deltaX;
        let newY = playerPosition.y + deltaY;

        if (0 <= newX && newX < this.state.maxX && 0 <= newY && newY < this.state.maxY) {
            if (this.state.mazeMap[newX][newY].isImpassable())
                return;
            let updatedPlayer = this.state.player.setPosition({x: newX, y: newY});
            this.setState({
                player: updatedPlayer,
            }, () => {
                this.state.gridSprites.forEach(sprite => sprite.updateAudioPos());
            });
        }
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
                let cell = this.state.mazeMap[j][i];
                let cellNeighbors = cell.getNeighbors();
                let style = {};
                cellNeighbors.forEach(neighbor => {
                    let x = cell.getX();
                    let y = cell.getY();
                    if(x === neighbor.getX() - 1 && y === neighbor.getY()) {
                        style["borderLeftStyle"] = "hidden";
                    } else if(x === neighbor.getX() + 1 && y === neighbor.getY()) {
                        style["borderRightStyle"] = "hidden";
                    } else if(x === neighbor.getX() && y === neighbor.getY() - 1) {
                        style["borderBottomStyle"] = "hidden";
                    } else if(x === neighbor.getX() && y === neighbor.getY() + 1) {
                        style["borderTopStyle"] = "hidden";
                    }
                });
                
                if (j === this.state.player.getComponentX() && i === this.state.player.getComponentY()){
                    boardRow.push(
                        <td style={style}>Player</td>
                    );
                } else if (this.findMatchingSprite(j, i)) {
                    boardRow.push(
                        <td style={style}>{this.findMatchingSprite(j, i).getName()}</td>
                    );
                } else {
                    boardRow.push(<td style={style}/>);
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

export default Maze;