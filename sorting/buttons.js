function setBubbleSort() {
    sorting_mode = "bubble";
    tmp = 0;
    frameRate(30);
}

function setMergeSort() {
    sorting_mode = "merge";
    tmp = 1;
    frameRate(1);
}

function setShuffle() {
    shuffleArray(array);
    sorting_mode = null;
}