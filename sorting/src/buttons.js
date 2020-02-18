// controller is defined in script.js setup()
var controller = null;
// bundle is defined in script.js setup()
var bundle = null;

// speed slider
var speed_slider = document.getElementById("speed_slider");
var speed_output = document.getElementById("show_speed");
speed_output.innerHTML = speed_slider.value;
speed_slider.oninput = function() {
    speed_output.innerHTML = this.value;
    controller.setNewFps(parseInt(this.value, 10));
}

// array lenght slider
var length_slider = document.getElementById("length_slider");
var length_output = document.getElementById("show_length");
length_output.innerHTML = length_slider.value;
length_slider.oninput = function() {
    length_output.innerHTML = this.value;
    controller.setArrayLength(parseInt(this.value, 10)); // set the new length
    controller.setNewBundle(); // create a bundle with new length
    controller.sorting_mode = null;
    controller.resetFpsAndTempo();
    bundle.resetOverglow();
}

function setShuffle() {
    bundle.shuffleArray();
    bundle.resetOverglow();
    controller.resetFpsAndTempo();
    controller.sorting_mode = null;
}

function speedSlider(output) {
    console.log("hellow", output.innerHTML);
    output.innerHTML = this.value;
}

function setBubbleSort() {
    controller.sorting_mode = "bubble";
    controller.resetFpsAndTempo();
}

function setInsertionSort() {
    controller.sorting_mode = "insertion";
    controller.resetFpsAndTempo();
    controller.key = bundle.array[1];
}

function setSelectionSort() {
    controller.sorting_mode = "selection";
    controller.resetFpsAndTempo();
    controller.minimum = 0;
}

function setQuickSort() {
    controller.sorting_mode = "quick";
    controller.resetFpsAndTempo();
    controller.partition = null;
    controller.pivot = null;
    controller.start = 0;
    controller.end = controller.array_length;
    controller.stack = [controller.start, controller.end];
    controller.index = null;
    controller.partition_loop = false; // to simulate the while loop on the partition function
    controller.quicksort_loop = false; // to simualte the while loop on the quicksort function
}

function setMergeSort() {
    controller.sorting_mode = "merge";
    controller.resetFpsAndTempo();
    controller.temp = bundle.array.slice();
    controller.m = 1;
    controller.tempo_i = 0;
    controller.high = controller.array_length - 1;
    controller.low = 0;
    controller.merge_loop = false; // switch between the mergeSort and merge functions
    // variables to be defined in mergeSort and used in merge
    controller.from = null;
    controller.mid = null;
    controller.to = null;
    // variables to be used in the merge function
    controller.merge_i = null; 
    controller.merge_j = null;
    controller.merge_k = null;
}

function setBarDrawingMode() {
    controller.drawing_mode = "bar";
}

function setCircleDrawingMode() {
    controller.drawing_mode = "circle";
}
