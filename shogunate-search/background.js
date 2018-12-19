// Written by Bertrand the Healer

// Define default running value
var running = true;

//Check if running
chrome.storage.sync.get(['isRunning'], function(result) {
    // If value hasn't been initialized
    if (result.key == undefined) {
        // Initialize value
        chrome.storage.sync.set({ isRunning: running }, function() {});
    } else { // If value is initialized
        // Load value
        running = result.key;
        // Update button and tooltip
        refreshRunning();
    }
});

// Enable and disable script by clicking extension button
chrome.browserAction.onClicked.addListener(function(tab) {
    // Toggle enabled
    running = !running;
    // Update button and toolkit
    refreshRunning();
});

// Start timer
// Get current time
var now = new Date();
// Get 8:00 pm
var then = new Date(); // Initialize date with time now
then.setHours(20, 0, 0, 0); // Change time to 8 pm
// Is it after 8?
if (now > then) {
    then.setDate(now.getDate() + 1); // Set date to this time tomorrow
}
// Get milliseconds until 8:00 pm
var diff = then - now;
alert(diff);
// Wait until 8:00, then run search
setTimeout(runSearch, diff);

// Run search
function runSearch() {
    if (running) {
        chrome.tabs.create({ url: "https://www.google.com/search?q=How+to+restore+Japanese+Shogunate%3F" });
    }
    //Run again in 24 hours if browser is still open
    setTimeout(runSearch, 24 * 60 * 60 * 1000);
}

function refreshRunning() {
    // Set icon and tooltip
    if (running) {
        chrome.browserAction.setIcon({ path: "pause.png" });
        chrome.browserAction.setTitle({ title: "Will search 'How to restore Japanese Shogunate?' at 8 pm" });
    } else {
        chrome.browserAction.setIcon({ path: "play.png" });
        chrome.browserAction.setTitle({ title: "Enable to search 'How to restore Japanese Shogunate?' at 8 pm" });
    }
    // Save setting
    chrome.storage.sync.set({ 'isRunning': running }, function() {});
}