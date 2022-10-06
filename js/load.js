var loadContents = $("#loadContents");
if (urlParams["type"] == "game") loadContent(loadContents, "game.html");
else {
  // coupon
  var couponShow = $("#coupon-show");
  couponShow.addClass("row");
  loadContent(couponShow, "coupon.html");

  var loadedContent = false;
  $(window).on("scroll", function () {
    if (
      !loadedContent &&
      $(window).scrollTop() + $(window).height() >= loadContents.offset().top
    ) {
      loadedContent = true;
      if (urlParams["type"] == "shopee")
        loadContent(loadContents, "shopee.html");
      else if (urlParams["type"] == "tiki")
        loadContent(loadContents, "tiki.html");
      else loadContent(loadContents, "allvoucher.html");
    }
  });
}
