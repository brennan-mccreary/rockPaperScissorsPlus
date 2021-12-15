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
        this.playerTwo;
    }
    
    setupGame() { //run game
        this.displayRules();

        this.useAI = this.determineAI();

        this.initiatePlayers(this.useAI);

        this.runGame(this.useAI);
    }
    
    runGame(useAI) {
        if(useAI == true) {
            console.log("Starting Game Against AI\n");

            this.playerOne.gestureChoice = this.playerOne.chooseGesture(this.gestures);
            console.log(`\nPlayer one (you) chose: ${this.playerOne.gestureChoice}`);

            this.playerTwo.gestureChoice = this.playerTwo.chooseGesture(this.gestures);
            console.log(`\nPlayer two (AI) chose: ${this.playerTwo.gestureChoice}`);

            this.determineRoundWinnner(this.playerOne.gestureChoice, this.playerTwo.gestureChoice);
        }
        else {
            console.log("Starting Game Against Player\n");
        }
    }

    determineRoundWinnner(gestureOne, gestureTwo) {
        switch(gestureOne) {
            case "rock" : 
                switch(gestureTwo) {
                    case "paper" :
                        console.log("\nPaper covers rock");
                        console.log("Player two wins!");
                        break;
                    case "scissors" :
                        console.log("\nRock crushes scissors");
                        console.log("Player one wins!");
                        break;
                    case "lizard" :
                        console.log("\nRock crushes lizard");
                        console.log("Player one wins!");
                        break;
                    case "spock" :
                        console.log("\nSpock crushes rock");
                        console.log("Player two wins!");
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            case "paper" : 
                switch(gestureTwo) {
                    case "rock" :
                        console.log("\nPaper covers rock");
                        console.log("Player one wins!");
                        break;
                    case "scissors" :
                        console.log("\nScissors cut paper");
                        console.log("Player two wins!");
                        break;
                    case "lizard" :
                        console.log("\nLizard eats paper");
                        console.log("Player two wins!");
                        break;
                    case "spock" :
                        console.log("\nPaper disproves spock");
                        console.log("Player one wins!");
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            case "scissors" : 
                switch(gestureTwo) {
                    case "rock" :
                        console.log("\nRock crushes scissors");
                        console.log("Player two wins!");
                        break;
                    case "paper" :
                        console.log("\nScissors cut paper");
                        console.log("Player one wins!");
                        break;
                    case "lizard" :
                        console.log("\nScissors decapitate lizard");
                        console.log("Player one wins!");
                        break;
                    case "spock" :
                        console.log("\nSpock crushes scissors");
                        console.log("Player two wins!");
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            case "lizard" : 
                switch(gestureTwo) {
                    case "rock" :
                        console.log("\nRock crushes lizard");
                        console.log("Player two wins!");
                        break;
                    case "paper" :
                        console.log("\nLizard eats paper");
                        console.log("Player one wins!");
                        break;
                    case "scissors" :
                        console.log("\nScissors decapitate lizard");
                        console.log("Player two wins!");
                        break;
                    case "spock" :
                        console.log("\nLizard poisons spock");
                        console.log("Player one wins!");
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            case "spock" : 
                switch(gestureTwo) {
                    case "rock" :
                        console.log("\nSpock crushes rock");
                        console.log("Player one wins!");
                        break;
                    case "paper" :
                        console.log("\nPaper disproves spock");
                        console.log("Player two wins!");
                        break;
                    case "scissors" :
                        console.log("\nSpock crushes scissors");
                        console.log("Player one wins!");
                        break;
                    case "lizard" :
                        console.log("\nLizard poisons spock");
                        console.log("Player two wins!");
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            default : console.log("Uncaught exception");
        }
    }
    
    determineAI() { //determine PvP or PvAI
        console.log("Enter 'multiplayer' to play with 2 players,\nor 'singleplayer' to play against AI");
        let choice = promptValid("--", validateAI);

        switch(choice.toLowerCase()) {
            case "multiplayer" : return false;
            case "singleplayer" : return true;
            default : console.log("Uncaught response");
        }
    }

    displayWinner() { //display the winner

    }

    displayRules() {
        console.log(`
        Game Rules:
        Rock crushes Scissors
        Scissors cuts Paper
        Paper covers Rock
        Rock crushes Lizard
        Lizard poisons Spock
        Spock smashes Scissors
        Scissors decapitates Lizard
        Lizard eats Paper
        Paper disproves Spock
        Spock vaporizes Rock
        
        `);
    }

    initiatePlayers(useAI) {
        if(useAI == true) {
            this.playerOne = new Human;
            this.playerTwo = new AI;
        }
        else {
            this.playerOne = new Human;
            this.playerTwo = new Human;
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

function validateAI(input) {
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
