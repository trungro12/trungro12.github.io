
/*var currenturl = location.href.split('?')[0];
$("#allvoucher").click(function () {
    location.href = currenturl;
});
$("#shopee").click(function () {
    location.href = currenturl + "?type=shopee";
});
$("#tiki").click(function () {
    location.href = currenturl + "?type=tiki";
});
$("#game").click(function () {
    location.href = currenturl + "?type=game";
});

let urlParams = getUrlParams(location.search); // Assume location.search = "?a=1&b=2b2"
console.log(urlParams);
if (urlParams['type']) $("#" + urlParams['type'] + "").addClass("btn-active");
else $("#allvoucher").addClass("btn-active");
*/
var loadContents = $("#loadContents");
if (urlParams['type'] == 'shopee') loadContent(loadContents, "shopee.html");
else if (urlParams['type'] == 'tiki') loadContent(loadContents, "tiki.html");
else if (urlParams['type'] == 'game') loadContent(loadContents, "game.html");
else loadContent(loadContents, "allvoucher.html");

