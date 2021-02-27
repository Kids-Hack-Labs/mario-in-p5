const LEVEL_WIDTH = 800;
const LEVEL_HEIGHT = 400;

var setup = function() {
    let c = createCanvas(LEVEL_WIDTH, LEVEL_HEIGHT);
    c.elt.style.border = "5px solid";

    rectMode(CENTER);
};

var createBackground;

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

var createEnemy;

var backgroundImage;
var platforms = [
    createPlatform(undefined, 400, 400, 800, 50),
    createPlatform(undefined, 300, 300, 100, 25)
];

var enemies = [

];

var drawPlatformSkeleton = function(platform) {
    rect(platform.x, platform.y, platform.w, platform.h);
};

var draw = function() {
    // draw skeleton level
    platforms.forEach( drawPlatformSkeleton );
};

var mouseClicked = function() {
    let level = {};
    level.backgroundImage = backgroundImage;
    level.platforms = platforms;
    level.enemies = enemies;
    
    console.log(JSON.stringify(level));
};
