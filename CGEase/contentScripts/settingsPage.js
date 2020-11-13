chrome.storage.sync.get(Object.keys(featureDefaults), storage => {
    settings = {}

    for (feature of Object.keys(featureNames)) { // Assumes featureNames is always updated
        settings[feature] = {
            featureName: featureNames[feature],
            isEnabled: storage[feature]
        }
    }

    console.log(settings)

    injectSettings(settings)

    if (window.location == "https://deeds.cgs.vic.edu.au/settings/messages#cgease") { // Ensure it scrolls down to CGEase section
        window.location = "https://deeds.cgs.vic.edu.au/settings/messages#cgease"
    }
})