var rainbow_color = ['#FF0000', '#FF7F00', '#FFFF00',
                     '#00FF00', '#0000FF', '#2E2B5F', '#8B00FF'];
var index = 0;
var bubbles = [];
var interval = 5;
var gravity_constant = 0.02;
var create_wind = false;
var point_a = point_b = [0, 0];
var get_point_a = true;
var winds = [];

function setup() {
    createCanvas(800, 800);
}

function draw() {
    // get wind direction
    if (keyIsPressed && keyCode == 87) {
        getWind();
    } else {
        getBubble();
        resetPoints();
    }

    clear();
    // draw the bubbles
    for (var i = 0; i < bubbles.length; i++) {
        if (bubbles[i].delete()) {
            bubbles.splice(i, 1);
            i--; // the list will be 1 short, this accounts for the resizing
        } else {
            bubbles[i].draw();
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
    if (mouseIsPressed) {
        if (get_point_a) {
            point_a = [mouseX, mouseY];
            get_point_a = false;
        }
        point_b = [mouseX, mouseY];
        if (euclidianDistance(point_a, point_b) > 10) {
            var w = new Wind(point_a, point_b);
            winds.push(w);
            resetPoints();
        }
    } else {
        resetPoints();
    }
}

function getBubble() {
    if (mouseIsPressed && interval == 5) {
        var c = color(rainbow_color[index]);
        var b = new Bubble(mouseX, mouseY, c);
        bubbles.push(b);
    }
}

// point_x = [x, y]
function euclidianDistance(point_a, point_b) {
    var x = point_a[0] - point_b[0];
    var y = point_a[1] - point_b[1];
    return Math.sqrt(x ** 2, y ** 2);
}

// avoids drawing too many bubbles and overlapping
function timing() {
    if (interval == 0) {
        interval = 5;
    } else {
        interval--;
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