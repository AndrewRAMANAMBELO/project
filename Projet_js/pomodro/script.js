const affichageTravail = document.querySelector('.affichageT');
const affichagePause = document.querySelector('.affichageP');
const btnGo = document.querySelector('.b1');
const btnPause = document.querySelector('.b2');
const btnReset = document.querySelector('.b3');
const cycles = document.querySelector('h2');
const workTimeInput = document.getElementById('workTime');
const restTimeInput = document.getElementById('restTime');

let tempsInitial;
let tempsDeRepos;
let pause = false;
let nbDeCycles = 0;
let ChronoEnMarche = false;
let timer;

function updateDisplay() {
    affichageTravail.innerText = `${Math.trunc(tempsInitial / 60)}:${tempsInitial % 60 < 10 ? '0' + (tempsInitial % 60) : tempsInitial % 60}`;
    affichagePause.innerText = `${Math.trunc(tempsDeRepos / 60)}:${tempsDeRepos % 60 < 10 ? '0' + (tempsDeRepos % 60) : tempsDeRepos % 60}`;
    cycles.innerText = `Nombre de cycles : ${nbDeCycles}`;
}

function initializeTimes() {
    tempsInitial = workTimeInput.value * 60; // Convert minutes to seconds
    tempsDeRepos = restTimeInput.value * 60; // Convert minutes to seconds
    updateDisplay();
}

btnGo.addEventListener('click', () => {
    if (!ChronoEnMarche) {
        initializeTimes(); // Initialize times based on user input
        ChronoEnMarche = true;
        pause = false;
        timer = setInterval(() => {
            if (!pause && tempsInitial > 0) {
                tempsInitial--;
                updateDisplay();
            } else if (!pause && tempsInitial === 0 && tempsDeRepos > 0) {
                tempsDeRepos--;
                updateDisplay();
            } else if (!pause && tempsInitial === 0 && tempsDeRepos === 0) {
                tempsInitial = workTimeInput.value * 60; // Reset work time
                tempsDeRepos = restTimeInput.value * 60; // Reset rest time
                nbDeCycles++;
                updateDisplay();
            }
        }, 1000);
    }
});

btnPause.addEventListener('click', () => {
    if (ChronoEnMarche) {
        pause = !pause;
        btnPause.innerText = pause ? "Reprendre" : "Pause";
    }
});

btnReset.addEventListener('click', () => {
    clearInterval(timer);
    ChronoEnMarche = false;
    pause = false;
    initializeTimes(); // Reset times based on user input
    nbDeCycles = 0;
    btnPause.innerText = "Pause";
    updateDisplay();
});

// Initialize times on page load
initializeTimes();