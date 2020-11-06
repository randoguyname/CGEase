chrome.storage.sync.get(Object.keys(featureDefaults), storage => {
    document.addEventListener('DOMContentLoaded', function() {
        if (storage.doSchoologyDarkMode) {
            injectCSSFile("styles/schoologyDarkMode.css", "Enabled Schoology dark mode")
        }

        injectCSSFile("styles/doDisplay.css", "Displayed schoology")
        
    })
})