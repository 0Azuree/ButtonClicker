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

const buyUpgradeShopButton = document.getElementById('buy-upgrade-shop');
const upgradeShopCostDisplay = document.getElementById('upgrade-shop-cost');
const upgradeShopOwnedDisplay = document.getElementById('upgrade-shop-owned');
let upgradeShopOwned = 0;

const buyFarmClickerButton = document.getElementById('buy-farm-clicker');
const farmClickerCostDisplay = document.getElementById('farm-clicker-cost');
const farmClickerOwnedDisplay = document.getElementById('farm-clicker-owned');
let farmClickerOwned = 0;

const buyFarmersButton = document.getElementById('buy-farmers');
const farmersCostDisplay = document.getElementById('farmers-cost');
const farmersOwnedDisplay = document.getElementById('farmers-owned');
let farmersOwned = 0;

// Super Stuff Items
const buyFrenzyTimeButton = document.getElementById('buy-frenzy-time');
const frenzyTimeCostDisplay = document.getElementById('frenzy-time-cost');
const frenzyTimeAvailableShopDisplay = document.getElementById('frenzy-time-available-shop');
let frenzyTimeAvailable = 0;
let frenzyTimeActive = false;
let frenzyTimeTimer;

// Abilities Section
const abilitiesList = document.getElementById('abilities-list');
const abilitiesTitle = document.getElementById('abilities-title');
const abilitiesSection = document.getElementById('abilities-section');

// Stats Section
const playerRankDisplay = document.getElementById('player-rank');
const statsTitle = document.getElementById('stats-title');
const statsSection = document.getElementById('stats-section');

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
let dupleTimeAvailable = 0; // Renamed
let dupleTimeActive = false; // Renamed
let clickMultiplier = 1;
let dupleTimeTimer; // Renamed

// Costs
const clickerCost = 50;
const doubleCost = 60;
const tripleCost = 80;
const quadrupleCost = 120;
const dupleTimeCost = 2000; // Renamed
const upgradeShopCost = 1000000;
const farmClickerCost = 100000;
const farmersCost = 80000;
const frenzyTimeCost = 5000;

function getRank(clicks) {
    if (clicks >= 1000000000000) {
        return '#1 Clicker';
    } else if (clicks >= 1000000000) {
        return 'Grandmaster Clicker';
    } else if (clicks >= 200000000) {
        return 'Master Clicker';
    } else if (clicks >= 50000000) {
        return 'Champion Clicker';
    } else if (clicks >= 1000000) {
        return 'Diamond Clicker';
    } else if (clicks >= 500000) {
        return 'Platinum Clicker';
    } else if (clicks >= 150000) {
        return 'Gold Clicker';
    } else if (clicks >= 50000) {
        return 'Iron Clicker';
    } else if (clicks >= 10000) {
        return 'Bronze Clicker';
    } else if (clicks >= 100) {
        return 'Unranked Clicker';
    } else {
        return 'Garbage Clicker';
    }
}

// Save and Load Data
function saveGame() {
    const gameState = {
        clickCount: clickCount,
        automaticClicksPerSecond: automaticClicksPerSecond,
        clickerOwned: clickerOwned,
        doubleOwned: doubleOwned,
        tripleOwned: tripleOwned,
        quadrupleOwned: quadrupleOwned,
        dupleTimeAvailable: dupleTimeAvailable, // Renamed
        upgradeShopOwned: upgradeShopOwned,
        farmClickerOwned: farmClickerOwned,
        farmersOwned: farmersOwned,
        frenzyTimeAvailable: frenzyTimeAvailable
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
        dupleTimeAvailable = gameState.dupleTimeAvailable || 0; // Renamed
        upgradeShopOwned = gameState.upgradeShopOwned || 0;
        farmClickerOwned = gameState.farmClickerOwned || 0;
        farmersOwned = gameState.farmersOwned || 0;
        frenzyTimeAvailable = gameState.frenzyTimeAvailable || 0;
        updateClickCount();
        updateOwned();
        renderAbilities();
        updateShopVisibility();
    }
    updateRankDisplay(); // Update rank on load
}

function updateClickCount() {
    clickCountDisplay.textContent = clickCount;
    updateRankDisplay(); // Update rank when clicks change
}

function updateOwned() {
    clickerOwnedDisplay.textContent = clickerOwned;
    doubleOwnedDisplay.textContent = doubleOwned;
    tripleOwnedDisplay.textContent = tripleOwned;
    quadrupleOwnedDisplay.textContent = quadrupleOwned;
    upgradeShopOwnedDisplay.textContent = upgradeShopOwned;
    farmClickerOwnedDisplay.textContent = farmClickerOwned;
    farmersOwnedDisplay.textContent = farmersOwned;
    frenzyTimeAvailableShopDisplay.textContent = frenzyTimeAvailable;
}

function updateRankDisplay() {
    playerRankDisplay.textContent = getRank(clickCount);
}

function renderAbilities() {
    abilitiesList.innerHTML = '';
    if (dupleTimeAvailable > 0) { // Renamed
        const abilityItem = document.createElement('div');
        abilityItem.classList.add('ability-item');
        const abilityText = document.createElement('span');
        abilityText.textContent = 'Duple time'; // Renamed
        if (dupleTimeAvailable > 1) { // Renamed
            abilityText.textContent += ` (Amount: ${dupleTimeAvailable})`; // Renamed
        }
        abilityItem.appendChild(abilityText);
        const useButton = document.createElement('button');
        useButton.textContent = 'Use';
        useButton.addEventListener('click', () => {
            if (!dupleTimeActive) { // Renamed
                dupleTimeActive = true; // Renamed
                clickMultiplier = 4; // Set multiplier to 4
                dupleTimeAvailable--; // Renamed
                updateOwned();
                renderAbilities(); // Re-render to update amount
                clearTimeout(dupleTimeTimer); // Renamed
                dupleTimeTimer = setTimeout(() => { // Renamed
                    dupleTimeActive = false; // Renamed
                    clickMultiplier = 1;
                }, 10000);
            } else {
                alert("Duple time is already active!"); // Renamed
            }
        });
        abilityItem.appendChild(useButton);
        abilitiesList.appendChild(abilityItem);
    }
    if (frenzyTimeAvailable > 0) {
        const abilityItem = document.createElement('div');
        abilityItem.classList.add('ability-item');
        const abilityText = document.createElement('span');
        abilityText.textContent = 'Frenzy Time';
        if (frenzyTimeAvailable > 1) {
            abilityText.textContent += ` (Amount: ${frenzyTimeAvailable})`;
        }
        abilityItem.appendChild(abilityText);
        const useButton = document.createElement('button');
        useButton.textContent = 'Use';
        useButton.addEventListener('click', () => {
            if (!frenzyTimeActive) {
                frenzyTimeActive = true;
                const originalAutomaticClicks = automaticClicksPerSecond;
                automaticClicksPerSecond = 0; // Disable regular automatic clicks
                const frenzyCPS = 10;
                clickMultiplier = frenzyCPS;

                frenzyTimeAvailable--;
                updateOwned();
                renderAbilities();

                clearTimeout(frenzyTimeTimer);
                frenzyTimeTimer = setTimeout(() => {
                    frenzyTimeActive = false;
                    clickMultiplier = 1;
                    automaticClicksPerSecond = originalAutomaticClicks; // Restore regular automatic clicks
                }, 10000);
            } else {
                alert("Frenzy Time is already active!");
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
    if (clickCount >= dupleTimeCost) { // Renamed
        clickCount -= dupleTimeCost; // Deduct cost
        dupleTimeAvailable++; // Renamed
        updateClickCount();
        updateOwned();
        renderAbilities(); // Update abilities display
        saveGame();
    } else {
        alert("Not enough Button clicks!");
    }
});

buyUpgradeShopButton.addEventListener('click', () => {
    if (clickCount >= upgradeShopCost) {
        clickCount -= upgradeShopCost;
        upgradeShopOwned = 1;
        clickCount = 0; // Remove clicks after purchase
        updateClickCount();
        updateOwned();
        updateShopVisibility();
        saveGame();
    } else {
        alert("Not enough Button clicks!");
    }
});

buyFarmClickerButton.addEventListener('click', () => {
    if (clickCount >= farmClickerCost) {
        clickCount -= farmClickerCost;
        farmClickerOwned++;
        updateClickCount();
        updateOwned();
        saveGame();
    } else {
        alert("Not enough Button clicks!");
    }
});

buyFarmersButton.addEventListener('click', () => {
    if (clickCount >= farmersCost) {
        clickCount -= farmersCost;
        farmersOwned++;
        updateClickCount();
        updateOwned();
        saveGame();
    } else {
        alert("Not enough Button clicks!");
    }
});

buyFrenzyTimeButton.addEventListener('click', () => {
    if (clickCount >= frenzyTimeCost) {
        clickCount -= frenzyTimeCost;
        frenzyTimeAvailable++;
        updateClickCount();
        updateOwned();
        renderAbilities();
        saveGame();
    } else {
        alert("Not enough Button clicks!");
    }
});

function updateShopVisibility() {
    const farmClickerItem = document.getElementById('farm-clicker-item');
    const farmersItem = document.getElementById('farmers-item');
    if (upgradeShopOwned > 0) {
        farmClickerItem.style.display = 'flex';
        farmersItem.style.display = 'flex';
    } else {
        farmClickerItem.style.display = 'none';
        farmersItem.style.display = 'none';
    }
}

function updateAutomaticClicker() {
    setInterval(() => {
        clickCount += automaticClicksPerSecond;
        clickCount += farmersOwned * 5000; // Add clicks from farmers
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

abilitiesTitle.addEventListener('click', () => {
    abilitiesTitle.classList.add('active-abilities');
    statsTitle.classList.remove('active-abilities');
    abilitiesSection.classList.remove('inactive');
    abilitiesSection.classList.add('active');
    statsSection.classList.remove('active');
    statsSection.classList.add('inactive');
});

statsTitle.addEventListener('click', () => {
    statsTitle.classList.add('active-abilities');
    abilitiesTitle.classList.remove('active-abilities');
    abilitiesSection.classList.remove('active');
    abilitiesSection.classList.add('inactive');
    statsSection.classList.remove('inactive');
    statsSection.classList.add('active');
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
updateShopVisibility();
updateRankDisplay(); // Initial rank display
