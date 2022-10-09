function gameLink() {
    var userLang = navigator.language || navigator.userLanguage;
    var timezone =  (new Date().toTimeString().slice(9));
    console.log(userLang + ", time zone : " + timezone);
    if (userLang == "vi" || timezone.includes("+07")) {
        var getLinkButton = document.getElementById("get-link");
        var newLink = "https://shope.ee/Asr0osTr9";
        getLinkButton.setAttribute("href", newLink);
        getLinkButton.setAttribute("target", "_blank");
    }
}
gameLink();
