const clickButton = document.getElementById('click-button');
const clickCountDisplay = document.getElementById('click-count');
const buyClickerButton = document.getElementById('buy-clicker');
const clickerCostDisplay = document.getElementById('clicker-cost');
const clickerOwnedDisplay = document.getElementById('clicker-owned');

let clickCount = 0;
let clickerCost = 50;
let automaticClicksPerSecond = 0;
let clickerOwned = 0;

function updateClickCount() {
    clickCountDisplay.textContent = clickCount;
}

function updateClickerOwned() {
    clickerOwnedDisplay.textContent = clickerOwned;
}

clickButton.addEventListener('click', () => {
    clickCount++;
    updateClickCount();
});

buyClickerButton.addEventListener('click', () => {
    if (clickCount >= clickerCost) {
        clickCount -= clickerCost;
        automaticClicksPerSecond += 1;
        clickerOwned++;
        updateClickCount();
        updateClickerOwned();
        clickerCost = Math.round(clickerCost * 1.15); // Increase cost by 15%
        clickerCostDisplay.textContent = clickerCost;
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

// Secret Combo Logic
const secretCombo = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'b', 'a', '0'];
let comboIndex = 0;

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const expectedKey = secretCombo[comboIndex];

    if (key === expectedKey) {
        comboIndex++;
        if (comboIndex === secretCombo.length) {
            clickCount += 1000000;
            updateClickCount();
            comboIndex = 0; // Reset combo
            alert("Secret combo activated! You gained 1,000,000 clicks!");
        }
    } else {
        comboIndex = 0; // Reset combo if wrong key is pressed
    }
});

// Initial update
updateClickCount();
updateClickerOwned();
updateAutomaticClicker();
