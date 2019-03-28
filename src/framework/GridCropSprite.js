

class GridCropSprite extends GridAudioSprite {
    constructor(props) {
        super(props);
        this.state = {
            playerPositionCallback: props.playerPositionCallback,
            x: props.pos.x,
            y: props.pos.y,
            audio: new Howl({
                src: [props.filename],
                loop: false,
            }),
            name: props.name,
            uuid: uuidv4(),
        }
    }
}