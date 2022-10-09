function gameLink(){
    var userLang = navigator.language || navigator.userLanguage; 
    console.log(userLang);
    if(userLang == "vi"){
        var getLinkButton = document.getElementById("get-link");
        var newLink = "https://shope.ee/1VODdwm1EO";
        getLinkButton.setAttribute("href", newLink);
    }
}
gameLink();