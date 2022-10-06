
const buttonLoading = [
  ".atEQPOIVFSDFSDG-nav-item",
  ".atEQPOIVFSDFSDG-page-item",
  ".atEQPOIVFSDFSDG-btn-search",
  ".atEQPOIVFSDFSDG-btn-keyword a",
];
waitForElementToDisplay(
  ".atEQPOIVFSDFSDG-modal",
  function () {
    buttonLoading.forEach(function (el) {
      var buttons = document.querySelectorAll(el);
      for (var button of buttons) {
        button.setAttribute("onclick","loading();");
        // button.addEventListener("click", function (event) {
        //   loading();
        // });
      }
    });
  },
  1000,
  9000
);
