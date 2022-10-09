function gameLink(){
    var userLang = navigator.language || navigator.userLanguage; 
    console.log(userLang);
    if(userLang == "vi"){
        var getLinkButton = document.getElementById("get-link");
        var newLink = "https://shope.ee/Asr0osTr9";
        getLinkButton.setAttribute("href", newLink);
        getLinkButton.setAttribute("target", "_blank");
    }
}
gameLink();