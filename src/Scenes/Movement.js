class Movement extends Phaser.Scene {
    constructor(){
        super('Movement');
        this.my = {sprite: {}};
    }
    preload() {
        this.load.setPath("./assets/");

        this.load.image("player", "playerShip3_orange.png");
        this.load.image("bullet", "laserGreen06.png");
        this.load.image("enemy_grey", "shipBeige_manned.png");
        this.load.image("enemy_blue", "shipBlue_manned.png");
        this.load.image("blue_laser", "laserBlue3.png");
        this.load.image("grey_laser", "laserPink3.png");

        this.load.audio("enemy_laser", "sfx_laser2.ogg");
        this.load.audio("player_laser", "sfx_laser1.ogg");
        this.load.audio("explosion", "explosionCrunch_002.ogg");

    }
    create() {
        let my = this.my;

        let left;
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let right;
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        let emit;
        this.emit = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.sfx = {
            explosion: [
                this.sound.add("explosion"),
            ],
            laser: [
                this.sound.add("enemy_laser"),
                this.sound.add("player_laser")
            ]
        };
        
        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "player"
          );

        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();

        this.spawnEvent_blue = this.time.addEvent({
            delay: 3000,
            callback: this.spawnEnemy_blue,
            callbackScope: this,
            loop: true
        });
      
          // Set a timed event to change the delay after 10 seconds
        this.time.delayedCall(10000, this.reduceSpawnDelay_blue, [], this);


        this.spawnEvent_grey = this.time.addEvent({
            delay: 3000,
            callback: this.spawnEnemy_grey,
            callbackScope: this,
            loop: true
        });

        this.time.delayedCall(10000, this.reduceSpawnDelay_grey, [], this);

          var score = 0;
          var highest_score = parseInt(localStorage.getItem('highScore')) || 0;

          var highest_text = this.add.text(10, 110, `Highest Score: ` + highest_score, { font: '46px Arial', fill: '#ffffff'});

          var score_text = this.add.text(10, 60, `Score: ` + score, { font: '46px Arial', fill: '#ffffff'});
          this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
            if (enemy) {
              if (enemy.onDestroy !== undefined) {
                score = score + 3;
                if(highest_score < score) {
                    highest_score = score;
                    highest_text.setText(`Highest Score: ` + highest_score);
                    localStorage.setItem('highScore', highest_score.toString());
                }
                score_text.setText(`Score: ` + score);
                enemy.onDestroy();
              }
              enemy.explode(true);
              playerLaser.destroy();
            }
          });

          var health = 10;
          var health_text = this.add.text(10, 10, `Health: ` + health, { font: '46px Arial', fill: '#ffffff'});
          this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {

            if (!player.getData("isDead") &&
                !enemy.getData("isDead")) {
              health = health - 1;
              health_text.setText(`Health: ` + health);
              console.log(health);
              if(health <= 0) {
                player.explode(false);
                player.onDestroy();
                enemy.explode(true);
              } else {
                enemy.explode(true);
              }
            }
          });

          this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
            if (!player.getData("isDead") &&
                !laser.getData("isDead")) {
              health = health - 1;
              health_text.setText(`Health: ` + health);
              console.log(health);
              if(health <= 0) {
                player.explode(false);
                player.onDestroy();
                laser.destroy();
              } else {
                laser.destroy();
              }
            }
          });

    }
    update() {
        let my = this.my;


        if(!this.player.getData("isDead")) {
            this.player.update();

            if (this.left.isDown) {
                this.player.moveLeft();
            } else if (this.right.isDown) {
                this.player.moveRight();
            }
            
            if (this.emit.isDown) {
                this.player.setData("isShooting", true);
            } else {
                this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
                this.player.setData("isShooting", false);
            }
        }  
    }
    spawnEnemy_blue() {
        var enemy = new EnemyBlue(
          this,
          Phaser.Math.Between(30, this.game.config.width - 30),
          0
        );
        this.enemies.add(enemy);
    }
    reduceSpawnDelay_blue() {
        // Stop the original timed event
        this.spawnEvent_blue.remove(false);
        // Create a new timed event with a shorter delay
        this.spawnEvent_blue = this.time.addEvent({
          delay: 1200, // New delay of 1 second
          callback: this.spawnEnemy_blue,
          callbackScope: this,
          loop: true
        });
      }
    spawnEnemy_grey() {
        var enemy = new EnemyGrey(
          this,
          Phaser.Math.Between(30, this.game.config.width - 30),
          0
        );
        this.enemies.add(enemy);
    }
    reduceSpawnDelay_grey() {
        // Stop the original timed event
        this.spawnEvent_grey.remove(false);
        // Create a new timed event with a shorter delay
        this.spawnEvent_grey = this.time.addEvent({
          delay: 600, // New delay of 1 second
          callback: this.spawnEnemy_grey,
          callbackScope: this,
          loop: true
        });
      }

}