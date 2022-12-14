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
  var isError = false;
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
              "</p><span class='coupon-copy'><i class='fa-solid fa-clipboard'></i> Nh???n ????? Copy m?? gi???m gi??</span>";
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
          var toast = $.niceToast.success("M?? Gi???m Gi?? Hi???n Th??? Th??nh C??ng ^.^");
        // $("#isMobile").hide();
        // console.log(dataCoupon);
      },
      error: function (error) {
        console.log(error.message);
        $("#coupon-show-default").hide();
        isError = true;
        // $("#alert").html(
        //   "<h3 class='alert alert-info' style='color:unset'>C?? L???i Khi T???i D??? Li???u :(, H??? Th???ng s??? l???y d??? li???u d??? ph??ng, b???n c?? th??? <a class='btn btn-danger' href=''>T???i L???i Trang</a> ????? kh???c ph???c. C???m ??n b???n r???t nhi???u !!!</h3>"
        // );
      },
      complete: function (data) {
        if (isError) loadCouponCache();
      }
    });

  } catch (error) {
    console.log(error.message);
    $(element).html(
      "<h3>D??? Li???u Kh??ng T???i ???????c :( ??ang t??? ?????ng t???i l???i trang trong <span id='countReload'></span> gi??y, <a class='btn btn-danger' href=''>T???i L???i Trang</a></h3>"
    );
    countToReload(5, "#countReload");
  }
}
