chrome.storage.sync.get(Object.keys(featureDefaults), storage => {
    document.addEventListener('DOMContentLoaded', function() {
        if (storage.doStileDarkMode) {
            injectCSSFile("styles/stileDarkMode.css", "Enabled Stile dark mode")
        }
    })
})