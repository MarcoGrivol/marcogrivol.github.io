// bubbles animation and physics
class Bubble {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.diameter = 20;
        this.color = color;
        this.gravity = 1;
    }
    
    draw(c=false) {
        stroke(0);
        if (c) {
            fill(color(c));
        } else { 
            fill(this.color);
        }
        ellipse(this.x, this.y, this.diameter);
    }

    float() {
        this.y -= this.gravity;
        this.gravity += gravity_constant;
    }

    windEffect(wind) {
        var [heading, strength] = wind;
        if (heading > 0 && heading < 90) {
            // nordeste
            var y_offset = heading / 90;
            var x_offset = 1 - y_offset;
            this.x += x_offset * strength;
            this.y -= y_offset * strength;
        }
        else if (heading > 90 && heading < 180) {
            // noroeste
            var x_offset = heading / 180;
            var y_offset = 1 - x_offset;
            this.x -= x_offset * strength;
            this.y -= y_offset * strength;
        }
        else if (heading > -180 && heading < -90) {
            // sudoeste
            var y_offset = heading / -180;
            var x_offset = 1 - y_offset;
            this.x -= x_offset * strength;
            this.y += y_offset * strength;
        }
        else if (heading > -90 && heading < 0) {
            // sudeste
            var x_offset = heading / -90;
            var y_offset = 1 - x_offset;
            this.x += x_offset * strength;
            this.y += y_offset * strength;
        }
        if (heading == 0 || heading == 180) {
            // horizontal
            if (heading == 0) {
                var x_offset = 1;
            } else {
                var x_offset = -1;
            }
            this.x += x_offset * strength;
        } 
        else if (heading == 90 || heading == -90) {
            // vertical
            if (heading == 90) {
                var y_offset = 1;
            } else {
                var y_offset = -1;
            }
            this.y += y_offset * strength;
        }
    }

    delete() {
        if (this.y < 0) {
            return true;
        } return false;
    }

    getPos() {
        return [this.x, this.y];
    }
}

// only responsible for animation and wind visualization
// does not affect the bubbles
class Wind {
    constructor(point_a, point_b) {
        this.a = point_a;
        this.b = point_b;
        this.color = color('#4aeff7');
        this.slope = this.lineSlope();
        this.OFFSET_CONSTANT = 5;
    }

    draw() {
        stroke(this.color);
        // main line
        line(this.a[0], this.a[1], this.b[0], this.b[1]);
        // lines above and below
        if (this.slope < 0) {
            line(this.a[0] -5, this.a[1] + 5, this.b[0] - 5, this.b[1] + 5);
            line(this.a[0] + 5, this.a[1] - 5, this.b[0] + 5, this.b[1] - 5);
        } else {
            line(this.a[0] + 5, this.a[1] + 5, this.b[0] + 5, this.b[1] + 5);
            line(this.a[0] - 5, this.a[1] - 5, this.b[0] - 5, this.b[1] - 5);
        }
    }

    lineSlope() {
        // a[1] > b[1], as y decreases in cartesean coordinates, it increases in p5.js
        var delta_x = this.b[0] - this.a[0];
        var delta_y = this.a[1] - this.b[1];
        if (delta_x == 0 || delta_y == 0) {
            var m = 0;
        } else {
            var m = delta_y / delta_x;
        }
        return m;
    }
}

// wind settings to affect the bubbles
class windSettings {
    constructor() {
        this.value = false;
        this.a = NaN;
        this.b = NaN;
        this.heading = NaN;
        this.strength = 20;
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }

    setCoordinates(point_a, point_b) {
        this.a = point_a;
        this.b = point_b;
        var x = this.b[0] - this.a[0];
        var y = this.a[1] - this.b[1];
        this.heading = degrees(createVector(x, y).heading());
    }

    getCoordinates() {
        return [this.heading, this.strength];
    }
}

// how the bubbles get affected by the wind
class windGrid {
    constructor(width, height, resolution) {
        this.width = width;
        this.height = height;
        this.resolution = resolution;
        this.rows = Math.floor(this.width / this.resolution);
        this.cols = Math.floor(this.height / this.resolution);
        this.grid = new Array(this.rows);
        for (var i = 0; i < this.rows; i++) {
            this.grid[i] = new Array(this.cols);
            for (var j = 0; j < this.cols; j++) {
                this.grid[i][j] = new windSettings();
            }
        }
    }

    draw() {
        // for (var i = 0; i < this.rows; i++) {
        //     for (var j = 0; j < this.cols; j++) {
        //         noFill();
        //         if (this.grid[i][j].getValue()) {
        //             fill('blue');
        //         }
        //         rect(i * this.resolution, j * this.resolution, this.resolution, this.resolution);
        //     }
        // }
    }

    getIndex(mouseX, mouseY) {
        var i = Math.floor(mouseX / this.resolution);
        var j = Math.floor(mouseY / this.resolution);
        return [i, j];
    }

    setWind(mouseX, mouseY, point_a, point_b) {
        var [i, j] = this.getIndex(mouseX, mouseY);
        this.grid[i][j].setValue(true);
        this.grid[i][j].setCoordinates(point_a, point_b);
    }

    checkWind(coordinates) {
        var [i, j] = this.getIndex(coordinates[0], coordinates[1]);
        if (this.grid[i][j].getValue()) {
            return [true, i, j];
        } return [false, NaN, NaN];
    }

    windParameters(i, j) {
        return this.grid[i][j].getCoordinates();
    }
}