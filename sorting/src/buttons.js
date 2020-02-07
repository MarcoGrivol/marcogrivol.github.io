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
}

function setBubbleSort() {
    controller.sorting_mode = "bubble";
    controller.resetFpsAndTempo();
}

function setMergeSort() {
    sorting_mode = "merge";
    tmp = 1;
    frameRate(30);
}

function setShuffle() {
    bundle.shuffleArray();
    sorting_mode = null;
}

function speedSlider(output) {
    console.log("hellow", output.innerHTML);
    output.innerHTML = this.value;
}