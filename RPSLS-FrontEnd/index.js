"use strict";


//index ----------------------------------------
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

//Game classes ----------------------------------------
//Parent class
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

        this.runGame();
    }
    
    runGame() {//run game
        while(this.playerOne.score < this.rounds && this.playerTwo.score < this.rounds) {
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
        }
        
        this.displayWinner(this.playerOne.score, this.playerTwo.score);
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
            this.playerOne = new Human(prompt("Enter your name: "));
            this.playerTwo = new AI("AI");
        }
        else {
            this.playerOne = new Human(prompt("Player one enter your name: "));
            this.playerTwo = new Human(prompt("Player two enter your name: "));
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


//Player classes ----------------------------------------
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
      var response = prompt(question).trim();
    } while(!response || !valid(response));
    return response;
}


//Gesture classes ----------------------------------------
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