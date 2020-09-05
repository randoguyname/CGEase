doShowMusicLessons = true
doChangeMusicLogo = true
doInsertTimetableBreaks = true
doRoundTimes = true

timetable = document.querySelector(".timetable")
isTimetablePage = document.location.href.toLowerCase().endsWith("timetable")

function proceedFeature(featureIndex) {
    if (featureIndex >= Object.entries(features).length) {
        return
    }
    
    feature = features[featureIndex]
    if (feature[1]) {
        feature[0](...feature[2], proceedFeature, featureIndex)
    }
    else {
        proceedFeature(featureIndex+1)
    }
}

features = [
    [injectNewMusicLogo, doChangeMusicLogo, []],
    [showMusicLessons, doShowMusicLessons, [timetable, isTimetablePage]],
    [insertTimetableBreaks, doInsertTimetableBreaks, [timetable]],
    [roundPeriodTimes, doRoundTimes, [timetable]]
]

proceedFeature(0)