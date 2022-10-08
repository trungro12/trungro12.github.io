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
// var loadscript = document.createElement("script");
// loadscript.type = "text/javascript";

if (urlParams["type"]) {
  $("#" + urlParams["type"] + "").addClass("btn-active");
  if (urlParams["type"] == "game") {
    $("#more-coupon").hide();
  }
  // loadscript.src = "js/load.js";
} else {
  $("#allvoucher").addClass("btn-active");
  $("#sortCoupon").show();
  // loadscript.setAttribute("lazy", "");
  // loadscript.setAttribute("data-src", "js/load.js");
}
// loadscript.setAttribute("lazy", "");
// loadscript.setAttribute("data-src", "js/load.js");
// $("#loadScripts").append(loadscript);

$("#sortCouponSelect").change(function () {
  if (!urlParams["type"]) {
    var sort = document.getElementById("sortCouponSelect").value;
    window.location.href = currenturl + "?sort=" + sort;
  } else {
    $.niceToast.error("Tính năng này chỉ hoạt động ở trang chủ :(");
  }
});

