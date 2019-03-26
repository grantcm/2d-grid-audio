class Cell {
    constructor(x, y){
        this.visited = false;
        this.x = x;
        this.y = y;
        this.neighbors = [];
        this.distanceFromEnd = 0;
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

    setDistanceFromStart(distance){
        this.distanceFromEnd = distance;
    }

    getDistanceFromStart(){
        return this.distanceFromEnd;
    }
}

export default Cell;