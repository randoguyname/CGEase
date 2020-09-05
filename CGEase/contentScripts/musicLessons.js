function indicateMudicLesson(table, lessonMatrix, isFullTimetable, conditionCallback) {
    // Adds icon to top left of lessonMatrix (period, day) cell, indicating it is a music lesson
    // Note: Period 1 is index 1, Monday is index 1

    if (isFullTimetable) {
        subject = table.tBodies[0].rows[lessonMatrix[0]].cells[lessonMatrix[1]].querySelector("div.timetable-subject"); // get the cell (technically nested div)
        parent = subject.parentElement; // get its parent
    }
    else { // Not implemented
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
    icon.innerHTML = "&#x266b;" // "Music" icon from my addition

    icon.style.float = "right"; // top right corner
    icon.style.color = "hsl(46 96% 65% / 1)" // temporary, but ok
    icon.style.marginRight = ".75rem" // give a margin
    icon.style.marginTop = "1rem" // the margin is different because the glyph is weird
    icon.style.fontFamily = "bravura" // "Music" icon (podcast), same as DEEDs for consistency
    icon.style.fontSize = "1.2rem" // make slightly larger

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

function showMusicLessons(table, isTimetablePage) {
    chrome.runtime.sendMessage({"queryType": "url", "url": document.querySelector("a.icon-podcast").href}, function (lessonsHTML) { // send message to background script to get HTML contents of url
        parser = new DOMParser();
        lessonsDocument = parser.parseFromString(lessonsHTML, "text/html")
        
        musicLessons = getMusicLessons(lessonsDocument)
        for (lesson of musicLessons) {
            indicateMudicLesson(table, lesson, isTimetablePage, function (subject) { // Conditional for whether or not it contains the word "Music", then we would not need to show it on the timetable
                if (subject.innerText.toLowerCase().includes("music")) {
                    return false
                }
                return true
            })
        }
    })
}