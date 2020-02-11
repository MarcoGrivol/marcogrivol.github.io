// global variables
var tempo = null;
var fps = null;
var sorting_mode = null;

function setup () {
    // get div dimensions
    var div = document.getElementById('canvas');
    height = div.offsetHeight;
    width = div.offsetWidth;
    // create the canvas
    var canvas_div = createCanvas(width, height);
    canvas_div.parent('canvas');
    canvas_div.center();
    // creates the controller for the animations and buttons
    controller = new Controller(width, height);
    controller.setNewBundle();
}

function draw () {
    background(255);
    bundle.drawArray();
    bundle.drawOverglow();

    // controls the speed
    controller.fps_count++;
    if (controller.fps_count >= floor(frameRate() / controller.fps)) {
        controller.fps_count = 0;
        switch (controller.sorting_mode) {
            case "bubble":
                bundle.bubbleSort();
                break;
            case "insertion":
                bundle.insertionSort();
                break;
            case "selection":
                bundle.selectionSort();
                break;
            case "quick":
                console.log(bundle.array);
                bundle.quickSort();
                console.log(bundle.array);
                controller.sorting_mode = null;
                break;
            case "merge":
                tempo = mergeSort(tempo);
                break;
            default:
                break;
        }
    }
}