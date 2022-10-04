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

// spinner loading 
function spinnerLoading(element, show = true, size = 2) {
  var id = "spinner-" + element.replace("#", "").replace(".", "").trim();
  var spinner = $("#" + id);
  if (spinner.length == 0) $('<div id="' + id + '" class="spinner-border text-primary" style="scale: ' + size + ';"></div>').insertBefore(element);
  if (show) spinner.show();
  else spinner.hide();
}