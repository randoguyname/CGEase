// Assumes injectCSS has been run first

function ensureWeekday(text) { // Makes sure text is a weekday, not "Day 1" etc.
    return new Promise((resolve, reject) => {
        days = ["","Monday","Tuesday","Wednesday","Thursday","Friday"] // Don't need Saturday or sunday
        if (!(days.includes(text))) { // if day is not a normally formatted weekday
            if (dayRegex = /.*(\d)/g.exec(text)) { // if it is in the format "Day 1" etc.
                resolve(days[dayRegex[1]]) // return the normally formatted day, "Monday" etc.
            }
            else {
                reject("Text did not contain a day") // send the text back because why not
            }
        }
        else { // If it is a normally formatted weekday, return normally
            resolve(text)
        }
    })
}

function highlightToday(logMessage, proceedFunction, featureIndex) {
    ensureWeekday(document.querySelector(".timetable-day-active").innerText)
        .then(day => { // Success
            injectCSSFile(`styles/highlightToday/${day}.css`, logMessage, proceedFunction, featureIndex) // Inject the css
        }, reason => { // Reject
            console.warn(`Could not highlight current day on timetable for reason '${reason}'`) // Warn the user
        })
}