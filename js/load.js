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

// loadcache when fail call ajax
function loadCouponCache(){
  loadContent(couponShow, "couponCache.html");
}

if (urlParams["type"] == "game" || !urlParams["type"]) {
  var shortCouponHTML = '';
  shortCouponHTML += '<label for="sortCouponSelect" style="color: #fff;margin-bottom: -10px;">Sắp xếp coupon theo</label><br>';
  shortCouponHTML += '<select name="sortCouponSelect" id="sortCouponSelect">';
  shortCouponHTML += '<option value="0">&#xf004; Coupon Mới nhất</option>';
  shortCouponHTML += '<option selected value="4">&#xf0e7; Coupon Đang hot</option>';
  shortCouponHTML += '<option value="2">&#xf06d; Coupon Dùng nhiều</option>';
  shortCouponHTML += '<option value="3">&#xf017; Coupon Sắp Hết Hạn</option>';
  shortCouponHTML += '</select>';
  $("#sortCoupon").html(shortCouponHTML);
  loadContent(couponShow, "coupon.html");
  $("#sortCouponSelect").change(function () {
    if (!urlParams["type"]) {
      var sort = document.getElementById("sortCouponSelect").value;
      window.location.href = currenturl + "?sort=" + sort;
    } else {
      document.getElementById("sortCouponSelect").value = sortCouponDefault;
      $.niceToast.error("Tính năng này chỉ hoạt động ở trang chủ :(");
    }
  });
}
else loadContent(couponShow, "couponv1.html");