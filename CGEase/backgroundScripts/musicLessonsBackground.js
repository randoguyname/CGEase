chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.queryType == "url") {
            fetch(request.url, {
                credentials: "include"
            })  
                .then(function (response) {
                    response.text().then(function (text) {
                        console.log(text)
                        status = response.status
                        console.log(status)
                        sendResponse([text, status])
                    })
                })
            return true;
        }
    }
)