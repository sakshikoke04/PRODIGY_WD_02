let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        startStopButton.innerHTML = "Stop";
        running = true;
    } else {
        clearInterval(tInterval);
        startStopButton.innerHTML = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startStopButton.innerHTML = "Start";
    display.innerHTML = "00:00:00";
    laps = [];
    updateLaps();
}

function lap() {
    if (running) {
        const lapTime = difference;
        laps.push(lapTime);
        updateLaps();
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function updateLaps() {
    lapsList.innerHTML = "";
    laps.forEach((lap, index) => {
        const li = document.createElement("li");
        let hours = Math.floor((lap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((lap % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((lap % (1000 * 60)) / 1000);
        li.innerHTML = `Lap ${index + 1}: ${(hours < 10 ? "0" : "") + hours}:${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds}`;
        lapsList.appendChild(li);
    });
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
