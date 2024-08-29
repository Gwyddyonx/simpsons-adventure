class DirectionInput{
    constructor(){
        this.heldDirections = [];
        this.isPowerChange = false;

        this.map = {
            "ArrowUp":"up",
            "ArrowDown":"down",
            "ArrowLeft":"left",
            "ArrowRight":"right",
            "KeyW":"up",
            "KeyS":"down",
            "KeyA":"left",
            "KeyD":"right"
        }
    }

    getDirection(){
        return this.heldDirections[0];
    }

    getPowerChange(){
        if(this.isPowerChange){
            this.isPowerChange = false;
            return true;
        }else{
            return false;
        }
    }

    init(){
        document.addEventListener("keydown",e=>{
            if(e.code == "KeyE"){
                this.isPowerChange = true;
            }
            const dir = this.map[e.code];
            if(dir && this.heldDirections.indexOf(dir) === -1 ){
                this.heldDirections.unshift(dir);
            }
        });

        document.addEventListener("keyup",e=>{
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir);
            if(index>-1 ){
                console.log(this.heldDirections);
                this.heldDirections.splice(index,1);
            }
        });
    }
}