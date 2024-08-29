class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            GameObject: this,
            src: config.src || "/images/characters/gwy.png",
            useShadow: config.useShadow
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);

        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10)
    }

    update() {

    }

    async doBehaviorEvent(map) {

        if(map.isCutscenePlaying || this.behaviorLoop.length === 0){
            return
        }

        console.log('this.behaviorLoop',this.behaviorLoopIndex,this.behaviorLoop)

        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]
        eventConfig.who = this.id

        console.log('eventConfig',eventConfig)
        
        const eventHandler = new OverworldEvent({ map, event: eventConfig })
        
        await eventHandler.init()
        
        this.behaviorLoopIndex += 1;
        console.log('ahhh')

        
        console.log(this.behaviorLoopIndex,this.behaviorLoop.length)
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0
        }
        console.log('new doBehaviorEvent')
        this.doBehaviorEvent(map)

    }
}