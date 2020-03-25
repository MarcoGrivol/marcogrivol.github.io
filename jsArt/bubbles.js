var rainbow_color = ['#FF0000', '#FF7F00', '#FFFF00',
                     '#00FF00', '#0000FF', '#2E2B5F', '#8B00FF'];
var index = 0;
var bubbles = [];
var INTERVAL = 2;
var interval_count = INTERVAL;
var gravity_constant = 0.02;
var point_a = point_b = [0, 0];
var get_point_a = true;
var winds = [];
var canvas_width = 800;
var canvas_height = 800;
var resolution = 10;
var grid = new windGrid(canvas_width, canvas_height, resolution);

function setup() {
    createCanvas(canvas_width, canvas_height);
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
            // check if bubble is in wind
            var [flag, index_i, index_j] = grid.checkWind(bubbles[i].getPos())
            if (flag) {
                var w = grid.windParameters(index_i, index_j);
                bubbles[i].windEffect(w);
            }
            bubbles[i].float();
        }
    }
    // draw the wind
    for (var i = 0; i < winds.length; i++) {
        winds[i].draw(); 
    }
    grid.draw();
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
    if (mouseX < canvas_width && mouseX > 0) {
        if (mouseY < canvas_height && mouseY > 0) {
            return true;
        } return false;
    } return false;
}