function Cell(x, y, w_size, start, finish) {
    this.x = x;
    this.y = y;
    this.w = w_size;
    this.fill = false;
    this.predecessor = null;
    this.lambda = Infinity;
    if (start) {
        this.start = true;
        this.fill = true;
        this.lambda = 0;
    } else { 
        this.start = false;
    }
    if (finish) {
        this.finish = true;
        this.fill = true;
    } else {
        this.finish = false;
    }
}

Cell.prototype.draw = function() {
    stroke(0);
    if (this.fill) {
        // start and finish shall have different colors
        if (this.start) {
            fill('blue');
        }
        else if(this.finish) {
            fill('red');
        } else {
            fill('black');
        }
    } else {
        noFill();
    }
    rect(this.x, this.y, this.w, this.w);
}

Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
}