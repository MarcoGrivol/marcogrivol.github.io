class Bundle {
    constructor(width, height, length) {
        this.window_width = width;
        this.window_height = height;
        this.width = width / length; // const width of each element
        this.height = height / length; // const height of each element
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

    drawBar() {
        for (var i = 0 ; i < this.array.length; i++) {
            stroke(0);
            strokeWeight(1);
            if (this.overglow_index.includes(i)) {
                var index = this.overglow_index.indexOf(i);
                var color = this.overglow_color[index].split(', ');
                if (color.length > 1) {
                    fill(color[0], color[1], color[2]);
                } else {
                    fill(color[0]); // removes this for only RGB
                }
            } else { 
                fill(209, 209, 209);
            }
            var height = this.height * this.array[i];
            rect(i * this.width, this.window_height - height, this.width, height);
        }
    }

    drawCircle() {
        for (var i = 0; i < this.array.length; i++) {
            stroke('gray');
            strokeWeight(5);
            noFill();
            ellipse((i * this.width) + this.height, this.window_height / 2, this.height * this.array[i]);
        }
        // draw the overglow after so it overrides the gray color
        for (var i = 0; i < this.overglow_index.length; i++) {
            var index = this.overglow_index[i];
            var color = this.overglow_color[i].split(', ');
            if (color.length > 1) {
                stroke(color[0], color[1], color[2]);
            } else {
                stroke(color[0]); // removes this for only RGB
            }
            strokeWeight(5);
            noFill();
            ellipse((index * this.width) + this.height, this.window_height / 2, this.height * this.array[index]);
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
            delete (controller.minimum);
            return;
        }
        this.addToOverglow(j, '0, 242, 255');
        this.addToOverglow(controller.minimum, 'red');
        this.addToOverglow(i, 'orange'); // orange will override any other color
    }

    partitionLoop() {
        this.resetOverglow();
        if (controller.tempo_i < controller.tempo_j) {
            if (this.array[controller.tempo_i] < controller.pivot) {
                controller.tempo_i++;
            } else if (this.array[controller.tempo_j] >= controller.pivot) {
                controller.tempo_j--;
            } else {
                this.swap(controller.tempo_i, controller.tempo_j);
            }
            this.addToOverglow(controller.tempo_i, 'orange');
            this.addToOverglow(controller.tempo_j, 'red');
        } else {
            var index = controller.tempo_j;
            if (this.array[controller.tempo_j] < controller.pivot) {
                index++;
            }
            this.swap(controller.end - 1, index);
            controller.partition = index;
            
            controller.stack.push(controller.partition + 1);
            controller.stack.push(controller.end);

            controller.stack.push(controller.start);
            controller.stack.push(controller.partition);

            controller.partition_loop = false; // end the partition loop
        }
        this.addToOverglow(controller.pivot, '0, 242, 255');
    }

    quickSort() {
        if (controller.stack.length > 0) {
            controller.end = controller.stack.pop();
            controller.start = controller.stack.pop();

            if (controller.end - controller.start >= 2) {
                controller.partition = controller.start;
                
                // this is the partition function without the loop
                controller.tempo_i = controller.start;
                controller.tempo_j = controller.end - 2;
                controller.pivot = this.array[controller.partition];
                this.swap(controller.partition, controller.end - 1);

                controller.partition_loop = true; // stop this function ultil the partition is over

                this.resetOverglow();
                this.addToOverglow(controller.pivot, '0, 242, 255');
            }
        } else {
            this.resetOverglow();
            delete (controller.stack);
            delete (controller.start);
            delete (controller.end);
            delete (controller.partition);
            controller.sorting_mode = null;
        }
    }

    merge () {
        this.resetOverglow();
        if (controller.merge_i <= controller.mid && controller.merge_j <= controller.to) {
            if (controller.temp[controller.merge_i] < controller.temp[controller.merge_j]) {
                this.array[controller.merge_k++] = controller.temp[controller.merge_i++];
            } else {
                this.array[controller.merge_k++] = controller.temp[controller.merge_j++];
            }       
            this.addToOverglow(controller.merge_i, 'purple');
            this.addToOverglow(controller.merge_j, 'green');
            this.addToOverglow(controller.merge_k, '204, 255, 0');
        } else {
            while (controller.merge_i < this.array.length && controller.merge_i <= controller.mid) {
                this.array[controller.merge_k++] = controller.temp[controller.merge_i++];
            }
            for (controller.merge_i = controller.from; controller.merge_i <= controller.to; controller.merge_i++) {
                controller.temp[controller.merge_i] = this.array[controller.merge_i];
            }
            // end merge function
            controller.merge_loop = false;
        }
    }

    mergeSort() {
        if (controller.m <= controller.high - controller.low) {
            if (controller.tempo_i < controller.high) {

                controller.from = controller.tempo_i;
                controller.mid = controller.tempo_i + controller.m - 1;
                controller.to = Math.min(controller.tempo_i + (2 * controller.m) - 1, controller.high);
                        
                controller.merge_i = controller.from;
                controller.merge_j = controller.mid + 1;
                controller.merge_k = controller.from;

                controller.merge_loop = true;

                controller.tempo_i += 2 * controller.m;
            } else {
                controller.tempo_i = controller.low;
                controller.m = controller.m * 2;
            }
        } else {
            delete (controller.temp);
            delete (controller.high);
            delete (controller.low);
            delete (controller.m);
            delete (controller.from);
            delete (controller.mid);
            delete (controller.to);
            delete (controller.merge_i);
            delete (controller.merge_j);
            delete (controller.merge_k);
            delete (controller.merge_loop);
            controller.sorting_mode = null;
        }
    }
} 