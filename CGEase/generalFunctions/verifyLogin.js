function loginIntranet(callback) {
    chrome.tabs.create({url:"https://intranet.cgs.vic.edu.au"}, function (tab) { // Create new tab
        chrome.tabs.onUpdated.addListener(function removeIntranetLoginTab(tabId, info) { // Every time *any* tab is updated
            if (tabId == tab.id && info.title != undefined) { // check if it is the tab that was created, and if it has been properly loaded
                success = !info.title.includes("401") // Check if 401 (Unauthorised) error occurs, ie. the user cancels the box
                chrome.tabs.remove(tab.id, function() { 
                    chrome.runtime.lastError == undefined
                 }) // Remove tab
                chrome.tabs.onUpdated.removeListener(removeIntranetLoginTab) // Remove listener

                callback(success) // Callback to script
            }
        })
    })
}