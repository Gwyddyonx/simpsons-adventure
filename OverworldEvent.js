class OverworldEvent {
    constructor({map, event}) {
        this.map = map
        this.event = event
        console.log("OverworldEvent constr", this.map, this.event)
        console.log('this.event2', this.event)

    }

    stand(resolve) {
        const who = this.map.gameObjects[this.event.who]
        who.startBehavior({
            map: this.map
        }, {
            type: 'stand',
            direction: this.event.direction,
            time: this.event.time
        })
        console.log('before e:')

        const completeHandler = e => {
            console.log('e:',e,this.event)
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener('PersonStandComplete', completeHandler)
                resolve()
            }
        }

        document.addEventListener('PersonStandComplete', completeHandler)
    
    }

    walk(resolve) {
        const who = this.map.gameObjects[this.event.who]
        who.startBehavior({
            map: this.map
        }, {
            type: 'walk',
            direction: this.event.direction
        })
        console.log('before e:')

        const completeHandler = e => {
            console.log('e:',e,this.event)
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener('PersonWalkingComplete', completeHandler)
                resolve()
            }
        }

        document.addEventListener('PersonWalkingComplete', completeHandler)
    }

    init() {

        return new Promise(resolve => {
            console.log('this.eventt', this.event)
            this[this.event.type](resolve)
        })
    }
}