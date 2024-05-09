// Jim Whitehead
// Created: 4/14/2024
// Phaser: 3.70.0
//
// BuildAMonster
//
// A template for building a monster using a series of assets from
// a sprite atlas.
// 
// Art assets from Kenny Assets "Monster Builder Pack" set:
// https://kenney.nl/assets/monster-builder-pack

"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 0 }
        }
    },
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1300,
    height: 900,
    scene: [Mainmenu, Movement, Gameover],
    fps: { forceSetTimeOut: true, target: 60 }

}

const game = new Phaser.Game(config);

