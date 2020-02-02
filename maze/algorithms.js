// returns the cell with the minimum lambda
function extractMin(queue) {
    var min = queue[0][0];
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
    // for (var i = cell.i - 1; i <= cell.i + 1; i++) {
    //     for (var j = cell.j - 1; j <= cell.j + 1; j++) {
    //         if (i != cell.i || j != cell.j) {
    //             if (queue[i][j] != null && i >= 0 && j >= 0) {
    //                 neighbors.push(queue[i][j]);
    //             }
    //         }
    //     }
    // }

    // 1) check if neighbor is valid
    // 2) check neighbor in respective direction
    
    // a) check above cell
    if (cell.i + 1 < queue.length) {
        if (queue[cell.i + 1][cell.j] != null && !queue[cell.i + 1][cell.j].fill); {
            neighbors.push(queue[cell.i + 1][cell.j]);
        }
    }
    // b) check cell to the right
    if (cell.j + 1 < queue[0].length) {
        if (queue[cell.i][cell.j + 1] != null && !queue[cell.i][cell.j + 1].fill) {
            neighbors.push(queue[cell.i][cell.j + 1]);
        }
    }
    // c) check cell below
    if (cell.i - 1 >= 0) {
        if (queue[cell.i - 1][cell.j] != null && !queue[cell.i - 1][cell.j].fill) {
            neighbors.push(queue[cell.i - 1][cell.j]);
        }
    }
    // d) check cell to the left
    if (cell.j - 1 >= 0) {
        if (queue[cell.i][cell.j - 1] != null && !queue[cell.i][cell.j - 1].fill) {
            neighbors.push(queue[cell.i][cell.j - 1]);
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

function dijkstra() {
    var path = [];
    var queue = new Array(grid.length);
    for (var i = 0; i < grid.length; i++) {
        queue[i] = new Array(grid[0].length);
        for (var j = 0; j < grid[0].length; j++) {
            queue[i][j] = Object.assign( Object.create( Object.getPrototypeOf(grid[i][j])), grid[i][j]);
        }
    }
    var reached_finish = false;
    
    while (queue.length > 0 && !reached_finish) {
        u = extractMin(queue);
        console.log(u);
        neighbors = getNeighbors(queue, u);

        console.log(neighbors);
        break;
    }
}