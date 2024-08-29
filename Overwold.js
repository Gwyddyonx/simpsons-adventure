class Overworld {

    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
        //music
        this.sfx = {
            backgroundMusic: new Howl({
                src: 'assets/background.mp3',
                loop: true
            })
        }
    }

    startGameLoop() {
        const step = () => {
            //clean map
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //static camera person
            const cameraPerson = this.map.gameObjects.hero;

            //game objects here
            Object.values(this.map.gameObjects).forEach(object => {
                //if (this.map.gameObjects.hero == object) {
                    object.update({
                        arrow: this.directionInput.getDirection(),
                        map: this.map
                    });
                //}

            })

            //lower map
            this.map.drawLowerMap(this.ctx, cameraPerson);

            Object.values(this.map.gameObjects).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })

            //upper map
            this.map.drawUpperMap(this.ctx, cameraPerson);

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init() {
        console.log("hello from Overworld", this);
        this.map = new OverworldMap(window.OverworldMap.Room);
        this.map.mountObject();
        console.log("map", this.map);
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();

        console.log("sfx.play")
        this.sfx.backgroundMusic.play();
        this.sfx.backgroundMusic.volume(0.4);

    }

}