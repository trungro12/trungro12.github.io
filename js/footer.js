const buttonLoading = [
  ".atEQPOIVFSDFSDG-nav-link",
  ".atEQPOIVFSDFSDG-page-link",
  ".atEQPOIVFSDFSDG-btn-search",
  ".atEQPOIVFSDFSDG-btn-keyword a",
];

buttonLoading.forEach(function (element) {
  waitForElementToDisplay(
    element,
    function () {
      document.querySelectorAll(element).onclick = function () {
        console.log("Đang Tải Dữ Liệu. Bạn chờ một chút nha !");
      };
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
