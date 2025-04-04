const clickButton = document.getElementById('click-button');
const clickCountDisplay = document.getElementById('click-count');

// Shop Items
const buyClickerButton = document.getElementById('buy-clicker');
const clickerCostDisplay = document.getElementById('clicker-cost-clicker');
const clickerOwnedDisplay = document.getElementById('clicker-owned');

const buyDoubleButton = document.getElementById('buy-double');
const doubleCostDisplay = document.getElementById('clicker-cost-double');
const doubleOwnedDisplay = document.getElementById('double-owned');

const buyTripleButton = document.getElementById('buy-triple');
const tripleCostDisplay = document.getElementById('clicker-cost-triple');
const tripleOwnedDisplay = document.getElementById('triple-owned');

const buyQuadrupleButton = document.getElementById('buy-quadruple');
const quadrupleCostDisplay = document.getElementById('clicker-cost-quadruple');
const quadrupleOwnedDisplay = document.getElementById('quadruple-owned');

const buyDoubleTimeButton = document.getElementById('buy-doubletime');
const doubleTimeCostDisplay = document.getElementById('clicker-cost-doubletime');
const doubleTimeAvailableDisplay = document.getElementById('doubletime-available');

// Secret Code Input
const secretCodeInput = document.getElementById('secret-code-input');
const submitCodeButton = document.getElementById('submit-code-button');

let clickCount = 0;
let automaticClicksPerSecond = 0;
let clickerOwned = 0;
let doubleOwned = 0;
let tripleOwned = 0;
let quadrupleOwned = 0;
let doubleTimeAvailable = 0;
let doubleTimeActive = false;
let clickMultiplier = 1;
let doubleTimeTimer;

// Costs (now constant and CORRECTED)
const clickerCost = 50;
const doubleCost = 60;
const tripleCost = 80;
const quadrupleCost = 120;
const doubleTimeCost = 1000;

function updateClickCount() {
    clickCountDisplay.textContent = clickCount;
}

function updateOwned() {
    clickerOwnedDisplay.textContent = clickerOwned;
    doubleOwnedDisplay.textContent = doubleOwned;
    tripleOwnedDisplay.textContent = tripleOwned;
    quadrupleOwnedDisplay.textContent = quadrupleOwned;
    doubleTimeAvailableDisplay.textContent = doubleTimeAvailable;
}

clickButton.addEventListener('click', () => {
    clickCount += clickMultiplier;
    updateClickCount();
    if (doubleTimeActive) {
        clickMultiplier *= 2;
        clearTimeout(doubleTimeTimer);
        doubleTimeTimer = setTimeout(() => {
            doubleTimeActive = false;
            clickMultiplier = 1;
        }, 10000);
    }
});

buyClickerButton.addEventListener('click', () => {
    if (clickCount >= clickerCost) {
        clickCount -= clickerCost;
        automaticClicksPerSecond += 1;
        clickerOwned++;
        updateClickCount();
        updateOwned();
    } else {
        alert("Not enough Button clicks!");
    }
});

buyDoubleButton.addEventListener('click', () => {
    if (clickCount >= doubleCost) {
        clickCount -= doubleCost;
        automaticClicksPerSecond += 2;
        doubleOwned++;
        updateClickCount();
        updateOwned();
    } else {
        alert("Not enough Button clicks!");
    }
});

buyTripleButton.addEventListener('click', () => {
    if (clickCount >= tripleCost) {
        clickCount -= tripleCost;
        automaticClicksPerSecond += 3;
        tripleOwned++;
        updateClickCount();
        updateOwned();
    } else {
        alert("Not enough Button clicks!");
    }
});

buyQuadrupleButton.addEventListener('click', () => {
    if (clickCount >= quadrupleCost) {
        clickCount -= quadrupleCost;
        automaticClicksPerSecond += 4;
        quadrupleOwned++;
        updateClickCount();
        updateOwned();
    } else {
        alert("Not enough Button clicks!");
    }
});

buyDoubleTimeButton.addEventListener('click', () => {
    if (clickCount >= doubleTimeCost) {
        clickCount -= doubleTimeCost;
        doubleTimeAvailable++;
        updateClickCount();
        updateOwned();
    } else {
        alert("Not enough Button clicks!");
    }
});

function updateAutomaticClicker() {
    setInterval(() => {
        clickCount += automaticClicksPerSecond;
        updateClickCount();
    }, 1000);
}

submitCodeButton.addEventListener('click', () => {
    const code = secretCodeInput.value.toLowerCase().trim();
    if (code === 'iclicked') {
        clickCount += 1000;
        updateClickCount();
        secretCodeInput.value = ''; // Clear the input
        alert("Code accepted! You gained 1000 Button clicks!");
    } else if (code === 'sc') {
        alert("That was the old secret code hint!");
        secretCodeInput.value = '';
    } else {
        alert("Invalid code!");
    }
});

// Initial updates
updateClickCount();
updateOwned();
updateAutomaticClicker();
