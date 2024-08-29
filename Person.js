class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1]
        }

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1]
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {
            if (state.arrow && this.isPlayerControlled) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite();
        }
    }

    startBehavior(state, behavior) {
        this.direction = behavior.direction;
        if (behavior.type === "walk") {
            //stop if walk
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                console.log('returning??')
                return;
            }

            //for not wall in fist wall
            state.map.moveWall(this.x, this.y, this.direction);

            //if it's walk, then, new movement with 16
            this.movingProgressRemaining = 16;
            this.updateSprite();
        }

        if (behavior.type === "stand") {
            setTimeout(()=>{
                utils.emitEvent('PersonStandComplete',{
                    whoId: this.id
                })
            }, behavior.time)
        }

    }

    updatePosition() {
        //console.log(this.movingProgressRemaining);

        const [property, change] = this.directionUpdate[this.direction];
        //console.log("propiedad"+property+":"+change);
        this[property] += (change / 2);
        this.movingProgressRemaining -= 0.5;

        console.log("this.movingProgressRemaning;",this.movingProgressRemaining )

        if (this.movingProgressRemaining == 0) {
            console.log('PersonWalkingComplete')
            utils.emitEvent('PersonWalkingComplete', {
                whoId: this.id
            })
        }

    }

    updateSprite() {

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction);

    }

}