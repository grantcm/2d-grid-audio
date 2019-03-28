import React, { Component } from 'react';
import Player from './Player.js';
import GridAudioSprite from './GridAudioSprite.js';
import GridController from "./GridController";
import GridCell from "./GridCell";

import '../style/Grid.css';
import MazeCell from "../games/maze/MazeCell";


class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maxX: props.maxX,
            maxY: props.maxY,
            player: new Player({ x: 0, y: 0 }),
            grid: this.initializeGrid(props.maxX, props.maxY),
            gridSprites: this.props.spriteVals.map(elm => new GridAudioSprite(
                {
                    pos: elm.pos,
                    filename: elm.audioFile,
                    name: elm.name,
                    playerPositionCallback: this.getPlayerPosition,
                })),
        };

        this.addItemsToGrid();
    }

    /**
     * Creates a 2D array that represents the grid
     * @param x width
     * @param y height
     * @returns any[] 2D array object grid
     */
    initializeGrid = (x, y) => {
        let grid = new Array(x);

        for (let i = 0; i < x; i++) {
            grid[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                grid[i][j] = new GridCell(i, j);
            }
        }

        return grid;
    };

    setPlayerPosition = (pos) => {
        this.state.player.setPosition(pos, () => {
            this.state.gridSprites.forEach(sprite => sprite.updateAudioPos());
        });
    };

    /**
     * Updates the player position in the state and on the board
     * @param deltaX
     * @param deltaY
     */
    updatePlayerPosition = (deltaX, deltaY) => {
        let playerPosition = this.state.player.getPlayerPosition();
        let newX = playerPosition.x + deltaX;
        let newY = playerPosition.y + deltaY;

        if (0 <= newX && newX < this.state.maxX && 0 <= newY && newY < this.state.maxY) {
            let updatedPlayer = this.state.player.setPosition({ x: newX, y: newY });
            let updatedGrid = this.state.grid.map(function (arr) {
                return arr.slice();
            });

            updatedGrid[playerPosition.x][playerPosition.y].removeObject(this.state.player);
            updatedGrid[newX][newY].addObjects(updatedPlayer);

            this.setState({
                player: updatedPlayer,
                grid: updatedGrid,
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

    componentDidMount() {
        this.initAudio();
    }

    findMatchingSprites = (x, y) => {
        return this.state.grid[x][y].getObjects();
    };

    addItemsToGrid = () => {
        let playerPosition = this.state.player.getPlayerPosition();
        this.state.grid[playerPosition.x][playerPosition.y].addObjects(this.state.player);
        this.state.gridSprites.forEach(
            sprite =>
                this.state.grid[sprite.getSpriteX()][sprite.getSpriteY()].addObjects(sprite)
        );
    };

    doAction = () => {
        let playerPosition = this.state.player.getPlayerPosition();
        console.log(playerPosition);
        let currentSprites = this.findMatchingSprites(playerPosition.x, playerPosition.y);
        let grid = this.state.grid;
        let updatedGridSprites = this.state.gridSprites

        currentSprites.forEach(function (sprite) {
            if (sprite.getName() === "Crow") {
                grid[playerPosition.x][playerPosition.y].removeObject(sprite);
                sprite.componentWillUnmount();
                let index = updatedGridSprites.indexOf(sprite);
                updatedGridSprites = updatedGridSprites.splice(index, 1);
            }
        });
        this.setState({
            GridSprites: updatedGridSprites,
        });
    }

    generateGameBoard() {
        let boardRows = [];
        for (let i = 0; i < this.state.grid.length; i++) {
            let boardRow = [];

            for (let j = 0; j < this.state.grid[i].length; j++) {
                if (this.state.grid[i][j].objects.length !== 0) {
                    let objects = this.state.grid[i][j].objects;
                    if (objects.length === 1) {
                        boardRow.push(
                            <td>{objects[0].getName()}</td>
                        );
                    } else if (objects.length > 1) {
                        let content = objects.map(object => object.getName());
                        boardRow.push(
                            <td>{content.join("\n")}</td>
                        );
                    }
                } else {
                    boardRow.push(
                        <td />
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
                <GridController gridCallback={this.updatePlayerPosition} spaceBarCallback={this.doAction} />
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