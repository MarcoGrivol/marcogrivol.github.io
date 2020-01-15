function Cell(x, y, w_size) {
    this.x = x;
    this.y = y;
    this.w = w_size;
    this.fill = false;
}

Cell.prototype.draw = function() {
    stroke(0);
    if (this.fill) {
        fill('red');
    } else {
        noFill();
    }
    rect(this.x, this.y, this.w, this.w);
}

Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
}