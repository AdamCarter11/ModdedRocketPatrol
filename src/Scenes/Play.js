class Play extends Phaser.Scene{
    constructor(){
        super("playScene");

    }

    preload(){
        this.load.image('starfield','./assets/starfield.png');
        this.load.image('rocket','./assets/BasicShip.png');
        this.load.image('enemy','./assets/BasicEnemy.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 7});
    }

    create(){
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height-borderUISize-boarderPadding, 'rocket');
        
        this.ship01 = new SpaceShip(this,game.config.width + borderUISize * 6, borderUISize*4, 'enemy', 0,30).setOrigin(0,0);
        this.ship02 = new SpaceShip(this,game.config.width + borderUISize * 3, borderUISize*5 + boarderPadding*2, 'enemy', 0,20).setOrigin(0,0);
        this.ship03 = new SpaceShip(this,game.config.width, borderUISize*6 + boarderPadding*4, 'enemy', 0,10).setOrigin(0,0);


        this.add.rectangle(0, borderUISize+boarderPadding, game.config.width, borderUISize*2, 0x00FF00).setOrigin(0,0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.anims.create({key: 'explode', frames: this.anims.generateFrameNumbers('explosion',{start: 0, end: 7, first:0}),frameRate: 15});

        this.p1Score = 0;
        let scoreConfig = {fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#F3B141', color: '#843605', align: 'right', padding:{top: 5, bottom: 5,}, fixedWidth: 100}
        this.scoreLeft = this.add.text(borderUISize + boarderPadding, borderUISize + boarderPadding*2, this.p1Score,scoreConfig);

        this.gameOver = false;
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, ()=> {this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2,game.config.height/2+64, 'Fire to (R)estart or <- for menu', scoreConfig).setOrigin(0.5);
        this.gameOver = true;
        }, null, this);

        this.timeLeft = this.add.text(borderUISize + boarderPadding - 60, borderUISize + boarderPadding*2, this.p1Score,scoreConfig);
    }
    update(){
        if(this.gameOver && (Phaser.Input.Keyboard.JustDown(keyR) || Phaser.Input.Keyboard.JustDown(keyF))){
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4; //this lets the background scroll (could also be done with the y)

        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        if(this.checkCollision(this.p1Rocket, this.ship01)){
            //ship 1 collision
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            //ship 2 collision
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            //ship 3 collision
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
    }
    checkCollision(rocket, enemy){
        if(rocket.x < enemy.x + enemy.width && rocket.x + rocket.width > enemy.x && rocket.y < enemy.y + enemy.height && rocket.height + rocket.y > enemy.y){
            return true;
        }
        else{
            return false;
        }
    }
    shipExplode(ship){
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete',()=>{
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('explosion');
    }
}
