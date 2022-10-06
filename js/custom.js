// load content with jquery
function loadContent(element, url) {
  // element
  //   .html(
  //     "<img alt='loading' style='max-width:70px' src='https://i.imgur.com/BsLJBhG.gif' />"
  //   )
  //   .load(url);
  element
    .html(
      '<div class="spinner-border text-primary" style="scale: 2; margin: 50px" role="status"><span class="sr-only">Loading...</span></div>'
    )
    .load(url);
}
isMobile = function () {
  var isMobile = window.matchMedia("only screen and (max-width: 760px)");
  return isMobile.matches ? true : false;
};
randomBool = function () {
  return Math.random() < 0.5;
};
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
const autoLoadDuration = 5;
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
  var couponCopy = "<i class='fa-solid fa-clipboard'></i> Copy mã giảm giá";
  var couponCopied = "<span style='color:blue'><i class='fa-solid fa-circle-check'></i> Đã Copy</span>";
  document
    .querySelectorAll(".coupon-copy")
    .forEach((node) => (node.innerHTML = couponCopy));
  couponCopyBlock.innerHTML = couponCopied;
  return result;
}

function loading() {
  document.getElementById("loading").style.display = "block";
  setTimeout(function () {
    document.getElementById("loading").style.display = "none";
  }, 700);
}
function waitForElementToDisplay(
  selector,
  callback,
  checkFrequencyInMs,
  timeoutInMs
) {
  var startTimeInMs = Date.now();
  (function loopSearch() {
    if (document.querySelector(selector) != null) {
      callback();
      return;
    } else {
      setTimeout(function () {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) return;
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
}
