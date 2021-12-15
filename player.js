"use strict";
//imports
const ps = require("prompt-sync");

//declarations
const promptSync = ps();


//main class
class Player {
    constructor() {
        this.gestureChoice;
        this.score = 0;
    }
}

//sub classes
class Human extends Player {
    constructor() {
        super();
    }

    chooseGesture() {
        console.log("Choose a gesture\n'Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'");
        return (promptValid("--", validateGesture)).toLowerCase();
    }
}

class AI extends Player {
    constructor() {
        super();
    }

    chooseGesture(gestures) {
        let index = Math.floor((Math.random() * gestures.length));
        return gestures[index];
    }
}


//validation measures
function promptValid(question, valid) { //prompts for user input and validates against specific measures
    do{
      var response = promptSync(question).trim();
    } while(!response || !valid(response));
    return response;
}

function validateGesture(input) {
    switch(input.toLowerCase()) {
        case "rock" : return true;
        case "paper" : return true;
        case "scissors" : return true;
        case "lizard" : return true;
        case "spock" : return true;
        default : console.log("Invalid Response."); return false;
    }
}

//exports
module.exports = {
    Player,
    Human,
    AI,
    promptValid
}
