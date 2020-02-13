class Controller {
    constructor (width, height) {
        this.fps = 15; // should be the same as in main.html speed_slider
        this.fps_count = 0;
        this.tempo_i = null;
        this.tempo_j = null;
        this.sorting_mode = null;
        this.width = width;
        this.height = height;
        this.array_length = 6; // should be the same as in main.html length_slider
    }

    setArrayLength(length) {
        this.array_length = length;
    }

    setNewBundle() {
        bundle = new Bundle(this.width, this.height, this.array_length);
        controller.tempo_i = controller.array_length + 1;
        controller.tempo_j = controller.array_length + 1;
    }

    setNewFps(fps) {
        this.fps = fps;
    }

    resetFpsAndTempo() {
        this.fps_count = 0;
        controller.tempo_i = 1;
        controller.tempo_j = 1;
    }
}