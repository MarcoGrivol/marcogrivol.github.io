// global variables
var bundle = null;
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
    // creates random array
    bundle = new Bundle(width, height, 20);
    bundle.shuffleArray();
}

function draw () {
    background(255);
    bundle.drawArray();
    switch (sorting_mode) {
        case "bubble":
            [tempo, fps] = bundle.bubbleSort(tempo, fps);
            break;
        case "merge":
            tempo = mergeSort(tempo);
            break;
        default:
            break;
    }
}

// iterative mergeSort from GeeksForGeeks
function mergeSort(tempo) { 
    var n = array.length;
    var curr_size = tempo;
    // set condition to stop
    if (curr_size > n - 1) {
        sorting_mode = null;
    } 
    var left_start;
    while (curr_size <= n - 1 && curr_size < tempo * 2) { 
        for (left_start = 0; left_start < n - 1; left_start += 2*curr_size) {
            var mid = min(left_start + curr_size - 1, n - 1); 
            var right_end = min(left_start + 2 * curr_size - 1, n - 1); 
            merge(left_start, mid, right_end); 
        } 
        curr_size = 2 * curr_size;
    } 
    return tempo * 2;
} 

function merge(l, m, r) { 
    var i, j, k; 
    var n1 = m - l + 1; 
    var n2 =  r - m; 
    var L = new Array(n1);
    var R = new Array(n2); 

    for (i = 0; i < n1; i++) {
        L[i] = array[l + i];
    } 
    for (j = 0; j < n2; j++) { 
        R[j] = array[m + 1 + j];
    } 

    i = 0; 
    j = 0; 
    k = l; 
    while (i < n1 && j < n2) { 
        if (L[i] <= R[j]) { 
            array[k] = L[i]; 
            i++; 
        } else { 
            array[k] = R[j]; 
            j++; 
        } 
        k++; 
    } 

    while (i < n1) { 
        array[k] = L[i]; 
        i++; 
        k++; 
    } 
    
    while (j < n2) { 
        array[k] = R[j]; 
        j++; 
        k++; 
    } 
} 