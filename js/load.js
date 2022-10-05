// plugin toast 
$.niceToast.setup({
    position: "top-right",
    timeout: 3000
  });

// coupon 
var couponShow = $("#coupon-show");
couponShow.addClass("row");
loadContent(couponShow, "coupon.html");

var loadContents = $("#loadContents");
if (urlParams['type'] == 'shopee') loadContent(loadContents, "shopee.html");
else if (urlParams['type'] == 'tiki') loadContent(loadContents, "tiki.html");
else if (urlParams['type'] == 'game') loadContent(loadContents, "game.html");
else loadContent(loadContents, "allvoucher.html");