class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 2;
    }
    update(){
        if(keyLEFT.isDown && this.x >= borderUISize + this.width){
            this.x-= this.movementSpeed;
        }
        if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
            this.x+= this.movementSpeed;
        }

        //this.x = Phaser.Math.Clamp(this.x, borderUISize + boarderPadding, game.config.width - borderUISize - boarderPadding);
    }

}