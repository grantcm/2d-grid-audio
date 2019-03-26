class GridCell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.objects = [];
    }

    addObjects(objects) {
        this.objects = this.objects.concat(objects);
    }

    removeObject(object) {
        let index = this.objects.findIndex(item => {
           return object === item;
        });
        this.objects = this.objects.splice(0, index).concat(this.objects.splice(index+1));
    }
}

export default GridCell;