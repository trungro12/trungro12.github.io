const buttonLoading = [
  ".atEQPOIVFSDFSDG-nav-link",
  ".atEQPOIVFSDFSDG-page-link",
  ".atEQPOIVFSDFSDG-btn-search",
  ".atEQPOIVFSDFSDG-btn-keyword",
];
buttonLoading.forEach(function (value) {
  waitForElementToDisplay(
    value,
    function () {
      var els = document.getElementsByClassName(value);
      Array.from(els).forEach((el) => {
        // Do stuff here
        el.setAttribute("onclick", "buttonLoadingToast()");
      });
    },
    1000,
    9000
  );
});

function buttonLoadingToast() {
  $.niceToast.info("Đang Tải Dữ Liệu. Bạn chờ một chút nha !");
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
