// coupon
function coupon(element, limit = 4, sort = 0) {
    var page = 1;
    // var limit = '';
    var merchant = '';
    var category = '';
    var campaign = '';
    var keyword = '';
    var url = '';
    // var sort = '';// 0 moi nhat, 2 dung nhieu, 3 thoi gian con lai, 4 hot

    const params = {
        "page": page,
        "limit": limit,
        "merchant": merchant,
        "category": category,
        "campaign": campaign,
        "keyword": keyword,
        "url": url,
        "sort": sort,
        "status": 1,
    }

    var api =
        "https://api.accesstrade.vn/v1/offers_informations/coupon";
    var contentHTML = "";
    var isError = false;
    try {
        $.ajax({
            type: "GET",
            url: api,
            dataType: "json",
            data: params,
            async: true,
            contentType: "application/json",
            headers: {
                Authorization: at_token,
            },
            success: function (data) {
                var dataCoupon = data.data;
                var style = "";
                if (limit == 1) style = "style='margin:auto;'";
                dataCoupon = dataCoupon.sort((a, b) => 0.5 - Math.random());
                try {
                    var loadImageDefault = false;
                    dataCoupon.forEach(function (voucher, index) {
                        // voucher.merchant += " - ";
                        if (loadImageDefault) {
                            if (voucher.merchant.includes("tiki"))
                                voucher.image = "/image/tiki.png";
                            else voucher.image = "/image/shopee.png";
                        }
                        voucher.merchant = voucher.merchant.toLowerCase();
                        if (voucher.merchant.includes("shopee")) {
                            voucher.merchant = "[Shopee] ";
                            var voucherlink = encodeURIComponent(voucher.link);
                            if (voucherlink) {
                                voucher.aff_link = sp_aff_link + voucherlink;
                            }
                        }
                        else if (voucher.merchant.includes("tiki")) voucher.merchant = "[Tiki] ";
                        else if (voucher.merchant.includes("lazada")) voucher.merchant = "[Lazada] ";
                        else voucher.merchant = "[" + voucher.merchant + "] ";
                        contentHTML += "<div " + style + " class='col-lg-3'>";

                        contentHTML +=
                            "<a onclick=\"copyCoupon(this,'" +
                            voucher.coupons[0].coupon_code +
                            "')\" href='" +
                            voucher.aff_link.replace(/%26ref%3D[a-z]+/, "").replace(/%3Fref%3D[a-z]+/, "") +
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
                $("#sortCoupon").show();
                if (!isMobile()) var toast = $.niceToast.success('M?? Gi???m Gi?? Hi???n Th??? Th??nh C??ng ^.^');
            },
            error: function (error) {
                console.log(error.message);
                $("#coupon-show-default").hide();
                isError = true;
                // $("#alert").html(
                //     "<h3 class='alert alert-info' style='color:unset'>C?? L???i Khi T???i D??? Li???u :(, H??? Th???ng s??? l???y d??? li???u d??? ph??ng, b???n c?? th??? <a class='btn btn-danger' href=''>T???i L???i Trang</a> ????? kh???c ph???c. C???m ??n b???n r???t nhi???u !!!</h3>"
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
