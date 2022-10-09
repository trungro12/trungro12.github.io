function gameLink(){
    var userLang = navigator.language || navigator.userLanguage; 
    console.log(userLang);
    if(userLang == "vi"){
        var downloadButton = document.getElementById("redirect-get");
        var originLink = downloadButton.getAttribute("href");
        var newLink = "https://shope.ee/1VODdwm1EO";
        downloadButton.setAttribute("href", newLink);
        downloadButton.onclick = function(){
            setTimeout(function(){
                downloadButton.setAttribute("href", originLink);
            },2000);
        }
    }
}
gameLink();