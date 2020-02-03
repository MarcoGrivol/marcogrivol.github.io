// html buttons here
function reset() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            // only reset normal cell, ignore start and finish
            if (grid[i][j].start != true && grid[i][j].finish != true) {
                grid[i][j].fill = false;
                grid[i][j].path = false;
            }
        }
    }
}

function pencil() {
    pencil_on = true;
    eraser_on = false;
}

function eraser() {
    eraser_on = true;
    pencil_on = false;
}

function go() {
    noLoop();
    console.log("noloop");
    dijkstra();
    console.log("acabou dijikstra");
    delay(3000);
}