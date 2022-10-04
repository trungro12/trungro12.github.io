// load content with jquery
function loadContent(element, url) {
  element
    .html(
      "<img alt='loading' style='max-width:70px' src='https://i.imgur.com/BsLJBhG.gif' />"
    )
    .load(url);
}

/**
 * Accepts either a URL or querystring and returns an object associating
 * each querystring parameter to its value.
 *
 * Returns an empty object if no querystring parameters found.
 */
function getUrlParams(urlOrQueryString) {
  if ((i = urlOrQueryString.indexOf("?")) >= 0) {
    const queryString = urlOrQueryString.substring(i + 1);
    if (queryString) {
      return _mapUrlParams(queryString);
    }
  }

  return {};
}

/**
 * Helper function for `getUrlParams()`
 * Builds the querystring parameter to value object map.
 *
 * @param queryString {string} - The full querystring, without the leading '?'.
 */
function _mapUrlParams(queryString) {
  return queryString
    .split("&")
    .map(function (keyValueString) {
      return keyValueString.split("=");
    })
    .reduce(function (urlParams, [key, value]) {
      if (Number.isInteger(parseInt(value)) && parseInt(value) == value) {
        urlParams[key] = parseInt(value);
      } else {
        urlParams[key] = decodeURI(value);
      }
      return urlParams;
    }, {});
}
// lazy
const autoLoadDuration = 5; //In Seconds
const eventList = [
  "click",
  "keydown",
  "mousemove",
  "wheel",
  "touchmove",
  "touchstart",
  "touchend",
];

// const autoLoadTimeout = setTimeout(runScripts, autoLoadDuration * 1000);

eventList.forEach(function (event) {
  window.addEventListener(event, triggerScripts, { passive: true });
});

function triggerScripts() {
  runScripts();
  // clearTimeout(autoLoadTimeout);
  eventList.forEach(function (event) {
    window.removeEventListener(event, triggerScripts, { passive: true });
  });
}

function runScripts() {
  document.querySelectorAll("img[lazy]").forEach(function (scriptTag) {
    scriptTag.setAttribute("src", scriptTag.getAttribute("data-src"));
  });
  document.querySelectorAll("script[lazy]").forEach(function (scriptTag) {
    scriptTag.setAttribute("src", scriptTag.getAttribute("data-src"));
  });
}
// coupon
function copyCoupon(coupon, text) {
  var input = document.createElement("textarea");
  input.innerHTML = text;
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand("copy");
  document.body.removeChild(input);

  var couponCopyBlock = coupon
    .querySelector(".coupon-content")
    .querySelector(".coupon-label")
    .querySelector(".coupon-copy");
  var couponCopy = "(Nhấn để copy mã)";
  var couponCopied = "<span style='color:red'>(Đã Copy)</span>";
  document
    .querySelectorAll(".coupon-copy")
    .forEach((node) => (node.innerHTML = couponCopy));
  couponCopyBlock.innerHTML = couponCopyBlock.innerHTML.replace(
    couponCopy,
    couponCopied
  );
  return result;
}

function coupon(element, merchantID = null, limit = 4, defaultImage = true) {
  if (limit > 20) limit = 20;
  limit -= 1;
  var merchant = "";
  if (merchantID == null && getUrlParams(location.search)["type"]) {
    merchantID = getUrlParams(location.search)["type"];
    if (merchantID == "tiki") merchantID = "tikivn";
    merchant = "&merchant=" + merchantID + "";
  }
  // console.log(merchant);
  var api =
    "https://api.accesstrade.vn/v1/offers_informations?scope=&status=1" +
    merchant +
    "";
  var contentHTML = "";
  $.ajax({
    type: "GET",
    url: api,
    dataType: "json",
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
        dataCoupon.forEach(function (voucher, index) {
          voucher.merchant += " - ";
          if (defaultImage) {
            if (voucher.merchant.includes("tiki"))
              voucher.image = "/image/tiki.png";
            else voucher.image = "/image/shopee.png";
            voucher.merchant = "";
          }
          contentHTML += "<div " + style + " class='col-lg-3'>";

          contentHTML +=
            "<a onclick=\"copyCoupon(this,'" +
            voucher.coupons[0].coupon_code +
            "')\" href='" +
            voucher.aff_link +
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
      // console.log(dataCoupon);
    },
    error: function (error) {
      console.log(error.statusText);
    },
  });
}
