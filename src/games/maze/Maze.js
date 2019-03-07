import React from "react";
import generateMaze from "./MazeGenerator";

class Maze {
    constructor(props){
        this.maxX = props.maxX;
        this.maxY = props.maxY;
        this.mazeMap = generateMaze(props.maxX, props.maxY);
        this.finalCell = null;
    }

    getLongestPath = () => {
        let cell = this.mazeMap[0][0];
        for(let i =0; i < this.mazeMap.length; i++) {
            for(let j = 0; j < this.mazeMap[i].length; j++) {
                if(this.mazeMap[i][j].getDistanceFromStart() > cell.getDistanceFromStart()) {
                    cell = this.mazeMap[i][j];
                }
            }
        }

        return cell;
    };

    getFinalCell = () => {
        if(this.finalCell === null)
            this.finalCell = this.getLongestPath();
        return this.finalCell;
    };

    getCellAt = (x, y) => {
        return this.mazeMap[x][y];
    };

    getMazeMap(){
        return this.mazeMap;
    }

    getMaxX(){
        return this.maxX;
    }

    getMaxY(){
        return this.maxY;
    }
}

export default Maze;