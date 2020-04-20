// Josepheng Xiong 
// Rocket Patrol Mod
// MOD LIST
// Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25) 
// Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (25)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (25)
// Allow the player to control the Rocket after it's fired (10)
// Implement the 'FIRE' UI text from the original game (10)
// Create a new title screen (15)
// Replace the UI borders with new artwork (15)



let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
};

let game = new Phaser.Game(config);

//define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}

// reserve some keyboard var
let keyF, keyLEFT, keyRIGHT;