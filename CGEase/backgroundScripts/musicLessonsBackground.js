chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.queryType == "urlParsed") {
            fetch(request.url, {
                mode: "cors",   // was getting CORS errors
                credentials: "include" // was getting 401
            }).then(response => {sendResponse((new DOMParser()).parseFromString(response.text(), "text/html"))})
            return true;
        }
    }
)

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.queryType == "url") {
            fetch(request.url)
                .then(response => response.text())
                .then(text => sendResponse(text))
            return true;
        }
    }
)