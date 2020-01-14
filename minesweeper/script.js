function Cell(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    if (random(1) < 0.5) {
        this.bee = true;
    } else {
        this.bee = false;
    }
    this.revealed = false;
}

Cell.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
        if (this.bee) {
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        }
    }
}

Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w) 
}

Cell.prototype.reveal = function() {
    this.revealed = true;
}

function make2DArray(rows, cols) {
    var arr = new Array(rows);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}

var grid;
var rows = 20;
var cols = 20;
var w = 20;

function setup() {
    var canvasDiv = document.getElementById('container');
    var widthDiv = floor(canvasDiv.offsetWidth);
    var heightDiv = floor(canvasDiv.offsetHeight);
    console.log(widthDiv);
    console.log(heightDiv);

    var canvas = createCanvas(widthDiv, heightDiv);
    canvas.parent('container');
    cols = floor(widthDiv / w);
    rows = floor(heightDiv / w);
    grid = make2DArray(rows, cols);
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = new Cell(i * w, j * w, w);
        }
    }
}

function mousePressed() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                grid[i][j].reveal();
            }
        }
    }
}

function draw() {
    background(255);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}

