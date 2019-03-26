import generateMaze from "./MazeGenerator";

class Maze {
    constructor(props){
        this.maxX = props.maxX;
        this.maxY = props.maxY;
        this.mazeMap = generateMaze(props.maxX, props.maxY);
        this.finalCell = null;
        this.startCell = null;
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


    /**
     * Final cell will always be the top left corner
     * @returns Cell at top left corner
     */
    getFinalCell = () => {
        if(this.finalCell === null)
            this.finalCell = this.mazeMap[0][0];
        return this.finalCell;
    };

    /**
     * Returns the cell that is furthest away from the finish point
     * @returns Starting Cell
     */
    getStartCell = () => {
        if(this.startCell === null)
            this.startCell = this.getLongestPath();
        return this.startCell;
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