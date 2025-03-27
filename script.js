const clickButton = document.getElementById('click-button');
const clickCountDisplay = document.getElementById('click-count');
const buyClickerButton = document.getElementById('buy-clicker');
const clickerCostDisplay = document.getElementById('clicker-cost');

let clickCount = 0;
let clickerCost = 50;
let automaticClicksPerSecond = 0;

function updateClickCount() {
    clickCountDisplay.textContent = clickCount;
}

clickButton.addEventListener('click', () => {
    clickCount++;
    updateClickCount();
});

buyClickerButton.addEventListener('click', () => {
    if (clickCount >= clickerCost) {
        clickCount -= clickerCost;
        automaticClicksPerSecond += 1;
        updateClickCount();
        updateAutomaticClicker();
        buyClickerButton.disabled = true; // Disable button after purchase for now
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

// Initial update
updateClickCount();
