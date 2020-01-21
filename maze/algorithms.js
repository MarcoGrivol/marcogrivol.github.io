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
function neighbors(cell, queue) {
    var neighbors = [];
    
}

function dijkstra() {
    var path = [];
    var queue = grid;
    var reached_finish = false
    while (queue.length > 0 && !reached_finish) {
        u = extractMin(queue);
        break;
    }
}