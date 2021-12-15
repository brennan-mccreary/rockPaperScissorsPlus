"use strict";
//imports
const { Player, Human, AI } = require("./player");
const { promptValid } = require("./player");
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
    
    setupGame() { //run pre-game setup
        this.displayRules();

        this.useAI = this.determineAI();

        this.initiatePlayers(this.useAI);

        this.runGame(this.useAI);
    }
    
    runGame(useAI) {//run game
        while(this.playerOne.score < 3 && this.playerTwo.score < 3) {
            if(useAI == true) {
                console.log(`\nPlayer One: ${this.playerOne.score}\nPlayer Two: ${this.playerTwo.score}`);
    
                this.playerOne.gestureChoice = this.playerOne.chooseGesture(this.gestures);
                console.log(`\nPlayer one (you) chose: ${this.playerOne.gestureChoice}`);
    
                this.playerTwo.gestureChoice = this.playerTwo.chooseGesture(this.gestures);
                console.log(`\nPlayer two (AI) chose: ${this.playerTwo.gestureChoice}`);
    
                this.determineRoundWinnner(this.playerOne.gestureChoice, this.playerTwo.gestureChoice);
            }
            else {
                console.log(`\nPlayer One: ${this.playerOne.score}\nPlayer Two: ${this.playerTwo.score}`);
    
                this.playerOne.gestureChoice = this.playerOne.chooseGesture(this.gestures);
                this.playerTwo.gestureChoice = this.playerTwo.chooseGesture(this.gestures);
                
                console.log(`\nPlayer one chose: ${this.playerOne.gestureChoice}`);
                console.log(`\nPlayer two chose: ${this.playerTwo.gestureChoice}`);
    
                this.determineRoundWinnner(this.playerOne.gestureChoice, this.playerTwo.gestureChoice);
            }
        }
        
        this.displayWinner(this.playerOne.score, this.playerTwo.score);
    }

    determineRoundWinnner(gestureOne, gestureTwo) {//apply game rules and determine round winner
        switch(gestureOne) {
            case "rock" : 
                switch(gestureTwo) {
                    case "paper" :
                        console.log("\nPaper covers rock");
                        console.log("Player two wins!");
                        this.playerTwo.score ++;
                        break;
                    case "scissors" :
                        console.log("\nRock crushes scissors");
                        console.log("Player one wins!");
                        this.playerOne.score ++;
                        break;
                    case "lizard" :
                        console.log("\nRock crushes lizard");
                        console.log("Player one wins!");
                        this.playerOne.score ++;
                        break;
                    case "spock" :
                        console.log("\nSpock crushes rock");
                        console.log("Player two wins!");
                        this.playerTwo.score ++;
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            case "paper" : 
                switch(gestureTwo) {
                    case "rock" :
                        console.log("\nPaper covers rock");
                        console.log("Player one wins!");
                        this.playerOne.score ++;
                        break;
                    case "scissors" :
                        console.log("\nScissors cut paper");
                        console.log("Player two wins!");
                        this.playerTwo.score ++;
                        break;
                    case "lizard" :
                        console.log("\nLizard eats paper");
                        console.log("Player two wins!");
                        this.playerTwo.score ++;
                        break;
                    case "spock" :
                        console.log("\nPaper disproves spock");
                        console.log("Player one wins!");
                        this.playerOne.score ++;
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            case "scissors" : 
                switch(gestureTwo) {
                    case "rock" :
                        console.log("\nRock crushes scissors");
                        console.log("Player two wins!");
                        this.playerTwo.score ++;
                        break;
                    case "paper" :
                        console.log("\nScissors cut paper");
                        console.log("Player one wins!");
                        this.playerOne.score ++;
                        break;
                    case "lizard" :
                        console.log("\nScissors decapitate lizard");
                        console.log("Player one wins!");
                        this.playerOne.score ++;
                        break;
                    case "spock" :
                        console.log("\nSpock crushes scissors");
                        console.log("Player two wins!");
                        this.playerTwo.score ++;
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            case "lizard" : 
                switch(gestureTwo) {
                    case "rock" :
                        console.log("\nRock crushes lizard");
                        console.log("Player two wins!");
                        this.playerTwo.score ++;
                        break;
                    case "paper" :
                        console.log("\nLizard eats paper");
                        console.log("Player one wins!");
                        this.playerOne.score ++;
                        break;
                    case "scissors" :
                        console.log("\nScissors decapitate lizard");
                        console.log("Player two wins!");
                        this.playerTwo.score ++;
                        break;
                    case "spock" :
                        console.log("\nLizard poisons spock");
                        console.log("Player one wins!");
                        this.playerOne.score ++;
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            case "spock" : 
                switch(gestureTwo) {
                    case "rock" :
                        console.log("\nSpock crushes rock");
                        console.log("Player one wins!");
                        this.playerOne.score ++;
                        break;
                    case "paper" :
                        console.log("\nPaper disproves spock");
                        console.log("Player two wins!");
                        this.playerTwo.score ++;
                        break;
                    case "scissors" :
                        console.log("\nSpock crushes scissors");
                        console.log("Player one wins!");
                        this.playerOne.score ++;
                        break;
                    case "lizard" :
                        console.log("\nLizard poisons spock");
                        console.log("Player two wins!");
                        this.playerTwo.score ++;
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            default : console.log("Uncaught exception");
        }
    }
    
    determineAI() { //determine PvP or PvAI
        console.log("Enter 'multiplayer' to play with 2 players,\nor 'singleplayer' to play against AI");
        let choice = promptValid("--", this.validateAI);

        switch(choice.toLowerCase()) {
            case "multiplayer" : return false;
            case "singleplayer" : return true;
            default : console.log("Uncaught response");
        }
    }

    displayWinner(scoreOne, scoreTwo) { //display the winner
        if(scoreOne > scoreTwo) {
            console.log(`\nPlayer One: ${this.playerOne.score}\nPlayer Two: ${this.playerTwo.score}`);
            console.log(`\nPlayer one wins the game!`);
          }
          else {
            console.log(`\nPlayer One: ${this.playerOne.score}\nPlayer Two: ${this.playerTwo.score}`);
            console.log(`\nPlayer two wins the game!`);
          }
    }

    displayRules() {//displays rule list
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

    initiatePlayers(useAI) {//defines players based on AI use case
        if(useAI == true) {
            this.playerOne = new Human;
            this.playerTwo = new AI;
        }
        else {
            this.playerOne = new Human;
            this.playerTwo = new Human;
        }
    }

    validateAI(input) { //validation function
        if(input.toLowerCase() === "multiplayer" || input.toLowerCase() === "singleplayer" ) {
            return true;
        }
        else {
            console.log("Invalid response.");
            return false;
        } 
    }
}

//exports
module.exports = Game;
