// Relies on constants/defaults.js

function setDefaults() {
    chrome.storage.sync.get(Object.keys(featureDefaults), storage => {
        storageChange = {}
        for (feature of Object.keys(featureDefaults)) {
            if (storage[feature] == null) {
                storageChange[feature] = featureDefaults[feature];
            }
        }
        chrome.storage.sync.set(storageChange);
    })
}

chrome.runtime.onInstalled.addListener(setDefaults)