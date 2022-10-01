Number.prototype.formatBytes = function () {
  var units = ["B", "KB", "MB", "GB", "TB"],
    bytes = this,
    i;

  for (i = 0; bytes >= 1024 && i < 4; i++) {
    bytes /= 1024;
  }

  return bytes.toFixed(2) + units[i];
};
// load content with jquery
function loadContent(element, url) {
  element
    .html(
      "<img alt='loading' style='max-width:70px' src='https://i.imgur.com/BsLJBhG.gif' />"
    )
    .load(url);
}
// base64image
function readFile() {
  if (!this.files || !this.files[0]) return;
  var name = this.files[0].name;
  var size = this.files[0].size;
  var type = this.files[0].type;
  const FR = new FileReader();

  FR.addEventListener("load", function (evt) {
    document.querySelector("#img").src = evt.target.result;
    document.querySelector("#b64").style.display = "block";
    document.querySelector("#b64").textContent = evt.target.result;
    document.querySelector("#result").innerHTML = "<h3>Result</h3>";
    document.querySelector("#result").innerHTML += "<p>Name : " + name + "</p>";
    document.querySelector("#result").innerHTML += "<p>Size : " + size.formatBytes() + "</p>";
    document.querySelector("#result").innerHTML += "<p>Type : " + type + "</p>";
    document.querySelector("#result").innerHTML += "<p>Base64 Data</p>";
    document.querySelector("#preview").innerHTML = "<h3>Preview</h3>";
  });

  FR.readAsDataURL(this.files[0]);
}

// md5
function md5Generator() {
  var result = md5($(this).val());
  document.querySelector("#result").innerHTML =
    "<h3>Result</h3><p id='content-result'>" + result + "</p>";
}


/**
 * Accepts either a URL or querystring and returns an object associating 
 * each querystring parameter to its value. 
 *
 * Returns an empty object if no querystring parameters found.
 */
 function getUrlParams(urlOrQueryString) {
  if ((i = urlOrQueryString.indexOf('?')) >= 0) {
    const queryString = urlOrQueryString.substring(i+1);
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
    .split('&') 
    .map(function(keyValueString) { return keyValueString.split('=') })
    .reduce(function(urlParams, [key, value]) {
      if (Number.isInteger(parseInt(value)) && parseInt(value) == value) {
        urlParams[key] = parseInt(value);
      } else {
        urlParams[key] = decodeURI(value);
      }
      return urlParams;
    }, {});
}