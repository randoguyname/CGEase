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
                .catch(function(response){
                    sendResponse(false)
                })
            return true;
        }
    }
)
/*
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.queryType == "getMusicLessons") {
            chrome.tabs.create({url:"https://intranet.cgs.vic.edu.au/portal/musictimetable.asp"}, tab => {
                chrome.tabs.onUpdated.addListener(function removeIntranetLoginTab(tabId, info) { // Every time *any* tab is updated
                    if (tabId == tab.id && info.title != undefined) { // check if it is the tab that was created, and if it has been properly loaded
                        success = !info.title.includes("401") // Check if 401 (Unauthorised) error occurs, ie. the user cancels the box
                        chrome.runtime.sendMessage({queryType: "getMusicLessonsFromContentScript"}, lessonsArray => {
                            sendResponse(lessonsArray)
                        })
                    }
                })
            })
        }
    }
)*/

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.queryType == "intranetLogin") {
            /*loginIntranet(function(success) {
                console.log(success)
                sendResponse(success)
            })*/
            chrome.tabs.create({url:"https://intranet.cgs.vic.edu.au"}, function (tab) { // Create new tab
                chrome.tabs.onUpdated.addListener(function removeIntranetLoginTab(tabId, info) { // Every time *any* tab is updated
                    if (tabId == tab.id && info.title != undefined) { // check if it is the tab that was created, and if it has been properly loaded
                        success = !info.title.includes("401") // Check if 401 (Unauthorised) error occurs, ie. the user cancels the box
                        chrome.tabs.remove(tab.id, function() { 
                            chrome.runtime.lastError == undefined
                        }) // Remove tab
                        chrome.tabs.onUpdated.removeListener(removeIntranetLoginTab) // Remove listener
                        sendResponse(success) // Callback to script
                    }
                })
            })
        }
        return true;
    }
)