class Play extends Phaser.Scene{
    constructor(){
        super("playScene");

    }

    preload(){
        this.load.image('starfield','assets/starfield.png');
        this.load.image('rocket','assets/BasicShip.png');
    }

    create(){
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height-borderUISize-boarderPadding, 'rocket');
        //this.add.existing(this.p1Rocket);

        this.add.rectangle(0, borderUISize+boarderPadding, game.config.width, borderUISize*2, 0x00FF00).setOrigin(0,0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


    }
    update(){
        this.starfield.tilePositionX -= 4; //this lets the background scroll (could also be done with the y)
        this.p1Rocket.update();
    }

}