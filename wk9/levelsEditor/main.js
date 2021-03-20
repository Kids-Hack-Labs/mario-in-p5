const LEVEL_WIDTH = 800;
const LEVEL_HEIGHT = 400;

var setup = function() {
    let c = createCanvas(LEVEL_WIDTH, LEVEL_HEIGHT);
    c.elt.style.border = "5px solid";

    rectMode(CENTER);
};

var createBackground;

var createPole = function(x) {
    return x;
};

// create a platform type object and return it
var createPlatform = function(img, x, y, w, h) {
    var p = {}; // object
    
    // save info on object
    p.img = img; 
    p.x = x;
    p.y = y;
    p.w = w;
    p.h = h;
    
    return p;
};

var createEnemy = function(x, y, leftBound, rightBound) {
    var e = {}; // object
    
    // save info on object
    e.x = x;
    e.y = y;
    e.leftBound = leftBound;
    e.rightBound = rightBound;
    
    return e;
};

var backgroundImage;
var pole = createPole(320);
var platforms = [
    // floor
    createPlatform("grass_tile", 0, 384, 32, 32),
    createPlatform("grass_tile", 32, 384, 32, 32),
    createPlatform("grass_tile", 64, 384, 32, 32),
    createPlatform("grass_tile", 96, 384, 32, 32),
    createPlatform("grass_tile", 128, 384, 32, 32),
    createPlatform("grass_tile", 160, 384, 32, 32),
    createPlatform("grass_tile", 192, 384, 32, 32),
    createPlatform("grass_tile", 224, 384, 32, 32),
    createPlatform("grass_tile", 256, 384, 32, 32),

    // platform
    createPlatform("grass_tile", 300, 300, 32, 32),
    createPlatform("grass_tile", 332, 300, 32, 32)
];

var enemies = [
    createEnemy(300, 284, 300, 332)
];

var drawPlatformSkeleton = function(platform) {
    rect(platform.x, platform.y, platform.w, platform.h);
};

var draw = function() {
    // draw skeleton level
    platforms.forEach( drawPlatformSkeleton );
    rect(pole, 300, 10, 300);
};

var mouseClicked = function() {
    let level = {};
    level.backgroundImage = backgroundImage;
    level.pole = pole;
    level.platforms = platforms;
    level.enemies = enemies;
    
    console.log(JSON.stringify(level));
};
