var array = [];
var w_size = 0;
var height = 0;
var width = 0;

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
    array = new Array(200);
    for (var i = 0; i < array.length; i++) {
        array[i] = i + 1;
    }
    array = shuffleArray(array);
    w_size = width / array.length;
    h_size = height / array.length;
    frameRate(10);
}

var tmp = null;
var sorting_mode = null;
function draw () {
    background(255);
    drawArray();
    switch (sorting_mode) {
        case "bubble":
            tmp = bubblesort(tmp);
            break;
        case "merge":
            tmp = mergeSort(tmp);
            break;
        default:
            break;
    }
}

function drawArray() {
    for (var i = 0; i < array.length; i++) {
        stroke(0);
        fill('blue');
        rect(i * w_size, 0, w_size, h_size * array[i]);
    }
}

function bubblesort(tmp) {
    var i = tmp - 1;
    while (i < array.length && i < tmp + 1) {
        for (var j = 0; j < array.length - 1 - i; j++) {
            if (array[j + 1] < array[j]) {
                var aux = array[j];
                array[j] = array[j + 1];
                array[j + 1] = aux;
            }
        }
        i++;
    }
    return ++tmp;
}

// iterative mergeSort from GeeksForGeeks
function mergeSort(tmp) { 
    var n = array.length;
    var curr_size = tmp;
    // set condition to stop
    if (curr_size > n - 1) {
        sorting_mode = null;
    } 
    var left_start;
    while (curr_size <= n - 1 && curr_size < tmp * 2) { 
        for (left_start = 0; left_start < n - 1; left_start += 2*curr_size) {
            var mid = min(left_start + curr_size - 1, n - 1); 
            var right_end = min(left_start + 2 * curr_size - 1, n - 1); 
            merge(left_start, mid, right_end); 
        } 
        curr_size = 2 * curr_size;
    } 
    return tmp * 2;
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

function shuffleArray (array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    return array;
}