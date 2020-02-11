class Bundle {
    constructor(width, height, length) {
        this.width = width / length;
        this.height = height / length;
        this.array = new Array(length);
        for (var i = 0; i < this.array.length; i++) {
            this.array[i] = i + 1;
        }
        this.overglow_index = [];
        this.overglow_color = [];
    }

    // shuffleArray from Laurens Holst - https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffleArray() {
        for (let i = this.array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        }
    }

    drawElement(index, color) {
        stroke(0);
        color = color.split(', ');
        if (color.length > 1) {
            fill(color[0], color[1], color[2]);
        } else {
            fill(color[0]);
        }
        rect(index * this.width, 0, this.width, this.height * this.array[index]);
    }

    drawArray() {
        for (var i = 0; i < this.array.length; i++) {
            stroke(0);
            fill(209, 209, 209);
            rect(i * this.width, 0, this.width, this.height * this.array[i]);
        }
    }

    addToOverglow(index, color) {
        this.overglow_index.push(index);
        this.overglow_color.push(color);
    }

    resetOverglow() {
        this.overglow_index = [];
        this.overglow_color = [];
    }

    drawOverglow() {
        for (var i = 0; i < this.overglow_index.length; i++) {
            this.drawElement(this.overglow_index[i], this.overglow_color[i]);
        }
    }

    swap(i, j) {
        var tmp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = tmp;
    }

    // using if statments instead of while or for loops allows the p5.js draw()
    // to draw each movement of the bubbleSort()
    bubbleSort() {
        this.resetOverglow();
        var i = controller.tempo_i - 1;
        var j = controller.tempo_j - 1;
        if (i < this.array.length) {
            if (j < this.array.length - 1 - i) {
                if (this.array[j + 1] < this.array[j]) {
                    // swap
                    var aux = this.array[j];
                    this.array[j] = this.array[j + 1];
                    this.array[j + 1] = aux;
                    this.addToOverglow(j + 1, '0, 242, 255');
                    this.addToOverglow(j, 'red');
                } else {
                    this.addToOverglow(j, '0, 242, 255');
                }
            } else { // would happen at the end of the for j loop
                controller.tempo_j = 0;
                controller.tempo_i++;
            }
        }
        ++controller.tempo_j;
        // stop bubbleSort
        if (j >= this.array.length) {
            controller.sorting_mode = null;
            return;
        }
    }

    // algorithm adapted from Introduction to Algorithms, Third Edition - CLRS
    insertionSort() {
        var j = controller.tempo_j; // starts at 1, tempo_j sums 1 every iteration
        this.resetOverglow();
        this.addToOverglow(j, '0, 242, 255');
        if (j < this.array.length) {
            var i = j - controller.tempo_i; // starts at 0, tempo_i sums 1 every iteration
            if (i >= 0 && this.array[i] > controller.key) {
                this.array[i + 1] = this.array[i];
                this.addToOverglow(i, 'red')
                controller.tempo_i++;
            } else {
                controller.tempo_j++;
                controller.tempo_i = 1;
                this.array[i + 1] = controller.key;
                if (j <= this.array.length - 2) {
                    controller.key = this.array[j + 1];
                }
            }
        } else {
            delete(controller.key);
            controller.sorting_mode = null;
            console.log(this.array);
        }
    }

    selectionSort() {
        this.resetOverglow();
        var i = controller.tempo_i - 1;
        if (i < this.array.length) {
            var j = i + controller.tempo_j;
            if (j < this.array.length) {
                if (this.array[controller.minimum] > this.array[j]) {
                    controller.minimum = j;
                }
                controller.tempo_j++;
            } else {
                this.resetOverglow();
                this.swap(i, controller.minimum);
                controller.minimum = i + 1;
                controller.tempo_j = 1;
                controller.tempo_i++;
            }
        } else {
            controller.sorting_mode = null;
            return;
        }
        this.addToOverglow(j, '0, 242, 255');
        this.addToOverglow(controller.minimum, 'red');
        this.addToOverglow(i, 'orange'); // orange will override any other color
    }

    partition() {
        var x = this.array[this.array.length - 1];
        var i = controller.partition - 1;
        for (var j = controller.partition; j < this.array.length - 2; j++) {
            if (this.array[j] <= x) {
                i = i + 1;
                this.swap(i, j);
            }
        }
        this.swap(i + 1, this.array.length - 1);
        return i + 1;
    }

    quickSort(q) {
        if (controller.partition < this.array.length - 1) {
            var q = this.partition();
            this.quickSort(q - 1);
            this.quickSort(q + 1);
        }
    }
} 