function injectNewMusicLogo() {
    link = document.createElement("link");
    link.href = chrome.runtime.getURL("styles/refontMusic.css")
    link.rel = "stylesheet"
    link.type= "text/css"

    document.head.appendChild(link)
}