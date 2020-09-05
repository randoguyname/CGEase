doShowMusicLessons = true
doChangeMusicLogo = true
doInsertTimetableBreaks = true
doRoundTimes = true

timetable = document.querySelector(".timetable")
isTimetablePage = document.location.href.toLowerCase().endsWith("timetable")

if (doChangeMusicLogo) {
    injectNewMusicLogo()
}

if (doShowMusicLessons) {
    showMusicLessons(timetable, isTimetablePage)
}

if (doInsertTimetableBreaks) {
    insertTimetableBreaks(timetable)
}

if (doRoundTimes) {
    roundPeriodTimes(timetable)
}