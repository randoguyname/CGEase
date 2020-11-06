chrome.storage.sync.get(Object.keys(featureDefaults), storage => {
    if (storage.doOrderZoomMeetings) {
        sortTable(document.querySelector("table"))
            .then(()=>{
                console.log("Ordered zoom meetings")
            }, reason=>{
                console.warn(`Failed to order zoom meetings for reason "${reason}"`)
            })
    }          
})