// returns the cell with the minimum lambda
function extractMin(queue) {
    var min = queue[0][0];
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (queue[i][j].lambda < min.lambda) {
                min = queue[i][j];
            }
        }
    }
    return min;
}

// returns all the neighbors around a cell
function neighbors(cell) {
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

function dijkstra() {
    var path = [];
    var queue = grid;
    var reached_finish = false;
    
    while (queue.length > 0 && !reached_finish) {
        u = extractMin(queue);
        console.log(u);
        neighbors = neighbors(u, queue);
        for (var i = 0; i < neighbors.length; i++) {
            if (queue.includes(neighbors[i])) {
                console.log("inclui");
            }
        }
        break;
    }
}