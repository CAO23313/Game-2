class Action extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, type){
        super(scene, x, y, key);
        
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);
    }
    explode(canDestroy) {
        if (!this.getData("isDead")) {
          // pick a random explosion sound within the array we defined in this.sfx in SceneMain
          this.scene.sfx.explosion[0].play();
            if (this.shootTimer !== undefined) {
                if (this.shootTimer) {
                    this.shootTimer.remove(false);
                }
            }
            this.setAngle(0);
            this.body.setVelocity(0, 0);

            if (canDestroy) {
              this.destroy();
            }
            else {
              this.setVisible(false);
            }
            this.setData("isDead", true);
        }
    }
}

class Player extends Action {
    constructor(scene, x, y, key) {
        super(scene, x, y+200, key, "Player");
        this.setData("speed", 400);

        this.setData("isShooting", false);
        this.setData("timerShootDelay", 30);
        this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
    }
    moveLeft() {
        this.body.velocity.x = -this.getData("speed");
    }
    moveRight() {
        this.body.velocity.x = this.getData("speed");
    }
    onDestroy() {
        this.scene.time.addEvent({ 
            delay: 1000,
            callback: function() {
              this.scene.scene.start("Gameover");
            },
            callbackScope: this,
            loop: false
        });
    }
    update() {
        this.body.setVelocity(0, 0);
        this.x = Phaser.Math.Clamp(this.x, 55, this.scene.game.config.width-55);
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
        
        if (this.getData("isShooting")) {
            if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
              this.setData("timerShootTick", this.getData("timerShootTick") + 1); 
            } else { 
              var laser = new PlayerLaser(this.scene, this.x, this.y);
              this.scene.playerLasers.add(laser);
            
              this.scene.sfx.laser[Phaser.Math.Between(0, this.scene.sfx.laser.length - 1)].play();
              this.setData("timerShootTick", 0);
            }
        }
    } 
}

class EnemyBlue extends Action {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy_blue", "EnemyBlue");
        this.body.velocity.y = Phaser.Math.Between(50, 100);

        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: function() {
              var laser = new BlueLaser(
                this.scene,
                this.x,
                this.y
              );
              laser.setScale(this.scaleX);
              this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
          });
        }
        onDestroy() {
            if (this.shootTimer !== undefined) {
                if (this.shootTimer) {
                this.shootTimer.remove(false);
                }
            }

    }
}

class EnemyGrey extends Action {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy_grey", "EnemyGrey");
        this.body.velocity.y = Phaser.Math.Between(50, 100);

        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: function() {
              var laser = new GreyLaser(
                this.scene,
                this.x,
                this.y
              );
              laser.setScale(this.scaleX);
              this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
          });
        }
        onDestroy() {
            if (this.shootTimer !== undefined) {
                if (this.shootTimer) {
                this.shootTimer.remove(false);
                }
            }
    }
}

class PlayerLaser extends Action {
    constructor(scene, x, y) {
      super(scene, x, y-60, "bullet");
      this.body.velocity.y = -200;
    }
}

class BlueLaser extends Action {
    constructor(scene, x, y) {
      super(scene, x, y, "blue_laser");
      this.body.velocity.y = 200;
    }
}

class GreyLaser extends Action {
    constructor(scene, x, y) {
      super(scene, x, y, "grey_laser");
      this.body.velocity.y = 200;
    }
}


