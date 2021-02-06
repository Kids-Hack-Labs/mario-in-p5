const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 400;
const GRAVITY = 1;
const JUMP_FORCE = 15;

var assets = {};
var keys = {};

var preload = function() {
    // images
    assets["player"] = loadImage("assets/mario.png");
    assets["goomba"] = loadImage("assets/goomba.png");

    // sound
    assets["theme"] = loadSound("assets/theme.mp3");
    assets["power_up"] = loadSound("assets/power_up.mp3");
    assets["jump"] = loadSound("assets/jump.mp3");
};

// happens when the project starts
var setup = function() {
    let c = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    c.elt.style.border = "5px solid";

    imageMode(CENTER);
};

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

    jump: function() {
        if (this.isJumping === false) {
            this.yVel = -JUMP_FORCE;
            this.isJumping = true;

            assets["jump"].play();
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

        if (this.y + this.h/2 > SCREEN_HEIGHT) {
            this.yVel = 0;
            this.y = SCREEN_HEIGHT - this.h/2;
            this.isJumping = false;
            // TODO: player loses a life
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

var enemy = Enemy();

var keyPressed = function () {
    if (keyCode === UP_ARROW) {
        player.jump();

        keys["UP_ARROW"] = 1;
    }
    else if (keyCode === RIGHT_ARROW) {
        keys["RIGHT_ARROW"] = 1;
    }
    else if (keyCode === LEFT_ARROW) {
        keys["LEFT_ARROW"] = 1;
    }
};

var keyReleased = function() {
    if (keyCode === UP_ARROW) {
        keys["UP_ARROW"] = 0;
    }
    else if (keyCode === RIGHT_ARROW) {
        keys["RIGHT_ARROW"] = 0;
    }
    else if (keyCode === LEFT_ARROW) {
        keys["LEFT_ARROW"] = 0;
    }
};

var draw = function() {
    background(120, 211, 250);

    player.update();
    enemy.update();
};