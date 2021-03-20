// x --> player.x
// isJumping --> player.isJumping
var player = {
    x: 200,
    y: 200,

    w: 32,
    h: 32,

    xVel: 0,
    yVel: 0,

    isJumping: false,
    speed: 3,

    checkEnemyOverlap: function() {
        enemies.forEach((enemy) => {
            let overlap = planarOverlap(this.x, this.y, this.w, this.h, enemy.x, enemy.y, enemy.w, enemy.h);

            if (overlap === 0) {
                return;
            }
    
            if (overlap === 1) {
                console.log("You killed the goomba!");
                // kill enemy
                enemy.die();
            }
            else {
                console.log("You died!");
                this.x = 100;
                this.y = 100;
            }
        });
    },

    jump: function() {
        if (this.isJumping === false) {
            this.yVel = -JUMP_FORCE;
            this.isJumping = true;

            //assets["jump"].play();
        }
    },

    move: function(dir) {
        this.xVel = dir;
    },

    update: function() {
        this.yVel += GRAVITY; // gravity

        let xDir = 0;

        if (keys["RIGHT_ARROW"] === 1) {
            xDir += 1;
        }
        
        if (keys["LEFT_ARROW"] === 1) {
            xDir -= 1;
        }

        this.move(xDir * this.speed);

        this.x += this.xVel;
        this.y += this.yVel;

        this.checkEnemyOverlap();

        if (player.x > level.pole) {
            loadNextLevel();
            player.x = 0;
        }

        if (this.y + this.h/2 > SCREEN_HEIGHT) {
            this.yVel = 0;
            this.y = SCREEN_HEIGHT - this.h/2;
            this.isJumping = false;
            // TODO: player loses a life
            player.x = 0;
            player.y = 200;
        }

        push();
        translate(this.x, this.y);
        if (xDir != 0)  {
            scale(xDir, 1.0);
        }
        image(assets["player"], 0, 0);
        pop();
    }
};