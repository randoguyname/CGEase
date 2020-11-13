chrome.storage.sync.get(Object.keys(featureDefaults), storage => {
    timetable = document.querySelector(".timetable")
    isTimetablePage = document.location.href.toLowerCase().endsWith("timetable")
    hasAnyTimetable = (timetable != null)
    
    darkModeLogo = `<svg width="192.5px" height="69.5px" viewBox="0 0 3850 1390" preserveAspectRatio="xMidYMid meet" style="position: relative;right: .3rem;"><g fill="#1a1b3b" stroke="none"><path d="M3350 618 l0 -23 122 -122 123 -123 -123 0 -122 0 0 -35 0 -35 178 2 177 3 3 178 2 177 -35 0 -35 0 0 -115 0 -115 -8 0 c-4 0 -59 52 -122 115 l-115 115 -22 0 -23 0 0 -22z" id="path12"></path></g><g fill="#95c11e" stroke="none"><path d="M2920 890 l0 -180 30 0 30 0 0 120 0 120 8 0 c4 0 61 -54 127 -120 l120 -121 20 3 20 3 3 20 3 20 -121 120 c-66 66 -120 123 -120 127 l0 8 120 0 120 0 0 30 0 30 -180 0 -180 0 0 -180z" id="path17"></path></g><g fill="#e8b806" stroke="none"><path d="M3350 1040 l0 -30 122 0 123 0 -123 -123 -122 -122 0 -28 0 -27 18 0 17 0 120 120 c66 66 123 120 127 120 l7 0 3 -117 3 -118 30 0 30 0 3 178 2 177 -180 0 -180 0 0 -30z" id="path20"></path></g><g fill="#b1d2f0" stroke="none"><path d="M2914 627 c-2 -7 -3 -87 -2 -177 l3 -165 180 0 180 0 3 33 3 32 -123 0 -123 0 123 123 122 122 0 23 0 22 -28 0 -27 0 -115 -115 c-63 -63 -118 -115 -122 -115 l-8 0 0 115 0 115 -30 0 -31 0 -5 -13z" id="path23"></path></g><g><g id="g82" transform="translate(5,785)" style="fill:#ffffff"><g id="layer101-1" style="fill:#ffffff;stroke:none" transform="translate(-3.2255463,-229.01379)"><path id="path35" d="m 2478.2255,524.01379 c -91,-14 -149,-56 -175,-125 -24,-63 -17,-75 47,-75 52,0 53,1 70,40 21,51 70,74 140,68 57,-6 88,-30 88,-69 0,-40 -33,-61 -148,-93 -67,-19 -111,-37 -136,-57 -92,-76 -62,-216 57,-264 95,-39 246,-13 297,52 22,28 42,91 34,105 -3,4 -30,8 -59,8 -53,0 -55,-1 -69,-34 -17,-41 -72,-63 -130,-52 -34,7 -66,37 -66,63 0,23 38,52 82,63 188,49 239,79 258,151 37,138 -109,248 -290,219 z" inkscape:connector-curvature="0" style="fill:#ffffff"></path><path id="path37" d="m 238.22555,223.01379 v -291 l 158,4 c 144,3 162,6 213,30 95,43 139,126 139,258 0,101 -23,164 -79,220 -30,30 -63,53 -87,59 -22,6 -108,11 -191,11 h -153 z m 319,163 c 47,-35 66,-79 65,-158 -1,-80 -19,-122 -67,-158 -22,-16 -47,-22 -108,-25 l -79,-3 v 187 188 l 81,-6 c 59,-4 89,-11 108,-25 z" inkscape:connector-curvature="0" style="fill:#ffffff"></path><path id="path39" d="m 798.22555,224.01379 v -290 l 212.99995,2 212,3 3,53 3,52 h -156 -155.99995 l 3,63 3,62 137.99995,3 137,3 v 44 44 l -137,3 -137.99995,3 v 70 70 l 157.99995,3 158,3 -3,47 -3,47 -217,3 -217.99995,2 z" inkscape:connector-curvature="0" style="fill:#ffffff"></path><path id="path41" d="m 1283.2255,501.01379 c -3,-7 -4,-136 -3,-287 l 3,-275 h 215 215 v 50 50 l -153,3 -153,3 3,62 3,62 138,3 137,3 v 44 44 l -137,3 -138,3 v 70 70 l 153,3 152,3 v 49 50 h -215 c -165,0 -217,-3 -220,-13 z" inkscape:connector-curvature="0" style="fill:#ffffff"></path><path id="path43" d="m 1770.2255,227.01379 3,-288 h 155 c 175,1 212,9 270,61 56,51 83,122 84,219 0,135 -45,224 -136,269 -50,25 -59,26 -215,26 h -163 z m 311,167 c 50,-24 72,-74 72,-165 0,-137 -37,-176 -172,-183 l -83,-5 v 188 188 l 78,-5 c 42,-3 89,-11 105,-18 z" inkscape:connector-curvature="0" style="fill:#ffffff"></path></g><g id="layer102-9" style="fill:#ffffff;stroke:none"></g><g id="layer103-1" style="fill:#ffffff;stroke:none"></g></g></g></svg>`
    
    function proceedFeature(featureIndex) { // forces features to run one after the other
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
        [injectCSSFile, storage.doChangeMusicLogo, ["styles/refontMusic.css", "Changed Music Logo"]],
        [injectCSSFile, storage.doDEEDSDarkMode, ["styles/DEEDSDarkMode.css", "Used DEEDS dark theme"]],
        [injectCSSFile, storage.doDEEDSHideSelfView, ["styles/DEEDSHideSelfView.css", "Hid School Photo"]],
        [injectCSSFile, true, ["styles/doDisplay.css", "Displayed DEEDS"]],
        [showMusicLessons, storage.doShowMusicLessons && hasAnyTimetable, [timetable, isTimetablePage, storage.doChangeMusicLogo, "Displayed music lessons"]],
        [highlightToday, storage.doHighlightToday && isTimetablePage, [storage.doDEEDSDarkMode, "Highlighted Current Day"]],
        [insertTimetableBreaks, storage.doInsertTimetableBreaks && isTimetablePage, [timetable, "Inserted Timetable Breaks"]],
        [roundPeriodTimes, storage.doRoundTimes && hasAnyTimetable, [timetable, "Rounded Period Times"]]
    ]
    
    proceedFeature(0)
})