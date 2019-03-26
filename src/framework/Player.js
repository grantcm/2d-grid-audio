import GridComponent from "./GridComponent";

class Player extends GridComponent{
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
        }
    }

    setPosition = (pos) => {
        return new Player(pos);
    };

    getPlayerPosition = () => {
      return {
          x : this.state.x,
          y : this.state.y,
      }
    };

    getName(){
        return "Player";
    }

    toString(){
        return `Player : (${this.state.x}, ${this.state.y})`;
    }
}

export default Player;