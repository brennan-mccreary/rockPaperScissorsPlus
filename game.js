"use strict";
//imports
const { Player, Human, AI } = require("./player");
const ps = require("prompt-sync");

//declarations
const promptSync = ps();

//main class
class Game {
    constructor() {
        this.useAI;
        this.gestures = ["rock","paper","scissors","lizard","spock"]
        this.playerOne;
        this.PlayerTwo;
    }
    
    setupGame() { //run game
        this.displayRules();

        this.useAI = this.determineAI();

        this.initiatePlayers(this.useAI);

        this.runGame(this.useAI);
    }
    
    runGame(useAI) {

    }

    displayWinner() { //display the winner

    }

    determineAI() { //determine PvP or PvAI
        console.log("Enter 'multiplayer' to play with 2 players, or 'singleplayer' to play against AI");
        let choice = promptValid("--", playerCount);

        switch(choice.toLowerCase()) {
            case "multiplayer" : return false;
            case "singeplayer" : return true;
            default : console.log("Uncaught response");
        }
    }

    displayRules() {
        console.log(`
        Rock crushes Scissors
        Scissors cuts Paper
        Paper covers Rock
        Rock crushes Lizard
        Lizard poisons Spock
        Spock smashes Scissors
        Scissors decapitates Lizard
        Lizard eats Paper
        Paper disproves Spock
        Spock vaporizes Rock`);
    }

    initiatePlayers(useAI) {
        if(useAI = true) {
            this.playerOne = new Human;
            this.PlayerTwo = new AI;
        }
        else {
            this.playerOne = new Human;
            this.PlayerTwo = new Human;
        }
    }
}


//validation measures
function promptValid(question, valid) { //prompts for user input and validates against specific measures
    do{
      var response = promptSync(question).trim();
    } while(!response || !valid(response));
    return response;
}

function playerCount(input) {
    if(input.toLowerCase() === "multiplayer" || input.toLowerCase() === "singleplayer" ) {
        return true;
    }
    else {
        console.log("Invalid response.");
        return false;
    } 
}
//exports
module.exports = Game;
