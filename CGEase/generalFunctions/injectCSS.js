function injectCSSFile(filename, proceedFunction, featureIndex) {
    link = document.createElement("link");
    link.href = chrome.runtime.getURL(filename)
    link.rel = "stylesheet"
    link.type= "text/css"

    document.head.appendChild(link)

    if(proceedFunction != undefined) {
        proceedFunction(featureIndex+1)
    }
}