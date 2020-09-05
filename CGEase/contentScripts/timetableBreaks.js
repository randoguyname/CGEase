function insertTimetableBreaks(timetable) {
    // Style the timetable breaks
    link = document.createElement("link");
    link.href = chrome.runtime.getURL("styles/timetableBreaks.css")
    link.rel = "stylesheet"
    link.type= "text/css"
    document.head.appendChild(link)

    // Insert Recess
    recess = timetable.insertRow(5)
    recessHeader = document.createElement("th")
    recessHeader.colSpan = 6
    recessHeader.innerText = "Recess"
    recessHeader.classList.add("timetable-break")
    time = document.createElement("time")
    time.classList.add("meta")
    time.innerText = "10:45am–11:10am" // The time recess goes for
    recessHeader.appendChild(time)
    recess.appendChild(recessHeader)

    // Insert Lunch
    lunch = timetable.insertRow(8)
    lunchHeader = document.createElement("th")
    lunchHeader.colSpan = 6
    lunchHeader.innerText = "Lunch"
    lunchHeader.classList.add("timetable-break")
    time = document.createElement("time")
    time.classList.add("meta")
    time.innerText = "12:30am–1:25am" // The time lunch goes for
    lunchHeader.appendChild(time)
    lunch.appendChild(lunchHeader)
}