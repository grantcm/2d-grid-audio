/**
 * Generates a x by y maze using a depth first search algorithm implemented with a recursive backtracker
 * @param x - max dimension x
 * @param y - max dimension y
 * @returns 2d Array of cells with neighbors
 */
import Cell from "./Cell";

function generateMaze(x, y){
    let maze = new Array(x);
    for (let i = 0; i < x; i++) {
        maze[i] = new Array(y);
        for (let j = 0; j < y; j++) {
            maze[i][j] = new Cell(i, j);
        }
    }

    let backtraceStack = [];
    let current = maze[0][0];
    current.visit();
    let unvisitedCells = x * y - 1;

    while(unvisitedCells > 0) {
        let unvisitedNeighbors = getUnvisitedNeighbors(current, maze);
        if (unvisitedNeighbors.length > 0) {
            let index = Math.floor(Math.random() * unvisitedNeighbors.length);
            let neighbor = unvisitedNeighbors[index];

            backtraceStack.push(current);
            current.addNeighbor(neighbor);
            neighbor.addNeighbor(current);
            neighbor.setDistanceFromStart(current.getDistanceFromStart() + 1);
            current = neighbor;
            current.visit();
            unvisitedCells--;
        } else if (backtraceStack.length > 0){
            current = backtraceStack.pop();
        }
    }

    return maze;
}

function getUnvisitedNeighbors(current, maze) {
    let x = current.getX(), y = current.getY();
    let unvisited = [];

    if (x - 1 >= 0 && !maze[x-1][y].isVisited())
        unvisited.push(maze[x-1][y]);

    if (y - 1 >= 0 && !maze[x][y-1].isVisited())
        unvisited.push(maze[x][y-1]);

    if (x + 1 < maze.length && !maze[x + 1][y].isVisited())
        unvisited.push(maze[x + 1][y]);

    if (y + 1 < maze[x].length && !maze[x][y + 1].isVisited())
        unvisited.push(maze[x][y + 1]);

    return unvisited;
}

export default generateMaze;