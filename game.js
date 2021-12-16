"use strict";
//imports
const { Rock, Paper, Scissors, Lizard, Spock } = require("./gestures");
const { Human, AI } = require("./player");
const { promptValid } = require("./player");
const ps = require("prompt-sync");

//declarations
const promptSync = ps();

//main class
class Game {
    constructor(rounds) {
        this.useAI;
        this.gestures = [new Rock, new Paper, new Scissors, new Lizard, new Spock]
        this.playerOne;
        this.playerTwo;
        this.rounds = rounds;
    }
    
    setupGame() { //run pre-game setup
        this.displayRules();

        this.useAI = this.determineAI();

        this.initiatePlayers(this.useAI);

        this.runGame(this.useAI);
    }
    
    runGame(useAI) {//run game
        while(this.playerOne.score < this.rounds && this.playerTwo.score < this.rounds) {
            if(useAI == true) {
                this.displayChoiceAndScore();
                let win = this.gestures[0].canBeat(this.playerOne.gestureChoice, this.playerTwo.gestureChoice)
                if(win === true) {
                    console.log(`${this.playerOne.name} wins!`);
                    this.playerOne.score ++;
                }
                else {
                    console.log(`${this.playerTwo.name} wins!`);
                    this.playerTwo.score ++;
                }
                // this.determineRoundWinnner(this.playerOne.gestureChoice, this.playerTwo.gestureChoice);
            }
            else {
                this.displayChoiceAndScore();
                let win = this.gestures[0].canBeat(this.playerOne.gestureChoice, this.playerTwo.gestureChoice)
                if(win === true) {
                    console.log(`${this.playerOne.name} wins!`);
                    this.playerOne.score ++;
                }
                else {
                    console.log(`${this.playerTwo.name} wins!`);
                    this.playerTwo.score ++;
                }
                // this.determineRoundWinnner(this.playerOne.gestureChoice, this.playerTwo.gestureChoice);
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
                        console.log(`${this.playerTwo.name} wins!`);
                        this.playerTwo.score ++;
                        break;
                    case "scissors" :
                        console.log("\nRock crushes scissors");
                        console.log(`${this.playerOne.name} wins!`);
                        this.playerOne.score ++;
                        break;
                    case "lizard" :
                        console.log("\nRock crushes lizard");
                        console.log(`${this.playerOne.name} wins!`);
                        this.playerOne.score ++;
                        break;
                    case "spock" :
                        console.log("\nSpock crushes rock");
                        console.log(`${this.playerTwo.name} wins!`);
                        this.playerTwo.score ++;
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            case "paper" : 
                switch(gestureTwo) {
                    case "rock" :
                        console.log("\nPaper covers rock");
                        console.log(`${this.playerOne.name} wins!`);
                        this.playerOne.score ++;
                        break;
                    case "scissors" :
                        console.log("\nScissors cut paper");
                        console.log(`${this.playerTwo.name} wins!`);
                        this.playerTwo.score ++;
                        break;
                    case "lizard" :
                        console.log("\nLizard eats paper");
                        console.log(`${this.playerTwo.name} wins!`);
                        this.playerTwo.score ++;
                        break;
                    case "spock" :
                        console.log("\nPaper disproves spock");
                        console.log(`${this.playerOne.name} wins!`);
                        this.playerOne.score ++;
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            case "scissors" : 
                switch(gestureTwo) {
                    case "rock" :
                        console.log("\nRock crushes scissors");
                        console.log(`${this.playerTwo.name} wins!`);
                        this.playerTwo.score ++;
                        break;
                    case "paper" :
                        console.log("\nScissors cut paper");
                        console.log(`${this.playerOne.name} wins!`);
                        this.playerOne.score ++;
                        break;
                    case "lizard" :
                        console.log("\nScissors decapitate lizard");
                        console.log(`${this.playerOne.name} wins!`);
                        this.playerOne.score ++;
                        break;
                    case "spock" :
                        console.log("\nSpock crushes scissors");
                        console.log(`${this.playerTwo.name} wins!`);
                        this.playerTwo.score ++;
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            case "lizard" : 
                switch(gestureTwo) {
                    case "rock" :
                        console.log("\nRock crushes lizard");
                        console.log(`${this.playerTwo.name} wins!`);
                        this.playerTwo.score ++;
                        break;
                    case "paper" :
                        console.log("\nLizard eats paper");
                        console.log(`${this.playerOne.name} wins!`);
                        this.playerOne.score ++;
                        break;
                    case "scissors" :
                        console.log("\nScissors decapitate lizard");
                        console.log(`${this.playerTwo.name} wins!`);
                        this.playerTwo.score ++;
                        break;
                    case "spock" :
                        console.log("\nLizard poisons spock");
                        console.log(`${this.playerOne.name} wins!`);
                        this.playerOne.score ++;
                        break;
                    default : console.log("\nIt was a draw!");
                }
                break;
            case "spock" : 
                switch(gestureTwo) {
                    case "rock" :
                        console.log("\nSpock crushes rock");
                        console.log(`${this.playerOne.name} wins!`);
                        this.playerOne.score ++;
                        break;
                    case "paper" :
                        console.log("\nPaper disproves spock");
                        console.log(`${this.playerTwo.name} wins!`);
                        this.playerTwo.score ++;
                        break;
                    case "scissors" :
                        console.log("\nSpock crushes scissors");
                        console.log(`${this.playerOne.name} wins!`);
                        this.playerOne.score ++;
                        break;
                    case "lizard" :
                        console.log("\nLizard poisons spock");
                        console.log(`${this.playerTwo.name} wins!`);
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
            console.log(`\n${this.playerOne.name}: ${this.playerOne.score}\n${this.playerTwo.name}: ${this.playerTwo.score}`);
            console.log(`\n${this.playerOne.name} wins the game!`);
          }
          else {
            console.log(`\n${this.playerOne.name}: ${this.playerOne.score}\n${this.playerTwo.name}: ${this.playerTwo.score}`);
            console.log(`\n${this.playerTwo.name} wins the game!`);
          }
    }

    displayChoiceAndScore() {
        console.log(`\n${this.playerOne.name}: ${this.playerOne.score}\n${this.playerTwo.name}: ${this.playerTwo.score}`);
    
                this.playerOne.gestureChoice = this.playerOne.chooseGesture(this.gestures);
                this.playerTwo.gestureChoice = this.playerTwo.chooseGesture(this.gestures);
                
                console.log(`\n${this.playerOne.name} chose: ${this.playerOne.gestureChoice}`);
                console.log(`\n${this.playerTwo.name} chose: ${this.playerTwo.gestureChoice}`);
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
            this.playerOne = new Human(promptSync("Enter your name: "));
            this.playerTwo = new AI("AI");
        }
        else {
            this.playerOne = new Human(promptSync("Player one enter your name: "));
            this.playerTwo = new Human(promptSync("Player two enter your name: "));
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
