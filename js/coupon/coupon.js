// coupon
function coupon(element, merchantID = null, limit = 4, defaultImage = "auto") {
  if (limit > 20) limit = 20;
  limit -= 1;
  var merchant = "";
  if (!merchantID && urlParams["type"]) {
    merchantID = urlParams["type"];
  }
  if (merchantID) {
    if (merchantID == "tiki") merchantID = "tikivn";
    merchant = "&merchant=" + merchantID + "";
  }

  // console.log(merchant);
  var api =
    "https://api.accesstrade.vn/v1/offers_informations?scope=&status=1" +
    merchant +
    "";
  var contentHTML = "";
  
  try {
    $.ajax({
      type: "GET",
      url: api,
      dataType: "json",
      async: true,
      contentType: "application/json",
      headers: {
        Authorization: at_token,
      },
      success: function (data) {
        var dataCoupon = data.data;
        var style = "";
        if (dataCoupon.length == 1) style = "style='margin:auto;'";
        dataCoupon = dataCoupon.sort((a, b) => 0.5 - Math.random());
        try {
          var loadImageDefault = false;
          dataCoupon.forEach(function (voucher, index) {
            if (defaultImage == "auto") loadImageDefault = randomBool();
            else if (defaultImage == "default") loadImageDefault = true;
            else loadImageDefault = false;
            if (loadImageDefault) {
              if (voucher.merchant.includes("tiki"))
                voucher.image = "/image/tiki.png";
              else voucher.image = "/image/shopee.png";
            }
            if (voucher.merchant.toLowerCase().includes("shopee")) {
              var voucherlink = encodeURIComponent(voucher.link);
              if (voucherlink) {
                voucher.aff_link = sp_aff_link + voucherlink;
              }
            }
            voucher.merchant = "";
            contentHTML += "<div " + style + " class='col-lg-3'>";

            contentHTML +=
              "<a onclick=\"copyCoupon(this,'" +
              voucher.coupons[0].coupon_code +
              "')\" href='" +
              voucher.aff_link
                .replace(/%26ref%3D[a-z]+/, "")
                .replace(/%3Fref%3D[a-z]+/, "") +
              "' target='_blank' rel='noopener noreferrer nofollow'>";

            contentHTML += "<div class='coupon-content'>";
            contentHTML +=
              "<img height='200' width='200' alt='" +
              voucher.name +
              "' src='" +
              voucher.image +
              "'>";
            contentHTML +=
              "<p class='coupon-text'>" + voucher.merchant + voucher.coupons[0].coupon_desc + "</p>";
            // contentHTML += "<p class='coupon-text'>" + voucher.content + "</p>";
            contentHTML +=
              "<p class='coupon-label'><i class='fa-solid fa-bag-shopping'></i> " + voucher.coupons[0].coupon_code +
              "</p><span class='coupon-copy'><i class='fa-solid fa-clipboard'></i> Nhấn để Copy mã giảm giá</span>";
            contentHTML += "</div>";
            contentHTML += "</div>";

            contentHTML += "</a>";

            if (index == limit) throw new Exception("Time to end the loop");
          });
        } catch (e) {
          console.log("Loop has ended");
        }
        $(contentHTML).insertBefore(element);
        $("#coupon-show-default").hide();
        if (!isMobile())
          var toast = $.niceToast.success("Mã Giảm Giá Hiển Thị Thành Công ^.^");
        // $("#isMobile").hide();
        // console.log(dataCoupon);
      },
      error: function (error) {
        console.log(error.message);
        $("#coupon-show-default").hide();
        $(element).html(
          "<h3>Có Lỗi Khi Tải Dữ Liệu :( , <a class='btn btn-danger' href=''>Tải Lại Trang</a></h3>"
        );
      },
    });

  } catch (error) {
    console.log(error.message);
    $(element).html(
      "<h3>Dữ Liệu Không Tải Được :( Đang tự động tải lại trang trong <span id='countReload'></span> giây, <a class='btn btn-danger' href=''>Tải Lại Trang</a></h3>"
    );
    countToReload(5, "#countReload");
  }
}
