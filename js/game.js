function gameloader() {
  // $(".coupon-section").html("");
  var game = ["NARUTO SHIPPUDEN: Ultimate Ninja STORM 4"];
  var url = [
    "https://store.steampowered.com/app/349040/NARUTO_SHIPPUDEN_Ultimate_Ninja_STORM_4/",
  ];
  var image = [
    "https://cdn.akamai.steamstatic.com/steam/apps/349040/header.jpg",
  ];
  var video = [
    "https://cdn.akamai.steamstatic.com/steam/apps/256660477/movie_max.webm?t=1454603660",
  ];

  var contentHTML = '<div class="coupon-section">';
  contentHTML += '<div class="row">';
  contentHTML += "<h3>Game có trong video trên Tiktok của mình</h3>";
  var style = "";
  var gameNumber = game.length;
  if (gameNumber == 1) style = 'style="margin:auto;"';

  game.forEach(function (content, index) {
    var imageContent =
      '<img width="450" height="200" alt="' +
      content +
      '" src="' +
      image[index] +
      '">';
    contentHTML += "<div " + style + ' class="col-lg-6">';
    contentHTML +=
      '<a target="_blank" rel="noopener" href="' + url[index] + '">';
    contentHTML += '<div style="height: 310px;" class="coupon-content">';
    if (video[index]) {
      var autoplay = "";
      if (gameNumber == 1) autoplay = "autoplay";
      contentHTML +=
        '<video poster="' +
        image[index] +
        '" style="width: auto;max-height: 220px;" loop controls="" name="media" __idm_id__="720897" ' +
        autoplay +
        '><source src="' +
        video[index] +
        '" type="video/webm">' +
        imageContent +
        "</video>";
    } else {
      contentHTML += imageContent;
    }
    contentHTML += '<p class="coupon-text">' + content + "</p></div>";

    contentHTML += "</a>";
    contentHTML += "</div>";
  });
  contentHTML += "</div>";
  contentHTML += "</div>";
  $("#gameloader").html(contentHTML);
}
gameloader();
