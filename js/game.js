function gameloader() {
  var game = ["NARUTO SHIPPUDEN: Ultimate Ninja STORM 4"];
  var url = [
    "https://store.steampowered.com/app/349040/NARUTO_SHIPPUDEN_Ultimate_Ninja_STORM_4/",
  ];
  var image = [
    "https://cdn.akamai.steamstatic.com/steam/apps/349040/header.jpg",
  ];
  var contentHTML = '<div class="coupon-section">';
  contentHTML += '<div class="row">';
  contentHTML += "<h3>Game có trong video trên Tiktok của mình</h3>";
  game.forEach(function (content, index) {
    contentHTML += '<div class="col-lg-3">';
    contentHTML +=
      '<a target="_blank" rel="noopener" href="' + url[index] + '">';

    contentHTML +=
      '<div class="coupon-content"><img width="450" height="200" alt="' +
      content +
      '" src="' +
      image[index] +
      '"><p class="coupon-text">' +
      content +
      "</p></div>";

    contentHTML += "</a>";
    contentHTML += "</div>";
  });
  contentHTML += "</div>";
  contentHTML += "</div>";
  $("#gameloader").html(contentHTML);
}
gameloader();
