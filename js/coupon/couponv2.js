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
                if (!isMobile()) var toast = $.niceToast.success('Mã Giảm Giá Hiển Thị Thành Công ^.^');
            },
            error: function (error) {
                console.log(error.message);
                $("#coupon-show-default").hide();
                isError = true;
                // $("#alert").html(
                //     "<h3 class='alert alert-info' style='color:unset'>Có Lỗi Khi Tải Dữ Liệu :(, Hệ Thống sẽ lấy dữ liệu dự phòng, bạn có thể <a class='btn btn-danger' href=''>Tải Lại Trang</a> để khắc phục. Cảm ơn bạn rất nhiều !!!</h3>"
                // );
            },
            complete: function (data) {
                if (isError) loadCouponCache();
            }
        });

    } catch (error) {
        console.log(error.message);
        $(element).html(
            "<h3>Dữ Liệu Không Tải Được :( Đang tự động tải lại trang trong <span id='countReload'></span> giây, <a class='btn btn-danger' href=''>Tải Lại Trang</a></h3>"
        );
        countToReload(5, "#countReload");
    }
}
