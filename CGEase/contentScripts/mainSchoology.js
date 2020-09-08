doSchoologyDarkMode = true


document.addEventListener('DOMContentLoaded', function() {
    if (doSchoologyDarkMode) {
        injectCSSFile("styles/schoologyDarkMode.css")
    }

    injectCSSFile("styles/doDisplay.css")
    
});
