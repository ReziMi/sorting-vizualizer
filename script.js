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
