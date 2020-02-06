// returns the cell with the minimum lambda
function extractMin(queue) {
    var min = grid[0][0];
    var i_index = 0;
    var j_index = 0;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (queue[i][j] != null && queue[i][j].lambda < min.lambda) {
                min = queue[i][j];
                i_index = i;
                j_index = j;
            }
        }
    }
    queue[i_index][j_index] = null;
    return min;
}

// returns all the neighbors around a cell
function getNeighbors(queue, cell) {
    var neighbors = [];
    // 1) check if neighbor is valid
    // 2) check neighbor in respective direction
    
    // a) check cell below
    if (cell.j + 1 < queue.length) {
        if (queue[cell.j + 1][cell.i] != null && !queue[cell.j + 1][cell.i].fill) {
            queue[cell.j + 1][cell.i].lambda = cell.lambda + 1; // update queue
            neighbors.push(queue[cell.j + 1][cell.i]); // add to neighbors list
            grid[cell.j + 1][cell.i].fill = true; // paint the new discovered path
            grid[cell.j + 1][cell.i].path = true;
        }
    }
    // b) check cell to the right
    if (cell.i + 1 < queue[0].length) {
        if (queue[cell.j][cell.i + 1] != null && !queue[cell.j][cell.i + 1].fill) {
            queue[cell.j][cell.i + 1].lambda = cell.lambda + 1;
            neighbors.push(queue[cell.j][cell.i + 1]);
            grid[cell.j][cell.i + 1].fill = true;
            grid[cell.j][cell.i + 1].path = true;
        }
    }
    // c) check cell above
    if (cell.j - 1 >= 0) {
        if (queue[cell.j - 1][cell.i] != null && !queue[cell.j - 1][cell.i].fill) {
            queue[cell.j - 1][cell.i].lambda = cell.lambda + 1;
            neighbors.push(queue[cell.j - 1][cell.i]);
            grid[cell.j - 1][cell.i].fill = true;
            grid[cell.j - 1][cell.i].path = true;
        }
    }
    // d) check cell to the left
    if (cell.i - 1 >= 0) {
        if (queue[cell.j][cell.i - 1] != null && !queue[cell.j][cell.i - 1].fill) {
            queue[cell.j][cell.i - 1].lambda = cell.lambda + 1;
            neighbors.push(queue[cell.j][cell.i - 1]);
            grid[cell.j][cell.i - 1].fill = true;
            grid[cell.j][cell.i - 1].path = true;
        }
    }
    return neighbors;
}

function queueIncludesCell(queue, cell) {
    for (var i = 0; i < queue.length; i++) {
        for (var j = 0; j < queue[0].length; j++) {
            if (queue[i][j] != null && queue[i][j] == cell) {
                return true;
            }
        }
    }
    return false;
}

// delay function from https://stackoverflow.com/questions/24849/execute-script-after-specific-delay-using-javascript
function delay(ms) {
    var cur_d = new Date();
    var cur_ticks = cur_d.getTime();
    var ms_passed = 0;
    while (ms_passed < ms) {
        var d = new Date();
        var ticks = d.getTime();
        ms_passed = ticks - cur_ticks;
    }
}

function dijkstra() {
    // var path = [];
    // var queue = new Array(grid.length);
    // for (var i = 0; i < grid.length; i++) {
    //     queue[i] = new Array(grid[0].length);
    //     for (var j = 0; j < grid[0].length; j++) {
    //         queue[i][j] = Object.assign( Object.create( Object.getPrototypeOf(grid[i][j])), grid[i][j]);
    //     }
    // }
    // var reached_finish = false;
    
    // var u = grid[0][0];
    // while (u != null && !reached_finish) {
    //     u = extractMin(queue);
    //     console.log(u);
    //     neighbors = getNeighbors(queue, u);
    //     for (var i = 0; i < neighbors.length; i++) {
    //         if (neighbors[i].finish) {
    //             reached_finish = true;
    //         }
    //     }
    // }
    // for (var i = 0; i < 50; i++) {
    //     u = extractMin(queue);
    //     neighbors = getNeighbors(queue, u);
    //     redraw();
    //     delay(500);
    // }
    // for (var i = 0; i < 1; i++) {
    //     grid[i][0].fill = true;
    //     redraw();
    //     delay(1000);
    // }
    delay(1000);
    console.log("acabou");
    grid[1][1].fill = true;
    redraw();
    console.log("redraw");
    delay(5000);
}