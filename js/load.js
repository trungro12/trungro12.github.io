// coupon
var couponShow = $("#coupon-show");
couponShow.addClass("row");
if (urlParams["type"] == "game" || !urlParams["type"])
  loadContent(couponShow, "coupon.html");
else loadContent(couponShow, "couponv1.html");

var loadContents = $("#loadContents");
if (urlParams["type"] == "shopee") loadContent(loadContents, "shopee.html");
else if (urlParams["type"] == "tiki") loadContent(loadContents, "tiki.html");
else if (urlParams["type"] == "game") loadContent(loadContents, "game.html");
else loadContent(loadContents, "allvoucher.html");

$("#sortCouponSelect").change(function () {
  if (!urlParams["type"]) {
    var sort = $("#sortCouponSelect").val();
    loadContent(couponShow, "coupon.html");
  } else {
    $.niceToast.error("Tính năng này chỉ hoạt động ở trang chủ :(");
  }
});
