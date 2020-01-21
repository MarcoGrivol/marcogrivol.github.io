var grid;
var rows; // y coordinates :
var cols; // x coordinates --
var w_size = 30;
var onPressed = false;
var pencil_on = true;
var eraser_on = false;

function setup() {
    var div = document.getElementById('maze_container');
    var height = div.offsetHeight;
    var width = div.offsetWidth;

    // creates 2DArray as grid[rows][cols]
    rows = floor(height / w_size);
    cols = floor(width / w_size);
    grid = new Array(rows);
    for (var i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
    }
    // defines a start and finish cell with 2 cells offset from border
    var start = 2; 
    var finish = cols - 3;

    // each value in grid is a cell
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (i == floor(rows / 2)) {
                if (j == start) {
                    grid[i][j] = new Cell(j * w_size, i * w_size, w_size, true, false);
                }
                else if (j == finish) {
                    grid[i][j] = new Cell(j * w_size, i * w_size, w_size, false, true);
                } else {
                    grid[i][j] = new Cell(j * w_size, i * w_size, w_size, false, false);
                }
            } else {
                grid[i][j] = new Cell(j * w_size, i * w_size, w_size, false, false);
            }
        }
    }

    // will center the canvas inside the div
    var canvas_div = createCanvas(cols * w_size, rows * w_size);
    canvas_div.parent('maze_container');
    canvas_div.center();
}

function draw() {
    background(255);
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].draw();
        }
    }

    if (onPressed) {
        var x = floor(mouseY / w_size); // x is the row(height)
        var y = floor(mouseX / w_size); // y is the col(width)
        if (x >= 0 && x < rows && y >= 0 && y < cols) {
            if (pencil_on) {
                grid[x][y].fill = true;
            } else if (eraser_on) {
                if (grid[x][y].start != true && grid[x][y].finish != true) {
                    grid[x][y].fill = false;
                }
            }
        }
    }
}

function mousePressed() {
    onPressed = true;
}

function mouseReleased() {
    onPressed = false;
}