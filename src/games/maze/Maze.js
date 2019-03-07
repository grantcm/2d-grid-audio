import React from "react";
import Player from "../../framework/Player";
import GridController from "../../framework/GridController";
import generateMaze from "./MazeGenerator";

class Maze extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            maxX: props.maxX,
            maxY: props.maxY,
            player: new Player({x: 0,y: 0}),
            mazeMap: generateMaze(props.maxX, props.maxY),
        };
    }

    updatePlayerPosition = (deltaX, deltaY) => {
        let playerPosition = this.state.player.getPlayerPosition();
        let newX = playerPosition.x + deltaX;
        let newY = playerPosition.y + deltaY;

        if (0 <= newX && newX < this.state.maxX && 0 <= newY && newY < this.state.maxY) {
            let currentCell = this.state.mazeMap[playerPosition.x][playerPosition.y];
            let possiblePaths = currentCell.getNeighbors();

            let validMove = possiblePaths.filter((cell) => {
                return cell.getX() === newX && cell.getY() === newY;
            });

            if(validMove.length === 0)
                return;

            let updatedPlayer = this.state.player.setPosition({x: newX, y: newY});
            this.setState({
                player: updatedPlayer,
            });
        }
    };

    getPlayerPosition = () => {
        return this.state.player.getPlayerPosition();
    };

    getPlayer = () => {
        return this.state.player;
    };

    generateGameBoard() {
        let boardRows = [];
        for(let i=0; i < this.state.maxY; i++){
            let boardRow = [];
            for(let j=0; j < this.state.maxX; j++) {
                let cell = this.state.mazeMap[j][i];
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
            </div>
        );
    }
}

export default Maze;