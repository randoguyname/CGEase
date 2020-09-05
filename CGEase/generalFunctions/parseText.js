function parsePeriod(text) {
    if (groups = (/P(\d).*/g).exec(text)) { // Use regex to get period of lesson
        return parseInt(groups.flat().pop()); // returns the regex group, parsed into an integer
    }
}

function parseDay(text) { // NOTE: assumes the lowest day found
    days = {
        "monday": 1,
        "tuesday": 2,
        "wednesday": 3,
        "thursday": 4,
        "friday": 5,
        "saturday": 6,
        "sunday": 7
    }
    text = text.toLowerCase()
    for ([day, index] of Object.entries(days)) {
        if (text.includes(day)) {
            return index
        }
    }
}