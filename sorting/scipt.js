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
    console.log(array);
    //mergeSort();
    console.log(array);
    frameRate(1);
}

var tmp = 1;
function draw () {
    background(255);
    drawArray();
    tmp = mergeSort(tmp);
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
        for (var j = 0; j < array.length - 1; j++) {
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

function mergeSort(tmp) 
{ 
    var n = array.length;
   var curr_size = tmp;  // For current size of subarrays to be merged 
                   // curr_size varies from 1 to n/2 
   var left_start; // For picking starting index of left subarray 
                   // to be merged 
  
   // Merge subarrays in bottom up manner.  First merge subarrays of 
   // size 1 to create sorted subarrays of size 2, then merge subarrays 
   // of size 2 to create sorted subarrays of size 4, and so on. 
   while (curr_size<=n-1 && curr_size < tmp * 2) 
   { 
       // Pick starting point of different subarrays of current size 
       for (left_start=0; left_start<n-1; left_start += 2*curr_size) 
       { 
           // Find ending point of left subarray. mid+1 is starting  
           // point of right 
           var mid = min(left_start + curr_size - 1, n-1); 
  
           var right_end = min(left_start + 2*curr_size - 1, n-1); 
  
           // Merge Subarrays arr[left_start...mid] & arr[mid+1...right_end] 
           merge(left_start, mid, right_end); 
       } 
       curr_size = 2 * curr_size;
   } 
   return tmp * 2;
} 
  
/* Function to merge the two haves arr[l..m] and arr[m+1..r] of array arr[] */
function merge(l, m, r) 
{ 
    var i, j, k; 
    var n1 = m - l + 1; 
    var n2 =  r - m; 
  
    /* create temp arrays */
    var L = new Array(n1);
    var R = new Array(n2); 
  
    /* Copy data to temp arrays L[] and R[] */
    for (i = 0; i < n1; i++) 
        L[i] = array[l + i]; 
    for (j = 0; j < n2; j++) 
        R[j] = array[m + 1+ j]; 
  
    /* Merge the temp arrays back into arr[l..r]*/
    i = 0; 
    j = 0; 
    k = l; 
    while (i < n1 && j < n2) 
    { 
        if (L[i] <= R[j]) 
        { 
            array[k] = L[i]; 
            i++; 
        } 
        else
        { 
            array[k] = R[j]; 
            j++; 
        } 
        k++; 
    } 
  
    /* Copy the remaining elements of L[], if there are any */
    while (i < n1) 
    { 
        array[k] = L[i]; 
        i++; 
        k++; 
    } 
  
    /* Copy the remaining elements of R[], if there are any */
    while (j < n2) 
    { 
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