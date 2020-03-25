var OVER_WIND = 10;
var WIND_STRENGTH = 3;
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 800;
var RESOLUTION = 10;
var INTERVAL = 0; // 0: max, >0 time between eache bubble is spawned
var GRAVITY_CONSTANT = 0.02;
var rainbow_color = ['#FF0000', '#FF7F00', '#FFFF00',
                     '#00FF00', '#0000FF', '#2E2B5F', '#8B00FF'];
var index = 0;
var bubbles = [];
var interval_count = INTERVAL;
var point_a = point_b = [0, 0];
var get_point_a = true;
var winds = [];
var grid = NaN;

function setup() {
    // get div dimensions
    var div = document.getElementById('canvas');
    CANVAS_WIDTH = div.offsetWidth;
    CANVAS_HEIGHT = div.offsetHeight;
    // create the canvas
    var canvas_div = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas_div.parent('canvas');
    canvas_div.center();
    console.log(div.offsetHeight, div.offsetWidth);
    // define a grid for the wind effect
    grid = new windGrid(CANVAS_WIDTH, CANVAS_HEIGHT, RESOLUTION);
}

function draw() {
    // get wind direction
    if (keyIsPressed && keyCode == 87) {
        getWind();
    } else {
        getBubble();
        resetPoints();
    }
    // clear is important to remove old bubbles (last frame)
    clear();
    background(51);
    // grid draw HEAVILY slows the system, only use for debug
    // increasing the resolution can increase perfonmance but sacrifices wind quality
    //grid.draw();
    // draw the bubbles
    for (var i = 0; i < bubbles.length; i++) {
        // delete bubbles not on screen
        if (bubbles[i].delete()) {
            bubbles.splice(i, 1);
            i--; // the list will be 1 short, this accounts for the resizing
        } else {
            bubbles[i].draw();
            // check if bubble is in wind
            var [flag, index_i, index_j] = grid.checkWind(bubbles[i].getPos())
            if (flag) {
                var w = grid.windParameters(index_i, index_j);
                bubbles[i].setOverWind();
                bubbles[i].windEffect(w);
            }
            bubbles[i].float();
        }
    }
    // draw the wind
    for (var i = 0; i < winds.length; i++) {
        winds[i].draw(); 
    }
    timing();
}

function getWind() {
    if (mouseIsPressed && isMouseInCanvas(mouseX, mouseY)) {
        if (get_point_a) {
            point_a = [mouseX, mouseY];
            get_point_a = false;
        }
        point_b = [mouseX, mouseY];
        if (euclidianDistance(point_a, point_b) > 5) {
            var w = new Wind(point_a, point_b);
            winds.push(w);
            grid.setWind(mouseX, mouseY, point_a, point_b);
            resetPoints();
        }
    } else {
        resetPoints();
    }
}

function getBubble() {
    if (mouseIsPressed && isMouseInCanvas(mouseX, mouseY)) {
        if (interval_count == INTERVAL) {
            var c = color(rainbow_color[index]);
            var b = new Bubble(mouseX, mouseY, c);
            bubbles.push(b);
        }
    }
}

// point_x = [x, y]
function euclidianDistance(point_a, point_b) {
    var x = point_a[0] - point_b[0];
    var y = point_a[1] - point_b[1];
    return Math.sqrt(x ** 2 + y ** 2);
}

// avoids drawing too many bubbles and overlapping
function timing() {
    if (interval_count == 0) {
        interval_count = INTERVAL;
    } else {
        interval_count--;
    }
    if (index == rainbow_color.length - 1) {
        index = 0;
    } else {
        index++;
    }
}

function resetPoints() {
    get_point_a = true;
    point_b = point_a;
}

function isMouseInCanvas(mouseX, mouseY) {
    if (mouseX < CANVAS_WIDTH && mouseX > 0) {
        if (mouseY < CANVAS_HEIGHT && mouseY > 0) {
            return true;
        } return false;
    } return false;
}