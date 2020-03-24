class Bubble {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.diameter = 20;
        this.color = color;
        this.gravity = 1;
    }
    
    draw() {
        fill(this.color);
        ellipse(this.x, this.y, this.diameter);
    }

    float() {
        this.y -= this.gravity;
        this.gravity += gravity_constant;
    }

    delete() {
        if (this.y < -this.diameter) {
            return true;
        } return false;
    }
}

class Wind {
    constructor(point_a, point_b) {
        this.a = point_a;
        this.b = point_b;
        this.color = color('#4aeff7');
    }

    draw() {
        stroke(this.color);
        // main line
        line(this.a[0], this.a[1], this.b[0], this.b[1]);
        // lines above and below
        line(this.a[0] + 5, this.a[1] + 5, this.b[0] + 5, this.b[1] + 5);
        line(this.a[0] - 5, this.a[1] - 5, this.b[0] - 5, this.b[1] - 5);
    }
}