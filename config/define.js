const timeoutAjaxCall = 7 * 1000; //miniseconds

const at_token = "Token BSlThjyssppl-1bbVJDKRiOBxK9rakro";
const sp_aff_link =
  "https://shope.ee/an_redir?affiliate_id=17321760029&origin_link=";
const sortCouponDefault = 4;

var currenturl = location.href.replace("#", "").split("?")[0];
let urlParams = getUrlParams(location.search);

var limitCoupon = 12;
var limitCouponMobile = 8;

// define toast
$.niceToast.setup({
  position: "top-right",
  timeout: 1000,
});
$.ajaxSetup({
  timeout: timeoutAjaxCall
});