const at_token = "Token BSlThjyssppl-1bbVJDKRiOBxK9rakro";

const sub_publisher_id = "trungpham99";
const network_click_id = "";
const referral_source = "trungpham99";
const custom_value1 = "";
const custom_value2 = "";
const sp_aff_link =
  "https://shope.ee/an_redir?sub_id=" +
  sub_publisher_id +
  "-" +
  network_click_id +
  "-" +
  referral_source +
  "-" +
  custom_value1 +
  "-" +
  custom_value2 +
  "&affiliate_id=17321760029&origin_link=";

const sp_aff_short_link = "https://shope.ee/1VODdwm1EO";
const sortCouponDefault = 4;

var currenturl = location.href.replace("#", "").split("?")[0];
let urlParams = getUrlParams(location.search);

var limitCoupon = 12;
var limitCouponMobile = 12;

// define toast
$.niceToast.setup({
  position: "top-right",
  timeout: 1000,
});
$.ajaxSetup({
  timeout: 15000,
  cache: true,
});
