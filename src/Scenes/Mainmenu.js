class Mainmenu extends Phaser.Scene {
    constructor(){
        super({key: 'Mainmenu'});

    }
    preload() {
        this.load.setPath("./assets/");
        this.load.image("start", "buttonBlue.png");
        this.load.audio("btn_audio", "click_001.ogg");
    }
    create() {
        this.sfx = {
            btn_sound: [this.sound.add("btn_audio"),],
        };

        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "start"
        );

        this.btnPlay.setInteractive();

        this.btnPlayText = this.add.text(
            this.game.config.width * 0.5 - 35,
            this.game.config.height * 0.5 - 15,
            "Start",
            { font: '32px Arial', fill: 'black' }
        );

        this.btnPlay.on("pointerup", function() {
            this.sfx.btn_sound[0].play();
            this.scene.start("Movement");
          }, this);

        this.title = this.add.text(this.game.config.width * 0.5, 128, "Earth Defense", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);
    }
}