class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isFiring = false;
        this.movementSpeed = 2;
        this.sfxRocket = scene.sound.add('shootingsound');
    }
    update(){
        if(keyLEFT.isDown && this.x >= borderUISize + this.width){
            this.x-= this.movementSpeed;
        }
        if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
            this.x+= this.movementSpeed;
        }

        //this.x = Phaser.Math.Clamp(this.x, borderUISize + boarderPadding, game.config.width - borderUISize - boarderPadding);
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play();
        }
        if(this.isFiring && this.y >= borderUISize * 3 + boarderPadding){
            this.y -= this.movementSpeed;
        }
        if(this.y <= borderUISize * 3 + boarderPadding){
            this.reset();
        }

    }
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - boarderPadding;
    }
}