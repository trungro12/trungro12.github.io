const buttonLoading = [
    "atEQPOIVFSDFSDG-btn-keyword a",
    "atEQPOIVFSDFSDG-nav-link",
    "atEQPOIVFSDFSDG-page-link",
    "atEQPOIVFSDFSDG-btn-search"
  ];

  buttonLoading.forEach(function (event) {
    $(this).click(function(){
        var toastLoad = $.niceToast.info('Đang Tải Dữ Liệu. Bạn chờ một chút nha !');
    })
  });