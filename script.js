const container = document.getElementById("array-container");

const sizeSlider = document.getElementById("sizeSlider");
const speedSlider = document.getElementById("speedSlider");

const sizeValue = document.getElementById("sizeValue");
const speedValue = document.getElementById("speedValue");

let arraySize = 20;
let speed = 500;
function updateComplexity(
    algorithm,
    time,
    space
) {

    document.getElementById(
        "algorithm-name"
    ).innerText =
        "Algorithm: " + algorithm;

    document.getElementById(
        "time-complexity"
    ).innerText =
        "Time Complexity: " + time;

    document.getElementById(
        "space-complexity"
    ).innerText =
        "Space Complexity: " + space;
}

function disableButtons() {

    document.getElementById("generate").disabled = true;
    document.getElementById("bubble").disabled = true;
    document.getElementById("selection").disabled = true;
    document.getElementById("insertion").disabled = true;
    document.getElementById("merge").disabled = true;
    document.getElementById("quick").disabled = true;
    document.getElementById("linear").disabled = true;
    document.getElementById("binary").disabled = true;

    sizeSlider.disabled = true;


}

function enableButtons() {

    document.getElementById("generate").disabled = false;
    document.getElementById("bubble").disabled = false;
    document.getElementById("selection").disabled = false;
    document.getElementById("insertion").disabled = false;
    document.getElementById("merge").disabled = false;
    document.getElementById("quick").disabled = false;
    document.getElementById("linear").disabled = false;
    document.getElementById("binary").disabled = false;

    sizeSlider.disabled = false;
}

function sleep(ms) {
    return new Promise(resolve =>
        setTimeout(resolve, ms));
}

function generateArray() {

    container.innerHTML = "";

    for (let i = 0; i < arraySize; i++) {

        let value =
            Math.floor(Math.random() * 300) + 20;

        let bar =
            document.createElement("div");

        bar.classList.add("bar");



        bar.style.height = value + "px";

        bar.innerText = value;

        container.appendChild(bar);
    }
}

sizeSlider.addEventListener("input", () => {

    arraySize = sizeSlider.value;

    sizeValue.innerText = arraySize;

    generateArray();
});

speedSlider.addEventListener("input", () => {

    speed = speedSlider.value;

    speedValue.innerText = speed;
});

//  BUBBLE SORT

async function bubbleSort() {
    updateComplexity(
        "Bubble Sort",
        "O(n^2)",
        "O(1)"
    );
    disableButtons();

    let bars =
        document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length; i++) {

        for (let j = 0; j < bars.length - i - 1; j++) {

            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";

            await sleep(speed);

            let h1 =
                parseInt(bars[j].style.height);

            let h2 =
                parseInt(bars[j + 1].style.height);

            let val1 =
                bars[j].innerText;

            let val2 =
                bars[j + 1].innerText;

            if (h1 > h2) {

                bars[j].style.height =
                    h2 + "px";

                bars[j + 1].style.height =
                    h1 + "px";

                bars[j].innerText = val2;
                bars[j + 1].innerText = val1;

                bars[j].style.background =
                    "green";

                bars[j + 1].style.background =
                    "green";

                await sleep(speed);
            }

            bars[j].style.background =
                "blue";

            bars[j + 1].style.background =
                "blue";
        }

        bars[bars.length - i - 1]
            .style.background = "orange";
    }

    for (let bar of bars) {

        bar.style.background =
            "green";
    }
    enableButtons();
}


document
    .getElementById("generate")
    .addEventListener("click",
        generateArray);

document
    .getElementById("bubble")
    .addEventListener("click",
        bubbleSort);

generateArray();


// SELECTION SORT


async function selectionSort() {
    updateComplexity(
        "Selection Sort",
        "O(n^2)",
        "O(1)"
    );

    disableButtons();

    let bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length - 1; i++) {

        let minIndex = i;

        bars[minIndex].style.background = "purple";

        for (let j = i + 1; j < bars.length; j++) {

            bars[j].style.background = "red";

            await sleep(speed);

            let h1 = parseInt(bars[j].style.height);
            let h2 = parseInt(bars[minIndex].style.height);

            if (h1 < h2) {

                if (minIndex !== i) {
                    bars[minIndex].style.background = "blue";
                }

                minIndex = j;
                bars[minIndex].style.background = "purple";
            }
            else {
                bars[j].style.background = "blue";
            }
        }

        let h1 = bars[i].style.height;
        let h2 = bars[minIndex].style.height;

        let v1 = bars[i].innerText;
        let v2 = bars[minIndex].innerText;

        bars[i].style.height = h2;
        bars[minIndex].style.height = h1;

        bars[i].innerText = v2;
        bars[minIndex].innerText = v1;

        bars[minIndex].style.background = "blue";
        bars[i].style.background = "orange";

        await sleep(speed);
    }

    bars[bars.length - 1].style.background = "orange";

    await sleep(500);

    for (let bar of bars) {
        bar.style.background = "green";
    }
    enableButtons();
}

document
    .getElementById("selection")
    .addEventListener("click", selectionSort);


// INSERTION SORT

async function insertionSort() {
    updateComplexity(
        "Insertion Sort",
        "O(n^2)",
        "O(1)"
    );
    disableButtons();

    let bars = document.querySelectorAll(".bar");

    for (let i = 1; i < bars.length; i++) {

        let keyHeight = bars[i].style.height;
        let keyValue = bars[i].innerText;

        bars[i].style.background = "purple";

        await sleep(speed);

        let j = i - 1;

        while (
            j >= 0 &&
            parseInt(bars[j].style.height) >
            parseInt(keyHeight)
        ) {

            bars[j].style.background = "red";

            await sleep(speed);

            bars[j + 1].style.height =
                bars[j].style.height;

            bars[j + 1].innerText =
                bars[j].innerText;

            bars[j].style.background = "blue";

            j--;
        }

        bars[j + 1].style.height = keyHeight;
        bars[j + 1].innerText = keyValue;

        for (let k = 0; k <= i; k++) {
            bars[k].style.background = "orange";
        }

        await sleep(speed);
    }

    for (let bar of bars) {
        bar.style.background = "green";
    }
    enableButtons();
}

document
    .getElementById("insertion")
    .addEventListener("click", insertionSort);


//MERGE SORT


function getArrayFromBars() {

    let bars = document.querySelectorAll(".bar");
    let arr = [];

    bars.forEach(bar => {
        arr.push(parseInt(bar.style.height));
    });

    return arr;
}

async function updateBars(arr, left, right) {

    let bars = document.querySelectorAll(".bar");

    for (let i = left; i <= right; i++) {

        bars[i].style.height = arr[i] + "px";
        bars[i].innerText = arr[i];

        bars[i].style.background = "red";
    }

    await sleep(speed);

    for (let i = left; i <= right; i++) {
        bars[i].style.background = "blue";
    }
}

async function merge(arr, left, mid, right) {

    let leftPart = arr.slice(left, mid + 1);
    let rightPart = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftPart.length && j < rightPart.length) {

        if (leftPart[i] <= rightPart[j]) {
            arr[k] = leftPart[i];
            i++;
        }
        else {
            arr[k] = rightPart[j];
            j++;
        }

        k++;
    }

    while (i < leftPart.length) {
        arr[k] = leftPart[i];
        i++;
        k++;
    }

    while (j < rightPart.length) {
        arr[k] = rightPart[j];
        j++;
        k++;
    }

    await updateBars(arr, left, right);
}

async function mergeSortHelper(arr, left, right) {

    if (left >= right) return;

    let mid = Math.floor((left + right) / 2);

    await mergeSortHelper(arr, left, mid);

    await mergeSortHelper(arr, mid + 1, right);

    await merge(arr, left, mid, right);
}

async function mergeSort() {
    updateComplexity(
        "Merge Sort",
        "O(n log n)",
        "O(n)"
    );

    disableButtons();

    let arr = getArrayFromBars();

    await mergeSortHelper(
        arr,
        0,
        arr.length - 1
    );

    let bars = document.querySelectorAll(".bar");

    for (let bar of bars) {

        bar.style.background = "green";
    }
    enableButtons();
}


//QUICK SORT

document
    .getElementById("merge")
    .addEventListener("click", mergeSort);

async function swapBars(bars, i, j) {

    let h1 = bars[i].style.height;
    let h2 = bars[j].style.height;

    let v1 = bars[i].innerText;
    let v2 = bars[j].innerText;

    bars[i].style.height = h2;
    bars[j].style.height = h1;

    bars[i].innerText = v2;
    bars[j].innerText = v1;

    await sleep(speed);
}

async function partition(bars, low, high) {

    let pivot =
        parseInt(bars[high].style.height);

    bars[high].style.background =
        "purple";

    let i = low - 1;

    for (let j = low; j < high; j++) {

        bars[j].style.background =
            "red";

        await sleep(speed);

        let current =
            parseInt(bars[j].style.height);

        if (current < pivot) {

            i++;

            await swapBars(bars, i, j);
        }

        bars[j].style.background =
            "blue";
    }

    await swapBars(bars, i + 1, high);

    bars[i + 1].style.background =
        "orange";

    return i + 1;
}
async function quickSortHelper(
    bars,
    low,
    high
) {

    if (low < high) {

        let pi =
            await partition(
                bars,
                low,
                high
            );

        await quickSortHelper(
            bars,
            low,
            pi - 1
        );

        await quickSortHelper(
            bars,
            pi + 1,
            high
        );
    }
}
async function quickSort() {
    updateComplexity(
        "Quick Sort",
        "O(n log n)",
        "O(log n)"
    );

    disableButtons();

    let bars =
        document.querySelectorAll(".bar");

    await quickSortHelper(
        bars,
        0,
        bars.length - 1
    );

    for (let bar of bars) {

        bar.style.background =
            "green";
    }
    enableButtons();

}
document
    .getElementById("quick")
    .addEventListener(
        "click",
        quickSort
    );


// LINEAR SEARCH



async function linearSearch() {
    updateComplexity(
        "Linear Search",
        "O(n)",
        "O(1)"
    );
    disableButtons();

    let bars =
        document.querySelectorAll(".bar");

    for (let bar of bars) {
        bar.style.background = "blue";
    }

    let target =
        parseInt(
            document.getElementById("searchInput").value
        );

    if (isNaN(target)) {
        enableButtons();
        return;
    }

    for (let i = 0; i < bars.length; i++) {

        bars[i].style.background =
            "red";

        await sleep(speed);

        let value =
            parseInt(bars[i].innerText);

        if (value === target) {

            bars[i].style.background =
                "green";

            alert("Element Found!");
            enableButtons();

            return;
        }

        bars[i].style.background =
            "blue";
    }

    alert("Element Not Found!");
    enableButtons();
}

document
    .getElementById("linear")
    .addEventListener(
        "click",
        linearSearch
    );

// BINARY SEARCH
function isSorted() {

    let bars =
        document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length - 1; i++) {

        let current =
            parseInt(bars[i].innerText);

        let next =
            parseInt(bars[i + 1].innerText);

        if (current > next) {
            return false;
        }
    }

    return true;
}

async function binarySearch() {
    updateComplexity(
        "Binary Search",
        "O(log n)",
        "O(1)"
    );

    disableButtons();

    if (!isSorted()) {

        alert("Please sort the array first!");

        enableButtons();
        return;
    }

    let target =
        parseInt(
            document.getElementById("searchInput").value
        );

    if (isNaN(target)) {
        alert("Please enter a number");

        enableButtons();
        return;
    }

    let bars =
        document.querySelectorAll(".bar");

    for (let bar of bars) {
        bar.style.background = "blue";
    }

    let low = 0;
    let high = bars.length - 1;

    while (low <= high) {

        let mid =
            Math.floor((low + high) / 2);

        bars[mid].style.background =
            "purple";

        await sleep(speed);

        let value =
            parseInt(bars[mid].innerText);

        if (value === target) {

            bars[mid].style.background =
                "green";

            alert("Element Found!");

            enableButtons();
            return;
        }

        if (value < target) {

            bars[mid].style.background =
                "blue";

            low = mid + 1;
        }
        else {

            bars[mid].style.background =
                "blue";

            high = mid - 1;
        }
    }

    for (let bar of bars) {
        bar.style.background = "blue";
    }

    alert("Element Not Found!");

    enableButtons();
}

document
    .getElementById("binary")
    .addEventListener(
        "click",
        binarySearch
    );