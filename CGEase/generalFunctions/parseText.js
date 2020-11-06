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

function getMinutesFromTime(time) {
    if ((time.endsWith("AM") && !time.startsWith("12")) 
            || (time.startsWith("12") && time.endsWith("PM"))) { // if the time is AM (or 12 PM)
        time = time.slice(0,-3) // Remove AM or PM, leaving "11:05"
        time = (parseInt(time) * 60) + parseInt(time.slice(3)) // Calculate number of minutes since the beginning of the day
    }

    else if ((time.endsWith("PM") && !time.startsWith("12")) 
                || (time.startsWith("12") && time.endsWith("AM"))) { // if time is PM (or 12 AM)
        time = time.slice(0,-3) // Remove AM or PM, leaving "11:05"
        time = ((parseInt(time)+12) * 60) + parseInt(time.slice(3)) // Calculate number of minutes since the beginning of the day
    }
    return time;
}