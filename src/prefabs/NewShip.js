// Rocket prefab
class Newship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this); // add obj to existing scene, displayList, updateList
        // store point values
        this.points = pointValue;
    }

    update() {
        // move spaceship left
        this.x -= 8;
        // wraparound screen bounds
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }
    reset() {
        this.x = game.config.width + 100;
    }
}