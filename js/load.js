function loadContents() {
  $("#more-coupon").hide();
  var loadContents = $("#loadContents");
  if (urlParams["type"] == "shopee") loadContent(loadContents, "shopee.html");
  else if (urlParams["type"] == "tiki") loadContent(loadContents, "tiki.html");
  else loadContent(loadContents, "allvoucher.html");
}

if (urlParams["type"] == "game") {
  loadContent(loadContents, "game.html");
}

var couponShow = $("#coupon-show");
couponShow.addClass("row");
if (urlParams["type"] == "game" || !urlParams["type"])
  loadContent(couponShow, "coupon.html");
else loadContent(couponShow, "couponv1.html");