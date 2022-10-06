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
      var divs = document.querySelectorAll(value);

      [].forEach.call(divs, function (div) {
        // do whatever
        div.addEventListener("click", function () {
          var toast = $.niceToast.info(
            "Đang Tải Dữ Liệu. Bạn chờ một chút nha !"
          );
        });
      });
    },
    1000,
    9000
  );
});

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
