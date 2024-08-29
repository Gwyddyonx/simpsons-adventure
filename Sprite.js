class Sprite {
    constructor(config) {

        //set images
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        //shadow
        this.useShadow = config.useShadow || false;
        if (this.useShadow) {
            this.shadow = new Image();
            this.shadow.src = "/images/characters/shadow.png";
            this.shadow.onload = () => {
                this.isShadowLoaded = true;
            }
        }

        //set animations
        this.animations = config.animations || {
            "idle-up": [
                [0, 1], [0, 1], [0, 1], [3, 1]
            ],
            "idle-down": [
                [0, 0], [0, 0], [0, 0], [1, 0], [0, 0], [0, 0], [0, 0], [1, 0], [0, 0], [0, 0], [0, 0], [2, 0]
            ],
            "idle-left": [
                [0, 3], [0, 3], [0, 3], [3, 3]
            ],
            "idle-right": [
                [0, 4], [0, 4], [0, 4], [3, 4]
            ],
            "walk-up": [
                [0, 1], [1, 1], [0, 1], [2, 1]
            ],
            "walk-down": [
                [0, 2], [1, 2], [0, 2], [2, 2]
            ],
            "walk-left": [
                [0, 3], [1, 3], [0, 3], [2, 3]
            ],
            "walk-right": [
                [0, 4], [1, 4], [0, 4], [2, 4]
            ]
            /*wallDown = [
                [0,0],[0,1],[0,2],[0,3]
            ]*/
        }
        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = config.currentAnimationFrame = 0;

        this.AnimationFrameLimit = config.AnimationFrameLimit || 32;
        this.AnimationFrameProgress = this.AnimationFrameLimit;

        //this.animationFrameLimit = 16;

        //reference
        this.GameObject = config.GameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.AnimationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        if (this.AnimationFrameProgress > 0) {
            this.AnimationFrameProgress -= 1;
            return
        }

        this.AnimationFrameProgress = this.AnimationFrameLimit
        this.currentAnimationFrame += 1;

        if (this.frame === undefined)
            this.currentAnimationFrame = 0;
    }

    draw(ctx, cameraPerson) {

        const x = this.GameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
        const y = this.GameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;

        //console.log(x,y);

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX * 32, frameY * 32,
            32, 32,
            x, y,
            32, 32);
        this.isShadowLoaded && ctx.drawImage(this.shadow,
            0, 0,
            32, 32,
            x, y,
            32, 32);

        this.updateAnimationProgress();
    }


}