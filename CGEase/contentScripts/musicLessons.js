function indicateMudicLesson(table, lessonMatrix, isFullTimetable, conditionCallback, newMusicIcon) {
    // Adds icon to top left of lessonMatrix (period, day) cell, indicating it is a music lesson
    // Note: Period 1 is index 1, Monday is index 1

    if (isFullTimetable) {
        subject = table.tBodies[0].rows[lessonMatrix[0]].cells[lessonMatrix[1]].querySelector("div.timetable-subject"); // get the cell (technically nested div)
        parent = subject.parentElement; // get its parent
    }
    else { 
        day = parseInt(/(\d+)/g.exec(table.parentElement.parentElement.previousElementSibling.innerText).flat().pop())
        if (lessonMatrix[1] != day) {
            return
        }
        subject = table.tBodies[0].rows[0].cells[lessonMatrix[0]].querySelector("div.timetable-subject"); // get the cell (technically nested div)
        parent = subject.parentElement; // get its parents
    }
    if (conditionCallback) {
        if (!conditionCallback(subject)) {
            return
        }
    }

    icon = document.createElement("div");
    icon.classList.add("icon-music-lesson")

    injectCSSFile("styles/musicLessonIcon.css")

    if (newMusicIcon) {
        icon.innerHTML = "&#x266b;" // Music icon from my addition
        icon.classList.add("newicon")
    }
    else {
        icon.innerHTML = "&#xe653;" // Default music icon
    }

    

    parent.insertBefore(icon, subject) // add it to the document
}

function getMusicLessons(lessonsDocument) {
    lessonsTable = lessonsDocument.querySelector("table").querySelector("table"); // Looks for a table inside a table
    linesArray = stringArray1dFromTable(lessonsTable, true, "My Timetable"); // get a 1d array of all the "innerText" values of the rows/lines
    lessonsArray = []
    parsingDay = 0;
    for (line of linesArray) { 
        if ((day = parseDay(line))) {
            parsingDay = day;
        }
        else if ((period = parsePeriod(line))) {
            lessonsArray.push([period, parsingDay])
        }
    }
    return lessonsArray;
}

function insertLoginDialog (callback) {
    fetch(chrome.runtime.getURL("loginDialog.html"))
        .then(response => response.text())
        .then(function(text) {
            parser = new DOMParser;
            dialog = parser.parseFromString(text, "text/html").querySelector("dialog");
            document.body.appendChild(dialog)
            callback(dialog)
        } )

}

function showMusicLessons(table, isTimetablePage, newMusicIcon, logMessage, proceedFunction, featureIndex) {
    chrome.runtime.sendMessage({"queryType": "url", "url": document.querySelector("a.icon-podcast").href}, function (response) { // send message to background script to get HTML contents of url
        if (!response) {
            console.warn("Failed to fetch Music Lessons")
            proceedFunction(featureIndex+1)
            return
        }
        console.log("Obtained music lessons HTML")
        console.log(response)
        lessonsHTML = response[0]
        status = response[1]
        if (status == 401) { //  If the user has been logged out of the intranet
            chrome.runtime.sendMessage({"queryType": "intranetLogin"}, function (success) { // Open a new tab to login to the intranet
                if (success) {
                    proceedFunction(featureIndex) // Try this feature again, as it is now authenticated
                }
                else {
                    console.warn(`CGEase could not authorize your access to the intranet, and therefore failed to complete "Show Music Lessons"`) // Warn people
                    proceedFunction(featureIndex+1) // Move on to the next feature
                }
            }) 
            return;
        }
        else if (!status.toString().startsWith("2")) {
            console.warn(`CGEase: The music timetable document returned error ${status}, and therefore we could not complete the feature "Show Music Lessons".`)
            proceedFunction(featureIndex+1) // Do the next feature
            return false
        }
        parser = new DOMParser();
        lessonsDocument = parser.parseFromString(lessonsHTML, "text/html")
        musicLessons = getMusicLessons(lessonsDocument)
        for (lesson of musicLessons) {
            indicateMudicLesson(table, lesson, isTimetablePage, function (subject) { // Conditional for whether or not it contains the word "Music", then we would not need to show it on the timetable
                if (subject.innerText.toLowerCase().includes("music")) {
                    return false
                }
                return true
            }, newMusicIcon)
        }
        if (logMessage) {
            console.log(logMessage)
        }
        proceedFunction(featureIndex+1) // Do the next feature
    })
}