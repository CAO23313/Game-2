class Gameover extends Phaser.Scene {
    constructor(){
        super({key: 'Gameover'});
    }
    preload() {
        this.load.setPath("./assets/");
        this.load.image("restart", "buttonBlue.png");
        this.load.audio("btn_audio", "click_001.ogg");
    }
    create() {
        this.sfx = {
            btn_sound: [this.sound.add("btn_audio"),],
        };

        this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        const highScore = parseInt(localStorage.getItem('highScore')) || 0;
        this.add.text(this.game.config.width * 0.5 - 90, 200, `Highest Score: ${highScore}`);
        this.restart_btn = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "restart",
        );

        this.restart_btn.setInteractive();

        this.restartText = this.add.text(
            this.game.config.width * 0.5 - 50,
            this.game.config.height * 0.5 - 15,
            "Restart",
            { font: '32px Arial', fill: 'black' }
        );

        this.restart_btn.on("pointerup", function() {
            this.sfx.btn_sound[0].play();
            this.scene.start("Movement");
          }, this);

    }
}
