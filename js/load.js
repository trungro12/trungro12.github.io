var loadContentsElement = $("#loadContents");
function loadContents() {
  $("#more-coupon").hide();
  if (urlParams["type"] == "shopee") loadContent(loadContentsElement, "shopee.html");
  else if (urlParams["type"] == "tiki") loadContent(loadContentsElement, "tiki.html");
  else loadContent(loadContentsElement, "allvoucher.html");
}

if (urlParams["type"] == "game") {
  loadContent(loadContentsElement, "game.html");
}

var couponShow = $("#coupon-show");
couponShow.addClass("row");
if (urlParams["type"] == "game" || !urlParams["type"])
  {
    loadContent(couponShow, "coupon.html");
    $("#sortCoupon").show();
}
else loadContent(couponShow, "couponv1.html");