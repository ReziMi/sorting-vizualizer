let randomize_array = document.getElementById('randomize_array_btn');

let bubble_btn = document.getElementById("bubble_btn");
let insertion_btn = document.getElementById("insertion_btn");
let selection_btn = document.getElementById("selection_btn");
let merge_btn = document.getElementById("merge_btn");
let quick_btn = document.getElementById("quick_btn");

let bars_container = document.getElementById("bars_container");
let minRange = 1;
let maxRange = 300; // Adjusted range for better visualization
let numOfBars = 35;
let unsorted_array = new Array(numOfBars);

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
    for (let i = 0; i < numOfBars; i++) {
        unsorted_array[i] = randomNum(minRange, maxRange);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array) {
    bars_container.innerHTML = ''; // Clear previous bars
    for (let i = 0; i < array.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] + 'px';
        bars_container.appendChild(bar);
    }
}

randomize_array.addEventListener("click", function() {
    createRandomArray();
    renderBars(unsorted_array);
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    let n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                // Swap elements
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                bars[j].style.height = array[j] + 'px';
                bars[j + 1].style.height = array[j + 1] + 'px';
                bars[j].style.backgroundColor = "lightgreen";
                bars[j + 1].style.backgroundColor = "lightgreen";
                await sleep(30); // Allow the color to be visible for 30ms
            }
            bars[j].style.backgroundColor = "cyan";
            bars[j + 1].style.backgroundColor = "cyan";
        }
    }
    return array;
}

bubble_btn.addEventListener("click", async function() {
    await bubbleSort(unsorted_array);
    console.log(unsorted_array);
});

async function insertionSort(array) {
    let bars = document.getElementsByClassName("bar");

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = "cyan";
        await sleep(50);

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j] + 'px';
            bars[j + 1].style.backgroundColor = "lightgreen";
            await sleep(30);

            bars[j + 1].style.backgroundColor = "white";
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = key + 'px';
        bars[j + 1].style.backgroundColor = "lightgreen";
        await sleep(30);
        bars[j + 1].style.backgroundColor = "white";
    }

    return array;
}

insertion_btn.addEventListener("click", async function() {
    await insertionSort(unsorted_array);
    console.log(unsorted_array);
});


async function selectionSort(array) {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        bars[minIndex].style.backgroundColor = "bisque";
        await sleep(50);

        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                bars[minIndex].style.backgroundColor = "white";
                minIndex = j;
                bars[minIndex].style.backgroundColor = "cyan";
            }
            await sleep(30);
        }

        if (minIndex != i) {
            // Swap elements
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;

            bars[i].style.height = array[i] + 'px';
            bars[minIndex].style.height = array[minIndex] + 'px';
            bars[i].style.backgroundColor = "lightgreen";
            bars[minIndex].style.backgroundColor = "lightgreen";
            await sleep(30);

            bars[i].style.backgroundColor = "white";
            bars[minIndex].style.backgroundColor = "white";
        } else {
            bars[minIndex].style.backgroundColor = "white";
        }
    }

    return array;
}


selection_btn.addEventListener("click", async function() {
    await selectionSort(unsorted_array);
    console.log(unsorted_array);
});

async function partition(array, low, high) {
    let bars = document.getElementsByClassName("bar");
    let pivot = array[high];
    bars[high].style.backgroundColor = "cyan";
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            // Swap elements
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            bars[i].style.height = array[i] + 'px';
            bars[j].style.height = array[j] + 'px';
            bars[i].style.backgroundColor = "lightgreen";
            bars[j].style.backgroundColor = "lightgreen";
            await sleep(30);

            bars[i].style.backgroundColor = "white";
            bars[j].style.backgroundColor = "white";
        }
    }

    // Swap the pivot element with the element at i + 1
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;

    bars[i + 1].style.height = array[i + 1] + 'px';
    bars[high].style.height = array[high] + 'px';
    bars[i + 1].style.backgroundColor = "lightgreen";
    bars[high].style.backgroundColor = "lightgreen";
    await sleep(30);

    bars[i + 1].style.backgroundColor = "white";
    bars[high].style.backgroundColor = "white";

    return i + 1;
}

async function quickSort(array, low, high) {
    if (low < high) {
        let pi = await partition(array, low, high);

        await quickSort(array, low, pi - 1);
        await quickSort(array, pi + 1, high);
    }
    return array;
}


quick_btn.addEventListener("click", async function() {
    await quickSort(unsorted_array, 0, unsorted_array.length - 1);
    console.log(unsorted_array);
});


async function mergeSort(array, left, right) {
    if (left >= right) return;

    let mid = Math.floor((left + right) / 2);

    await mergeSort(array, left, mid);
    await mergeSort(array, mid + 1, right);
    await merge(array, left, mid, right);
}

async function merge(array, left, mid, right) {
    let bars = document.getElementsByClassName("bar");
    let n1 = mid - left + 1;
    let n2 = right - mid;

    let leftArray = new Array(n1);
    let rightArray = new Array(n2);

    // Copy data to temp arrays
    for (let i = 0; i < n1; i++) {
        leftArray[i] = array[left + i];
    }
    for (let j = 0; j < n2; j++) {
        rightArray[j] = array[mid + 1 + j];
    }

    // Merge the temp arrays back into array[left...right]
    let i = 0; // Initial index of first subarray
    let j = 0; // Initial index of second subarray
    let k = left; // Initial index of merged subarray

    while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            bars[k].style.height = leftArray[i] + 'px';
            bars[k].style.backgroundColor = "lightgreen";
            i++;
        } else {
            array[k] = rightArray[j];
            bars[k].style.height = rightArray[j] + 'px';
            bars[k].style.backgroundColor = "lightgreen";
            j++;
        }
        k++;
        await sleep(30);
    }

    // Copy the remaining elements of leftArray[], if any
    while (i < n1) {
        array[k] = leftArray[i];
        bars[k].style.height = leftArray[i] + 'px';
        bars[k].style.backgroundColor = "lightgreen";
        i++;
        k++;
        await sleep(30);
    }

    // Copy the remaining elements of rightArray[], if any
    while (j < n2) {
        array[k] = rightArray[j];
        bars[k].style.height = rightArray[j] + 'px';
        bars[k].style.backgroundColor = "lightgreen";
        j++;
        k++;
        await sleep(30);
    }

    // Reset color
    for (let m = left; m <= right; m++) {
        bars[m].style.backgroundColor = "white";
    }
}

// Helper function for starting the merge sort process
async function startMergeSort(array) {
    await mergeSort(array, 0, array.length - 1);
    console.log(array);
}

merge_btn.addEventListener("click", async function() {
    await selectionSort(unsorted_array);
});

