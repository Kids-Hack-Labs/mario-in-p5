const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 400;
const GRAVITY = 1;
const JUMP_FORCE = 15;
const LEVEL_INFO = '{"platforms":[{"x":400,"y":400,"w":800,"h":50},{"x":300,"y":300,"w":100,"h":25}],"enemies":[]}';

var assets = {};
var keys = {};
var level;

var preload = function() {
    level = JSON.parse(LEVEL_INFO);

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
    c.elt.style.width = "800px";
    c.elt.style.height = "800px";
    c.elt.style.imageRendering = "pixelated";

    imageMode(CENTER);
    rectMode(CENTER);
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

// draw the data from level object
var renderLevel = function() {
    for(var i = 0; i < level.platforms.length; i++) {
        rect(level.platforms[i].x, level.platforms[i].y, level.platforms[i].w, level.platforms[i].h)
    }
};

var draw = function() {
    background(120, 211, 250);

    renderLevel();

    player.update();
    enemy.update();

    // check player world collision
    level.platforms.forEach((p) => {
        let offset = planarOverlapOffset(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h);
        if (offset.y > 0 && offset.x > 0) {
            player.yVel = 0;
            player.y -= offset.y;
            player.isJumping = false;
        }
    });

    if (enemy.isDead) {
        enemy = Enemy();
    }
};