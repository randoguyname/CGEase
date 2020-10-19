function injectCSSFile(filename, logMessage, proceedFunction, featureIndex) {
    link = document.createElement("link");
    link.href = chrome.runtime.getURL(filename)
    link.rel = "stylesheet"
    link.type= "text/css"

    document.head.appendChild(link)
    
    if (logMessage) {
        console.log(logMessage)
    }

    if(proceedFunction != undefined) {
        proceedFunction(featureIndex+1)
    }
}