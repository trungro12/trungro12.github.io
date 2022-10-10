$(function () {
  $("#allvoucher").click(function () {
    location.href = currenturl;
  });
  $("#shopeeTitle").click(function () {
    location.href = currenturl + "?type=shopee";
  });
  $("#tiki").click(function () {
    location.href = currenturl + "?type=tiki";
  });
  $("#game").click(function () {
    location.href = currenturl + "?type=game";
  });
});
// var loadscript = document.createElement("script");
// loadscript.type = "text/javascript";

if (urlParams["type"]) {
  var typeTitle = urlParams["type"];
  if (typeTitle == "shopee") typeTitle = "shopeeTitle";
  $("#" + typeTitle + "").addClass("btn-active");
  if (urlParams["type"] == "game") {
    $("#more-coupon").hide();
    $(".coupon-section").hide();
    loadContent($("#loadContents"), "game.html");
  }
  // $("#sortCoupon").hide();
  // loadscript.src = "js/load.js";
} else {
  $("#allvoucher").addClass("btn-active");
  // loadscript.setAttribute("lazy", "");
  // loadscript.setAttribute("data-src", "js/load.js");
}
// loadscript.setAttribute("lazy", "");
// loadscript.setAttribute("data-src", "js/load.js");
// $("#loadScripts").append(loadscript);

