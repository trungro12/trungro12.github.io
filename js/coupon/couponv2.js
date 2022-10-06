// coupon
function coupon(element, merchant = "", limit = 4, sort = 0) {
    var toast = $.niceToast.info('Đang Tải Dữ Liệu. Bạn chờ một chút nha !');

    var page = 1;
    // var limit = '';
    // var merchant = '';
    var category = '';
    var campaign = '';
    var keyword = '';
    var url = '';
    // var sort = '';// 0 moi nhat, 2 dung nhieu, 3 thoi gian con lai, 4 hot

    if (!merchant && getUrlParams(location.search)["type"]) {
        merchant = getUrlParams(location.search)["type"];
    }
    if (merchant == "tiki") merchant = "tikivn";

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
    $.ajax({
        type: "GET",
        url: api,
        dataType: "json",
        data: params,
        async: false,
        contentType: "application/json",
        headers: {
            Authorization: "Token BSlThjyssppl-1bbVJDKRiOBxK9rakro",
        },
        success: function (data) {
            var dataCoupon = data.data;
            var style = "";
            if (dataCoupon.length == 1) style = "style='margin:auto;'";
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
                    voucher.merchant = "";
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
                        "<p class='coupon-text'>" + voucher.coupons[0].coupon_desc + "</p>";
                    // contentHTML += "<p class='coupon-text'>" + voucher.content + "</p>";
                    contentHTML +=
                        "<p class='coupon-label'>" +
                        voucher.merchant +
                        voucher.coupons[0].coupon_code +
                        "<br><span class='coupon-copy'>(Nhấn để copy mã)</span></p>";
                    contentHTML += "</div>";
                    contentHTML += "</div>";

                    contentHTML += "</a>";

                    if (index == limit) throw new Exception("Time to end the loop");
                });
            } catch (e) {
                console.log("Loop has ended");
            }
            $(contentHTML).insertBefore(element);
            toast.change('Mã Giảm Giá Hiển Thị Thành Công ^.^', 0);
            $("#coupon-show-default").hide();
        },
        error: function (error) {
            console.log(error.statusText);
            $(element).html(
                "<h3>Có Lỗi Khi Tải Dữ Liệu :( , <a class='btn btn-danger' href=''>Tải Lại Trang</a></h3>"
            );
        },
    });
}
