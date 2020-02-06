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
    console.log("noloop");
    //dijkstra();
    noLoop();
    for (var k = 0; k < 9; k++) {
        clear();
        grid[0][0].fill = !grid[0][0].fill;
        background(255);
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                grid[i][j].paintCell();
            }
        }
        console.log("devia ter mudado");
        delay(750);
    }
    console.log("acabou dijikstra");
    delay(1000);
}