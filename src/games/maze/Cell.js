class Cell {
    constructor(x, y){
        this.visited = false;
        this.x = x;
        this.y = y;
        this.neighbors = [];
    }

    addNeighbor(neighbor){
        this.neighbors.push(neighbor);
    }

    hasNeighbor(neighbor){
        return this.neighbors.find(neighbor);
    }

    getNeighbors(){
        return this.neighbors;
    }

    isVisited(){
        return this.visited;
    }

    visit(){
        this.visited = true;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}

export default Cell;