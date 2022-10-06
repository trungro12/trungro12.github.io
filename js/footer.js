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
        button.addEventListener('click', function (event) {
          buttonLoadingToast();
        })
      }

    });
  },
  1000,
  9000
);

function buttonLoadingToast() {
  // console.log("OK");
  // if (typeof $.niceToast === 'undefined' || typeof niceToast === 'undefined') {

    $.getScript("/plugins/toast/dist/js/nice-toast-js.min.js", function(data, textStatus, jqxhr) {
      console.log(data); // data returned
      console.log(textStatus); // success
      console.log(jqxhr.status); // 200
      console.log('Load was performed.');
      console.log(typeof $.niceToast);
      console.log(typeof niceToast);
    });
  // }
  // $.niceToast.info('Đang Tải Dữ Liệu. Bạn chờ một chút nha !');
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
