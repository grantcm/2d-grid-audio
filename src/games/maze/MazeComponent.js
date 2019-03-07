import React from "react";
import Player from "../../framework/Player";
import Maze from "./Maze";
import GridController from "../../framework/GridController";
import '../../style/Grid.css';
import Beep from "../../resources/beep.wav";
import MazeAudioSprite from "./MazeAudioSprite";


class MazeComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            player: new Player({x: 0,y: 0}),
            maze: new Maze({maxX: props.maxX, maxY: props.maxY}),
            audioSprites:  []
        };
    }

    updatePlayerPosition = (deltaX, deltaY) => {
        let playerPosition = this.state.player.getPlayerPosition();
        let newX = playerPosition.x + deltaX;
        let newY = playerPosition.y + deltaY;

        if (0 <= newX && newX < this.state.maze.getMaxX() && 0 <= newY && newY < this.state.maze.getMaxY()) {
            let currentCell = this.state.maze.getMazeMap()[playerPosition.x][playerPosition.y];
            let possiblePaths = currentCell.getNeighbors();

            let validMove = possiblePaths.filter((cell) => {
                return cell.getX() === newX && cell.getY() === newY;
            });

            if(validMove.length === 0)
                return;

            let updatedPlayer = this.state.player.setPosition({x: newX, y: newY});
            this.setState({
                player: updatedPlayer,
            },() => {
                this.state.audioSprites.forEach(sprite => sprite.update1DAudioPos());
            });
        }
    };

    getFinishCell = () => {
        return this.state.maze.getFinalCell();
    };

    getCurrentCell = () => {
        let currentPosition = this.getPlayerPosition();
        return this.state.maze.getCellAt(currentPosition.x, currentPosition.y);
    };

    getPlayerPosition = () => {
        return this.state.player.getPlayerPosition();
    };

    getPlayer = () => {
        return this.state.player;
    };

    generateGameBoard() {
        let boardRows = [];
        let finishCell = this.state.maze.getFinalCell();

        for(let i=0; i < this.state.maze.getMaxY(); i++){
            let boardRow = [];
            for(let j=0; j < this.state.maze.getMaxX(); j++) {
                let cell = this.state.maze.getMazeMap()[j][i];
                let cellNeighbors = cell.getNeighbors();
                let style = {};
                cellNeighbors.forEach(neighbor => {
                    let x = cell.getX();
                    let y = cell.getY();
                    if(x === neighbor.getX() - 1 && y === neighbor.getY()) {
                        style["borderRightStyle"] = "hidden";
                    } else if(x === neighbor.getX() + 1 && y === neighbor.getY()) {
                        style["borderLeftStyle"] = "hidden";
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
                } else if (finishCell.getX() === j && finishCell.getY() === i) {
                    boardRow.push(<td style={style}>Finish</td>);
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

    addGridSprite = (audioFile, name) => {
        let newSprite = new MazeAudioSprite({
            filename: audioFile,
            name: name,
            finalPositionCallback: this.getFinishCell,
            currentPositionCallback: this.getCurrentCell,
        });

        this.setState({
            audioSprites: this.state.audioSprites.concat(newSprite)
        }, this.initAudio);
    };

    getGridSprites = () => {
        return this.state.audioSprites;
    };

    initAudio = () => {
        this.state.audioSprites.forEach(sprite => sprite.play1DAudio());
    };

    componentDidMount(){
        this.addGridSprite(Beep, "Finish");
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
            </div>
        );
    }
}

export default MazeComponent;