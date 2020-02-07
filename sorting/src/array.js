class Bundle {
    constructor(width, height, length) {
        this.width = width / length;
        this.height = height / length;
        this.array = new Array(length);
        for (var i = 0; i < this.array.length; i++) {
            this.array[i] = i + 1;
        }
    }

    // shuffleArray from Laurens Holst - https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffleArray() {
        for (let i = this.array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        }
    }

    drawElement(index, index_swap) {
        stroke(0);
        fill('red');
        rect(index * this.width, 0, this.width, this.height * this.array[index]);
        if (index_swap != null) {
            stroke(0);
            fill('green');
            rect(index_swap * this.width, 0, this.width, this.height * this.array[index_swap])
        }
    }

    drawArray() {
        for (var i = 0; i < this.array.length; i++) {
            stroke(0);
            fill(209, 249, 255);
            rect(i * this.width, 0, this.width, this.height * this.array[i]);
        }
    }

    // using if statments instead of while or for loops allows the p5.js draw()
    // to draw each movement of the bubbleSort()
    bubbleSort(tempo, fps) {
        var i = tempo - 1;
        var j = fps - 1;
        this.drawElement(j);
        if (i < this.array.length) {
            if (j < this.array.length - 1 - i) {
                if (this.array[j + 1] < this.array[j]) {
                    this.drawElement(j, j + 1);
                    var aux = this.array[j];
                    this.array[j] = this.array[j + 1];
                    this.array[j + 1] = aux;
                }
            } else {
                fps = 0;
                tempo++;
            }
        }
        return [tempo, ++fps];
    }
}