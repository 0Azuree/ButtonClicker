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

// Abilities Section
const abilitiesList = document.getElementById('abilities-list');

// Shop/Super Stuff Toggling
const shopTitle = document.getElementById('shop-title');
const superStuffTitle = document.getElementById('super-stuff-title');
const shopContainer = document.querySelector('.shop-container');
const superStuffContainer = document.querySelector('.super-stuff-container');

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

// Costs
const clickerCost = 50;
const doubleCost = 60;
const tripleCost = 80;
const quadrupleCost = 120;
const doubleTimeCost = 2000;

// Save and Load Data
function saveGame() {
    const gameState = {
        clickCount: clickCount,
        automaticClicksPerSecond: automaticClicksPerSecond,
        clickerOwned: clickerOwned,
        doubleOwned: doubleOwned,
        tripleOwned: tripleOwned,
        quadrupleOwned: quadrupleOwned,
        doubleTimeAvailable: doubleTimeAvailable
    };
    localStorage.setItem('clickerGameSave', JSON.stringify(gameState));
}

function loadGame() {
    const savedGame = localStorage.getItem('clickerGameSave');
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        clickCount = gameState.clickCount || 0;
        automaticClicksPerSecond = gameState.automaticClicksPerSecond || 0;
        clickerOwned = gameState.clickerOwned || 0;
        doubleOwned = gameState.doubleOwned || 0;
        tripleOwned = gameState.tripleOwned || 0;
        quadrupleOwned = gameState.quadrupleOwned || 0;
        doubleTimeAvailable = gameState.doubleTimeAvailable || 0;
        updateClickCount();
        updateOwned();
        renderAbilities();
    }
}

function updateClickCount() {
    clickCountDisplay.textContent = clickCount;
}

function updateOwned() {
    clickerOwnedDisplay.textContent = clickerOwned;
    doubleOwnedDisplay.textContent = doubleOwned;
    tripleOwnedDisplay.textContent = tripleOwned;
    quadrupleOwnedDisplay.textContent = quadrupleOwned;
}

function renderAbilities() {
    abilitiesList.innerHTML = '';
    if (doubleTimeAvailable > 0) {
        const abilityItem = document.createElement('div');
        abilityItem.classList.add('ability-item');
        const abilityText = document.createElement('span');
        abilityText.textContent = 'Double Time';
        if (doubleTimeAvailable > 1) {
            abilityText.textContent += ` (Amount: ${doubleTimeAvailable})`;
        }
        abilityItem.appendChild(abilityText);
        const useButton = document.createElement('button');
        useButton.textContent = 'Use';
        useButton.addEventListener('click', () => {
            if (!doubleTimeActive) {
                doubleTimeActive = true;
                clickMultiplier = 4; // Set multiplier to 4
                doubleTimeAvailable--;
                updateOwned();
                renderAbilities(); // Re-render to update amount
                clearTimeout(doubleTimeTimer);
                doubleTimeTimer = setTimeout(() => {
                    doubleTimeActive = false;
                    clickMultiplier = 1;
                }, 10000);
            } else {
                alert("Double Time is already active!");
            }
        });
        abilityItem.appendChild(useButton);
        abilitiesList.appendChild(abilityItem);
    }
    // Add other abilities here if you implement more
}

clickButton.addEventListener('click', () => {
    clickCount += clickMultiplier;
    updateClickCount();
});

buyClickerButton.addEventListener('click', () => {
    if (clickCount >= clickerCost) {
        clickCount -= clickerCost;
        automaticClicksPerSecond += 1;
        clickerOwned++;
        updateClickCount();
        updateOwned();
        saveGame();
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
        saveGame();
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
        saveGame();
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
        saveGame();
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
        renderAbilities(); // Update abilities display
        saveGame();
    } else {
        alert("Not enough Button clicks!");
    }
});

function updateAutomaticClicker() {
    setInterval(() => {
        clickCount += automaticClicksPerSecond;
        updateClickCount();
        saveGame(); // Save game state periodically
    }, 1000);
}

submitCodeButton.addEventListener('click', () => {
    const codeInput = secretCodeInput.value.trim();
    const codeParts = codeInput.toLowerCase().split(' ');
    const code = codeParts[0];

    if (code === 'iclicked') {
        clickCount += 1000;
        updateClickCount();
        secretCodeInput.value = '';
        alert("Code accepted! You gained 1000 Button clicks!");
        saveGame();
    } else if (code === 'removed') {
        clickCount = 0;
        updateClickCount();
        secretCodeInput.value = '';
        alert("Code accepted! Your clicks have been removed.");
        saveGame();
    } else if (code === 'addd') {
        if (codeParts.length === 2) {
            const amount = parseInt(codeParts[1]);
            if (!isNaN(amount)) {
                clickCount += amount;
                updateClickCount();
                secretCodeInput.value = '';
                alert(`Code accepted! You gained ${amount} Button clicks!`);
                saveGame();
            } else {
                alert("Invalid amount for 'addD' code. Please enter a number.");
            }
        } else {
            alert("Invalid format for 'addD' code. Please use 'addD [number]'.");
        }
    } else {
        alert("Invalid code!");
    }
});

shopTitle.addEventListener('click', () => {
    shopTitle.classList.add('active-shop');
    superStuffTitle.classList.remove('active-shop');
    shopContainer.classList.remove('inactive');
    shopContainer.classList.add('active');
    superStuffContainer.classList.remove('active');
    superStuffContainer.classList.add('inactive');
});

superStuffTitle.addEventListener('click', () => {
    superStuffTitle.classList.add('active-shop');
    shopTitle.classList.remove('active-shop');
    shopContainer.classList.remove('active');
    shopContainer.classList.add('inactive');
    superStuffContainer.classList.remove('inactive');
    superStuffContainer.classList.add('active');
});

// Initial updates and load game
updateClickCount();
updateOwned();
loadGame();
updateAutomaticClicker();
renderAbilities();
