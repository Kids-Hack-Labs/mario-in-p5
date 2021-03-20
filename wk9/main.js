const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 400;
const GRAVITY = 1;
const JUMP_FORCE = 15;
// this is where you put the JSON string containing the level info
const LEVEL_INFO = [

'{"pole":400,"platforms":[{"img":"grass_tile","x":0,"y":384,"w":32,"h":32},{"img":"grass_tile","x":32,"y":384,"w":32,"h":32},{"img":"grass_tile","x":64,"y":384,"w":32,"h":32},{"img":"grass_tile","x":96,"y":384,"w":32,"h":32},{"img":"grass_tile","x":128,"y":384,"w":32,"h":32},{"img":"grass_tile","x":160,"y":384,"w":32,"h":32},{"img":"grass_tile","x":192,"y":384,"w":32,"h":32},{"img":"grass_tile","x":224,"y":384,"w":32,"h":32},{"img":"grass_tile","x":256,"y":384,"w":32,"h":32},{"img":"grass_tile","x":300,"y":300,"w":32,"h":32},{"img":"grass_tile","x":332,"y":300,"w":32,"h":32}],"enemies":[{"x":300,"y":284,"leftBound":300,"rightBound":332}]}',
'{"platforms":[{"img":"grass_tile","x":0,"y":14,"w":32,"h":32},{"img":"grass_tile","x":32,"y":384,"w":32,"h":32},{"img":"grass_tile","x":64,"y":384,"w":32,"h":32},{"img":"grass_tile","x":96,"y":384,"w":32,"h":32},{"img":"grass_tile","x":128,"y":384,"w":32,"h":32},{"img":"grass_tile","x":160,"y":384,"w":32,"h":32},{"img":"grass_tile","x":192,"y":384,"w":32,"h":32},{"img":"grass_tile","x":224,"y":384,"w":32,"h":32},{"img":"grass_tile","x":256,"y":384,"w":32,"h":32},{"img":"grass_tile","x":300,"y":300,"w":32,"h":32},{"img":"grass_tile","x":332,"y":300,"w":32,"h":32}],"enemies":[{"x":100,"y":284,"leftBound":100,"rightBound":332}]}',
'{"platforms":[{"img":"grass_tile","x":0,"y":284,"w":32,"h":32},{"img":"grass_tile","x":32,"y":384,"w":32,"h":32},{"img":"grass_tile","x":64,"y":384,"w":32,"h":32},{"img":"grass_tile","x":96,"y":384,"w":32,"h":32},{"img":"grass_tile","x":128,"y":384,"w":32,"h":32},{"img":"grass_tile","x":160,"y":384,"w":32,"h":32},{"img":"grass_tile","x":192,"y":384,"w":32,"h":32},{"img":"grass_tile","x":224,"y":384,"w":32,"h":32},{"img":"grass_tile","x":256,"y":384,"w":32,"h":32},{"img":"grass_tile","x":300,"y":300,"w":32,"h":32},{"img":"grass_tile","x":332,"y":300,"w":32,"h":32}],"enemies":[{"x":500,"y":284,"leftBound":300,"rightBound":832}]}',
'{"platforms":[{"img":"grass_tile","x":0,"y":784,"w":32,"h":32},{"img":"grass_tile","x":32,"y":384,"w":32,"h":32},{"img":"grass_tile","x":64,"y":384,"w":32,"h":32},{"img":"grass_tile","x":96,"y":384,"w":32,"h":32},{"img":"grass_tile","x":128,"y":384,"w":32,"h":32},{"img":"grass_tile","x":160,"y":384,"w":32,"h":32},{"img":"grass_tile","x":192,"y":384,"w":32,"h":32},{"img":"grass_tile","x":224,"y":384,"w":32,"h":32},{"img":"grass_tile","x":256,"y":384,"w":32,"h":32},{"img":"grass_tile","x":300,"y":300,"w":32,"h":32},{"img":"grass_tile","x":332,"y":300,"w":32,"h":32}],"enemies":[{"x":300,"y":184,"leftBound":300,"rightBound":332}]}'

];

var assets = {};
var keys = {};

var currentLevelIndex = 0;
var level;

var cam = {
    x: 200,
    y: 200
};

var enemies = [];

var loadNextLevel = function() {
    currentLevelIndex++;
    level = JSON.parse(LEVEL_INFO[currentLevelIndex]);
    
    enemies = []; // clear enemies from a previous level.

    // load enemies
    level.enemies.forEach( (enemyInfo) => {
        enemies.push( Enemy(enemyInfo.x, enemyInfo.y, enemyInfo.leftBound, enemyInfo.rightBound) );
    });
};

var preload = function() {
    level = JSON.parse(LEVEL_INFO[currentLevelIndex]); // init the level
    // load enemies
    level.enemies.forEach( (enemyInfo) => {
        enemies.push( Enemy(enemyInfo.x, enemyInfo.y, enemyInfo.leftBound, enemyInfo.rightBound) );
    });

    // images
    assets["player"] = loadImage("assets/mario.png");
    assets["goomba"] = loadImage("assets/goomba.png");
    assets["grass_tile"] = loadImage("assets/platform_block.png");

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
    else if (key === 'n') {
        loadNextLevel();
    }
};

// draw the data from level object
var renderLevel = function() {
    for(var i = 0; i < level.platforms.length; i++) {
        image(assets[level.platforms[i].img], level.platforms[i].x, level.platforms[i].y, level.platforms[i].w, level.platforms[i].h);
        rect(level.pole, 300, 10, 300);
    }
};

var draw = function() {
    background(120, 211, 250);

    translate(-cam.x, cam.y - 200); // move level
    cam.x = player.x - 200; // move camera

    renderLevel();

    enemies.forEach((enemy) => {
        if (enemy.isDead) {
            enemies.splice(enemies.indexOf(enemy), 1); // removes enemy from the world
        }

        enemy.update();

        level.platforms.forEach((p) => {
            let offset = planarOverlapOffset(enemy.x, enemy.y, enemy.w, enemy.h, p.x, p.y, p.w, p.h);
            if (offset.y > 0 && offset.x > 0) {
                enemy.yVel = 0;
                enemy.y -= offset.y;
            }
        });
    });
    
    player.update();
    // check player world collision
    level.platforms.forEach((p) => {
        let offset = planarOverlapOffset(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h);
        if (offset.y > 0 && offset.x > 0) {
            player.yVel = 0;
            player.y -= offset.y;
            player.isJumping = false;
        }
    });
};