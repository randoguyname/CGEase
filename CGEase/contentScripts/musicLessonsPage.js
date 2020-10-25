/*function getMusicLessons(lessonsDocument) {
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

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.queryType == "getMusicLessonsFromContentScript"){
            sendResponse(getMusicLessons(document)); //same as innerText
        }
    }
);*/