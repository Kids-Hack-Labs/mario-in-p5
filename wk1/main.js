const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 400;
const GRAVITY = 1;
const JUMP_FORCE = 15;

var setup = function() {
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
};

var x = 200;
var y = 200;

// of the collider
var w = 50;
var h = 50;

// velocities
var xVel = 0;
var yVel = 0;

var keyPressed = function () {
    if (keyCode === UP_ARROW) {
        yVel = -JUMP_FORCE;
    }
};

var draw = function() {
    background(255);

    yVel += GRAVITY; // gravity

    x += xVel;
    y += yVel;

    // bound the ball to the screen
    if (y + h/2 > SCREEN_HEIGHT) {
        yVel = 0;
        y = SCREEN_HEIGHT - h/2;
        // TODO: player loses a life
    }

    ellipse(x, y, w, h);
};