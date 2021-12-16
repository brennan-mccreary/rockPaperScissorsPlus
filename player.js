"use strict";
//imports
const ps = require("prompt-sync");

//declarations
const promptSync = ps();


//main class
class Player {
    constructor(name) {
        this.name = name;
        this.gestureChoice;
        this.score = 0;
    } 
}

//sub classes
class Human extends Player {
    constructor(name) {
        super(name);
    }

    chooseGesture() {//prompts user for gesture input
        console.log("Choose a gesture\n'Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'");
        return (promptValid("--", this.validateGesture)).toLowerCase();
    }

    validateGesture(input) { //validation function
        switch(input.toLowerCase()) {
            case "rock" : return true;
            case "paper" : return true;
            case "scissors" : return true;
            case "lizard" : return true;
            case "spock" : return true;
            default : console.log("Invalid Response."); return false;
        }
    }
}

class AI extends Player {
    constructor(name) {
        super(name);
    }

    chooseGesture(gestures) {//randomly selects gesture from list
        let index = Math.floor((Math.random() * gestures.length));
        return gestures[index].name;
    }
}


//validation measure
function promptValid(question, valid) { //prompts for user input and validates against specific measures
    do{
      var response = promptSync(question).trim();
    } while(!response || !valid(response));
    return response;
}

//exports
module.exports = {
    Player,
    Human,
    AI,
    promptValid
}
