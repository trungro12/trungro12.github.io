function loadContents() {
  var loadContents = $("#loadContents");
  var loaded = false;
  $(window).on('scroll', function () {
    if (!loaded && $(window).scrollTop() + $(window).height() >= loadContents.offset().top) {
      loaded = true;
      if (urlParams["type"] == "shopee") loadContent(loadContents, "shopee.html");
      else if (urlParams["type"] == "tiki") loadContent(loadContents, "tiki.html");
      else if (urlParams["type"] == "game") loadContent(loadContents, "game.html");
      else loadContent(loadContents, "allvoucher.html");
    }
  });
}

var couponShow = $("#coupon-show");
couponShow.addClass("row");
if (urlParams["type"] == "game" || !urlParams["type"])
  loadContent(couponShow, "coupon.html");
else loadContent(couponShow, "couponv1.html");
