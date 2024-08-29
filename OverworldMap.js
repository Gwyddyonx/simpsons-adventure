class OverworldMap {
    constructor(config) {
        this.config = config;
        this.gameObjects = config.gameObjects;

        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerImage + ".png";

        this.upperImage = new Image();
        this.upperImage.src = config.upperImage + ".png";

        this.hubImage = new Image();
        this.hubImage.src = config.hub + ".png";

        this.isCutscenePlaying = false


    }

    drawLowerMap(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperMap(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
        ctx.drawImage(this.hubImage, 0, 0);
    }

    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObject() {
        Object.keys(this.gameObjects).forEach(key => {
            let object = this.gameObjects[key];

            object.id = key;

            object.mount(this);
            console.log('mountObjects', object)
        })
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x},${y}`];
    }
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const { x, y } = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
    }

}

window.OverworldMap = {
    Room: {
        lowerImage: "/images/maps/homer-room",
        upperImage: "/images/maps/homer-room-upper",
        hub: "/images/maps/hub",
        gameObjects: {
            hero: new Person({
                x: utils.withGrid(6),
                y: utils.withGrid(6),
                src: "/images/characters/gwy.png",
                useShadow: true,
                isPlayerControlled: true
            }),
            jack: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(4),
                src: "/images/characters/jack.png",
                useShadow: true
            }),
            /*npc1: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(3),
                src: "/images/characters/gwy-dark.png",///images/characters/people/npc2.png
                useShadow: true,
                behaviorLoop: [
                    { type: 'walk', direction: "left" },
                    { type: 'walk', direction: "left" },
                    { type: 'walk', direction: "left" },
                    { type: 'stand', direction: "down", time: 1000 },
                    { type: 'walk', direction: "right" },
                    { type: 'walk', direction: "right" },
                    { type: 'walk', direction: "right" },
                    { type: 'stand', direction: "down", time: 1000 },

                ]
            }),*/
        },
        walls: {
            [utils.asGridCoord(11, 3)]: true,
            [utils.asGridCoord(12, 4)]: true,
            [utils.asGridCoord(12, 5)]: true,
            [utils.asGridCoord(13, 6)]: true,
            [utils.asGridCoord(4, 8)]: true,
            [utils.asGridCoord(4, 9)]: true,
            [utils.asGridCoord(5, 9)]: true,
            //[utils.asGridCoord(4,8)] : true,
            //wall left
            [utils.asGridCoord(3, 2)]: true,
            [utils.asGridCoord(3, 3)]: true,
            [utils.asGridCoord(3, 4)]: true,
            [utils.asGridCoord(3, 5)]: true,
            [utils.asGridCoord(3, 6)]: true,
            [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(3, 8)]: true,
            [utils.asGridCoord(3, 9)]: true,
            //wall down
            [utils.asGridCoord(4, 10)]: true,
            [utils.asGridCoord(5, 10)]: true,
            [utils.asGridCoord(6, 10)]: true,
            [utils.asGridCoord(7, 10)]: true,
            [utils.asGridCoord(8, 10)]: true,
            [utils.asGridCoord(9, 10)]: true,
            [utils.asGridCoord(10, 10)]: true,
            [utils.asGridCoord(11, 10)]: true,
            [utils.asGridCoord(12, 10)]: true,
            [utils.asGridCoord(13, 10)]: true,
            [utils.asGridCoord(14, 10)]: true,
            //wall right
            [utils.asGridCoord(14, 2)]: true,
            [utils.asGridCoord(14, 3)]: true,
            [utils.asGridCoord(14, 4)]: true,
            [utils.asGridCoord(14, 5)]: true,
            [utils.asGridCoord(14, 6)]: true,
            [utils.asGridCoord(14, 7)]: true,
            [utils.asGridCoord(14, 8)]: true,
            [utils.asGridCoord(15, 9)]: true,
            //wall up
            [utils.asGridCoord(4, 2)]: true,
            [utils.asGridCoord(5, 2)]: true,
            [utils.asGridCoord(6, 2)]: true,
            [utils.asGridCoord(7, 2)]: true,
            [utils.asGridCoord(8, 2)]: true,
            [utils.asGridCoord(9, 2)]: true,
            [utils.asGridCoord(10, 2)]: true,
            [utils.asGridCoord(11, 2)]: true,
            [utils.asGridCoord(12, 2)]: true,
            [utils.asGridCoord(13, 2)]: true,
            [utils.asGridCoord(14, 2)]: true,

        }
    },
    Kitchen: {
        lowerImage: "/images/maps/KitchenLower.png",
        upperImage: "/images/maps/KitchenUpper.png",
        gameObjects: {
            npc3: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(5),
                src: "/images/characters/gwy_v2.png",
                useShadow: true,
                isPlayerControlled: true
            }),
            npc4: new Person({
                x: utils.withGrid(4),
                y: utils.withGrid(8),
                src: "/images/characters/people/npc3.png",
                useShadow: true
            })
        }
    }
}