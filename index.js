"use strict";

//imports
const Game = require("./game"); 
const { Player } = require("./player");
const ps = require("prompt-sync");

//declarations
const promptSync = ps();

//start call
let game = new Game();
game.determineAI();













//validation measures
function promptValid(question, valid) { //prompts for user input and validates against specific measures
    do{
      var response = promptSync(question).trim();
    } while(!response || !valid(response));
    return response;
}
