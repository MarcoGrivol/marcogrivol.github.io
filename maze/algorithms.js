// returns the cell with the minimum lambda
function extractMin(queue) {
    var min = queue[0][0];
    var i_index = 0;
    var j_index = 0;
    console.log("ola");
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (queue[i][j].lambda < min.lambda) {
                min = queue[i][j];
                i_index = i;
                j_index = j;
            }
        }
    }
    console.log("ola");
    queue[i_index][j_index] = null;
    console.log("ola");
    return min;
}

// returns all the neighbors around a cell
function getNeighbors(cell) {
    var neighbors = [];
    for (var i = cell.i - 1; i <= cell.i + 1; i++) {
        for (var j = cell.j - 1; j <= cell.j + 1; j++) {
            if (i != cell.i || j != cell.j) {
                if (i >= 0 && j >= 0) {
                    neighbors.push(grid[i][j]);
                }
            }
        }
    }
    return neighbors;
}

function queueIncludesCell(queue, cell) {
    for (var i = 0; i < queue.length; i++) {
        if (queue[i].includes(cell)) {
            return true;
        }
    }
    return false;
}

function cloneGrid() {
    var queue = new Array(grid.length * grid[0].length);
    console.log(queue);
    return queue;
}

function dijkstra() {
    var path = [];
    queue = cloneGrid();
    var reached_finish = false;
    
    while (queue.length > 0 && !reached_finish) {
        u = extractMin(queue);
        console.log(u);
        neighbors = getNeighbors(u, queue);

        for (var i = 0; i < neighbors.length; i++) {
            console.log(queueIncludesCell(queue, neighbors[i]));
        }
        break;
    }
}