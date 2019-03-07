class GridComponent {
    constructor(props){
        this.state = {
            x: props.x,
            y: props.y,
            impassable: props.impassable,
        };
    }

    getComponentX = () => {
        return this.state.x;
    };

    getComponentY = () => {
        return this.state.y;
    };

    isImpassable = () => {
        return !!this.state.impassable;
    };

    toString(){
      if(this.isImpassable()){
          return "#";
      }else {
          return "";
      }
    }
}

export default GridComponent;