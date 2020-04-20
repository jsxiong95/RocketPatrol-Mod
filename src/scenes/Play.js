class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprite
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight :32, startFrame: 0,
        endFrame: 9});
        this.load.image('back', './assets/back.png');
        this.load.image('rr', './assets/rr.png');
        this.load.image('part', './assets/part.png');
        this.load.image('border', './assets/border.png');
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'back').setOrigin(0, 0);

        // add rocket {p1}
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 
        'rocket').setScale(0.5, 0.5).setOrigin(0, 0);

        // add spaceship x3
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width , 260, 'spaceship', 0, 10).setOrigin(0, 0);
        this.ship04 = new Newship(this, game.config.width/2 , this.getRandomInt(120, 290), 'rr', 0, 35).setOrigin(0, 0);

        // define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.border = this.add.tileSprite(0, 0, 640, 480, 'border').setOrigin(0, 0);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // score
        this.p1Score = 0;
        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        // FIRE CONFIG
        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 70
        }
        this.scoreLeft = this.add.text(69, 60, this.p1Score, scoreConfig);
        // FIRE text
        this.fireText = this.add.text(290, 60, 'FIRE', fireConfig);
        // game over flag
        this.gameOver = false;
        // 60 second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {



        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        // scroll starfield
        this.starfield.tilePositionX -= .5;
        //this.starfield.tilePositionY -= 4;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03, this.ship03.x + 32, this.ship03.y + 16);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, this.ship02.x + 32, this.ship02.y + 16);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, this.ship01.x + 32, this.ship01.y + 16);
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04, this.ship04.x + 16, this.ship04.y + 16);
        }
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
           rocket.x + rocket.width > ship.x &&
           rocket.y < ship.y + ship.height &&
           rocket.height + rocket.y > ship.y) {
               return true;
           } else {
               return false;
           }
    }

    // Portion of the PARTICLE EMITTER code came from 
    // https://labs.phaser.io/edit.html?src=src\game%20objects\particle%20emitter\create%20emitter%20from%20config%202.js
    shipExplode(ship, shipx, shipy) {
        ship.alpha = 0; // temp hide ship
        // Particle Emitter CONFIG
        var particles = this.add.particles('part');
            var emitter = particles.createEmitter({
                x: shipx,
                y: shipy,
                speed: 400,
                lifespan: { min: 100, max: 200 },
                blendMode: 'ADD'
            });
            this.time.delayedCall(90, function() {
            particles.destroy();
        });
        ship.reset();
        ship.alpha = 1;
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }

    // get random int taken from 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }


    
    
}


