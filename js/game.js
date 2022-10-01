function gameloader() {
    var game = ['NARUTO SHIPPUDEN: Ultimate Ninja STORM 4'];
    var url = ['https://store.steampowered.com/app/349040/NARUTO_SHIPPUDEN_Ultimate_Ninja_STORM_4/'];
    var image = ['https://cdn.akamai.steamstatic.com/steam/apps/349040/header.jpg'];
    var contentHTML = '<div class="row">';
    game.forEach(function (content, index) {
        contentHTML += '<a target="_blank" rel="noopener" href="' + url[index] + '"><div class="game-content"><img src="' + image[index] + '"><h3>' + content + '</h3></div></a>';
    });
    contentHTML += '</div>';
    $("#gameloader").html(contentHTML);
}
gameloader();