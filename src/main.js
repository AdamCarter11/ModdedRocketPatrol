//Adam Carter, Modded Rocket Patrol, 4/19/2021, 10hr
//I created my own sprites for the player, enemy and explosion (20pt)
//Implmeneted a time/scoring mechanism that gives more time on enemy kill (20pt)
//Implimented mouse control and firing (20pt)
//Parallax scrolling (with my attempt at a starry background) (10pt)
//display time on screen (10pt)
//player can control rocket (5pt)
//speed increases after 30 seconds (5pt)

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height/15;
let boarderPadding = borderUISize/3;

let keyLEFT, keyRIGHT, keyF, keyR;
