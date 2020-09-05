function roundTime(text) {
    return text.replaceAll(/:(\d\d)/g, function (inp) {
        return ":" + (Math.round(parseInt(inp.slice(1)) / 5) * 5).toString().padStart(2, "0") // round the number, among other things
    })
}

function roundPeriodTimes(timetable, proceedFunction, featureIndex) {
    for (time of timetable.querySelectorAll("time.meta")) {
        time.innerText = roundTime(time.innerText)
    }

    proceedFunction(featureIndex+1) // Do next feature
}