function injectSettings(settings) {
    firstColumns = document.querySelector(".small-12.columns section").parentElement
    firstColumns.insertAdjacentHTML("afterEnd", `<div class="small-12 columns">
    <h2 id="cgease" class="subheader">CGEase</h2>

    <section>
        <p class="content">Settings for the CGEase extension can be changed here</p>
        <table id="cgease-settings" class="no-margin">
            <tbody>
            </tbody>
        </table>
    </section>
</div>`);
    for ([featureId, details] of Object.entries(settings)) {
        featureName = details.featureName
        isEnabled = details.isEnabled
        row = document.getElementById("cgease-settings").insertRow(-1)
        labelCell = row.insertCell(-1)
        label = document.createElement("label")
        label.setAttribute("for", `cgease-${featureId}`)
        label.innerText = featureName
        labelCell.appendChild(label)

        switchCell = row.insertCell(-1)

        switchDiv = document.createElement("div")
        switchDiv.setAttribute("class", "long switch no-margin")
        switchCell.appendChild(switchDiv)

        hiddenInput = document.createElement("input")
        hiddenInput.setAttribute("type", "hidden")
        hiddenInput.setAttribute("name", `cgease[${featureId}]`)
        hiddenInput.setAttribute("value", 0)
        switchDiv.appendChild(hiddenInput)

        checkboxInput = document.createElement("input")
        checkboxInput.setAttribute("type", "checkbox")
        checkboxInput.setAttribute("id", `cgease-${featureId}`)
        checkboxInput.setAttribute("name",`cgease[${featureId}]`)
        checkboxInput.setAttribute("value", 1)
        checkboxInput.setAttribute("checked", "checked")
        checkboxInput.checked = isEnabled
        switchDiv.appendChild(checkboxInput)

        checkboxInput.addEventListener("click", (click) => { // Change storage values
            chrome.storage.sync.set({
                [click.toElement.id.split("-")[1]]: click.toElement.checked
            })
        })

        abilityLabel = document.createElement("label")
        abilityLabel.setAttribute("for", `cgease-${featureId}`)
        switchDiv.appendChild(abilityLabel)

        enabledSpan = document.createElement("span")
        enabledSpan.innerText = "Enabled"
        abilityLabel.appendChild(enabledSpan)

        disabledSpan = document.createElement("span")
        disabledSpan.innerText = "Disabled"
        abilityLabel.appendChild(disabledSpan)
    }
}
