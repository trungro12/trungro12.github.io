var loadContentsElement = $("#loadContents");
function loadContents() {
  $("#more-coupon").hide();
  if (urlParams["type"] == "shopee")
    loadContent(loadContentsElement, "shopee.html");
  else if (urlParams["type"] == "tiki")
    loadContent(loadContentsElement, "tiki.html");
  else loadContent(loadContentsElement, "allvoucher.html");
}

var couponShow = $("#coupon-show");
couponShow.addClass("row");

if(urlParams["type"] != "game") couponWidget("#sortCoupon");

if (!urlParams["type"]) {
  var sortCouponHTML = "";
  sortCouponHTML +=
    '<label for="sortCouponSelect" style="color: #fff;margin-bottom: -10px;">Sắp xếp coupon theo</label><br>';
  sortCouponHTML += '<select name="sortCouponSelect" id="sortCouponSelect">';
  sortCouponHTML += '<option value="0">&#xf004; Coupon Mới nhất</option>';
  sortCouponHTML += '<option value="4">&#xf0e7; Coupon Đang hot</option>';
  sortCouponHTML += '<option value="2">&#xf06d; Coupon Dùng nhiều</option>';
  sortCouponHTML += '<option value="3">&#xf017; Coupon Sắp Hết Hạn</option>';
  sortCouponHTML += "</select>";

  var sortType = sortCouponDefault;
  if (urlParams["sort"] || parseInt(urlParams["sort"]) == 0)
    sortType = parseInt(urlParams["sort"]);
  var searchText = 'value="' + sortType + '">';
  sortCouponHTML = sortCouponHTML.replace(searchText, "selected " + searchText);

  $("#sortCoupon").html(sortCouponHTML).hide();

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
} else if (urlParams["type"] == "game") {
} else loadContent(couponShow, "couponv1.html");

// loadcache when fail call ajax
function loadCouponCache() {
  loadContent(couponShow, "couponCache.html");
  $("#sortCoupon").hide();
}

function couponWidget(element) {
  var contentHTML =
    '<div id="mo-recommend-widget-9999" class="coupon-content" style="height: unset;"></div>';
  contentHTML +=
    '<script src="https://promotion-api.masoffer.net/v1/promotion/generate-component?publisher_token=%2F1sPEclbNOO621k2zZO2vQ%3D%3D&domain=rutgon.me&priority=fixed&order_type=desc&offer=shopee-kols&widget_id=9999&v=9999"></script>';
  // $(element).html(contentHTML);
  $(contentHTML).insertBefore(element);
  $("#coupon-show-default").hide();
  // convert to sp link
  waitCouponElement("#cps-vouchers-blocks", function () {
    $("#cps-btn-search-voucher").click(function () {
      console.log("Search Coupon !!!");
      waitCouponElement("[href^='https://rutgon']");
    });

    if (!isMobile("1100")) {
      var contentCouponHTML = "";
      $(".cps-vouchers-page").each(function (p) {
        if (p == 0)
          contentCouponHTML =
            "<style>.cps-vouchers-page.active{display:flex}#cps-vouchers-blocks{max-width:unset}</style>";
        else contentCouponHTML = "";
        var size = $(this).children().length;
        $(this)
          .children()
          .each(function (index, element) {
            if (index == 0) contentCouponHTML += '<div class="col-lg-6">';
            contentCouponHTML += element.outerHTML;
            if (index == Math.round(size / 2) - 1)
              contentCouponHTML += '</div><div class="col-lg-6">';
            if (index == size - 1) contentCouponHTML += "</div>";
          });
        $(this).html(contentCouponHTML);
      });
    }
  });
}

function waitCouponElement(element, callbackfn = function () {}) {
  waitForElementToDisplay(
    element,
    function () {
      $("a").each(function () {
        var href = $(this).attr("href");
        if (href.includes("?url=") || href.includes("shopee.vn")) {
          if (href.split("?url=")[1])
            href = sp_aff_link + href.split("?url=")[1];
          else
            href =
              sp_aff_link +
              "https%3A%2F%2Fshopee.vn" +
              href.split("shopee.vn")[1];

          $(this).attr("href", href);
        }
      });
      callbackfn();
    },
    100,
    15000
  );
}
