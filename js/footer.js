const buttonLoading = [
    "atEQPOIVFSDFSDG-btn-keyword a",
    "atEQPOIVFSDFSDG-nav-link",
    "atEQPOIVFSDFSDG-page-link",
    "atEQPOIVFSDFSDG-btn-search"
  ];

  buttonLoading.forEach(function (event) {
    $(this).click(function(){
        console.log('Đang Tải Dữ Liệu. Bạn chờ một chút nha !');
    });
  });