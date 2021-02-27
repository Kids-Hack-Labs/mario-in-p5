var Enemy = function() {
    let self = {
        x: 200,
        y: 200,

        xVel: 1,
        yVel: 0,

        speed: 2,

        w: 16,
        h: 16,

        leftBound: 10,
        rightBound: 390, 

        isDead: false,

        die: function() {
            this.isDead = true;
        },

        update: function() {
            this.yVel += GRAVITY; // gravity

            if (this.x > this.rightBound) {
                this.xVel = -1;
            } 

            if(this.x < this.leftBound) {
                this.xVel = 1;
            }

            this.x += this.xVel * this.speed;
            this.y += this.yVel;

            if (this.y + this.h/2 > SCREEN_HEIGHT) {
                this.yVel = 0;
                this.y = SCREEN_HEIGHT - this.h/2;
                this.isJumping = false;
                // TODO: player loses a life
            }

            image(assets["goomba"], this.x, this.y);
        }
    };

    return self;
};