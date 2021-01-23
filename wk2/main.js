const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 400;
const GRAVITY = 1;
const JUMP_FORCE = 15;

var assets = {};

// happens when the project starts
var setup = function() {
    let c = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    c.elt.style.border = "5px solid";

    imageMode(CENTER);
    assets["player"] = loadImage("assets/ball1.png");
};

var x = 200;
var y = 200;

// of the collider
var w = 32;
var h = 32;

// velocities
var xVel = 0;
var yVel = 0;

var isJumping = false;

var keyPressed = function () {
    if (keyCode === UP_ARROW && isJumping === false) {
        yVel = -JUMP_FORCE;
        isJumping = true;
    }
};

var draw = function() {
    background(255);

    yVel += GRAVITY; // gravity

    x += xVel;
    y += yVel;

    console.log(isJumping);

    // bound the ball to the screen
    if (y + h/2 > SCREEN_HEIGHT) {
        yVel = 0;
        y = SCREEN_HEIGHT - h/2;
        isJumping = false;
        // TODO: player loses a life
    }

    image(assets["player"], x, y);
};