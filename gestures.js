"use strict";
const { Human, AI } = require("./player");
const Game = require("./game"); 


//Parent class
class Gestures {
    constructor() {

    }

    canBeat(choiceOne, choiceTwo) {
        let beatBy = this.canBeatList(choiceOne);

        if(beatBy.includes(choiceTwo) === true) {
            console.log(`\n${choiceTwo} beats ${choiceOne}`);
            return false;
        }
        else {
            console.log(`\n${choiceOne} beats ${choiceTwo}`);
            return true;
        }
    }
    
    canBeatList(choice) {
        let beatBy = [];
        switch(choice) {
            case "rock" :
                beatBy = ["paper", "spock"]
                return beatBy;
            case "paper" :
                beatBy = ["scissors", "lizard"]
                return beatBy;
            case "scissors" : 
                beatBy = ["spock", "rock"]
                return beatBy;
            case "lizard" :
                beatBy = ["scissors", "rock"]
                return beatBy;
            case "spock" :
                beatBy = ["paper", "lizard"]
                return beatBy;
            default : break;
        }
    }
}

//sub classes
class Rock extends Gestures {
    constructor() {
        super();
        this.name = "rock"
    }
}

class Paper extends Gestures {
    constructor() {
        super();
        this.name = "paper"
    }
}

class Scissors extends Gestures {
    constructor() {
        super();
        this.name = "scissors"
    }
}

class Lizard extends Gestures {
    constructor() {
        super();
        this.name = "lizard"
    }
}

class Spock extends Gestures {
    constructor() {
        super();
        this.name = "spock"
    }
}

//export
module.exports = {
    Rock,
    Paper,
    Scissors,
    Lizard,
    Spock
}