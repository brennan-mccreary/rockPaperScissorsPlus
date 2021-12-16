"use strict";

//imports
const Game = require("./game"); 
const { promptValid } = require("./player")

//start call
let game = new Game(promptValid("Number of rounds: ", validateRounds));
game.setupGame();

//validation function
function validateRounds(input) {
    input = parseInt(input);
    if(input > 0 && isNaN(input) === false) {
        return true;
    }
    else {
        console.log("Number of rounds must be higher than 1");
        return false;
    }
}

//export
module.exports = {
    game,
}