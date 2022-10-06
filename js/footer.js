
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
