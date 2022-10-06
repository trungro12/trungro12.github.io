const buttonLoading = [
  ".atEQPOIVFSDFSDG-btn-keyword a",
  ".atEQPOIVFSDFSDG-nav-link",
  ".atEQPOIVFSDFSDG-page-link",
  ".atEQPOIVFSDFSDG-btn-search",
];

buttonLoading.forEach(function (element) {
  waitForElementToDisplay(
    element,
    function () {
      $(element).click(function () {
        console.log("Đang Tải Dữ Liệu. Bạn chờ một chút nha !");
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
