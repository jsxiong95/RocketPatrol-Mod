// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this); // add obj to existing scene, displayList, updateList
        // store point values
        this.points = pointValue;
        
    }

    //var place = 0;
    //let place = this.getRandomInt(1, 2);
    update() {
          
        // move spaceship left
        this.x -= game.settings.spaceshipSpeed;
        //this.x -= game.settings.spaceshipSpeed;
        // wraparound screen bounds
        if(this.x <= 0 - this.width) {
            this.reset();
        } else if (this.x >= 833){
            this.secReset();
        }
    }
    reset() {
        this.x = game.config.width + 50;
    }


}