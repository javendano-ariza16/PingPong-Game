const SPEED = 0.008
export default class Paddle{
    constructor(paddleElem){

    this.paddleElem= paddleElem
    this.reset()
    }

    set position(value){
     this.paddleElem.style.setProperty("--position", value)   
    }

    get position(){
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"))    
    }

    reset(){
        this.position = 50
    }

    update(delta, ballHeight){
        this.position += SPEED * delta * (ballHeight - this.position) 
    }

    rect(){
        return this.paddleElem.getBoundingClientRect()
    }
}