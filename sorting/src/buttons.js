function setBubbleSort() {
    sorting_mode = "bubble";
    tmp = 1;
    fps = 1;
    frameRate(1);
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