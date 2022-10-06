$(function () {
  $("#allvoucher").click(function () {
    location.href = currenturl;
  });
  $("#shopee").click(function () {
    location.href = currenturl + "?type=shopee";
  });
  $("#tiki").click(function () {
    location.href = currenturl + "?type=tiki";
  });
  $("#game").click(function () {
    location.href = currenturl + "?type=game";
  });
});

var currenturl = location.href.replace("#", "");
currenturl = currenturl.split("?")[0];
let urlParams = getUrlParams(location.search);

var loadscript = document.createElement("script");
loadscript.type = "text/javascript";

if (urlParams["type"]) {
  $("#" + urlParams["type"] + "").addClass("btn-active");
  if (urlParams["type"] == "game") {
    $("#coupon-show-default").html("");
  }
  // loadscript.src = "js/load.js";
} else {
  $("#allvoucher").addClass("btn-active");
  // loadscript.setAttribute("lazy", "");
  // loadscript.setAttribute("data-src", "js/load.js");
}
loadscript.setAttribute("lazy", "");
loadscript.setAttribute("data-src", "js/load.js");
$("#loadScripts").append(loadscript);
