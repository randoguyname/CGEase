// Variables

var featureDefaults = {
    doShowMusicLessons: true,
    doChangeMusicLogo: true,
    doInsertTimetableBreaks: true,
    doRoundTimes: true,
    doDEEDSDarkMode: true,
    doSchoologyDarkMode: true,
    doOrderZoomMeetings: true,
    doHighlightToday: false
}

// Preset the checklist with all the stored values
function presetChecklist() {
    var list = document.getElementById('myUL');
    chrome.storage.sync.get(allFeatureIdsSync.concat(highlightColors), function (response) {
                          
        for (featureId of allFeatureIdsSync) {
            if (response[featureId]) {document.querySelector(`[featureid=${featureId}]`).classList.add("checked")};
        }

        for (highlightColor of highlightColors) {
            document.getElementById(`${highlightColor}Icon`).style.backgroundColor = response[highlightColor];
            document.getElementById(highlightColor).value = response[highlightColor];
        }
    })
    chrome.storage.local.get(allFeatureIdsLocal.concat(highlightColors), function (response) {     
        for (featureId of allFeatureIdsLocal) {
            if (response[featureId][0]) {
                document.querySelector(`[featureid=${featureId}]`).classList.add("checked")
            }
        }

    })

}

// Add a "checked" symbol when clicking on a list item and change chrome storage
function checklistChecked() {
    var list = document.getElementById('myUL');
    list.addEventListener('click', function(ev) {
        if (ev.target.attributes['featureid']) {
            item = document.querySelector(`li[featureid=${ev.target.attributes.featureid.value}]`)
            item.classList.toggle('checked');
            featureId = item.attributes["featureid"].value
            isEnabled = item.classList.contains("checked")
            if (ev.target.attributes.featureid.value == "changeIntranetBackground") {
                chrome.storage.local.get(["changeIntranetBackground"], function (response) {
                    chrome.storage.local.set({
                        changeIntranetBackground: [isEnabled, response.changeIntranetBackground[1]]
                    })
                })
                return;
                
            }
            chrome.storage.sync.set({[featureId]:isEnabled})
            if (featureId == "closeZoomSuccessTabs" && isEnabled) {
                chrome.runtime.sendMessage(
                    {
                        contentScriptQuery: "purgeZoomTabs",
                    }
                )
            }
        }

    }, false);
}

function colorSelect(iconId, inputId) {
    document.getElementById(iconId).addEventListener("click", function (ev) {
        document.getElementById(inputId).click();
    }, false)

    document.getElementById(inputId).addEventListener("change", function (ev) {
        color = document.getElementById(inputId).value
        document.getElementById(iconId).style.backgroundColor = color;
        chrome.storage.sync.set({
            [inputId]: color,
        });
    })
}

function fileSelect(iconId, inputId, itemSelector) {
    document.getElementById(iconId).addEventListener("click", function (ev) {
        document.getElementById(inputId).click();
    }, false)

    document.getElementById(inputId).addEventListener("change", function (ev) {
        reader = new FileReader();
        reader.onloadend = function() {
            chrome.storage.local.set({
                [inputId]: [true, reader.result],
            });
            for (element of document.querySelectorAll(itemSelector)) {
                element.classList.add("checked")
            }
        }
        reader.readAsDataURL(document.getElementById(inputId).files[0])
    })
}

function onLoad() {
    colorSelect("highlightMusicLessonsColorIcon", "highlightMusicLessonsColor")
    colorSelect("highlightTimetableBreaksColorIcon", "highlightTimetableBreaksColor")
    fileSelect("changeIntranetBackgroundIcon", "changeIntranetBackground", "li[featureid=changeIntranetBackground]")
    presetChecklist();
    checklistChecked();
}

window.onload = onLoad;