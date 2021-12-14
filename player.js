"use strict";
//imports


//main class
class Player {
    constructor() {
        this.gestureChoice;
    }
}

//sub classes
class Human extends Player {
    constructor() {
        super()
    }

    chooseGesture() {
        
    }
}

class AI extends Player {
    constructor() {
        super(this.gestureChoice)
    }

    chooseGesture(gestures) {
        let index = Math.floor((Math.random() * gestures.length));
        this.gestureChoice = gestures[index];
    }
}
//exports
module.exports = {
    Player,
    Human,
    AI
}
