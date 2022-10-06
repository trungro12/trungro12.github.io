// define
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

const buttonLoading = [
  ".atEQPOIVFSDFSDG-nav-link",
  ".atEQPOIVFSDFSDG-page-link",
  ".atEQPOIVFSDFSDG-btn-search",
  ".atEQPOIVFSDFSDG-btn-keyword",
];
waitForElementToDisplay(
  ".atEQPOIVFSDFSDG-modal",
  function () {
    buttonLoading.forEach(function (el) {
      var buttons = document.querySelectorAll(el);
      for (var button of buttons) {
        button.addEventListener("click", function (event) {
          loading();
        });
      }
    });
  },
  1000,
  9000
);
