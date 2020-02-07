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

    // using if statments instead of while or for loops allows the p5.js draw()
    // to draw each movement of the bubbleSort()
    bubbleSort(tempo_i, tempo_j) {
        var i = controller.tempo_i - 1;
        var j = controller.tempo_j - 1;
        // draw and add to overglow
        this.drawElement(j, '0, 242, 255');
        this.resetOverglow();
        this.addToOverglow(j, '0, 242, 255');
        
        if (i < this.array.length) {
            if (j < this.array.length - 1 - i) {
                if (this.array[j + 1] < this.array[j]) {
                    // draw and add to overglow
                    this.drawElement(j + 1, 'red');
                    this.addToOverglow(j + 1, 'red');
                    // swap
                    var aux = this.array[j];
                    this.array[j] = this.array[j + 1];
                    this.array[j + 1] = aux;
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
}