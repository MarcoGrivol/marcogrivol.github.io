var grid ,rows, cols;
var w_size = 30;
var onPressed = false;

function setup() {
    var div = document.getElementById('maze_container');
    var height = floor(div.offsetHeight);
    var width = floor(div.offsetWidth);

    var canvas_div = createCanvas(width, height);
    canvas_div.parent('maze_container');

    // creates 2DArray as grid[rows][cols]
    rows = floor(height / w_size);
    cols = floor(width / w_size);
    grid = new Array(rows);
    for (var i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
    }

    // each value in grid is a cell
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = new Cell(j * w_size, i * w_size, w_size);
        }
    }
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
            grid[x][y].fill = true;
        }
        console.log(x, y)
    }
}

function mousePressed() {
    onPressed = true;
}

function mouseReleased() {
    onPressed = false;
}