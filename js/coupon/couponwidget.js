var chartjs = document.createElement("script");
chartjs.setAttribute(
  "src",
  "https://cdn.jsdelivr.net/npm/chart.js@3.8.0/dist/chart.min.js"
);
document.head.appendChild(chartjs);

let mo_voucher_recommend = function () {
  String.prototype.isNumber = function () {
    return /^\d+$/.test(this);
  };
  let moRecommendVoucherCss = `<style type="text/css">
    @import  url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
    html {
        scroll-behavior: smooth;
    }
    .cps-show {
        display: block!important;
    }
    .cps-hidden {
        display: none;
    }
    .cps-wrap {
        font-family: 'Open Sans', Helvetica, Arial, sans-serif;
        width: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
        position: relative;
        color: #333333;
        z-index: 20;
    }
    .cps-title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        width: 100%;
        margin-bottom: 10px;
        padding-top: 10px;
    }
    .cps-vouchers-searched .cps-title {
        padding-top: 50px;
    }
    #cps-search-form {
        display: flex;
        flex-wrap: wrap;
        height: 45px;
        width: 100%;
        margin-bottom: 5px;
    }
    #cps-error-message {
        color: #dc3545;
        font-size: 12px;
    }
    #cps-search-form input {
        flex: 1;
        font-size: 16px;
        border-radius: 2px;
        height: 100%;
        outline: none;
    }
    #cps-search-form #cps-btn-setting {
        position: relative;
    }
    #cps-search-form #cps-btn-setting svg {
        height: 20px;
        width: 20px;
        max-width: unset;
    }
    #cps-search-form #cps-btn-setting::before {
        content: '';
        display: block;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: absolute;
    }
    #cps-search-form .cps-search-btn {
        font-size: 14px;
        height: 100%;
        display: inline-block;
        font-weight: 400;
        text-transform: none;
        text-align: center;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: #28a745;
        border: 1px solid #28a745;
        padding: 4px 20px;
        line-height: 1.5;
        border-radius: 3px;
        color: #fff;
        margin-left: 15px;
        margin-right: 0;
        cursor: pointer;
    }
    #cps-search-form .cps-search-btn:hover, #cps-search-form .cps-search-btn:focus {
        outline: none;
        text-decoration: none;
        background-color: #36a04e;
    }
    #cps-loading-title {
        margin-top: 10px;
        margin-bottom: 2px;
        font-size: 15px;
    }
    #cps-loading-bar {
        display: none;
        width: 100%;
        height: 20px;
        overflow: hidden;
        font-size: 13px;
        background-color: #e9ecef;
        border-radius: 5px;
    }
    #cps-loading-bar .cps-progress-bar {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        -ms-flex-pack: center;
        justify-content: center;
        height: 100%;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        background-color: #007bff;
        transition: width .6s ease;
    }
    #cps-loading-bar .cps-progress-bar-striped {
        background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
        background-size: 10px 10px;
    }
    #cps-vouchers-blocks,
    #cps-vouchers-searched-blocks{
        width: 100%;
        max-width: 580px;
        margin: auto;
        margin-top: 10px;
    }
    #cps-vouchers-blocks a,
    #cps-vouchers-searched-blocks a{
        text-decoration: none !important;
    }

    /* CSS for loading */
    .cps-overlay {
        background: #fdfdfd;
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0.5;
    }
    .cps-loading .cps-overlay {
        display: block;
    }
    .cps-loading .cps-con-loading {
        display: flex;
    }
    .cps-con-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none;
        flex-direction: row;
        z-index: 1000;
    }
    .cps-loading-letter {
        font-size: 25px;
        font-weight: normal;
        letter-spacing: 4px;
        text-transform: uppercase;
        font-family: 'Open Sans', Helvetica, Arial, sans-serif;
        color: #ee4d2d;
        animation-name: cps-bounce;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }
    @keyframes  cps-bounce {
        0% {
            transform: translateY(0px);
        }
        40% {
            transform: translateY(-30px);
        }
        80%,
        100% {
            transform: translateY(0px);
        }
    }
    .cps-loading-letter:nth-child(2)  { animation-delay: 0.1s; }
    .cps-loading-letter:nth-child(3)  { animation-delay: 0.2s; }
    .cps-loading-letter:nth-child(4)  { animation-delay: 0.3s; }
    .cps-loading-letter:nth-child(5)  { animation-delay: 0.4s; }
    .cps-loading-letter:nth-child(6)  { animation-delay: 0.5s; }
    .cps-loading-letter:nth-child(7)  { animation-delay: 0.6s; }
    .cps-loading-letter:nth-child(8)  { animation-delay: 0.7s; }
    .cps-loading-letter:nth-child(9)  { animation-delay: 0.8s; }
    .cps-loading-letter:nth-child(10) { animation-delay: 0.9s; }
    .cps-loading-letter:nth-child(11) { animation-delay: 1.0s; }
    .cps-loading-letter:nth-child(12) { animation-delay: 1.1s; }
    .cps-loading-letter:nth-child(13) { animation-delay: 1.2s; }
    .cps-loading-letter:nth-child(14) { animation-delay: 1.3s; }
    .cps-loading-letter:nth-child(15) { animation-delay: 1.4s; }
    .cps-loading-letter:nth-child(16) { animation-delay: 1.5s; }
    .cps-loading-letter:nth-child(17) { animation-delay: 1.6s; }
    .cps-loading-letter:nth-child(18) { animation-delay: 1.7s; }
    .cps-loading-letter:nth-child(19) { animation-delay: 1.8s; }

    /* CSS for tooltip */
    #cps-vouchers-blocks .cps-tooltip,
    #cps-vouchers-searched-blocks .cps-tooltip {
        position: relative;
        color: #ee3916;
        font-weight: 600;
    }
    #cps-vouchers-blocks .cps-tooltip:hover,
    #cps-vouchers-searched-blocks .cps-tooltip:hover {
        color: #f25031;
        text-decoration: none!important;
    }
    #cps-vouchers-blocks .cps-tooltip:focus,
    #cps-vouchers-searched-blocks .cps-tooltip:focus {
        color: #f25031;
        border: none!important;
    }
    #cps-vouchers-blocks .cps-tooltip .cps-tooltiptext,
    #cps-vouchers-searched-blocks .cps-tooltip .cps-tooltiptext {
        visibility: hidden;
        width: 250px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 10px;
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 0);
    }
    #cps-vouchers-blocks .cps-tooltip:hover .cps-tooltiptext,
    #cps-vouchers-searched-blocks .cps-tooltip:hover .cps-tooltiptext {
        visibility: visible;
        outline: none;
    }
    #cps-vouchers-blocks .cps-voucher-row,
    #cps-vouchers-searched-blocks .cps-voucher-row {
        width: 100%;
        position: relative;
        margin-bottom: 15px;
    }
    #cps-vouchers-blocks .cps-voucher-wrap,
    #cps-vouchers-searched-blocks .cps-voucher-wrap {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        overflow: hidden;
        border-radius: 2px;
        position: relative;
        overflow: visible;
        box-shadow: 2px 2px 5px rgb(0 0 0 / 7%);
        padding: 0;
        width: 100%;
        height: 118px;
    }
    #cps-vouchers-blocks .cps-voucher-left,
    #cps-vouchers-searched-blocks .cps-voucher-left {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -moz-box-orient: vertical;
        -moz-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -moz-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 118px;
        height: 118px;
        position: relative;
        display: flex;
        background: -webkit-gradient(linear,left top,right top,color-stop(0,transparent),color-stop(3px,transparent),color-stop(4px,#ee3916));
        background: linear-gradient(90deg,transparent 0,transparent 3px,#ee3916 4px);
        background-origin: border-box;
        border-top: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
        border-right: 1px dashed #e8e8e8;
    }
    #cps-vouchers-blocks .cps-voucher-left.shop-voucher,
    #cps-vouchers-searched-blocks .cps-voucher-left.shop-voucher {
        background: -webkit-gradient(linear,left top,right top,color-stop(0,transparent),color-stop(3px,transparent),color-stop(4px,#fff));
        background: linear-gradient(90deg,transparent 0,transparent 3px,#fff 4px);
    }
    #cps-vouchers-blocks .cps-voucher-image,
    #cps-vouchers-searched-blocks .cps-voucher-image {
        position: relative;
        height: 56px;
        width: 56px;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
    }
    #cps-vouchers-blocks .shop-voucher .cps-voucher-image,
    #cps-vouchers-searched-blocks .shop-voucher .cps-voucher-image {
        border: 1px solid #efefef;
    }
    #cps-vouchers-blocks .cps-voucher-icon,
    #cps-vouchers-searched-blocks .cps-voucher-icon {
        opacity: 1;
        -webkit-transition: opacity .2s ease;
        transition: opacity .2s ease;
        width: 100%;
        height: 100%;
    }
    #cps-vouchers-blocks .cps-voucher-icon-text,
    #cps-vouchers-searched-blocks .cps-voucher-icon-text {
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 12px;
        line-height: 14px;
        max-height: 28px;
        max-width: 90%;
        text-align: center;
        -webkit-box-pack: center;
        word-break: break-word;
        margin-top: 5px;
        padding: 0 8px;
        padding-bottom: 2px;
        color: #fff;
    }
    #cps-vouchers-blocks .shop-voucher .cps-voucher-icon-text,
    #cps-vouchers-searched-blocks .shop-voucher .cps-voucher-icon-text {
        color: #000;
    }
    #cps-vouchers-blocks .cps-voucher-border-left,
    #cps-vouchers-searched-blocks .cps-voucher-border-left {
        top: 0;
        left: 0;
        position: absolute;
        width: 4px;
        height: 100%;
    }
    #cps-vouchers-blocks .cps-voucher-border-left:before,
    #cps-vouchers-searched-blocks .cps-voucher-border-left:before {
        top: 0;
    }
    #cps-vouchers-blocks .cps-voucher-border-left:after,
    #cps-vouchers-searched-blocks .cps-voucher-border-left:after {
        bottom: 0;
    }
    #cps-vouchers-blocks .cps-voucher-border-left:after,
    #cps-vouchers-searched-blocks .cps-voucher-border-left:after,
    #cps-vouchers-blocks .cps-voucher-border-left:before,
    #cps-vouchers-searched-blocks .cps-voucher-border-left:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        border-left: 1px solid #e8e8e8;
        background: #ee3916;
    }
    #cps-vouchers-blocks .shop-voucher .cps-voucher-border-left:after,
    #cps-vouchers-searched-blocks .shop-voucher .cps-voucher-border-left:after,
    #cps-vouchers-blocks .shop-voucher .cps-voucher-border-left:before,
    #cps-vouchers-searched-blocks .shop-voucher .cps-voucher-border-left:before {
        background: #fff;
    }
    #cps-vouchers-blocks .cps-border-left,
    #cps-vouchers-searched-blocks .cps-border-left {
        position: absolute;
        top: 3px;
        left: 0;
        width: 4px;
        height: -webkit-calc(100% - 6px);
        height: calc(100% - 6px);
        background: radial-gradient(circle at 0,at 6px,transparent 0,rgba(0,0,0,.03) 3px,#e8e8e8 0,#e8e8e8 4px,#ee3916 0);
        background: radial-gradient(circle at 0 6px,transparent 0,rgba(0,0,0,.03) 3px,#e8e8e8 0,#e8e8e8 4px,#ee3916 0);
        background-size: 4px 10px;
        background-repeat: repeat-y;
    }
    #cps-vouchers-blocks .shop-voucher .cps-border-left,
    #cps-vouchers-searched-blocks .shop-voucher .cps-border-left {
        background: radial-gradient(circle at 0,at 6px,transparent 0,rgba(0,0,0,.03) 3px,#e8e8e8 0,#e8e8e8 4px,#fff 0);
        background: radial-gradient(circle at 0 6px,transparent 0,rgba(0,0,0,.03) 3px,#e8e8e8 0,#e8e8e8 4px,#fff 0);
        background-size: 4px 10px;
        background-repeat: repeat-y;
    }
    #cps-vouchers-blocks .cps-border-left:before,
    #cps-vouchers-searched-blocks .cps-border-left:before {
        content: "";
        top: 0;
        left: 0;
        height: 100%;
        background: repeating-linear-gradient(#e8e8e8,#e8e8e8 2px,transparent 0,transparent 10px);
        background-size: 1px 10px;
        position: absolute;
        width: 1px;
    }
    #cps-vouchers-blocks .cps-voucher-right,
    #cps-vouchers-searched-blocks .cps-voucher-right {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        min-width: 0;
        height: -webkit-calc(100% - 2px);
        height: calc(100% - 2px);
        background: #fff;
        border-radius: 0 2px 2px 0;
        border: 1px solid #e8e8e8;
        border-left: 0 solid transparent;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -moz-box-orient: vertical;
        -moz-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        padding: 0 15px;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -moz-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -moz-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        height: 100%;
    }
    #cps-vouchers-blocks .cps-badge,
    #cps-vouchers-searched-blocks .cps-badge,
    #cps-vouchers-blocks .cps-voucher-type,
    #cps-vouchers-searched-blocks .cps-voucher-type {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -moz-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    #cps-vouchers-blocks .cps-voucher-type,
    #cps-vouchers-searched-blocks .cps-voucher-type {
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -moz-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        vertical-align: middle;
        height: 20px;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    #cps-vouchers-blocks .cps-voucher-type:not(:last-child),
    #cps-vouchers-searched-blocks .cps-voucher-type:not(:last-child) {
        margin-right: 5px;
    }
    #cps-vouchers-blocks .cps-badge,
    #cps-vouchers-searched-blocks .cps-badge {
        color: #fff;
        border-radius: 2px;
        padding: 0 6px;
        font-size: 12px;
        font-weight: 300;
        height: 18px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
    }
    #cps-vouchers-blocks .cps-voucher-title,
    #cps-vouchers-searched-blocks .cps-voucher-title,
    #cps-vouchers-blocks .cps-voucher-title-text,
    #cps-vouchers-searched-blocks .cps-voucher-title-text {
        font-weight: 500;
        color: rgba(0,0,0,.87);
        word-break: break-word;
    }
    #cps-vouchers-blocks .cps-voucher-title,
    #cps-vouchers-searched-blocks .cps-voucher-title {
        font-size: 16px;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: 20px;
        max-height: 43px;
    }
    #cps-vouchers-blocks .cps-voucher-title-text,
    #cps-vouchers-searched-blocks .cps-voucher-title-text {
        display: inline;
    }
    #cps-vouchers-blocks .cps-voucher-note,
    #cps-vouchers-searched-blocks .cps-voucher-note {
        line-height: 14px;
        margin-top: 5px;
        color: rgba(0,0,0,.54);
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 5px 5px 0 0;
    }
    #cps-vouchers-blocks .cps-voucher-pregress,
    #cps-vouchers-searched-blocks .cps-voucher-pregress {
        width: 100%;
        height: 4px;
        background: rgba(0,0,0,.09);
        border-radius: 4px;
        overflow: hidden;
    }
    #cps-vouchers-blocks .cps-voucher-duration,
    #cps-vouchers-searched-blocks .cps-voucher-duration {
        font-size: 12px;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        white-space: normal;
        margin-top: 4px;
    }
    #cps-vouchers-blocks .cps-voucher-percent-used,
    #cps-vouchers-searched-blocks .cps-voucher-percent-used {
        color: #ff1424;
        font-weight: 500;
    }
    #cps-vouchers-blocks .cps-duration-text,
    #cps-vouchers-searched-blocks .cps-duration-text {
        color: #ff1424;
    }
    #cps-vouchers-blocks .cps-voucher-detail-link,
    #cps-vouchers-searched-blocks .cps-voucher-detail-link {
        display: block;
        margin-top: 11px;
        font-size: 13px;
    }
    #cps-vouchers-blocks .cps-btn-get-voucher,
    #cps-vouchers-searched-blocks .cps-btn-get-voucher,
    #cps-vouchers-blocks .cps-list-product-link,
    #cps-vouchers-searched-blocks .cps-list-product-link{
        position: absolute;
        right: 20px;
        bottom: 10px;
        display: inline;
        text-decoration: none;
        font-size: 12px;
        margin: 0;
        padding: 5px 10px;
        cursor: pointer;
        border: 1px solid #ee3916;
        background-color: #ee3916;
        border-style: solid;
        -webkit-appearance: none;
        border-radius: 2px;
        white-space: nowrap;
        box-sizing: border-box;
        color: #fff;
    }
    #cps-vouchers-blocks .cps-btn-get-voucher:hover,
    #cps-vouchers-searched-blocks .cps-btn-get-voucher:hover {
        color: #fff;
        background-color: #f04c2c;
        border-color: #f04c2c;
    }
    #cps-vouchers-blocks .cps-list-product-link,
    #cps-vouchers-searched-blocks .cps-list-product-link {
        background-color: #28a745;
        color: #fff;
        border-color: #28a745;
        right: 95px;
        font-weight: unset;
    }
    #cps-vouchers-blocks .cps-list-product-link.cps-tooltip:hover,
    #cps-vouchers-searched-blocks .cps-list-product-link.cps-tooltip:hover,
    #cps-vouchers-blocks .cps-list-product-link.cps-tooltip:focus,
    #cps-vouchers-searched-blocks .cps-list-product-link.cps-tooltip:focus {
        background-color: #28a745;
        color: #fff;
        border: 1px solid #28a745!important;
        text-decoration: none!important;
    }
    #cps-vouchers-blocks .cps-badge.cps-tooltip,
    #cps-vouchers-searched-blocks .cps-badge.cps-tooltip {
        position: unset;
    }
    #cps-vouchers-blocks .cps-badge.cps-tooltip .cps-tooltiptext,
    #cps-vouchers-searched-blocks .cps-badge.cps-tooltip .cps-tooltiptext{
        top: 36%;
        left: 32%;
    }
    #cps-vouchers-blocks .cps-badge.cps-tooltip:hover,
    #cps-vouchers-searched-blocks .cps-badge.cps-tooltip:hover {
        color: #fff;
        text-decoration: none!important;
    }
    #cps-vouchers-blocks .cps-device,
    #cps-vouchers-searched-blocks .cps-device {
        margin-right: 5px;
        color: #ee3916;
        cursor: pointer;
    }
    #cps-vouchers-blocks .cps-device.cps-tooltip,
    #cps-vouchers-searched-blocks .cps-device.cps-tooltip {
        position: unset;
    }
    #cps-vouchers-blocks .cps-device.cps-tooltip .cps-tooltiptext,
    #cps-vouchers-searched-blocks .cps-device.cps-tooltip .cps-tooltiptext{
        font-family: 'Open Sans', Helvetica, Arial, sans-serif;
        font-size: 12px;
        font-weight: normal;
        top: 36%;
        left: 0%;
    }
    #cps-vouchers-blocks .cps-device.cps-tooltip:hover,
    #cps-vouchers-searched-blocks .cps-device.cps-tooltip:hover {
        color: #1e1e1e;
        text-decoration: none!important;
    }
    #cps-vouchers-blocks .cps-all-devices,
    #cps-vouchers-searched-blocks .cps-all-devices {
        font-size: 18px;
    }
    #cps-vouchers-blocks .cps-phone,
    #cps-vouchers-searched-blocks .cps-phone {
        font-size: 20px;
    }
    #cps-category-labels,
    #cps-category-searched-labels {
        margin-top: 10px;
        overflow-x: auto;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        height: 100px;
        white-space: nowrap;
    }
    .cps-category-label {
        display: inline-block;
        text-align: center;
        color: #111;
        min-width: 20px;
        margin: 5px 10px 5px 0;
        padding: 3px 5px;
        font-size: 14px;
        border: solid 1px #555;
        border-radius: 3px;
        cursor: pointer;
    }
    .cps-category-label.up-coming {
        color: #1879f2;
    }
    .cps-category-label.active {
        border-color: #f05532;
        background-color: #f05532;
        color: #fff!important;
    }
    .cps-vouchers-block {
        display: none;
    }
    .cps-vouchers-block.active {
        display: block;
    }
    .cps-vouchers-page {
        display: none;
    }
    .cps-vouchers-page.active {
        display: block;
    }

    /* custom scrollbar */
    #cps-category-labels::-webkit-scrollbar {
        width: 15px;
    }
    #cps-category-labels::-webkit-scrollbar-track {
        background-color: transparent;
    }
    #cps-category-labels::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }
    #cps-category-labels::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }
    #cps-category-searched-labels::-webkit-scrollbar {
        width: 15px;
    }
    #cps-category-searched-labels::-webkit-scrollbar-track {
        background-color: transparent;
    }
    #cps-category-searched-labels::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }
    #cps-category-searched-labels::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }
    #cps-relate-product .cps-content::-webkit-scrollbar {
        width: 15px;
    }
    #cps-relate-product .cps-content::-webkit-scrollbar-track {
        background-color: transparent;
    }
    #cps-relate-product .cps-content::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }
    #cps-relate-product .cps-content::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }


    .cps-pagination {
        max-width: 580px;
        margin: auto;
        text-align: right;
        position: relative;
    }
    .cps-pagination .cps-toggle-page {
        color: #1e1e1e;
        padding: 1px 15px;
        padding-bottom: 4px;
        text-decoration: none;
        cursor: pointer;
        border-radius: 3px;
        border: solid 1px #ee3916;
        transition: background-color .5s;
    }
    .cps-pagination .cps-pagination-title {
        position: absolute;
        left: 0;
        font-size: 14px;
        color: #000;
    }
    .no-touch .cps-pagination .cps-toggle-page:hover {
        color: #fff;
        background-color: #ee3916;
    }
    #cps-back-to-all {
        margin-top: 10px;
    }
    #cps-back-to-all .cps-back {
        display: none;
        font-size: 15px;
        color: #1879f2;
        margin-top: 10px;
        cursor: pointer;
    }
    #cps-back-to-all .cps-back.show {
        display: block;
    }
    #cps-back-to-all .cps-back:hover {
        color: #2781f2;
        text-decoration: none;
    }
    #cps-sticky-block {
        position: absolute;
        -webkit-transition: all 0.5s ease;
        -moz-transition: position 10s;
        -ms-transition: position 10s;
        -o-transition: position 10s;
        transition: all 0.5s ease;
        animation: smoothScroll 1s forwards;
    }
    #cps-sticky-block.fixed {
        top: 0;
        z-index: 1000;
        background-color: #fff;
        position: fixed;
        margin-top: 0;
    }
    #cps-sticky-block.unset {
        position: unset;
    }
    #cps-order-block-outer{
        display: none;
        position: absolute;
        z-index: 2;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #0004;
    }
    #cps-order-block-outer.active{
        display: block;
    }
    #cps-order-block-outer #cps-order-block {
        margin: 0 auto;
        margin-top: 20vh;
        display: flex;
        flex-direction: column;
        justify-content: left;
        width: 280px;
        width: fit-content;
        position: sticky;
        top: 150px;
        background-color: #fff;
        padding: 5px 20px 20px;
        border-radius: 5px;
    }
    #cps-order-block-outer #cps-order-block .cps-order-filter {
        display: flex;
        align-items: center;
        margin-top: 15px;
    }
    #cps-order-block-outer #cps-order-block .cps-popup-confirm {
        text-align: center;
    }
    #cps-order-block-outer #cps-order-block .cps-popup-confirm-button {
        font-size: 14px;
        height: 100%;
        display: inline-block;
        font-weight: 400;
        text-transform: none;
        text-align: center;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        padding: 4px 20px;
        line-height: 1.5;
        border-radius: 3px;
        color: #fff;
        background-color: #28a745;
        border-color: #28a745;
        margin: 15px 0 0;
        cursor: pointer;
    }
    #cps-order-block-outer #cps-order-block .cps-order-label {
        font-size: 12px;
        width: 70px;
    }
    #cps-order-block-outer #cps-order-block .custom-select {
        position: relative;
        width:150px;
        margin-left: 5px;
    }
    #cps-order-block-outer #cps-order-block .custom-select select {
        display: none;
    }
    #cps-order-block-outer #cps-order-block .select-element {
        background-color: #fff;
    }
    #cps-order-block-outer #cps-order-block .select-element:after {
        position: absolute;
        content: "";
        top: 12px;
        right: 10px;
        width: 0;
        height: 0;
        border: 4px solid transparent;
        border-color: #fff transparent transparent transparent;
    }
    #cps-order-block-outer #cps-order-block .select-element.select-arrow-active:after {
        border-color: transparent transparent #fff transparent;
        top: 7px;
    }
    #cps-order-block-outer #cps-order-block .select-items div, .select-element {
        color: #f05531;
        padding: 4px 8px;
        border: 1px solid transparent;
        font-size: 12px;
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
        cursor: pointer;
        user-select: none;
    }
    #cps-order-block-outer #cps-order-block .selected-element {
        background-color: #f05531;
        color: #fff;
    }
    #cps-order-block-outer #cps-order-block .select-items {
        position: absolute;
        background-color: #fff;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 99;
    }
    #cps-order-block-outer #cps-order-block .select-hide {
        display: none;
    }
    #cps-order-block-outer #cps-order-block .select-items div:hover, .same-as-selected {
        background-color: rgba(0, 0, 0, 0.1);
    }


    #cps-relate-product{
        display: none;
    }
    #cps-relate-product.show{
        display: block;
    }
    #cps-relate-product .cps-content {
        display: flex;
        width: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        padding-left: 3px;
    }
    #cps-relate-product .cps-content .cps-prod-related{
        display: block;
        flex: 1 0 18%;
        flex-direction: column;
        margin: 0 1rem 5px 0;
        text-decoration: none;
        border-radius: 3px;
        box-shadow: 0 0.0625rem 0.125rem 0 rgb(0 0 0 / 10%);
    }
    #cps-relate-product .cps-content .cps-prod-related:hover{
        box-shadow: 0 0.0625rem 20px 0 rgb(0 0 0 / 5%);
        transform: translateY(-0.0625rem);
    }
    #cps-relate-product .cps-content .cps-prod-related .cps-prod-image img{
        width: 100%;
        height: 100%;
        margin-bottom: -5px;
    }
    #cps-relate-product .cps-content .cps-prod-related .cps-prod-info {
        padding: 0.5rem 0.5rem;
    }
    #cps-relate-product .cps-content .cps-prod-related .cps-prod-info .cps-prod-name{
        color: rgba(0,0,0,.87);
        display: -webkit-box;
        max-width: 100%;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    #cps-relate-product .cps-content .cps-prod-related .cps-prod-info .cps-prod-price{
        color: #ee4d2d;
        font-size: 16px;
    }

    #cps-feedback{
        text-align: right;
        padding: 15px;
    }

    @keyframes  smoothScroll {
        0% {
            transform: translateY(30px);
        }
        100% {
            transform: translateY(0px);
        }
    }
    @media  only screen and (max-width: 575px) {
        #cps-search-form {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            height: unset;
        }
        #cps-search-form input {
            flex: 0 0 100%;
            width: 100%;
            height: 40px;
            margin-bottom: 0;
        }
        #cps-search-form .cps-search-btn {
            flex: 1;
            margin-left: 0;
            margin-top: 10px;
            height: 30px;
        }
        #cps-search-form .cps-search-btn:last-child {
            flex: 0;
            margin-left: 15px;
            width: 15%;
        }
        #cps-error-message {
            margin: 10px 0;;
        }
        #cps-vouchers-blocks, #cps-sticky-block {
            width: 100%;
        }
        #cps-vouchers-blocks .cps-voucher-wrap,
        #cps-vouchers-searched-blocks .cps-voucher-wrap {
            height: 100px;
        }
        #cps-vouchers-blocks .cps-voucher-left,
        #cps-vouchers-searched-blocks .cps-voucher-left {
            width: 100px;
            height: 100px;
        }
        #cps-vouchers-blocks .cps-voucher-title,
        #cps-vouchers-searched-blocks .cps-voucher-title {
            font-size: 13px;
            line-height: 13px;
        }
        #cps-vouchers-blocks .cps-voucher-duration,
        #cps-vouchers-searched-blocks .cps-voucher-duration {
            font-size: 10px;
        }
        #cps-vouchers-blocks .cps-btn-get-voucher,
        #cps-vouchers-searched-blocks .cps-btn-get-voucher {
            font-size: 10px;
            bottom: 8px;
            padding: 2px 5px;
            width: 60px;
            text-align: center;
            right: 15px;
        }
        #cps-vouchers-blocks .cps-voucher-detail-link,
        #cps-vouchers-searched-blocks .cps-voucher-detail-link {
            margin-top: 7px;
            font-size: 11px;
        }
        #cps-vouchers-blocks .cps-badge,
        #cps-vouchers-searched-blocks .cps-badge {
            font-size: 10px;
            height: 16px;
        }
        #cps-vouchers-blocks .cps-list-product-link,
        #cps-vouchers-searched-blocks .cps-list-product-link {
            font-size: 9px;
            bottom: 8px;
            padding: 2px 5px;
            right: 78px;
        }
        .cps-category-label {
            font-size: 12px;
        }
        .cps-pagination .cps-pagination-title {
            font-size: 12px;
        }
        .cps-pagination .cps-toggle-page {
            padding: 0 10px;
            padding-bottom: 2px;
        }
        #cps-order-block-outer #cps-order-block .custom-select {
            width: 100px;
        }
    }
</style>
`;
  let moRecommendVoucherHtml = `<div class="cps-wrap" id="cps-wrap">
    <style>
        #priceChart{
            width: 100%!important;
            height: 100%!important;
        }
    </style>
    <div class="cps-title">
        Tìm kiếm mã giảm giá Shopee
    </div>
        <div id="cps-search-form">
        <input type="text" name="cps_search_url" id="cps-search-url" class="form-control" value="" placeholder="Nhập link sản phẩm để tìm kiếm voucher" required="" autocomplete="on" onClick="this.setSelectionRange(0, this.value.length);">
        <button class="cps-search-btn" id="cps-btn-search-voucher">Tìm kiếm</button>
        <button class="cps-search-btn" id="cps-btn-setting" style="display: none; justify-content: center; align-items: center">
            <svg version="1.1" id="svg-cog" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px"
                 viewBox="0 0 438.529 438.529" fill="white"
                 xml:space="preserve"><g><path d="M436.25,181.438c-1.529-2.002-3.524-3.193-5.995-3.571l-52.249-7.992c-2.854-9.137-6.756-18.461-11.704-27.98c3.422-4.758,8.559-11.466,15.41-20.129c6.851-8.661,11.703-14.987,14.561-18.986c1.523-2.094,2.279-4.281,2.279-6.567c0-2.663-0.66-4.755-1.998-6.28c-6.848-9.708-22.552-25.885-47.106-48.536c-2.275-1.903-4.661-2.854-7.132-2.854c-2.857,0-5.14,0.855-6.854,2.567l-40.539,30.549c-7.806-3.999-16.371-7.52-25.693-10.565l-7.994-52.529c-0.191-2.474-1.287-4.521-3.285-6.139C255.95,0.806,253.623,0,250.954,0h-63.38c-5.52,0-8.947,2.663-10.278,7.993c-2.475,9.513-5.236,27.214-8.28,53.1c-8.947,2.86-17.607,6.476-25.981,10.853l-39.399-30.549c-2.474-1.903-4.948-2.854-7.422-2.854c-4.187,0-13.179,6.804-26.979,20.413c-13.8,13.612-23.169,23.841-28.122,30.69c-1.714,2.474-2.568,4.664-2.568,6.567c0,2.286,0.95,4.57,2.853,6.851c12.751,15.42,22.936,28.549,30.55,39.403c-4.759,8.754-8.47,17.511-11.132,26.265l-53.105,7.992c-2.093,0.382-3.9,1.621-5.424,3.715C0.76,182.531,0,184.722,0,187.002v63.383c0,2.478,0.76,4.709,2.284,6.708c1.524,1.998,3.521,3.195,5.996,3.572l52.25,7.71c2.663,9.325,6.564,18.743,11.704,28.257c-3.424,4.761-8.563,11.468-15.415,20.129c-6.851,8.665-11.709,14.989-14.561,18.986c-1.525,2.102-2.285,4.285-2.285,6.57c0,2.471,0.666,4.658,1.997,6.561c7.423,10.284,23.125,26.272,47.109,47.969c2.095,2.094,4.475,3.138,7.137,3.138c2.857,0,5.236-0.852,7.138-2.563l40.259-30.553c7.808,3.997,16.371,7.519,25.697,10.568l7.993,52.529c0.193,2.471,1.287,4.518,3.283,6.14c1.997,1.622,4.331,2.423,6.995,2.423h63.38c5.53,0,8.952-2.662,10.287-7.994c2.471-9.514,5.229-27.213,8.274-53.098c8.946-2.858,17.607-6.476,25.981-10.855l39.402,30.84c2.663,1.712,5.141,2.563,7.42,2.563c4.186,0,13.131-6.752,26.833-20.27c13.709-13.511,23.13-23.79,28.264-30.837c1.711-1.902,2.569-4.09,2.569-6.561c0-2.478-0.947-4.862-2.857-7.139c-13.698-16.754-23.883-29.882-30.546-39.402c3.806-7.043,7.519-15.701,11.136-25.98l52.817-7.988c2.279-0.383,4.189-1.622,5.708-3.716c1.523-2.098,2.279-4.288,2.279-6.571v-63.376C438.533,185.671,437.777,183.438,436.25,181.438z M270.946,270.939c-14.271,14.277-31.497,21.416-51.676,21.416c-20.177,0-37.401-7.139-51.678-21.416c-14.272-14.271-21.411-31.498-21.411-51.673c0-20.177,7.135-37.401,21.411-51.678c14.277-14.272,31.504-21.411,51.678-21.411c20.179,0,37.406,7.139,51.676,21.411c14.274,14.277,21.413,31.501,21.413,51.678C292.359,239.441,285.221,256.669,270.946,270.939z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
        </button>
    </div>
        <div id="cps-error-message"></div>
    <div id="cps-loading-title"></div>
    <div id="cps-loading-bar">
        <div id="cps-progress-bar" class="cps-progress-bar cps-progress-bar-striped" style="width: 0%;">0%</div>
    </div>
    <div id="cps-price-chart-outer" style="width: 100%; height: 0px;">
        <canvas id="cps-price-chart" height="130"></canvas>
    </div>
    <div id="cps-relate-product">
        <div class="cps-title"><span>Sản phẩm tương tự</span></div>
        <div class="cps-content"></div>
    </div>
    <div id="cps-order-block-outer">
        <div id="cps-order-block">
            <div class="cps-order-filter">
                <span class="cps-order-label">Ưu tiên mã</span>
                <div class="custom-select">
                    <select id="select-priority">
                        <option value="rate">Tỉ lệ</option>
                        <option value="fixed">Cố định</option>
                    </select>
                </div>
            </div>
            <div class="cps-order-filter">
                <span class="cps-order-label">Sắp xếp</span>
                <div class="custom-select">
                    <select id="select-order-type">
                        <option value="asc">Tăng dần</option>
                        <option value="desc">Giảm dần</option>
                    </select>
                </div>
            </div>
            <div class="cps-popup-confirm">
                <button class="cps-popup-confirm-button">Ok</button>
            </div>
        </div>
    </div>
    <div id="cps-sticky-block" class="unset">
        <div id="cps-back-to-all">
            <span class="cps-back" id="cps-back-btn">
                <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
                Xem tất cả mã
            </span>
        </div>
    </div>
    <div id="cps-vouchers-searched" style="display: none">
        <div class="cps-title">
            Các mã giảm giá phù hợp
        </div>
        <div id="cps-category-searched-labels"></div>
        <div id="cps-vouchers-searched-blocks"></div>
        <div class="cps-pagination">
            <span class="cps-pagination-title">
                Hiển thị từ <span id="cps-searched-number-from"></span>
                đến <span id="cps-searched-number-to"></span>
                trong tổng số <span id="cps-searched-number-total"></span> mã
            </span>
            <span class="cps-toggle-page" id="cps-previous">&laquo;</span>
            <span class="cps-toggle-page" id="cps-next">&raquo;</span>
        </div>
        <div class="cps-title">
            Các mã giảm giá liên quan
        </div>
    </div>
    <div id="cps-category-labels"></div>
    <div id="cps-vouchers-blocks"></div>
    <div class="cps-pagination">
        <span class="cps-pagination-title">
            Hiển thị từ <span id="cps-number-from"></span>
            đến <span id="cps-number-to"></span>
            trong tổng số <span id="cps-number-total"></span> mã
        </span>
        <span class="cps-toggle-page" id="cps-previous">&laquo;</span>
        <span class="cps-toggle-page" id="cps-next">&raquo;</span>
    </div>
    <div id="cps-feedback" style="display: none">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSejj4skOdoHfoBq8YbIWgn8bzdPeUonGa5oyBed327NrqmWuw/viewform"
            target="_blank">
            Đóng góp ý kiến tại đây.
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="14" height="14" viewBox="0 0 256 256" xml:space="preserve">
                <defs>
                </defs>
                <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #2271b1; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                    <path d="M 62.015 90 c -1.373 0 -2.667 -0.708 -3.401 -1.897 L 43.694 63.959 c -0.525 -0.85 -0.713 -1.865 -0.527 -2.847 l 3.336 -17.615 l -17.615 3.335 c -0.981 0.185 -1.998 -0.002 -2.847 -0.527 L 1.897 31.387 c -1.344 -0.831 -2.073 -2.374 -1.861 -3.939 s 1.325 -2.859 2.841 -3.303 l 82 -23.984 c 1.401 -0.409 2.918 -0.023 3.951 1.011 c 1.034 1.034 1.421 2.549 1.011 3.952 l -23.984 82 c -0.443 1.516 -1.737 2.629 -3.303 2.841 C 62.372 89.988 62.192 90 62.015 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #2271b1; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 6.146 87.854 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 28.104 -28.104 c 1.563 -1.563 4.095 -1.563 5.657 0 c 1.562 1.562 1.562 4.095 0 5.656 L 8.975 86.683 C 8.193 87.464 7.17 87.854 6.146 87.854 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #2271b1; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 26.44 89.699 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 10.577 -10.577 c 1.563 -1.563 4.095 -1.563 5.657 0 c 1.562 1.562 1.562 4.095 0 5.656 L 29.269 88.527 C 28.488 89.309 27.464 89.699 26.44 89.699 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #2271b1; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 4.301 67.56 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 10.577 -10.577 c 1.563 -1.563 4.095 -1.563 5.657 0 c 1.562 1.562 1.562 4.095 0 5.656 L 7.129 66.388 C 6.348 67.169 5.325 67.56 4.301 67.56 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #2271b1; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                </g>
            </svg>
        </a>
    </div>
    <div class="cps-overlay"></div>
    <div class="cps-con-loading">
        <div class="cps-loading-letter">Đ</div>
        <div class="cps-loading-letter">a</div>
        <div class="cps-loading-letter">n</div>
        <div class="cps-loading-letter">g</div>
        <div class="cps-loading-letter">&nbsp;</div>
        <div class="cps-loading-letter">K</div>
        <div class="cps-loading-letter">i</div>
        <div class="cps-loading-letter">ể</div>
        <div class="cps-loading-letter">m</div>
        <div class="cps-loading-letter">&nbsp;</div>
        <div class="cps-loading-letter">T</div>
        <div class="cps-loading-letter">r</div>
        <div class="cps-loading-letter">a</div>
        <div class="cps-loading-letter">&nbsp;</div>
        <div class="cps-loading-letter">M</div>
        <div class="cps-loading-letter">ã</div>
        <div class="cps-loading-letter">.</div>
        <div class="cps-loading-letter">.</div>
        <div class="cps-loading-letter">.</div>
    </div>
    <div class="cps-popup"></div>
</div>

`;
  let formatDate = function (to, from = new Date()) {
    to = new Date(to);
    let diff = (to - from) / 1000;
    if (diff < 0) return "-";

    let d = [];
    let p = [];

    d.push({ key: "ngày", value: Math.floor(diff / 86400) });
    d.push({ key: "giờ", value: Math.floor(diff / 3600) });
    d.push({ key: "phút", value: Math.floor(diff / 60) });
    d.push({ key: "giây", value: Math.round(diff) });

    d = d.filter((item) => item.value > 0)[0];

    if (d != undefined) {
      return d.value + " " + d.key;
    }

    return "-";
  };
  let toSlug = function (string) {
    //Đổi chữ hoa thành chữ thường
    slug = string.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
    slug = slug.replace(/đ/gi, "d");
    //Xóa các ký tự đặt biệt
    slug = slug.replace(
      /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
      ""
    );
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-/gi, "-");
    slug = slug.replace(/\-\-/gi, "-");
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = "@" + slug + "@";
    slug = slug.replace(/\@\-|\-\@|\@/gi, "");
    return slug;
  };
  let copyVoucherCode = function (element) {
    let voucherCode = element.dataset.code;
    let tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = voucherCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    if (element.innerHTML.trim() === "Copy mã") {
      element.innerHTML = "Đã copy";
      setTimeout(function () {
        element.innerHTML = "Copy mã";
      }, 1000);
      return;
    }

    element.innerHTML = "Đã lưu";
    setTimeout(function () {
      element.innerHTML = "Lưu mã";
    }, 1000);
  };
  let getElementY = function (query) {
    let topDistance =
      window.pageYOffset +
      document.querySelector(query).getBoundingClientRect().top;
    return topDistance > 100 ? topDistance - 100 : topDistance;
  };
  let removeActive = function (className) {
    let elements = document.getElementsByClassName(className);
    [...elements].forEach(function (element) {
      element.classList.remove("active");
    });
  };
  let numberTwoDigital = function (n) {
    return n < 10 ? "0" + n : "" + n;
  };
  let dynamicSort = function (vouchers, orderType, priority) {
    let fixedVouchers = [];
    let percentVouchers = [];
    vouchers.forEach(function (voucher) {
      if (voucher.reward_percentage === 0) {
        fixedVouchers.push(voucher);
      } else {
        percentVouchers.push(voucher);
      }
    });

    if (orderType === "asc") {
      fixedVouchers.sort((a, b) =>
        a.reward_value > b.reward_value
          ? 1
          : b.reward_value > a.reward_value
          ? -1
          : 0
      );
      percentVouchers.sort((a, b) =>
        a.reward_percentage > b.reward_percentage
          ? 1
          : b.reward_percentage > a.reward_percentage
          ? -1
          : 0
      );
    } else {
      fixedVouchers.sort((a, b) =>
        a.reward_value < b.reward_value
          ? 1
          : b.reward_value < a.reward_value
          ? -1
          : 0
      );
      percentVouchers.sort((a, b) =>
        a.reward_percentage < b.reward_percentage
          ? 1
          : b.reward_percentage < a.reward_percentage
          ? -1
          : 0
      );
    }

    if (priority === "rate") {
      return percentVouchers.concat(fixedVouchers);
    } else {
      return fixedVouchers.concat(percentVouchers);
    }
  };
  let onOrderChange = function (orderType, priority) {
    localStorage.setItem("mo-voucher-order-type", orderType);
    localStorage.setItem("mo--voucher-priority", priority);
    if (matchedVouchers.length > 0) {
      matchedVouchers = dynamicSort(matchedVouchers, orderType, priority);
      generateVouchersTabs(matchedVouchers, orderType, priority);
    } else if (moVouchersData.length > 0) {
      moVouchersData = dynamicSort(moVouchersData, orderType, priority);
      generateVouchersTabs(moVouchersData, orderType, priority);
    }
  };
  let setPaginationTitle = function (
    pagination,
    container = "cps-vouchers-blocks"
  ) {
    let numberFrom, numberTo, numberTotal;
    let targets = document.getElementsByClassName("cps-pagination");
    if (targets.length) {
      for (var i = 0; i < targets.length; i++) {
        targets[i].classList.add("cps-hidden");
      }
    }
    if (pagination.totalVouchers > 10) {
      document
        .getElementById(container)
        .nextElementSibling.classList.remove("cps-hidden");
      switch (container) {
        case "cps-vouchers-blocks":
          numberFrom = document.getElementById("cps-number-from");
          numberTo = document.getElementById("cps-number-to");
          numberTotal = document.getElementById("cps-number-total");
          break;
        case "cps-vouchers-searched-blocks":
          numberFrom = document.getElementById("cps-searched-number-from");
          numberTo = document.getElementById("cps-searched-number-to");
          numberTotal = document.getElementById("cps-searched-number-total");
          break;
        default:
          break;
      }
      let totalPage = Math.ceil(pagination.totalVouchers / pagination.pageSize);
      numberFrom.innerHTML =
        (pagination.currentPage - 1) * pagination.pageSize + 1;
      numberTo.innerHTML =
        pagination.totalVouchers < pagination.pageSize
          ? pagination.totalVouchers
          : pagination.currentPage < totalPage
          ? pagination.currentPage * pagination.pageSize
          : pagination.totalVouchers;
      numberTotal.innerHTML = pagination.totalVouchers;
    }
  };
  let generateVouchersTabs = function (
    vouchers,
    orderType,
    priority,
    productLink = "",
    container = "cps-vouchers-blocks",
    ignoreAll = false
  ) {
    let categoryLabels, vouchersBlocks;
    switch (container) {
      case "cps-vouchers-blocks":
        vouchersSearched.style.display = "none";
        categoryLabels = document.getElementById("cps-category-labels");
        vouchersBlocks = document.getElementById("cps-vouchers-blocks");
        categoryLabels.innerHTML = vouchersBlocks.innerHTML = "";
        let searchedBlock = document.getElementById(
          "cps-vouchers-searched-blocks"
        );
        if (searchedBlock) {
          searchedBlock.innerHTML = "";
        }
        break;
      case "cps-vouchers-searched-blocks":
        vouchersSearched.style.display = "block";
        categoryLabels = document.getElementById(
          "cps-category-searched-labels"
        );
        vouchersBlocks = document.getElementById(
          "cps-vouchers-searched-blocks"
        );
        categoryLabels.innerHTML = vouchersBlocks.innerHTML = "";
        break;
      default:
        break;
    }
    // Group Vouchers By Category
    let groups = vouchers.reduce((r, a) => {
      if (a.icon_text) {
        r[a.icon_text.toLowerCase()] = [
          ...(r[a.icon_text.toLowerCase()] || []),
          a,
        ];
      } else {
        r["SHOPEE"] = [...(r["SHOPEE"] || []), a];
      }
      return r;
    }, {});
    let keysSorted = Object.keys(groups).sort(function (a, b) {
      return groups[b].length - groups[a].length;
    });
    let upcomingVouchers = [""];
    if (!ignoreAll) {
      upcomingVouchers = generateVouchersTab(
        vouchers,
        "Tất cả",
        productLink,
        container
      );
      if (upcomingVouchers.length > 0) {
        upcomingVouchers = dynamicSort(upcomingVouchers, orderType, priority);
        generateVouchersTab(
          upcomingVouchers,
          "Sắp diễn ra",
          productLink,
          container
        );
      }
    }
    for (let index in keysSorted) {
      generateVouchersTab(
        groups[keysSorted[index]],
        capitalizeFirstLetter(keysSorted[index]),
        productLink,
        container
      );
    }
    if (window.mobileCheck() && false) {
      setTimeout(overrideAnchorClick(), 1);
    }
  };
  let generateVouchersTab = function (
    group,
    category,
    productLink = "",
    container
  ) {
    let categoryLabels, vouchersBlocks;
    switch (container) {
      case "cps-vouchers-searched-blocks":
        categoryLabels = document.getElementById(
          "cps-category-searched-labels"
        );
        vouchersBlocks = document.getElementById(
          "cps-vouchers-searched-blocks"
        );
        break;
      case "cps-vouchers-blocks":
      default:
        categoryLabels = document.getElementById("cps-category-labels");
        vouchersBlocks = document.getElementById("cps-vouchers-blocks");
        break;
    }
    let blockAll = document.getElementById("tat-ca");
    let blockUpcoming = document.getElementById("sap-dien-ra");
    let activeClass = category === "Tất cả" ? "active" : "";
    let upComingClass = category === "Sắp diễn ra" ? "up-coming" : "";
    let categoryLabel = `<span class="cps-category-label ${activeClass} ${upComingClass}" data-id=${toSlug(
      category
    )}>${category} (${group.length})</span>`;
    categoryLabels.insertAdjacentHTML("beforeend", categoryLabel);
    let vouchersBlock = document.createElement("div");
    vouchersBlock.classList.add("cps-vouchers-block");
    if (activeClass !== "") {
      vouchersBlock.classList.add(activeClass);
    }
    vouchersBlock.id = toSlug(category);
    vouchersBlocks.appendChild(vouchersBlock);
    let pageSize = 10;
    let totalPage = Math.ceil(group.length / pageSize);
    let lastSize = group.length % pageSize;
    let upComingVouchers = [];
    for (let i = 0; i < totalPage; i++) {
      let offset =
        lastSize === 0 ? pageSize : i < totalPage - 1 ? pageSize : lastSize;
      let vouchersPage = document.createElement("div");
      vouchersPage.classList.add("cps-vouchers-page");
      if (i === 0 && activeClass !== "") {
        vouchersPage.classList.add(activeClass);
      }
      vouchersPage.id = toSlug(category) + "-page-" + (i + 1);
      vouchersBlock.appendChild(vouchersPage);
      for (let j = i * pageSize; j < i * pageSize + offset; j++) {
        moVoucher = group[j];
        let voucherHtml = renverVoucher(moVoucher, productLink);
        vouchersPage.insertAdjacentHTML("beforeend", voucherHtml);
        if (new Date(moVoucher.start_time * 1000) > new Date()) {
          upComingVouchers.push(moVoucher);
        }
      }
    }

    return upComingVouchers;
  };
  let renverVoucher = function (moVoucher, productLink = "") {
    let moTypeColor = "#ee3916";
    let moDuration = "";
    let moType = "";
    let moTitle = "";
    if (
      typeof moVoucher["discount_percentage"] === "undefined" ||
      moVoucher["discount_percentage"] === null
    ) {
      if (
        typeof moVoucher["coin_percentage"] !== "undefined" &&
        moVoucher["coin_percentage"] !== null
      ) {
        moTypeColor = "#d0021b";
        if (moVoucher["coin_percentage"] > 100) {
          moTitle = `Hoàn ${Math.round(
            moVoucher.coin_percentage / 1000
          )}K xu Đơn tối thiểu ${Math.round(moVoucher.min_spend / 100000000)}K`;
        } else {
          moTitle = `Hoàn ${
            moVoucher.coin_percentage
          }% Đơn tối thiểu ${Math.round(moVoucher.min_spend / 100000000)}K`;
        }
        moType = "Hoàn xu";
        if (moVoucher.coin_cap > 0) {
          moTitle += ` Hoàn tối đa ${Math.round(
            moVoucher.coin_cap / 1000
          )}K xu`;
        }
      }
    } else {
      moType = "Giảm giá";
      if (moVoucher["discount_percentage"] == 0) {
        moTitle = `Giảm ${Math.round(
          moVoucher.discount_value / 100000000
        )}K Đơn tối thiểu ${Math.round(moVoucher.min_spend / 100000000)}K`;
      } else {
        moTitle = `Giảm ${
          moVoucher.discount_percentage
        }% Đơn tối thiểu ${Math.round(moVoucher.min_spend / 100000000)}K`;
      }
      if (moVoucher.discount_cap > 0) {
        moTitle += ` Giảm tối đa ${Math.round(
          moVoucher.discount_cap / 100000000
        )}K`;
      }
    }

    if (new Date(moVoucher.start_time * 1000) > new Date()) {
      let start = new Date(moVoucher.start_time * 1000);
      start =
        [start.getHours(), numberTwoDigital(start.getMinutes())].join("h") +
        " " +
        [
          numberTwoDigital(start.getDate()),
          numberTwoDigital(start.getMonth() + 1),
          start.getFullYear(),
        ].join("/");
      moDuration = `<span style="color: #1d7be1;">Hiệu lực từ: ${start}</span>`;
    } else {
      moDuration = `<span class="cps-voucher-percent-used">Còn lại ${
        100 - moVoucher.percentage_used + "%"
      }</span> - <span style="color: #ff1424;">Hết hạn sau: ${formatDate(
        moVoucher.end_time * 1000
      )}</span>`;
    }
    let moIcon = moVoucher.icon_hash
      ? "https://cf.shopee.vn/file/" + moVoucher.icon_hash
      : "https://promotion-api.masoffer.net/images/shopee-logo.png";

    let moVoucherType = "";
    let moNewUser = "";
    let moDevice = "";
    let moCustomBadge = "";
    let buttonText = "Copy mã";
    let bannerBadge = "";
    if (!moVoucher.custom_badge) {
      moVoucher.custom_badge = [];
    }

    if (
      moVoucher.custom_badge &&
      moVoucher.custom_badge.length > 0 &&
      window.admin_badges_data &&
      window.admin_badges_data.badges
    ) {
      let temp = moVoucher.custom_badge;
      let badges = [];
      temp.forEach((item) => {
        // window.admin_badges_data.badges - global variable from admin.js created by wordpress plugin
        let stockBadges = window.admin_badges_data.badges;
        for (let index in stockBadges) {
          if (stockBadges[index].id == item) {
            badges.push(stockBadges[index]);
          }
        }
      });
      for (let index in badges) {
        moCustomBadge += `<div class="cps-voucher-type">
            <span class="cps-badge cps-tooltip"
                  style="background: ${
                    badges[index].background_color || "#1879f2"
                  }; color: ${badges[index].title_color || "white"};">
                ${badges[index].title}
                <span class="cps-tooltiptext">
                    ${badges[index].tooltip || "inherit"}
                </span>
            </span>
        </div>
        `;
      }
    }

    if (
      (moVoucher.force_new_user && moVoucher.force_new_user === 1) ||
      (moVoucher.new_user_only && moVoucher.new_user_only === true)
    ) {
      moNewUser = `<div class="cps-voucher-type">
            <span class="cps-badge cps-tooltip" style="background: #1879f2;">
                Người mới
                <span class="cps-tooltiptext">Áp dụng cho khách hàng mới mua hàng lần đầu</span>
            </span>
        </div>
        `;
    }
    if (moVoucher.devices && moVoucher.devices.length === 2) {
      moDevice = `<i class="fa fa-mobile cps-device cps-tooltip cps-phone" aria-hidden="true">
            <span class="cps-tooltiptext">Chỉ sử dụng được trên Mobile App</span>
        </i>
        `;
    } else {
      moDevice = `<i class="fa fa-globe cps-device cps-tooltip cps-all-devices" aria-hidden="true">
            <span class="cps-tooltiptext">Sử dụng được trên tất cả thiết bị</span>
        </i>
        `;
    }

    let voucherLink =
      productLink ||
      "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn&amp;mo_source=shopee_voucher" +
        "&";
    if (moVoucher.is_banner) {
      buttonText = "Lưu mã";
      bannerBadge = `<div class="cps-voucher-type">
            <span class="cps-badge cps-tooltip" style="background: #ee3916;">
                Mã lưu banner
                <span class="cps-tooltiptext">Cần phải lưu trên banner</span>
            </span>
        </div>
        `;
      voucherLink =
        moVoucher.banner_link ||
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn&amp;mo_source=shopee_voucher" +
          "&";
    }

    if (moNewUser !== "" || bannerBadge !== "" || moCustomBadge !== "") {
      moVoucherType = `<div class="cps-voucher-type">
                            ${moNewUser}
                            ${bannerBadge}
                            ${moCustomBadge}
                         </div>`;
    }

    let shopVoucher = moVoucher.shop_id ? "shop-voucher" : "";
    return `<div class="cps-voucher-row">
    <div class="cps-voucher-wrap">
        <div class="cps-voucher-left ${shopVoucher}">
            <div class="cps-voucher-image">
                <div class="cps-voucher-icon" style="background-image: url('${moIcon}'); background-size: contain; background-repeat: no-repeat;"></div>
            </div>
            <div class="cps-voucher-icon-text">${
              moVoucher.icon_text || "SHOPEE"
            }</div>
            <div class="cps-voucher-border-left ${shopVoucher}">
                <div class="cps-border-left"></div>
            </div>
        </div>
        <div class="cps-voucher-right">
            <div class="cps-voucher-title">
                ${moVoucherType}
                <div class="cps-voucher-title-text">${moTitle}</div>
            </div>
            <div></div>
            <span class="cps-voucher-note">
                    <div class="cps-voucher-pregress">
                        <div style="width: ${
                          100 - moVoucher.percentage_used
                        }%; height: 100%; background: linear-gradient(270deg, rgb(255, 176, 0) 0%, rgb(235, 23, 23) 100%);"></div>
                    </div>
                    <div class="cps-voucher-duration">
                        ${moDuration}
                        <div class="cps-voucher-detail-link">
                            <a class="cps-tooltip" href="${
                              moVoucher.detail_link + "&"
                            }" target="_blank">
                                Chi tiết <i class="fa fa-share-square-o" aria-hidden="true"></i>
                                <span class="cps-tooltiptext">${
                                  moVoucher.usage_terms || moTitle
                                }</span>
                            </a>
                        </div>
                        <a class="cps-list-product-link cps-tooltip" href="${
                          moVoucher.search_link + "&"
                        }" data-code="${moVoucher.voucher_code}" data-code="${
      moVoucher.voucher_code
    }" target="_blank">
                            SP áp dụng
                            <span class="cps-tooltiptext">Danh sách sản phẩm có thể sử dụng mã</span>
                        </a>
                        <a class="cps-btn-get-voucher cps-tooltip" href="${voucherLink}" data-code="${
      moVoucher.voucher_code
    }" target="_blank">
                            
                            ${
                              buttonText === "Copy mã"
                                ? buttonText +
                                  "<span class='cps-tooltiptext'>Danh sách sản phẩm có thể sử dụng mã</span>"
                                : buttonText
                            }
                        </a>
                    </div>
                </span>
        </div>
    </div>
</div>
`;
  };
  let checkVoucher = function (
    moVoucherslist,
    moVoucher,
    moProductInfo,
    loadingPercent,
    delay
  ) {
    let loadingTitle = document.getElementById("cps-loading-title");
    let progressBar = document.getElementById("cps-progress-bar");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      product_info: {
        item_name: encodeURI(moProductInfo.item_name),
        price_max: moProductInfo.price_max,
        price_min: moProductInfo.price_min,
        locations: "Ha Noi",
        item_id: "20",
      },
      voucher: {
        promotionid: moVoucher.promotionid,
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    return new Promise((resolve) => setTimeout(resolve, delay)).then(() => {
      return fetch(
        "https://publisher-promotion.masoffer.net" + "/vouchers/items",
        requestOptions
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Có lỗi xảy ra");
          }
          return response.json();
        })
        .then((data) => {
          loadingPercent =
            Math.round(
              (parseFloat(progressBar.innerHTML.slice(0, -1)) +
                loadingPercent) *
                100
            ) / 100;
          loadingTitle.innerHTML = "Đang kiểm tra mã " + moVoucher.voucher_code;
          progressBar.innerHTML =
            (loadingPercent < 100 ? loadingPercent : 100) + "%";
          progressBar.style.width = progressBar.innerHTML;
          if (data.status === 1) {
            return moVoucher;
          } else {
            return 0;
          }
        })
        .catch((error) => {
          loadingPercent =
            Math.round(
              (parseFloat(progressBar.innerHTML.slice(0, -1)) +
                loadingPercent) *
                100
            ) / 100;
          loadingTitle.innerHTML = "Đang kiểm tra mã " + moVoucher.voucher_code;
          progressBar.innerHTML =
            (loadingPercent < 100 ? loadingPercent : 100) + "%";
          progressBar.style.width = progressBar.innerHTML;
          return 0;
        });
    });
  };
  let checkScreenSize = function () {
    if (screen.width < 576) {
      stickyBlock.style.width = vouchersBlocks.offsetWidth + "px";
    } else {
      stickyBlock.classList.remove("fixed");
      stickyBlock.classList.add("unset");
      stickyBlock.style.width = "100%";
    }
  };

  let meta = document.createElement("meta");
  meta.setAttribute("name", "viewport");
  meta.setAttribute(
    "content",
    "width=device-width, initial-scale=1, maximum-scale=1"
  );
  document.getElementsByTagName("head")[0].appendChild(meta);
  if (!document.getElementById("font-awesome-4")) {
    let link = document.createElement("link");
    link.id = "font-awesome-4";
    link.rel = "stylesheet";
    link.href =
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  let moRecommendVoucherElement = document.getElementById(
    "mo-recommend-widget-9999"
  );
  moRecommendVoucherElement.innerHTML =
    moRecommendVoucherCss + moRecommendVoucherHtml;
  let moWrap = document.getElementById("cps-wrap");
  let moSearchInput = document.getElementById("cps-search-url");
  let moErrorMessage = document.getElementById("cps-error-message");
  let moVoucherslist = document.getElementById("cps-vouchers");
  let loadingBar = document.getElementById("cps-loading-bar");
  let loadingTitle = document.getElementById("cps-loading-title");
  let progressBar = document.getElementById("cps-progress-bar");
  let searchBtn = document.getElementById("cps-btn-search-voucher");
  let vouchersBlocks = document.getElementById("cps-vouchers-blocks");
  let vouchersSearched = document.getElementById("cps-vouchers-searched");
  let backToAllBtn = document.getElementById("cps-back-btn");
  let stickyBlock = document.getElementById("cps-sticky-block");
  let orderBlock = document.getElementById("cps-order-block-outer");
  let relatedBlock = document.getElementById("cps-relate-product");
  let popupConfirm = document.getElementsByClassName(
    "cps-popup-confirm-button"
  );
  let moVouchersData = [
    {
      promotionid: 461342670962688,
      voucher_code: "T10BANMOI30K",
      signature:
        "8eb0f0967825f8fb06b68c4c94b03aa49cded0672c73ec17072989d5fc4037e3",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 0,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 63,
      start_time: 1664557200,
      end_time: 1665853140,
      claim_start_time: 1664557200,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 3000000000,
      reward_cap: 0,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      display_labels: [1],
      wallet_redeemable: false,
      customer_reference_id: "MP-4F3CA093D8A0A0280000000144054114",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 3000000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: false,
      new_user_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665853140,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 T10BANMOI30K gi\u1ea3m t\u1ed1i \u0111a 30K cho \u0111\u01a1n h\u00e0ng h\u1ee3p l\u1ec7 t\u1eeb 0\u0110 tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 01/10/2022 00:00 - 15/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n. M\u1ed7i kh\u00e1ch h\u00e0ng ch\u1ec9 s\u1eed d\u1ee5ng 1 l\u1ea7n. D\u00e0nh cho kh\u00e1ch h\u00e0ng m\u1edbi l\u1ea7n \u0111\u1ea7u mua h\u00e0ng tr\u00ean \u1ee9ng d\u1ee5ng Shopee.",
      devices: ["iOS", "Android"],
      force_new_user: 1,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461342670962688%26signature%3D8eb0f0967825f8fb06b68c4c94b03aa49cded0672c73ec17072989d5fc4037e3%26voucherCode%3DT10BANMOI30K\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FT10BANMOI30K%2F461342670962688%2F8eb0f0967825f8fb06b68c4c94b03aa49cded0672c73ec17072989d5fc4037e3%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 459718126567424,
      voucher_code: "SPPBAY10",
      signature:
        "82236adb0e1b274bb33a3cbbd5db3856e798464eb313cfffbc58e6f93dfe707b",
      use_type: 1,
      voucher_market_type: 2,
      min_spend: 0,
      product_limit: true,
      percentage_claimed: 0,
      percentage_used: 15,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 0,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 3,
      reward_value: 0,
      reward_cap: 1000000000,
      icon_hash: "4fac818193016227d29f29852bf1ff8f",
      icon_text: "V\u00e9 m\u00e1y bay",
      customised_labels: [
        { content: "V\u00e9 m\u00e1y bay", color: null },
        { content: "V\u00ed ShopeePay", color: null },
      ],
      customised_product_scope_tags: [],
      shop_id: 0,
      dp_category_name: "Flight",
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "DP-3F3F6E8360A0A0280000000144040150",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 3,
      discount_cap: 1000000000,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 \u00e1p d\u1ee5ng tr\u00ean app cho \u0111\u1eb7t V\u00e9 m\u00e1y bay. Nh\u1eadp m\u00e3 SPPBAY10 Gi\u1ea3m 3% t\u1ed1i \u0111a 10000\u0110 cho \u0111\u01a1n t\u1eeb 0\u0110. HSD: 31/10/2022 23:59. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n! M\u00e3 ch\u1ec9 \u00e1p d\u1ee5ng khi thanh to\u00e1n b\u1eb1ng ShopeePay.",
      devices: ["Android", "iOS"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D459718126567424%26signature%3D82236adb0e1b274bb33a3cbbd5db3856e798464eb313cfffbc58e6f93dfe707b%26voucherCode%3DSPPBAY10\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPBAY10%2F459718126567424%2F82236adb0e1b274bb33a3cbbd5db3856e798464eb313cfffbc58e6f93dfe707b%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 459718124699648,
      voucher_code: "SPPVX10",
      signature:
        "d235e1f015f6f56b24d9d78d2ca931b7842e5e03f553fa7afaa332a6db023aab",
      use_type: 1,
      voucher_market_type: 2,
      min_spend: 0,
      product_limit: true,
      percentage_claimed: 0,
      percentage_used: 19,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 0,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 10,
      reward_value: 0,
      reward_cap: 1500000000,
      icon_hash: "f51b4bc09ce007a115e43e1d21bfe838",
      icon_text: "V\u00e9 xe kh\u00e1ch",
      customised_labels: [
        { content: "V\u00e9 xe kh\u00e1ch", color: null },
        { content: "V\u00ed ShopeePay", color: null },
      ],
      customised_product_scope_tags: [],
      shop_id: 0,
      dp_category_name: "Bus",
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "DP-BF3F6A9320A0A0280000000144040150",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 10,
      discount_cap: 1500000000,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 \u00e1p d\u1ee5ng tr\u00ean app cho \u0111\u1eb7t V\u00e9 xe kh\u00e1ch. Nh\u1eadp m\u00e3 SPPVX10 Gi\u1ea3m 10% t\u1ed1i \u0111a 15000\u0110 cho \u0111\u01a1n t\u1eeb 0\u0110. HSD: 31/10/2022 23:59. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n! M\u00e3 ch\u1ec9 \u00e1p d\u1ee5ng khi thanh to\u00e1n b\u1eb1ng ShopeePay.",
      devices: ["Android", "iOS"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D459718124699648%26signature%3Dd235e1f015f6f56b24d9d78d2ca931b7842e5e03f553fa7afaa332a6db023aab%26voucherCode%3DSPPVX10\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPVX10%2F459718124699648%2Fd235e1f015f6f56b24d9d78d2ca931b7842e5e03f553fa7afaa332a6db023aab%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 459718126419968,
      voucher_code: "SPPHOTEL10",
      signature:
        "c8a332ae669dc489631500f2be45941c6ce7b80a7b8acad630ced06da4186825",
      use_type: 1,
      voucher_market_type: 2,
      min_spend: 0,
      product_limit: true,
      percentage_claimed: 0,
      percentage_used: 7,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 0,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 5,
      reward_value: 0,
      reward_cap: 2500000000,
      icon_hash: "2830f4da42a624ec8e186651c095e279",
      icon_text: "\u0110\u1eb7t ph\u00f2ng kh\u00e1ch s\u1ea1n",
      customised_labels: [
        {
          content: " \u0110\u1eb7t ph\u00f2ng kh\u00e1ch s\u1ea1n",
          color: null,
        },
        { content: "V\u00ed ShopeePay", color: null },
      ],
      customised_product_scope_tags: [],
      shop_id: 0,
      dp_category_name: "Hotel",
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "DP-BF3F6BD730A0A0280000000144040150",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 5,
      discount_cap: 2500000000,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 \u00e1p d\u1ee5ng tr\u00ean app cho \u0111\u1eb7t Ph\u00f2ng kh\u00e1ch s\u1ea1n. Nh\u1eadp m\u00e3 SPPHOTEL10 Gi\u1ea3m 5% t\u1ed1i \u0111a 25000\u0110 cho \u0111\u01a1n t\u1eeb 0\u0110. HSD: 31/10/2022 23:59. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n! M\u00e3 ch\u1ec9 \u00e1p d\u1ee5ng khi thanh to\u00e1n b\u1eb1ng ShopeePay.",
      devices: ["Android", "iOS"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D459718126419968%26signature%3Dc8a332ae669dc489631500f2be45941c6ce7b80a7b8acad630ced06da4186825%26voucherCode%3DSPPHOTEL10\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPHOTEL10%2F459718126419968%2Fc8a332ae669dc489631500f2be45941c6ce7b80a7b8acad630ced06da4186825%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461451580260368,
      voucher_code: "CCBGG1001A",
      signature:
        "9eae93fd5bc569055f381e257e9a7c190265eb30735c14790443dc8a510a0417",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 40000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 47,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 1664557200,
      valid_days: 0,
      reward_type: 1,
      reward_percentage: 6,
      reward_cap: 200000,
      use_link: "https://shopee.vn/collections/781516",
      icon_hash: "a6ff372c86c4e242c76fb75f65ae7579",
      icon_text: "To\u00e0n Ng\u00e0nh H\u00e0ng",
      customised_labels: [],
      customised_product_scope_tags: [""],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-A121681BD8A0A1280000000144054500",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      coin_percentage: 6,
      coin_cap: 200000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      customised_product_scope_tag_image_hash:
        "ad2dd06f75d7ce33662a4a74041fa27a",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 CCBGG1001A ho\u00e0n 6% t\u1ed1i \u0111a 200K Xu cho \u0111\u01a1n h\u00e0ng h\u1ee3p l\u1ec7 t\u1eeb 400K t\u1eeb shop Ho\u00e0n Xu Xtra tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 31/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n. M\u1ed7i kh\u00e1ch h\u00e0ng ch\u1ec9 s\u1eed d\u1ee5ng 1 l\u1ea7n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 1,
      custom_badge: ["1640864817", "1663053929"],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fm%2Fdon-dau-tien-mien-phi\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461451580260368%26signature%3D9eae93fd5bc569055f381e257e9a7c190265eb30735c14790443dc8a510a0417%26voucherCode%3DCCBGG1001A\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FCCBGG1001A%2F461451580260368%2F9eae93fd5bc569055f381e257e9a7c190265eb30735c14790443dc8a510a0417%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461451588730880,
      voucher_code: "CCBGG1001B",
      signature:
        "ba61c49b2e4e4a5ac7838c83ecb6ef7f2fba6794a784e951ab45f1f336256957",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 40000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 73,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 1664557200,
      valid_days: 0,
      reward_type: 1,
      reward_percentage: 6,
      reward_cap: 200000,
      use_link: "https://shopee.vn/collections/781516",
      icon_hash: "a6ff372c86c4e242c76fb75f65ae7579",
      icon_text: "To\u00e0n Ng\u00e0nh H\u00e0ng",
      customised_labels: [],
      customised_product_scope_tags: [""],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-0924281F88A0A0280000000144054500",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      coin_percentage: 6,
      coin_cap: 200000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      customised_product_scope_tag_image_hash:
        "ad2dd06f75d7ce33662a4a74041fa27a",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 CCBGG1001B ho\u00e0n 6% t\u1ed1i \u0111a 200K Xu cho \u0111\u01a1n h\u00e0ng h\u1ee3p l\u1ec7 t\u1eeb 400K t\u1eeb shop Ho\u00e0n Xu Xtra tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 31/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n. M\u1ed7i kh\u00e1ch h\u00e0ng ch\u1ec9 s\u1eed d\u1ee5ng 1 l\u1ea7n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 1,
      custom_badge: ["1640864817", "1663053929"],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fm%2Fdon-dau-tien-mien-phi\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461451588730880%26signature%3Dba61c49b2e4e4a5ac7838c83ecb6ef7f2fba6794a784e951ab45f1f336256957%26voucherCode%3DCCBGG1001B\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FCCBGG1001B%2F461451588730880%2Fba61c49b2e4e4a5ac7838c83ecb6ef7f2fba6794a784e951ab45f1f336256957%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 459718134923264,
      voucher_code: "SPPVTQ10",
      signature:
        "2668256881816523fcbc960c77c1b4dcc544af5181aab55e46fd45282de08b1c",
      use_type: 1,
      voucher_market_type: 2,
      min_spend: 0,
      product_limit: true,
      percentage_claimed: 0,
      percentage_used: 1,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 0,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 10,
      reward_value: 0,
      reward_cap: 5000000000,
      icon_hash: "cc8ceb882a9f7c52c3d2d4d9815d6609",
      icon_text: "V\u00e9 tham quan",
      customised_labels: [
        { content: "V\u00e9 tham quan", color: null },
        { content: "V\u00ed ShopeePay", color: null },
      ],
      customised_product_scope_tags: [],
      shop_id: 0,
      dp_category_name: "IEvent",
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "DP-15EA2E8320A0A0280000000144040150",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 10,
      discount_cap: 5000000000,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 \u00e1p d\u1ee5ng tr\u00ean app cho mua V\u00e9 tham quan. Nh\u1eadp m\u00e3 SPPVTQ10 Gi\u1ea3m 10% t\u1ed1i \u0111a 50000\u0110 cho \u0111\u01a1n t\u1eeb 0\u0110. HSD: 31/10/2022 23:59. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n! M\u00e3 ch\u1ec9 \u00e1p d\u1ee5ng khi thanh to\u00e1n b\u1eb1ng ShopeePay.",
      devices: ["Android", "iOS"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D459718134923264%26signature%3D2668256881816523fcbc960c77c1b4dcc544af5181aab55e46fd45282de08b1c%26voucherCode%3DSPPVTQ10\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPVTQ10%2F459718134923264%2F2668256881816523fcbc960c77c1b4dcc544af5181aab55e46fd45282de08b1c%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461880749916160,
      voucher_code: "FAPRE10",
      signature:
        "5adc44c64ff9783ae529005b20a0acf5e3198438aedac156e4933501b6d3bcba",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 100000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 10,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 1664520300,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 10,
      reward_value: 0,
      reward_cap: 30000000000,
      icon_hash: "bf2d5428b78d905d669e00dc5c0e584c",
      icon_text: "Th\u1eddi Trang",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-5FFE8A1728A0A0280000000144100105",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 10,
      discount_cap: 30000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 FAPRE10 gi\u1ea3m ngay 10% (t\u1ed1i \u0111a 300K) cho \u0111\u01a1n h\u00e0ng t\u1eeb 1 tri\u1ec7u tr\u1edf l\u00ean tr\u00ean App.HSD: 23:59 ng\u00e0y 31/10/2022. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461880749916160%26signature%3D5adc44c64ff9783ae529005b20a0acf5e3198438aedac156e4933501b6d3bcba%26voucherCode%3DFAPRE10\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FFAPRE10%2F461880749916160%2F5adc44c64ff9783ae529005b20a0acf5e3198438aedac156e4933501b6d3bcba%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 462034053070848,
      voucher_code: "LIFESBCWG10",
      signature:
        "55ccc4e630ce4a38a1c959b2ed2d0c67d401c9dfb979ef002a1cc348f4ca4d53",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 0,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 73,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 1664542800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 15,
      reward_value: 0,
      reward_cap: 2000000000,
      icon_hash: "6e70b40b396c4e0cf5d62646a0c63964",
      icon_text: "Book Club",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-EEDDC9CF68A0A0280000000144100515",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 15,
      discount_cap: 2000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 LIFESBCWG10 gi\u1ea3m 15% t\u1ed1i \u0111a 20K cho \u0111\u01a1n t\u1eeb 0 \u0111\u1ed3ng. H\u1ea1n s\u1eed d\u1ee5ng: 23:59 ph\u00fat, 31/10/2022. M\u00e3 ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng cho th\u00e0nh vi\u00ean Shopee Book Club m\u1edbi \u0111\u0103ng k\u00fd trong v\u00f2ng 7 ng\u00e0y. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D462034053070848%26signature%3D55ccc4e630ce4a38a1c959b2ed2d0c67d401c9dfb979ef002a1cc348f4ca4d53%26voucherCode%3DLIFESBCWG10\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FLIFESBCWG10%2F462034053070848%2F55ccc4e630ce4a38a1c959b2ed2d0c67d401c9dfb979ef002a1cc348f4ca4d53%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461332295680000,
      voucher_code: "STANEWBUYOCT",
      signature:
        "8f3fd375fe10b8466c63e39c648e7ac44bae26651133b87c83cc4215bd75d257",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 0,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 4,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 1664557200,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 3000000000,
      reward_cap: 0,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-B8C76B47C8A0A0280000000144054110",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 3000000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 STANEWBUYOCT gi\u1ea3m ngay 30000 cho \u0111\u01a1n h\u00e0ng 0\u0110 tr\u00ean \u1ee9ng d\u1ee5ng Shopee. H\u1ea1n s\u1eed d\u1ee5ng 23H59 31/10/2022. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 1,
      is_banner: 1,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fm%2Fsieu-sale-voucher-10\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461332295680000%26signature%3D8f3fd375fe10b8466c63e39c648e7ac44bae26651133b87c83cc4215bd75d257%26voucherCode%3DSTANEWBUYOCT\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSTANEWBUYOCT%2F461332295680000%2F8f3fd375fe10b8466c63e39c648e7ac44bae26651133b87c83cc4215bd75d257%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 462007972888576,
      voucher_code: "LIFEMC10A",
      signature:
        "fc301f8adee7efa889a9d30d7c567cc5315497c031d8d3aefaa9d0e675f9b3df",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 9900000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 47,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 1664470800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 8,
      reward_value: 0,
      reward_cap: 3000000000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-63F1834F68A0A0280000000144100501",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 8,
      discount_cap: 3000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 LIFEMC10A gi\u1ea3m 8% t\u1ed1i \u0111a 30K cho \u0111\u01a1n h\u00e0ng t\u1eeb 99K. H\u1ea1n s\u1eed d\u1ee5ng 23:59 ph\u00fat, 31/10/2022. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D462007972888576%26signature%3Dfc301f8adee7efa889a9d30d7c567cc5315497c031d8d3aefaa9d0e675f9b3df%26voucherCode%3DLIFEMC10A\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FLIFEMC10A%2F462007972888576%2Ffc301f8adee7efa889a9d30d7c567cc5315497c031d8d3aefaa9d0e675f9b3df%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 462008005230592,
      voucher_code: "LIFEMC10H",
      signature:
        "723798223d4779dd155d1524a0571c33ad4669fdc7557f06187054319e0b57ba",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 169900000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 24,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 1664470800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 12,
      reward_value: 0,
      reward_cap: 30000000000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-6BF5824B28A0A0280000000144100501",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 12,
      discount_cap: 30000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 LIFEMC10H gi\u1ea3m 12% t\u1ed1i \u0111a 300K cho \u0111\u01a1n h\u00e0ng t\u1eeb 1Tr699k. H\u1ea1n s\u1eed d\u1ee5ng 23:59 ph\u00fat, 31/10/2022. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D462008005230592%26signature%3D723798223d4779dd155d1524a0571c33ad4669fdc7557f06187054319e0b57ba%26voucherCode%3DLIFEMC10H\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FLIFEMC10H%2F462008005230592%2F723798223d4779dd155d1524a0571c33ad4669fdc7557f06187054319e0b57ba%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 462007980064768,
      voucher_code: "LIFEMC10C",
      signature:
        "6df3a6a5c9bd3a2173fd21a63ffcdb935a8cc6930deb6ecbfc5a71da4b2565e4",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 35000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 43,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 1664470800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 8,
      reward_value: 0,
      reward_cap: 8000000000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-E3F1C24B28A0A0280000000144100501",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 8,
      discount_cap: 8000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 LIFEMC10C gi\u1ea3m 8% t\u1ed1i \u0111a 80K cho \u0111\u01a1n h\u00e0ng t\u1eeb 350K. H\u1ea1n s\u1eed d\u1ee5ng 23:59 ph\u00fat, 31/10/2022. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D462007980064768%26signature%3D6df3a6a5c9bd3a2173fd21a63ffcdb935a8cc6930deb6ecbfc5a71da4b2565e4%26voucherCode%3DLIFEMC10C\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FLIFEMC10C%2F462007980064768%2F6df3a6a5c9bd3a2173fd21a63ffcdb935a8cc6930deb6ecbfc5a71da4b2565e4%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 462007979851776,
      voucher_code: "LIFEMC10B",
      signature:
        "bae292d1e13c08706ed25f8fbdf6a5c5eedeb8e5237b5a7080e4b2ebbe6fe0b6",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 15000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 15,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 1664470800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 8,
      reward_value: 0,
      reward_cap: 5000000000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-E3F1C21B78A0A0280000000144100501",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 8,
      discount_cap: 5000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 LIFEMC10B gi\u1ea3m 8% t\u1ed1i \u0111a 50K cho \u0111\u01a1n h\u00e0ng t\u1eeb 150K. H\u1ea1n s\u1eed d\u1ee5ng 23:59 ph\u00fat, 31/10/2022. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D462007979851776%26signature%3Dbae292d1e13c08706ed25f8fbdf6a5c5eedeb8e5237b5a7080e4b2ebbe6fe0b6%26voucherCode%3DLIFEMC10B\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FLIFEMC10B%2F462007979851776%2Fbae292d1e13c08706ed25f8fbdf6a5c5eedeb8e5237b5a7080e4b2ebbe6fe0b6%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 462007996825600,
      voucher_code: "LIFEMC10G",
      signature:
        "ead52fadb7416b102290f022a2eb7b0369574a71fa71cf899c4a2e6bf9f2b655",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 35000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 12,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 1664470800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 5000000000,
      reward_cap: 0,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-CBF4C24A78A0A0280000000144100501",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 5000000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 LIFEMC10G gi\u1ea3m t\u1ed1i \u0111a 50K cho \u0111\u01a1n h\u00e0ng t\u1eeb 350K. H\u1ea1n s\u1eed d\u1ee5ng 23:59 ph\u00fat, 31/10/2022. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D462007996825600%26signature%3Dead52fadb7416b102290f022a2eb7b0369574a71fa71cf899c4a2e6bf9f2b655%26voucherCode%3DLIFEMC10G\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FLIFEMC10G%2F462007996825600%2Fead52fadb7416b102290f022a2eb7b0369574a71fa71cf899c4a2e6bf9f2b655%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 459718141591552,
      voucher_code: "SPPHOTEL10N",
      signature:
        "2ac716fd4a5dc93302856b22657b7cd16630a641fcd2fe217f58f68c7e562e44",
      use_type: 1,
      voucher_market_type: 2,
      min_spend: 0,
      product_limit: true,
      percentage_claimed: 0,
      percentage_used: 0,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 0,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 5,
      reward_value: 0,
      reward_cap: 3000000000,
      icon_hash: "2830f4da42a624ec8e186651c095e279",
      icon_text: "\u0110\u1eb7t ph\u00f2ng kh\u00e1ch s\u1ea1n",
      customised_labels: [{ content: "B\u1ea1n m\u1edbi", color: null }],
      customised_product_scope_tags: [],
      shop_id: 0,
      dp_category_name: "Hotel",
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "DP-95EA6A9670A0A0280000000144040150",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 5,
      discount_cap: 3000000000,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 \u00e1p d\u1ee5ng tr\u00ean app cho \u0111\u1eb7t Ph\u00f2ng kh\u00e1ch s\u1ea1n. Nh\u1eadp m\u00e3 SPPHOTEL10N Gi\u1ea3m 5% t\u1ed1i \u0111a 30000\u0110 cho \u0111\u01a1n t\u1eeb 0\u0110. HSD: 31/10/2022 23:59. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n! M\u00e3 ch\u1ec9 \u00e1p d\u1ee5ng khi thanh to\u00e1n b\u1eb1ng ShopeePay.",
      devices: ["Android", "iOS"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D459718141591552%26signature%3D2ac716fd4a5dc93302856b22657b7cd16630a641fcd2fe217f58f68c7e562e44%26voucherCode%3DSPPHOTEL10N\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPHOTEL10N%2F459718141591552%2F2ac716fd4a5dc93302856b22657b7cd16630a641fcd2fe217f58f68c7e562e44%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461965508411392,
      voucher_code: "COSLUXKOL10",
      signature:
        "1eba2fc76217cdf11394c4baa52455be3107c171e13e3f0bccc5e95694a50c8e",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 60000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 13,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 1664532000,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 7000000000,
      reward_cap: 0,
      icon_hash: "b0c71ac4233792b24df0739f80aba3a6",
      icon_text: "Kh\u1ecfe \u0026 \u0110\u1eb9p",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-4DEC88B728A0A0280000000144100415",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 7000000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 COSLUXKOL10 gi\u1ea3m t\u1ed1i \u0111a 70000\u0110 cho \u0111\u01a1n t\u1eeb 600000\u0110. HSD: 23:59 31/10/2022. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461965508411392%26signature%3D1eba2fc76217cdf11394c4baa52455be3107c171e13e3f0bccc5e95694a50c8e%26voucherCode%3DCOSLUXKOL10\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FCOSLUXKOL10%2F461965508411392%2F1eba2fc76217cdf11394c4baa52455be3107c171e13e3f0bccc5e95694a50c8e%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461172575338496,
      voucher_code: "SPPDT10A",
      signature:
        "c30c5ef66813591ae63167627526b569a3bff841f64a8b78657a1bfdf3566ded",
      use_type: 1,
      voucher_market_type: 2,
      min_spend: 9500000000,
      product_limit: true,
      percentage_claimed: 0,
      percentage_used: 64,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 0,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 100000000,
      reward_cap: 0,
      icon_hash: "3aa6515e76eb97e19478777608398690",
      icon_text: "N\u1ea1p \u0111i\u1ec7n tho\u1ea1i",
      customised_labels: [
        { content: "N\u1ea1p \u0111i\u1ec7n tho\u1ea1i", color: null },
        { content: "V\u00ed ShopeePay", color: null },
      ],
      customised_product_scope_tags: [],
      shop_id: 0,
      dp_category_name: "N\u1ea1p th\u1ebb \u0026 D\u1ecbch v\u1ee5",
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "DP-A9E54848C8A0A0280000000144051455",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 100000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 SPPDT10A Gi\u1ea3m ngay 1000\u0110 cho \u0111\u01a1n t\u1eeb 95000\u0110. HSD: 31/10/2022 23:59. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n! M\u00e3 ch\u1ec9 \u00e1p d\u1ee5ng khi thanh to\u00e1n b\u1eb1ng ShopeePay.",
      devices: ["Android", "iOS"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461172575338496%26signature%3Dc30c5ef66813591ae63167627526b569a3bff841f64a8b78657a1bfdf3566ded%26voucherCode%3DSPPDT10A\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPDT10A%2F461172575338496%2Fc30c5ef66813591ae63167627526b569a3bff841f64a8b78657a1bfdf3566ded%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461172576419840,
      voucher_code: "SPPDT10B",
      signature:
        "602c3492e67c8e4f81e2d0d40a0d803135a8f5b32828bbfb7d3e160e1e006aad",
      use_type: 1,
      voucher_market_type: 2,
      min_spend: 19200000000,
      product_limit: true,
      percentage_claimed: 0,
      percentage_used: 10,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 0,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 200000000,
      reward_cap: 0,
      icon_hash: "3aa6515e76eb97e19478777608398690",
      icon_text: "N\u1ea1p \u0111i\u1ec7n tho\u1ea1i",
      customised_labels: [
        { content: "N\u1ea1p \u0111i\u1ec7n tho\u1ea1i", color: null },
        { content: "V\u00ed ShopeePay", color: null },
      ],
      customised_product_scope_tags: [],
      shop_id: 0,
      dp_category_name: "N\u1ea1p th\u1ebb \u0026 D\u1ecbch v\u1ee5",
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "DP-A9E5494988A0A0280000000144051455",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 200000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 SPPDT10B Gi\u1ea3m ngay 2000\u0110 cho \u0111\u01a1n t\u1eeb 192000\u0110. HSD: 31/10/2022 23:59. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n! M\u00e3 ch\u1ec9 \u00e1p d\u1ee5ng khi thanh to\u00e1n b\u1eb1ng ShopeePay.",
      devices: ["Android", "iOS"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461172576419840%26signature%3D602c3492e67c8e4f81e2d0d40a0d803135a8f5b32828bbfb7d3e160e1e006aad%26voucherCode%3DSPPDT10B\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPDT10B%2F461172576419840%2F602c3492e67c8e4f81e2d0d40a0d803135a8f5b32828bbfb7d3e160e1e006aad%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461172583858176,
      voucher_code: "SPPDT10E",
      signature:
        "4492b9bb6075174df7532a6b9d7391f5a83ea20e9e425cc8824134c80d3b2e0e",
      use_type: 1,
      voucher_market_type: 2,
      min_spend: 97500000000,
      product_limit: true,
      percentage_claimed: 0,
      percentage_used: 0,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 0,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 500000000,
      reward_cap: 0,
      icon_hash: "3aa6515e76eb97e19478777608398690",
      icon_text: "N\u1ea1p \u0111i\u1ec7n tho\u1ea1i",
      customised_labels: [
        { content: "N\u1ea1p \u0111i\u1ec7n tho\u1ea1i", color: null },
        { content: "V\u00ed ShopeePay", color: null },
      ],
      customised_product_scope_tags: [],
      shop_id: 0,
      dp_category_name: "N\u1ea1p th\u1ebb \u0026 D\u1ecbch v\u1ee5",
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "DP-03F0084CC8A0A0280000000144051455",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 500000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 SPPDT10E Gi\u1ea3m ngay 5000\u0110 cho \u0111\u01a1n t\u1eeb 975000\u0110. HSD: 31/10/2022 23:59. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n! M\u00e3 ch\u1ec9 \u00e1p d\u1ee5ng khi thanh to\u00e1n b\u1eb1ng ShopeePay.",
      devices: ["Android", "iOS"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461172583858176%26signature%3D4492b9bb6075174df7532a6b9d7391f5a83ea20e9e425cc8824134c80d3b2e0e%26voucherCode%3DSPPDT10E\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPDT10E%2F461172583858176%2F4492b9bb6075174df7532a6b9d7391f5a83ea20e9e425cc8824134c80d3b2e0e%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461172584529920,
      voucher_code: "SPPDT10C",
      signature:
        "89d83b1f51d26391be38fd6f47c102b221d18a885651614bf0bb864e466da19f",
      use_type: 1,
      voucher_market_type: 2,
      min_spend: 28800000000,
      product_limit: true,
      percentage_claimed: 0,
      percentage_used: 2,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 0,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 300000000,
      reward_cap: 0,
      icon_hash: "3aa6515e76eb97e19478777608398690",
      icon_text: "N\u1ea1p \u0111i\u1ec7n tho\u1ea1i",
      customised_labels: [
        { content: "N\u1ea1p \u0111i\u1ec7n tho\u1ea1i", color: null },
        { content: "V\u00ed ShopeePay", color: null },
      ],
      customised_product_scope_tags: [],
      shop_id: 0,
      dp_category_name: "N\u1ea1p th\u1ebb \u0026 D\u1ecbch v\u1ee5",
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "DP-03F00918D8A0A0280000000144051455",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 300000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 SPPDT10C Gi\u1ea3m ngay 3000\u0110 cho \u0111\u01a1n t\u1eeb 288000\u0110. HSD: 31/10/2022 23:59. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n! M\u00e3 ch\u1ec9 \u00e1p d\u1ee5ng khi thanh to\u00e1n b\u1eb1ng ShopeePay.",
      devices: ["Android", "iOS"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461172584529920%26signature%3D89d83b1f51d26391be38fd6f47c102b221d18a885651614bf0bb864e466da19f%26voucherCode%3DSPPDT10C\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPDT10C%2F461172584529920%2F89d83b1f51d26391be38fd6f47c102b221d18a885651614bf0bb864e466da19f%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461172585037824,
      voucher_code: "SPPDT10D",
      signature:
        "604dece3b6131efe7b06525d866376f6387ae14ad74ead4818f6c4b88fd9f3fe",
      use_type: 1,
      voucher_market_type: 2,
      min_spend: 48000000000,
      product_limit: true,
      percentage_claimed: 0,
      percentage_used: 2,
      start_time: 1664557200,
      end_time: 1667235540,
      claim_start_time: 0,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 400000000,
      reward_cap: 0,
      icon_hash: "3aa6515e76eb97e19478777608398690",
      icon_text: "N\u1ea1p \u0111i\u1ec7n tho\u1ea1i",
      customised_labels: [
        { content: "N\u1ea1p \u0111i\u1ec7n tho\u1ea1i", color: null },
        { content: "V\u00ed ShopeePay", color: null },
      ],
      customised_product_scope_tags: [],
      shop_id: 0,
      dp_category_name: "N\u1ea1p th\u1ebb \u0026 D\u1ecbch v\u1ee5",
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "DP-03F00958C8A0A0280000000144051455",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 400000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 SPPDT10D Gi\u1ea3m ngay 4000\u0110 cho \u0111\u01a1n t\u1eeb 480000\u0110. HSD: 31/10/2022 23:59. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n! M\u00e3 ch\u1ec9 \u00e1p d\u1ee5ng khi thanh to\u00e1n b\u1eb1ng ShopeePay.",
      devices: ["Android", "iOS"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461172585037824%26signature%3D604dece3b6131efe7b06525d866376f6387ae14ad74ead4818f6c4b88fd9f3fe%26voucherCode%3DSPPDT10D\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPDT10D%2F461172585037824%2F604dece3b6131efe7b06525d866376f6387ae14ad74ead4818f6c4b88fd9f3fe%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 459032834326528,
      voucher_code: "ELSSCB300",
      signature:
        "3539adddd7130f6e3b1b45c9152ff22e077405f8b06fcae3d8834dadb9be1f3d",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 250000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 34,
      start_time: 1664902800,
      end_time: 1665421140,
      claim_start_time: 1664182800,
      valid_days: 0,
      reward_type: 1,
      reward_percentage: 100,
      reward_cap: 300000,
      icon_hash: "01ad529d780769c418b225c96cb8a3d7",
      icon_text: "\u0110i\u1ec7n T\u1eed",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-74CBAA9DD0A0A0280000000144011550",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      coin_percentage: 100,
      coin_cap: 300000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 ELSSCB300 ho\u00e0n t\u1ed1i \u0111a 300000 xu cho \u0111\u01a1n t\u1eeb 2.5 Tri\u1ec7u. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. HSD: 10/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n!",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D459032834326528%26signature%3D3539adddd7130f6e3b1b45c9152ff22e077405f8b06fcae3d8834dadb9be1f3d%26voucherCode%3DELSSCB300\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FELSSCB300%2F459032834326528%2F3539adddd7130f6e3b1b45c9152ff22e077405f8b06fcae3d8834dadb9be1f3d%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 462034068422656,
      voucher_code: "LIFESBC10K10",
      signature:
        "16fc930587317302130c6d5994b8f067ef1d6bd56322b2322d44fd2ca6a86ab7",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 5000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 51,
      start_time: 1664989200,
      end_time: 1667235540,
      claim_start_time: 1664542800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 1000000000,
      reward_cap: 0,
      icon_hash: "6e70b40b396c4e0cf5d62646a0c63964",
      icon_text: "Book Club",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-C528C89B78A0A0280000000144100515",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 1000000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 LIFESBC10K10 gi\u1ea3m 10K cho \u0111\u01a1n t\u1eeb 50K. H\u1ea1n s\u1eed d\u1ee5ng: 23:59 ph\u00fat, 31/10/2022. M\u00e3 ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng cho th\u00e0nh vi\u00ean Shopee Book Club. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D462034068422656%26signature%3D16fc930587317302130c6d5994b8f067ef1d6bd56322b2322d44fd2ca6a86ab7%26voucherCode%3DLIFESBC10K10\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FLIFESBC10K10%2F462034068422656%2F16fc930587317302130c6d5994b8f067ef1d6bd56322b2322d44fd2ca6a86ab7%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 462034068504576,
      voucher_code: "LIFESBC30K10",
      signature:
        "a5479cda377ce323d9cc11236262776cad843f0dbe52307a1f111b3b46777f67",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 9900000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 56,
      start_time: 1664989200,
      end_time: 1667235540,
      claim_start_time: 1664542800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 12,
      reward_value: 0,
      reward_cap: 3000000000,
      icon_hash: "6e70b40b396c4e0cf5d62646a0c63964",
      icon_text: "Book Club",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-C528C89F28A0A0280000000144100515",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 12,
      discount_cap: 3000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 LIFESBC30K10 gi\u1ea3m 12% t\u1ed1i \u0111a 30K cho \u0111\u01a1n t\u1eeb 99K. H\u1ea1n s\u1eed d\u1ee5ng: 23:59 ph\u00fat, 31/10/2022. M\u00e3 ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng cho th\u00e0nh vi\u00ean Shopee Book Club. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D462034068504576%26signature%3Da5479cda377ce323d9cc11236262776cad843f0dbe52307a1f111b3b46777f67%26voucherCode%3DLIFESBC30K10\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FLIFESBC30K10%2F462034068504576%2Fa5479cda377ce323d9cc11236262776cad843f0dbe52307a1f111b3b46777f67%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465384973762560,
      voucher_code: "VISA50",
      signature:
        "5ef79c930ff91b6e89d7e4549f4b3f7f913b62f99d17170a56c058ae52d744d0",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 0,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 8,
      start_time: 1664989200,
      end_time: 1672505940,
      claim_start_time: 1664938800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 5000000000,
      reward_cap: 0,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-5C0E8A6F4AA0A0280000000144151005",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 5000000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1672505940,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 VISA50 gi\u1ea3m 50K cho \u0111\u01a1n h\u00e0ng t\u1eeb 0\u0110 thanh to\u00e1n b\u1eb1ng th\u1ebb qu\u1ed1c t\u1ebf Visa tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 23h59 ng\u00e0y 31/12/2022. M\u00e3 c\u00f3 s\u1ed1 l\u01b0\u1ee3ng gi\u1edbi h\u1ea1n. \u00c1p d\u1ee5ng m\u1ed9t s\u1ed1 ng\u01b0\u1eddi d\u00f9ng nh\u1ea5t \u0111\u1ecbnh tham gia ch\u01b0\u01a1ng tr\u00ecnh. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n.",
      devices: ["iOS", "Android"],
      force_new_user: 1,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465384973762560%26signature%3D5ef79c930ff91b6e89d7e4549f4b3f7f913b62f99d17170a56c058ae52d744d0%26voucherCode%3DVISA50\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FVISA50%2F465384973762560%2F5ef79c930ff91b6e89d7e4549f4b3f7f913b62f99d17170a56c058ae52d744d0%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461882395426832,
      voucher_code: "FAMALLFF10",
      signature:
        "6f71f808069718c11138953b4bd46d7b9c6c75d9e512368df6f799d33a4d2841",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 30000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 60,
      start_time: 1665075600,
      end_time: 1667235540,
      claim_start_time: 1664524800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 8,
      reward_value: 0,
      reward_cap: 5000000000,
      icon_hash: "aa73f8aa302834aa9fc6adbf6e704cf2",
      icon_text: "Th\u1eddi Trang",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: true,
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "MP-140A2B4768A0A1280000000144100110",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 8,
      discount_cap: 5000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 \u00e1p d\u1ee5ng m\u1ed9t s\u1ed1 s\u1ea3n ph\u1ea9m TH\u1edcI TRANG Shopee Mall ch\u1ecdn l\u1ecdc tr\u00ean \u1ee9ng d\u1ee5ng Shopee.\n M\u00e3 FAMALLFF10 gi\u1ea3m 8% t\u1ed1i \u0111a 50K \u0111\u01a1n t\u1eeb 300K. H\u1ea1n s\u1eed d\u1ee5ng: [23h59, 31/10/2022]\n M\u1ed7i ng\u01b0\u1eddi ch\u1ec9 s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n.\n S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461882395426832%26signature%3D6f71f808069718c11138953b4bd46d7b9c6c75d9e512368df6f799d33a4d2841%26voucherCode%3DFAMALLFF10\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FFAMALLFF10%2F461882395426832%2F6f71f808069718c11138953b4bd46d7b9c6c75d9e512368df6f799d33a4d2841%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 466883892494336,
      voucher_code: "SPPSE10",
      signature:
        "9ea0489476fc21ce200c82436a55f880e5ffae420e98956cd3ae7e8dce32e1c8",
      use_type: 1,
      voucher_market_type: 2,
      min_spend: 0,
      product_limit: true,
      percentage_claimed: 0,
      percentage_used: 4,
      start_time: 1665116400,
      end_time: 1667235540,
      claim_start_time: 0,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 3,
      reward_value: 0,
      reward_cap: 200000000,
      icon_hash: "73ab7e4f9d770ccfd2f8b786d29bad81",
      icon_text: "M\u00e3 gi\u1ea3m gi\u00e1",
      customised_labels: [
        { content: "M\u00e3 gi\u1ea3m gi\u00e1", color: null },
        { content: "V\u00ed ShopeePay", color: null },
      ],
      customised_product_scope_tags: [],
      shop_id: 0,
      dp_category_name: "E-voucher",
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "DP-D40AE922BAA0A0280000000144404400",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 3,
      discount_cap: 200000000,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 SPPSE10 Gi\u1ea3m 3% t\u1ed1i \u0111a 2000 cho \u0111\u01a1n t\u1eeb 0\u0111. HSD: 31/10/2022 23:59. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n! M\u00e3 ch\u1ec9 \u00e1p d\u1ee5ng khi thanh to\u00e1n b\u1eb1ng ShopeePay.",
      devices: ["Android", "iOS"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D466883892494336%26signature%3D9ea0489476fc21ce200c82436a55f880e5ffae420e98956cd3ae7e8dce32e1c8%26voucherCode%3DSPPSE10\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPSE10%2F466883892494336%2F9ea0489476fc21ce200c82436a55f880e5ffae420e98956cd3ae7e8dce32e1c8%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465608497004544,
      voucher_code: "FMCGMALL",
      signature:
        "ad446377fa7a2bcef32c93a88ab46dc33ffb54483ce6601298afef7c50316671",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 25000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 76,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1664967600,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 8,
      reward_value: 0,
      reward_cap: 8000000000,
      icon_hash: "ba1cabf8ab4ac260f4ed089ae595b285",
      icon_text: "FMCGMALL",
      customised_labels: [{ content: "Mall", color: null }],
      customised_product_scope_tags: [],
      shop_id: 0,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-76DB8989CAA0A0280000000144151515",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 8,
      discount_cap: 8000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 FMCGMALL gi\u1ea3m 8% t\u1ed1i \u0111a 80000\u0110 cho \u0111\u01a1n t\u1eeb 250000\u0110. HSD: 23:59 10/10/2022. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n. \u00c1p d\u1ee5ng cho m\u1ed9t s\u1ed1 ng\u01b0\u1eddi d\u00f9ng nh\u1ea5t \u0111\u1ecbnh",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465608497004544%26signature%3Dad446377fa7a2bcef32c93a88ab46dc33ffb54483ce6601298afef7c50316671%26voucherCode%3DFMCGMALL\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FFMCGMALL%2F465608497004544%2Fad446377fa7a2bcef32c93a88ab46dc33ffb54483ce6601298afef7c50316671%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465807290007552,
      voucher_code: "CCBSPIKEL1010",
      signature:
        "af6663c4b0ab9e1f4c5d331de94c4d140f832f84c0a9168ba03dae6d3b531866",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 0,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 96,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1665248400,
      valid_days: 0,
      reward_type: 1,
      reward_percentage: 8,
      reward_cap: 100000,
      use_link: "https://shopee.vn/collections/721474",
      icon_hash: "a6ff372c86c4e242c76fb75f65ae7579",
      icon_text: "To\u00e0n Ng\u00e0nh H\u00e0ng",
      customised_labels: [],
      customised_product_scope_tags: [""],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-0F3C20F68AA0A0280000000144154414",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      coin_percentage: 8,
      coin_cap: 100000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      customised_product_scope_tag_image_hash:
        "ad2dd06f75d7ce33662a4a74041fa27a",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 CCBSPIKEL1010 ho\u00e0n 8% t\u1ed1i \u0111a 100K Xu cho \u0111\u01a1n h\u00e0ng h\u1ee3p l\u1ec7 t\u1eeb 0\u0110 t\u1eeb shop Ho\u00e0n Xu Xtra tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 10/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n. M\u1ed7i kh\u00e1ch h\u00e0ng ch\u1ec9 s\u1eed d\u1ee5ng 1 l\u1ea7n. S\u1ed1 Shopee Xu ho\u00e0n \u0111\u01b0\u1ee3c t\u00ednh tr\u00ean gi\u00e1 tr\u1ecb \u0111\u01a1n h\u00e0ng (sau khi tr\u1eeb khuy\u1ebfn m\u00e3i, s\u1ed1 Shopee Xu v\u00e0 kh\u00f4ng bao g\u1ed3m ph\u00ed v\u1eadn chuy\u1ec3n).",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465807290007552%26signature%3Daf6663c4b0ab9e1f4c5d331de94c4d140f832f84c0a9168ba03dae6d3b531866%26voucherCode%3DCCBSPIKEL1010\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FCCBSPIKEL1010%2F465807290007552%2Faf6663c4b0ab9e1f4c5d331de94c4d140f832f84c0a9168ba03dae6d3b531866%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465376116211728,
      voucher_code: "BMINC50",
      signature:
        "407e0697ef14fae8ac940989440dca6f76c1c8914cb58fbe754dc43cc83e56e3",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 9900000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 89,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1664730000,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 10,
      reward_value: 0,
      reward_cap: 5000000000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-5926836A0AA0A1280000000144151001",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 10,
      discount_cap: 5000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 BMINC50 gi\u1ea3m 10% t\u1ed1i \u0111a 50000 cho \u0111\u01a1n t\u1eeb 99000. HSD: 10/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n!",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465376116211728%26signature%3D407e0697ef14fae8ac940989440dca6f76c1c8914cb58fbe754dc43cc83e56e3%26voucherCode%3DBMINC50\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FBMINC50%2F465376116211728%2F407e0697ef14fae8ac940989440dca6f76c1c8914cb58fbe754dc43cc83e56e3%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465376124600320,
      voucher_code: "BMLTA50",
      signature:
        "a6da071a42f1cf99b8949b1db559ee32aa7b7f62548d26da860f6f1600160858",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 9900000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 64,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1664730000,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 10,
      reward_value: 0,
      reward_cap: 5000000000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-D926C36A0AA0A0280000000144151001",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 10,
      discount_cap: 5000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 BMLTA50 gi\u1ea3m 10% t\u1ed1i \u0111a 50000 cho \u0111\u01a1n t\u1eeb 99000. HSD: 10/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n!",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465376124600320%26signature%3Da6da071a42f1cf99b8949b1db559ee32aa7b7f62548d26da860f6f1600160858%26voucherCode%3DBMLTA50\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FBMLTA50%2F465376124600320%2Fa6da071a42f1cf99b8949b1db559ee32aa7b7f62548d26da860f6f1600160858%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465376140558352,
      voucher_code: "BMLT300",
      signature:
        "7559d1b7d994f59bc852900897b979bbb4dbb054fe0afadbb07d67b981d0bf94",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 49900000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 66,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1664730000,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 10,
      reward_value: 0,
      reward_cap: 30000000000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-F927C26F4AA0A1280000000144151001",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 10,
      discount_cap: 30000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 BMLT300 gi\u1ea3m 10% t\u1ed1i \u0111a 300000 cho \u0111\u01a1n t\u1eeb 499000. HSD: 10/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n!",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465376140558352%26signature%3D7559d1b7d994f59bc852900897b979bbb4dbb054fe0afadbb07d67b981d0bf94%26voucherCode%3DBMLT300\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FBMLT300%2F465376140558352%2F7559d1b7d994f59bc852900897b979bbb4dbb054fe0afadbb07d67b981d0bf94%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465376140558336,
      voucher_code: "INCU300",
      signature:
        "c3c975559b52d0e0cf87b6b3f394d796dc0c1c0a2dffb125c4b36ed56861b7ce",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 49900000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 64,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1664730000,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 10,
      reward_value: 0,
      reward_cap: 30000000000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-F927C26F4AA0A0280000000144151001",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 10,
      discount_cap: 30000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 INCU300 gi\u1ea3m 10% t\u1ed1i \u0111a 300000 cho \u0111\u01a1n t\u1eeb 499000. HSD: 10/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n!",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465376140558336%26signature%3Dc3c975559b52d0e0cf87b6b3f394d796dc0c1c0a2dffb125c4b36ed56861b7ce%26voucherCode%3DINCU300\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FINCU300%2F465376140558336%2Fc3c975559b52d0e0cf87b6b3f394d796dc0c1c0a2dffb125c4b36ed56861b7ce%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465376116211712,
      voucher_code: "BMLTM50",
      signature:
        "e8ee33c6671eb70a7f2247243670972e26f33412cd23597e1ce9ca7424e86c25",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 9900000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 84,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1664730000,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 10,
      reward_value: 0,
      reward_cap: 5000000000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-5926836A0AA0A0280000000144151001",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 10,
      discount_cap: 5000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 BMLTM50 gi\u1ea3m 10% t\u1ed1i \u0111a 50000 cho \u0111\u01a1n t\u1eeb 99000. HSD: 10/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n!",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465376116211712%26signature%3De8ee33c6671eb70a7f2247243670972e26f33412cd23597e1ce9ca7424e86c25%26voucherCode%3DBMLTM50\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FBMLTM50%2F465376116211712%2Fe8ee33c6671eb70a7f2247243670972e26f33412cd23597e1ce9ca7424e86c25%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465376132431872,
      voucher_code: "BMLTM300",
      signature:
        "9e59d354dc44eaee1c16095de6425dc9592c46e609d4ea7b12d1a50457e68f7b",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 49900000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 86,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1664730000,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 10,
      reward_value: 0,
      reward_cap: 30000000000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-7927827F4AA0A0280000000144151001",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 10,
      discount_cap: 30000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 BMLTM300 gi\u1ea3m 10% t\u1ed1i \u0111a 300000 cho \u0111\u01a1n t\u1eeb 499000. HSD: 10/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n!",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465376132431872%26signature%3D9e59d354dc44eaee1c16095de6425dc9592c46e609d4ea7b12d1a50457e68f7b%26voucherCode%3DBMLTM300\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FBMLTM300%2F465376132431872%2F9e59d354dc44eaee1c16095de6425dc9592c46e609d4ea7b12d1a50457e68f7b%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465627388575744,
      voucher_code: "FMCGHOT1",
      signature:
        "89641b35a605dd839f56129d21d3d38919116114d532e816be6956ec6ba073a9",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 60000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 58,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1665334800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 10,
      reward_value: 0,
      reward_cap: 9000000000,
      icon_hash: "ba1cabf8ab4ac260f4ed089ae595b285",
      icon_text: "FMCGHOT1",
      customised_labels: [{ content: "Mall", color: null }],
      customised_product_scope_tags: [],
      shop_id: 0,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-39272BC88AA0A0280000000144151550",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 10,
      discount_cap: 9000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 FMCGHOT1 gi\u1ea3m 10% t\u1ed1i \u0111a 90000\u0110 cho \u0111\u01a1n t\u1eeb 600000\u0110. HSD: 23:59 10/10/2022. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465627388575744%26signature%3D89641b35a605dd839f56129d21d3d38919116114d532e816be6956ec6ba073a9%26voucherCode%3DFMCGHOT1\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FFMCGHOT1%2F465627388575744%2F89641b35a605dd839f56129d21d3d38919116114d532e816be6956ec6ba073a9%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465807281455104,
      voucher_code: "CCBSPIKEH1010",
      signature:
        "a7fa5ffb31c8da33c616a9a0094290016a17c1f2b6b53a7661efcd082669179f",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 40000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 97,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1665248400,
      valid_days: 0,
      reward_type: 1,
      reward_percentage: 8,
      reward_cap: 200000,
      use_link: "https://shopee.vn/collections/781516",
      icon_hash: "a6ff372c86c4e242c76fb75f65ae7579",
      icon_text: "To\u00e0n Ng\u00e0nh H\u00e0ng",
      customised_labels: [],
      customised_product_scope_tags: [""],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-A73960E7CAA0A0280000000144154414",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      coin_percentage: 8,
      coin_cap: 200000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      customised_product_scope_tag_image_hash:
        "ad2dd06f75d7ce33662a4a74041fa27a",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 CCBSPIKEH1010 ho\u00e0n 8% t\u1ed1i \u0111a 200K Xu cho \u0111\u01a1n h\u00e0ng h\u1ee3p l\u1ec7 t\u1eeb 400K t\u1eeb shop Ho\u00e0n Xu Xtra tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 10/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n. M\u1ed7i kh\u00e1ch h\u00e0ng ch\u1ec9 s\u1eed d\u1ee5ng 1 l\u1ea7n. S\u1ed1 Shopee Xu ho\u00e0n \u0111\u01b0\u1ee3c t\u00ednh tr\u00ean gi\u00e1 tr\u1ecb \u0111\u01a1n h\u00e0ng (sau khi tr\u1eeb khuy\u1ebfn m\u00e3i, s\u1ed1 Shopee Xu v\u00e0 kh\u00f4ng bao g\u1ed3m ph\u00ed v\u1eadn chuy\u1ec3n).",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 1,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fm%2Fsan-pham-hot-nhat\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465807281455104%26signature%3Da7fa5ffb31c8da33c616a9a0094290016a17c1f2b6b53a7661efcd082669179f%26voucherCode%3DCCBSPIKEH1010\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FCCBSPIKEH1010%2F465807281455104%2Fa7fa5ffb31c8da33c616a9a0094290016a17c1f2b6b53a7661efcd082669179f%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 464768395870208,
      voucher_code: "SPPHDHT1010",
      signature:
        "1ef810fc83dee8688650ffe252a0cb3428dea065b12bb01341c3a9168ad98257",
      use_type: 0,
      voucher_market_type: 2,
      min_spend: 0,
      product_limit: true,
      quota_type: 0,
      percentage_claimed: 100,
      percentage_used: 20,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1665334800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 50,
      reward_value: 0,
      reward_cap: 5000000000,
      icon_hash: "6b1e8ce959d93f06cb2965a454f187a2",
      icon_text: "H\u00f3a \u0111\u01a1n",
      customised_labels: [
        { content: "H\u00f3a \u0111\u01a1n", color: null },
        { content: "V\u00ed ShopeePay", color: null },
      ],
      customised_product_scope_tags: [],
      shop_id: 0,
      dp_category_name: "N\u1ea1p th\u1ebb \u0026 D\u1ecbch v\u1ee5",
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "DP-39272E0FE2A0A0280000000144144510",
      fully_redeemed: true,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 50,
      discount_cap: 5000000000,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: true,
      fully_used: false,
      claim_end_time: 1665421140,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 SPPHDHT1010 Gi\u1ea3m 50% t\u1ed1i \u0111a 50000 cho \u0111\u01a1n t\u1eeb 0\u0110. HSD: 10/10/2022 23:59. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n! M\u00e3 ch\u1ec9 \u00e1p d\u1ee5ng khi thanh to\u00e1n b\u1eb1ng ShopeePay. M\u00e3 \u00e1p d\u1ee5ng tr\u00ean app cho H\u00f3a \u0111\u01a1n \u0111i\u1ec7n, H\u00f3a \u0111\u01a1n vay ti\u00eau d\u00f9ng, H\u00f3a \u0111\u01a1n Internet, H\u00f3a \u0111\u01a1n n\u01b0\u1edbc, H\u00f3a \u0111\u01a1n VNPT, H\u00f3a \u0111\u01a1n \u0110i\u1ec7n Tho\u1ea1i C\u1ed1 \u0110\u1ecbnh, H\u00f3a \u0111\u01a1n Truy\u1ec1n H\u00ecnh, H\u00f3a \u0111\u01a1n Chung C\u01b0 v\u00e0 Thanh to\u00e1n \u0111i\u1ec7n tho\u1ea1i tr\u1ea3 sau.",
      devices: ["Android", "iOS"],
      force_new_user: 0,
      is_banner: 1,
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fm%2Fsieu-sale-chinh-hang\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D464768395870208%26signature%3D1ef810fc83dee8688650ffe252a0cb3428dea065b12bb01341c3a9168ad98257%26voucherCode%3DSPPHDHT1010\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPHDHT1010%2F464768395870208%2F1ef810fc83dee8688650ffe252a0cb3428dea065b12bb01341c3a9168ad98257%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 464783284895744,
      voucher_code: "FAPRESP10",
      signature:
        "2995769b40c04a620ea62d2e96ed2ee055f6ef8ba09063971a3c86857c464aa8",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 100000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 0,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1665334800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 10,
      reward_value: 0,
      reward_cap: 50000000000,
      icon_hash: "bf2d5428b78d905d669e00dc5c0e584c",
      icon_text: "Th\u1eddi Trang",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-D8C6C9CAA2A0A0280000000144144515",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 10,
      discount_cap: 50000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 FAPRESP10 gi\u1ea3m ngay 10% (t\u1ed1i \u0111a 500K) cho \u0111\u01a1n h\u00e0ng t\u1eeb 1 tri\u1ec7u tr\u1edf l\u00ean tr\u00ean App. HSD: 23:59 ng\u00e0y 10/10/2022. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D464783284895744%26signature%3D2995769b40c04a620ea62d2e96ed2ee055f6ef8ba09063971a3c86857c464aa8%26voucherCode%3DFAPRESP10\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FFAPRESP10%2F464783284895744%2F2995769b40c04a620ea62d2e96ed2ee055f6ef8ba09063971a3c86857c464aa8%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465534844633088,
      voucher_code: "COSLUX1010B",
      signature:
        "2039962ef127a7abeb0687aa8ec9c4148e83857678adf30919431578c8246d53",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 200000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 6,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1664960400,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 10,
      reward_value: 0,
      reward_cap: 30000000000,
      icon_hash: "bf2d5428b78d905d669e00dc5c0e584c",
      icon_text: "M\u1ef9 Ph\u1ea9m",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-7A17A0E5CAA0A0280000000144151414",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 10,
      discount_cap: 30000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 COSLUX1010B gi\u1ea3m 10% t\u1ed1i \u0111a 300000\u0110 cho \u0111\u01a1n t\u1eeb 2000000\u0110. HSD: 23:59 10/10/2022. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465534844633088%26signature%3D2039962ef127a7abeb0687aa8ec9c4148e83857678adf30919431578c8246d53%26voucherCode%3DCOSLUX1010B\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FCOSLUX1010B%2F465534844633088%2F2039962ef127a7abeb0687aa8ec9c4148e83857678adf30919431578c8246d53%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465534844796928,
      voucher_code: "COSLUX1010A",
      signature:
        "4137833395f882dd0198c4f361d26ee6b12a776534337e97e585539b272b7d8d",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 150000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 22,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1664960400,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 15000000000,
      reward_cap: 0,
      icon_hash: "bf2d5428b78d905d669e00dc5c0e584c",
      icon_text: "M\u1ef9 Ph\u1ea9m",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-7A17A0F48AA0A0280000000144151414",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 15000000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 COSLUX1010A gi\u1ea3m t\u1ed1i \u0111a 150000\u0110 cho \u0111\u01a1n t\u1eeb 1500000\u0110. HSD: 23:59 10/10/2022. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465534844796928%26signature%3D4137833395f882dd0198c4f361d26ee6b12a776534337e97e585539b272b7d8d%26voucherCode%3DCOSLUX1010A\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FCOSLUX1010A%2F465534844796928%2F4137833395f882dd0198c4f361d26ee6b12a776534337e97e585539b272b7d8d%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 466282319937536,
      voucher_code: "TANGBAN210K",
      signature:
        "cfcc4ab7656187cf82d9daf81484a76d965640ed8899d0afe7610488c7bd47ce",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 50000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 14,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1665046800,
      valid_days: 0,
      reward_type: 1,
      reward_percentage: 5,
      reward_cap: 210000,
      icon_hash: "a6ff372c86c4e242c76fb75f65ae7579",
      icon_text: "To\u00e0n Ng\u00e0nh H\u00e0ng",
      customised_labels: [],
      customised_product_scope_tags: [""],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-5122AA476AA0A0280000000144400110",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      coin_percentage: 5,
      coin_cap: 210000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      customised_product_scope_tag_image_hash:
        "ad2dd06f75d7ce33662a4a74041fa27a",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Ch\u1ec9 \u00e1p d\u1ee5ng cho m\u1ed9t s\u1ed1 ng\u01b0\u1eddi b\u00e1n tham gia ch\u01b0\u01a1ng tr\u00ecnh Ho\u00e0n Xu Xtra. M\u00e3 TANGBAN210K ho\u00e0n 5% t\u1ed1i \u0111a 210K Xu cho \u0111\u01a1n h\u00e0ng h\u1ee3p l\u1ec7 t\u1eeb 500K tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 10/10/2022 00:00 - 10/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3t s\u1eed d\u1ee5ng c\u00f3 h\u1ea1n, ch\u01b0\u01a1ng tr\u00ecnh v\u00e0 m\u00e3 c\u00f3 th\u1ec3 k\u1ebft th\u00fac khi h\u1ebft l\u01b0\u1ee3t \u01b0u \u0111\u00e3i ho\u1eb7c khi h\u1ebft h\u1ea1n \u01b0u \u0111\u00e3i, tu\u1ef3 \u0111i\u1ec1u ki\u1ec7n n\u00e0o \u0111\u1ebfn tr\u01b0\u1edbc. S\u1ed1 Shopee Xu ho\u00e0n \u0111\u01b0\u1ee3c t\u00ednh tr\u00ean gi\u00e1 tr\u1ecb \u0111\u01a1n h\u00e0ng (sau khi tr\u1eeb khuy\u1ebfn m\u00e3i, s\u1ed1 Shopee Xu v\u00e0 kh\u00f4ng bao g\u1ed3m ph\u00ed v\u1eadn chuy\u1ec3n).",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D466282319937536%26signature%3Dcfcc4ab7656187cf82d9daf81484a76d965640ed8899d0afe7610488c7bd47ce%26voucherCode%3DTANGBAN210K\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FTANGBAN210K%2F466282319937536%2Fcfcc4ab7656187cf82d9daf81484a76d965640ed8899d0afe7610488c7bd47ce%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 466282319937552,
      voucher_code: "TANGBAN51K",
      signature:
        "8d2e70fb6b823fcfe6ac06dc6fbb93ec972f8fa63e90a4b898a43f48d44794bb",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 35000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 17,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1665046800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 5,
      reward_value: 0,
      reward_cap: 5100000000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-5122AA476AA0A1280000000144400110",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 5,
      discount_cap: 5100000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Ch\u1ec9 \u00e1p d\u1ee5ng cho m\u1ed9t s\u1ed1 ng\u01b0\u1eddi b\u00e1n tham gia ch\u01b0\u01a1ng tr\u00ecnh Ho\u00e0n Xu Xtra, Freeship Xtra, Shopee Mall. M\u00e3 TANGBAN51K gi\u1ea3m 5% t\u1ed1i \u0111a 51K cho \u0111\u01a1n h\u00e0ng h\u1ee3p l\u1ec7 t\u1eeb 350K tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 10/10/2022 00:00 - 10/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3t s\u1eed d\u1ee5ng c\u00f3 h\u1ea1n, ch\u01b0\u01a1ng tr\u00ecnh v\u00e0 m\u00e3 c\u00f3 th\u1ec3 k\u1ebft th\u00fac khi h\u1ebft l\u01b0\u1ee3t \u01b0u \u0111\u00e3i ho\u1eb7c khi h\u1ebft h\u1ea1n \u01b0u \u0111\u00e3i, tu\u1ef3 \u0111i\u1ec1u ki\u1ec7n n\u00e0o \u0111\u1ebfn tr\u01b0\u1edbc.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D466282319937552%26signature%3D8d2e70fb6b823fcfe6ac06dc6fbb93ec972f8fa63e90a4b898a43f48d44794bb%26voucherCode%3DTANGBAN51K\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FTANGBAN51K%2F466282319937552%2F8d2e70fb6b823fcfe6ac06dc6fbb93ec972f8fa63e90a4b898a43f48d44794bb%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 467133638082560,
      voucher_code: "BATREND30K1010",
      signature:
        "36f0665e92780c84127cd81e311a6210dea74f7e626c3d48f0826a64cf466b96",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 20000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 75,
      start_time: 1665334800,
      end_time: 1665421140,
      claim_start_time: 1665147600,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 8,
      reward_value: 0,
      reward_cap: 3000000000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [
        { content: "B\u1eaft Trend Deal S\u1ed1c", color: null },
      ],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-8A144AD54008A0280000000144405145",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 8,
      discount_cap: 3000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 BATREND30K1010 gi\u1ea3m 8% t\u1ed1i \u0111a 30K cho \u0111\u01a1n h\u00e0ng h\u1ee3p l\u1ec7 t\u1eeb 200K tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 10/10/2022 00:00 - 10/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n. M\u1ed7i kh\u00e1ch h\u00e0ng ch\u1ec9 s\u1eed d\u1ee5ng 1 l\u1ea7n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D467133638082560%26signature%3D36f0665e92780c84127cd81e311a6210dea74f7e626c3d48f0826a64cf466b96%26voucherCode%3DBATREND30K1010\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FBATREND30K1010%2F467133638082560%2F36f0665e92780c84127cd81e311a6210dea74f7e626c3d48f0826a64cf466b96%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461332965556224,
      voucher_code: "STANEWBUY1010",
      signature:
        "3f9068050349ad0831a0536a86af84d4214aa13e80b42ce43902a02c32b344fd",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 0,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 74,
      start_time: 1665334800,
      end_time: 1667235540,
      claim_start_time: 1665334800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 4000000000,
      reward_cap: 0,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-BD2F6A4388A0A0280000000144054110",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 4000000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1667235540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 STANEWBUY1010 gi\u1ea3m ngay 40000 cho \u0111\u01a1n h\u00e0ng 0\u0110 tr\u00ean \u1ee9ng d\u1ee5ng Shopee. H\u1ea1n s\u1eed d\u1ee5ng 23H59 31/10/2022. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461332965556224%26signature%3D3f9068050349ad0831a0536a86af84d4214aa13e80b42ce43902a02c32b344fd%26voucherCode%3DSTANEWBUY1010\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSTANEWBUY1010%2F461332965556224%2F3f9068050349ad0831a0536a86af84d4214aa13e80b42ce43902a02c32b344fd%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 469002334633984,
      voucher_code: "ELSS8",
      signature:
        "dc0506b2bc6745d9a40f20f3e801dbd889f583c62033908e634676fe0afbac9f",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 300000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 18,
      start_time: 1665372660,
      end_time: 1665853140,
      claim_start_time: 1665370800,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 8,
      reward_value: 0,
      reward_cap: 60000000000,
      icon_hash: "01ad529d780769c418b225c96cb8a3d7",
      icon_text: "\u0110i\u1ec7n T\u1eed",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-A3F16056A008A0280000000144444054",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 8,
      discount_cap: 60000000000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665853140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 ELSS8 gi\u1ea3m 8% t\u1ed1i \u0111a 600,000\u0110 cho \u0111\u01a1n t\u1eeb 3,000,000\u0110. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. HSD: 15/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n!",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D469002334633984%26signature%3Ddc0506b2bc6745d9a40f20f3e801dbd889f583c62033908e634676fe0afbac9f%26voucherCode%3DELSS8\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FELSS8%2F469002334633984%2Fdc0506b2bc6745d9a40f20f3e801dbd889f583c62033908e634676fe0afbac9f%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461315970236416,
      voucher_code: "STAADO10109",
      signature:
        "696d8069068be6c22f2872a85874123202b00f1f684e5a328b94301952c3eb77",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 15000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 0,
      start_time: 1665388800,
      end_time: 1665421140,
      claim_start_time: 1665378000,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 3000000000,
      reward_cap: 0,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-9FFE684388A0A0280000000144054100",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 3000000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 STAADO10109 gi\u1ea3m ngay 30000 cho \u0111\u01a1n h\u00e0ng 150000\u0110 tr\u00ean \u1ee9ng d\u1ee5ng Shopee. H\u1ea1n s\u1eed d\u1ee5ng 23H59 10/10/2022. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461315970236416%26signature%3D696d8069068be6c22f2872a85874123202b00f1f684e5a328b94301952c3eb77%26voucherCode%3DSTAADO10109\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSTAADO10109%2F461315970236416%2F696d8069068be6c22f2872a85874123202b00f1f684e5a328b94301952c3eb77%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 461315988226048,
      voucher_code: "STAADO101016",
      signature:
        "b3452c9aaf4be21101249194cbefd35ab3ba2c04e175a6f69713231875ff1da7",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 15000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 0,
      start_time: 1665388800,
      end_time: 1665421140,
      claim_start_time: 1665378000,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 3000000000,
      reward_cap: 0,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-BFFF6947C8A0A0280000000144054100",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 3000000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 STAADO101016 gi\u1ea3m ngay 30000 cho \u0111\u01a1n h\u00e0ng 150000\u0110 tr\u00ean \u1ee9ng d\u1ee5ng Shopee. H\u1ea1n s\u1eed d\u1ee5ng 23H59 10/10/2022. M\u1ed7i ng\u01b0\u1eddi d\u00f9ng ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng m\u00e3 1 l\u1ea7n. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D461315988226048%26signature%3Db3452c9aaf4be21101249194cbefd35ab3ba2c04e175a6f69713231875ff1da7%26voucherCode%3DSTAADO101016\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSTAADO101016%2F461315988226048%2Fb3452c9aaf4be21101249194cbefd35ab3ba2c04e175a6f69713231875ff1da7%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465534853414912,
      voucher_code: "COSLUX20H",
      signature:
        "d234979687e631c227997ae0761d78beb81a8700b7be79afcd9f201713ad0008",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 200000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 0,
      start_time: 1665406800,
      end_time: 1665421140,
      claim_start_time: 1664960400,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 50000000000,
      reward_cap: 0,
      icon_hash: "bf2d5428b78d905d669e00dc5c0e584c",
      icon_text: "M\u1ef9 Ph\u1ea9m",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-FA17E1A1CAA0A0280000000144151414",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 50000000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665421140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "Nh\u1eadp m\u00e3 COSLUX20H gi\u1ea3m t\u1ed1i \u0111a 500000\u0110 cho \u0111\u01a1n t\u1eeb 2000000\u0110. HSD: 23:59 10/10/2022. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465534853414912%26signature%3Dd234979687e631c227997ae0761d78beb81a8700b7be79afcd9f201713ad0008%26voucherCode%3DCOSLUX20H\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FCOSLUX20H%2F465534853414912%2Fd234979687e631c227997ae0761d78beb81a8700b7be79afcd9f201713ad0008%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 460445259153408,
      voucher_code: "1110HOAN40K0PH",
      signature:
        "c966be1cb04186e974a0dfc8c6ef850d91f2bd13a917995d2b88982c35140f47",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 50000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 0,
      start_time: 1665421200,
      end_time: 1665507540,
      claim_start_time: 1664355600,
      valid_days: 0,
      reward_type: 1,
      reward_percentage: 5,
      reward_cap: 40000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-521281FAB0A0A0280000000144045011",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      coin_percentage: 5,
      coin_cap: 40000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665507540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 1110HOAN40K0PH ho\u00e0n 5% t\u1ed1i \u0111a 40K Xu cho \u0111\u01a1n h\u00e0ng h\u1ee3p l\u1ec7 t\u1eeb 500K tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 11/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3t s\u1eed d\u1ee5ng c\u00f3 h\u1ea1n, ch\u01b0\u01a1ng tr\u00ecnh v\u00e0 m\u00e3 c\u00f3 th\u1ec3 k\u1ebft th\u00fac khi h\u1ebft l\u01b0\u1ee3t \u01b0u \u0111\u00e3i ho\u1eb7c khi h\u1ebft h\u1ea1n \u01b0u \u0111\u00e3i, tu\u1ef3 \u0111i\u1ec1u ki\u1ec7n n\u00e0o \u0111\u1ebfn tr\u01b0\u1edbc.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D460445259153408%26signature%3Dc966be1cb04186e974a0dfc8c6ef850d91f2bd13a917995d2b88982c35140f47%26voucherCode%3D1110HOAN40K0PH\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2F1110HOAN40K0PH%2F460445259153408%2Fc966be1cb04186e974a0dfc8c6ef850d91f2bd13a917995d2b88982c35140f47%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 460445267083280,
      voucher_code: "1110MALL50K0PH",
      signature:
        "4a45ef3b4ed6ab7b7f7e0cbe854126bc55ff7132384af1c770bccb845543b032",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 25000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 0,
      start_time: 1665421200,
      end_time: 1665507540,
      claim_start_time: 1664355600,
      valid_days: 0,
      reward_type: 1,
      reward_percentage: 5,
      reward_cap: 50000,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: true,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-D212C1BBB0A0A1280000000144045011",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      coin_percentage: 5,
      coin_cap: 50000,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665507540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 1110MALL50K0PH ho\u00e0n 5% t\u1ed1i \u0111a 50K Xu cho \u0111\u01a1n h\u00e0ng h\u1ee3p l\u1ec7 t\u1eeb 250K tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 11/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3t s\u1eed d\u1ee5ng c\u00f3 h\u1ea1n, ch\u01b0\u01a1ng tr\u00ecnh v\u00e0 m\u00e3 c\u00f3 th\u1ec3 k\u1ebft th\u00fac khi h\u1ebft l\u01b0\u1ee3t \u01b0u \u0111\u00e3i ho\u1eb7c khi h\u1ebft h\u1ea1n \u01b0u \u0111\u00e3i, tu\u1ef3 \u0111i\u1ec1u ki\u1ec7n n\u00e0o \u0111\u1ebfn tr\u01b0\u1edbc.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D460445267083280%26signature%3D4a45ef3b4ed6ab7b7f7e0cbe854126bc55ff7132384af1c770bccb845543b032%26voucherCode%3D1110MALL50K0PH\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2F1110MALL50K0PH%2F460445267083280%2F4a45ef3b4ed6ab7b7f7e0cbe854126bc55ff7132384af1c770bccb845543b032%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 460445342580752,
      voucher_code: "1110GIAM10K0PH",
      signature:
        "87e354e33db4f03c94ff5a6a783f97c7cdf9773e198fb1d10fac98820f2e816e",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 15000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 0,
      start_time: 1665421200,
      end_time: 1665507540,
      claim_start_time: 1664355600,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 0,
      reward_value: 1000000000,
      reward_cap: 0,
      icon_hash: "e6a3b7beffa95ca492926978d5235f79",
      icon_text: "SHOPEE",
      customised_labels: [],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: false,
      customer_reference_id: "MP-70C381BBB0A0A1280000000144045011",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 1000000000,
      discount_percentage: 0,
      discount_cap: 0,
      shopee_wallet_only: false,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1665507540,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 1110GIAM10K0PH gi\u1ea3m t\u1ed1i \u0111a 10K cho \u0111\u01a1n h\u00e0ng h\u1ee3p l\u1ec7 t\u1eeb 150K tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 11/10/2022 23:59. S\u1ed1 l\u01b0\u1ee3t s\u1eed d\u1ee5ng c\u00f3 h\u1ea1n, ch\u01b0\u01a1ng tr\u00ecnh v\u00e0 m\u00e3 c\u00f3 th\u1ec3 k\u1ebft th\u00fac khi h\u1ebft l\u01b0\u1ee3t \u01b0u \u0111\u00e3i ho\u1eb7c khi h\u1ebft h\u1ea1n \u01b0u \u0111\u00e3i, tu\u1ef3 \u0111i\u1ec1u ki\u1ec7n n\u00e0o \u0111\u1ebfn tr\u01b0\u1edbc.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D460445342580752%26signature%3D87e354e33db4f03c94ff5a6a783f97c7cdf9773e198fb1d10fac98820f2e816e%26voucherCode%3D1110GIAM10K0PH\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2F1110GIAM10K0PH%2F460445342580752%2F87e354e33db4f03c94ff5a6a783f97c7cdf9773e198fb1d10fac98820f2e816e%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465569196802048,
      voucher_code: "SPPP2OCTMBS80K",
      signature:
        "e7a67b5c7b453cdb497f14f995bce27f6250c5e72368ef86079554c41132efe3",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 8000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 0,
      start_time: 1665421200,
      end_time: 1666285140,
      claim_start_time: 1664989200,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 10,
      reward_value: 0,
      reward_cap: 800000000,
      use_link: "https://shopee.vn/m/shopeepay",
      icon_hash: "512a3920bbf6de315b98e799a8caf6c0",
      icon_text: "ShopeePay",
      customised_labels: [{ content: "V\u00ed ShopeePay", color: null }],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "MP-DA16E1488AA0A0280000000144151454",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 10,
      discount_cap: 800000000,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1666285140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 SPPP2OCTMBS80K gi\u1ea3m 10% t\u1ed1i \u0111a 8K cho \u0111\u01a1n h\u00e0ng Shopee h\u1ee3p l\u1ec7 t\u1eeb 80K tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 20/10/2022 23:59. \u00c1p d\u1ee5ng khi thanh to\u00e1n ShopeePay. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n. M\u1ed7i kh\u00e1ch h\u00e0ng ch\u1ec9 s\u1eed d\u1ee5ng 1 l\u1ea7n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465569196802048%26signature%3De7a67b5c7b453cdb497f14f995bce27f6250c5e72368ef86079554c41132efe3%26voucherCode%3DSPPP2OCTMBS80K\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPP2OCTMBS80K%2F465569196802048%2Fe7a67b5c7b453cdb497f14f995bce27f6250c5e72368ef86079554c41132efe3%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
    {
      promotionid: 465569196802064,
      voucher_code: "SPPP2OCTGMV50K",
      signature:
        "357daae61436d4c00c1637724e67dccd1106309e19bb2f94226d57583046022a",
      use_type: 0,
      voucher_market_type: 1,
      min_spend: 40000000000,
      product_limit: true,
      quota_type: 1,
      percentage_claimed: 0,
      percentage_used: 0,
      start_time: 1665421200,
      end_time: 1666285140,
      claim_start_time: 1664989200,
      valid_days: 0,
      reward_type: 0,
      reward_percentage: 5,
      reward_value: 0,
      reward_cap: 4000000000,
      use_link: "https://shopee.vn/m/shopeepay",
      icon_hash: "512a3920bbf6de315b98e799a8caf6c0",
      icon_text: "ShopeePay",
      customised_labels: [{ content: "V\u00ed ShopeePay", color: null }],
      customised_product_scope_tags: [],
      shop_id: 0,
      is_shop_preferred: false,
      is_shop_official: false,
      display_labels: [],
      wallet_redeemable: true,
      customer_reference_id: "MP-DA16E1488AA0A1280000000144151454",
      fully_redeemed: false,
      has_expired: false,
      disabled: false,
      discount_value: 0,
      discount_percentage: 5,
      discount_cap: 4000000000,
      shopee_wallet_only: true,
      description:
        "Phi\u00ean b\u1ea3n \u1ee8ng d\u1ee5ng Shopee b\u1ea1n \u0111ang s\u1eed d\u1ee5ng kh\u00f4ng h\u1ed7 tr\u1ee3 trang n\u00e0y. Vui l\u00f2ng c\u1eadp nh\u1eadt phi\u00ean b\u1ea3n m\u1edbi nh\u1ea5t c\u1ee7a \u1ee9ng d\u1ee5ng.",
      distributed_labels: [],
      has_pre_excluded_products: false,
      fully_claimed: false,
      fully_used: false,
      claim_end_time: 1666285140,
      reminder_pn_setting: 3,
      valid_duration: { value_in_secs: 0, type: 0 },
      voucher_landing_page: 0,
      shop_order_count: 0,
      created_by: 0,
      usage_terms:
        "M\u00e3 SPPP2OCTGMV50K gi\u1ea3m 5% t\u1ed1i \u0111a 40K cho \u0111\u01a1n h\u00e0ng Shopee h\u1ee3p l\u1ec7 t\u1eeb 400K tr\u00ean \u1ee9ng d\u1ee5ng Shopee. HSD: 20/10/2022 23:59. \u00c1p d\u1ee5ng khi thanh to\u00e1n ShopeePay. S\u1ed1 l\u01b0\u1ee3ng c\u00f3 h\u1ea1n. M\u1ed7i kh\u00e1ch h\u00e0ng ch\u1ec9 s\u1eed d\u1ee5ng 1 l\u1ea7n.",
      devices: ["iOS", "Android"],
      force_new_user: 0,
      is_banner: 0,
      custom_badge: [],
      banner_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn\u0026mo_source=shopee_voucher",
      search_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fsearch%3FpromotionId%3D465569196802064%26signature%3D357daae61436d4c00c1637724e67dccd1106309e19bb2f94226d57583046022a%26voucherCode%3DSPPP2OCTGMV50K\u0026mo_source=shopee_voucher",
      detail_link:
        "https://rutgon.me/v1/6MFvSIlDSWRFZPJJu_ek95d2plMN8ThA1roWQ0RRLlI?url=https%3A%2F%2Fshopee.vn%2Fvoucher-details%2FSPPP2OCTGMV50K%2F465569196802064%2F357daae61436d4c00c1637724e67dccd1106309e19bb2f94226d57583046022a%3Faction%3Dokay%26source%3D0\u0026mo_source=shopee_voucher",
    },
  ];
  let moVoucherCate = [
    ...new Set(
      moVouchersData.map((item) => {
        return item.icon_text;
      })
    ),
  ];
  let moOrderType = localStorage.getItem("mo-voucher-order-type") || "desc";
  let moPriority = localStorage.getItem("mo--voucher-priority") || "fixed";
  let delay = 300;
  document.getElementById("select-order-type").value = moOrderType;
  document.getElementById("select-priority").value = moPriority;
  moVouchersData = dynamicSort(moVouchersData, moOrderType, moPriority);
  let pagination = {
    block: "tat-ca",
    pageSize: 10,
    currentPage: 1,
    totalVouchers: moVouchersData.length,
  };
  setPaginationTitle(pagination);

  if (moVouchersData.length <= 0) {
    moErrorMessage.innerHTML = "Hệ thống chưa có mã!";
  } else {
    generateVouchersTabs(moVouchersData, moOrderType, moPriority);
  }

  let isTouch = "ontouchstart" in window;
  moWrap.className += isTouch ? " touch " : " no-touch ";
  checkScreenSize();

  window.addEventListener("resize", checkScreenSize);

  let backBtnEnable = true;
  let matchedVouchers = [];

  let customSwapItemSearchVoucher = function (
    vouchersArrA = [],
    vouchersArrB = [],
    swapCates = []
  ) {
    let temp = [];
    if (swapCates.length <= 0) return;
    for (let index in vouchersArrA) {
      for (let cate in swapCates) {
        if (vouchersArrA[index] && vouchersArrA[index]["icon_text"] === "") {
          vouchersArrA[index]["icon_text"] = "SHOPEE";
        }
        if (
          swapCates[cate].trim().toLowerCase() ===
          vouchersArrA[index]["icon_text"].trim().toLowerCase()
        ) {
          temp.push(vouchersArrA[index]);
        }
      }
    }

    for (let item in temp) {
      const index = vouchersArrA.indexOf(temp[item]);
      if (index > -1) {
        vouchersArrA.splice(index, 1);
      }
      vouchersArrB.push(temp[item]);
    }
  };

  document.addEventListener(
    "click",
    function (e) {
      if (e.target.id === "cps-btn-search-voucher") {
        let moSearchUrl = moSearchInput.value.trim();
        if (moSearchUrl === "") {
          loadingBar.classList.remove("cps-show");
          loadingTitle.innerHTML = "";
          moErrorMessage.innerHTML = "Vui lòng điền link sản phẩm!";
          return false;
        }
        let parsedUrl = document.createElement("a");
        parsedUrl.href = moSearchUrl;
        if (parsedUrl.hostname !== "shopee.vn" || parsedUrl.pathname === "/") {
          loadingBar.classList.remove("cps-show");
          loadingTitle.innerHTML = "";
          moErrorMessage.innerHTML =
            "Link sản phẩm không hợp lệ. Vui lòng kiểm tra lại!";
        }

        let productParams = [];
        if (parsedUrl.pathname.indexOf("/product/") !== -1) {
          productParams = parsedUrl.pathname.split("/").slice(-2);
        } else {
          productParams = parsedUrl.pathname.split(".").slice(-2);
        }
        if (
          productParams.length < 2 ||
          !productParams[0].isNumber() ||
          !productParams[1].isNumber()
        ) {
          loadingBar.classList.remove("cps-show");
          loadingTitle.innerHTML = "";
          moErrorMessage.innerHTML =
            "Link sản phẩm không hợp lệ. Vui lòng kiểm tra lại!";
          return false;
        }
        searchBtn.disabled = true;
        backBtnEnable = false;
        moWrap.classList.toggle("cps-loading");
        loadingTitle.innerHTML = "Đang lấy danh sách mã";
        progressBar.style.display = "none";
        var requestOptions = {
          method: "GET",
          body: null,
          mode: "cors",
        };
        fetch(
          "https://promotion-api.masoffer.net/v1/promotion/get-shop-vouchers" +
            "?item_id=" +
            productParams[1] +
            "&shop_id=" +
            productParams[0] +
            "&encoded_publisher_id=" +
            "MGUYSvZ9xgl_dGJ8LUf8WA" +
            "&selectedOffer=" +
            "tiki" +
            "&domain=" +
            "rutgon.me",
          requestOptions
        )
          .then((response) => {
            return response.text();
          })
          .then((result) => {
            moErrorMessage.innerHTML = "";
            let moResponse = JSON.parse(result);
            if (moResponse && typeof moResponse["message"] !== "undefined") {
              moErrorMessage.innerHTML = moResponse["message"];
              return;
            }
            let shopVouchers = moResponse["data"]["vouchers"];
            let moProductInfo = moResponse["data"]["product_info"];
            if (moVouchersData.length + shopVouchers.length <= 0) {
              loadingBar.classList.remove("cps-show");
              loadingTitle.innerHTML = "";
              moErrorMessage.innerHTML = "Không tìm thấy mã nào phù phợp!";
              return false;
            }
            let relatedVouchers = [...moVouchersData];
            let searchedVouchers = [...shopVouchers].map((item, index) => {
              item["icon_text"] = "Mã Giảm Giá Shop";
              return item;
            });
            let promises = [];
            let loadingPercent =
              100 / (moVouchersData.length + shopVouchers.length);
            let startTime = 0;

            // Check tính khả dụng của mã giảm giá shopee
            let cateShouldCheck = ["SHOPEE"];
            moProductInfo.categories.forEach((prodCate) => {
              moVoucherCate.forEach((moCate) => {
                if (prodCate.indexOf(moCate) !== -1) {
                  cateShouldCheck.push(moCate);
                }
              });
            });

            customSwapItemSearchVoucher(
              relatedVouchers,
              searchedVouchers,
              cateShouldCheck
            );
            searchedVouchers.forEach(function (moVoucher, index) {
              startTime += delay;
              promises.push(
                checkVoucher(
                  moVoucherslist,
                  moVoucher,
                  moProductInfo,
                  loadingPercent,
                  startTime
                )
              );
            });

            Promise.all(promises)
              .then((results) => {
                matchedVouchers = results.filter((result) => result !== 0);
              })
              .then(() => {
                // Block các mã giảm giá liên quan
                if (relatedVouchers.length > 0) {
                  relatedVouchers = dynamicSort(
                    relatedVouchers,
                    moOrderType,
                    moPriority
                  );
                  generateVouchersTabs(
                    relatedVouchers,
                    moOrderType,
                    moPriority,
                    moProductInfo.aff_link,
                    "cps-vouchers-blocks",
                    true
                  );
                  pagination.block = "tat-ca";
                  pagination.currentPage = 1;
                  pagination.totalVouchers = relatedVouchers.length;
                  setPaginationTitle(pagination, "cps-vouchers-blocks");
                }

                // Block các mã giảm giá tìm thấy
                if (matchedVouchers.length > 0) {
                  document.querySelector(
                    "#cps-vouchers-searched .cps-title"
                  ).innerHTML = "Các mã giảm giá tìm thấy";
                  matchedVouchers = dynamicSort(
                    matchedVouchers,
                    moOrderType,
                    moPriority
                  );
                  generateVouchersTabs(
                    matchedVouchers,
                    moOrderType,
                    moPriority,
                    moProductInfo.aff_link,
                    "cps-vouchers-searched-blocks"
                  );
                  pagination.block = "tat-ca";
                  pagination.currentPage = 1;
                  pagination.totalVouchers = matchedVouchers.length;
                  setPaginationTitle(
                    pagination,
                    "cps-vouchers-searched-blocks"
                  );
                  loadingTitle.innerHTML =
                    "Kiểm tra hoàn tất. Tìm thấy " +
                    matchedVouchers.length +
                    " mã phù hợp";
                  backToAllBtn.classList.add("show");
                } else {
                  if (searchedVouchers.length > 0) {
                    document.querySelector(
                      "#cps-vouchers-searched .cps-title"
                    ).innerHTML = "Các mã giảm giá phù hợp";
                    searchedVouchers = dynamicSort(
                      searchedVouchers,
                      moOrderType,
                      moPriority
                    );
                    generateVouchersTabs(
                      searchedVouchers,
                      moOrderType,
                      moPriority,
                      moProductInfo.aff_link,
                      "cps-vouchers-searched-blocks"
                    );
                    pagination.block = "tat-ca";
                    pagination.currentPage = 1;
                    pagination.totalVouchers = searchedVouchers.length;
                    setPaginationTitle(
                      pagination,
                      "cps-vouchers-searched-blocks"
                    );
                    loadingTitle.innerHTML =
                      "Kiểm tra hoàn tất. Tìm thấy " +
                      searchedVouchers.length +
                      " mã phù hợp";
                    backToAllBtn.classList.add("show");
                  } else {
                    loadingTitle.innerHTML =
                      "Kiểm tra hoàn tất. Không tìm thấy mã nào phù hợp";
                  }
                }

                searchBtn.disabled = false;
                backBtnEnable = true;
                moWrap.classList.toggle("cps-loading");
                doScrolling("#cps-wrap", 200);
              });
          })
          .catch((error) => {
            moWrap.classList.toggle("cps-loading");
            searchBtn.disabled = false;
            backBtnEnable = true;
            if (error) {
              moErrorMessage.innerHTML = error;
            } else {
              moErrorMessage.innerHTML =
                "Lỗi trong quá trình check mã. Vui lòng thử lại sau!";
            }
            loadingBar.classList.remove("cps-show");
            loadingTitle.innerHTML = "";
          });
      }

      if (e.target.classList.contains("cps-btn-get-voucher")) {
        if (e.target.getAttribute("href") === "") {
          e.preventDefault();
        }
        copyVoucherCode(e.target);
      }

      if (e.target.classList.contains("cps-category-label")) {
        let currentId = e.target.dataset.id;
        let currentPaging = e.target.parentElement.nextElementSibling.id;
        removeActive("cps-category-label");
        removeActive("cps-vouchers-block");
        removeActive("cps-vouchers-page");
        e.target.classList.add("active");
        document.getElementById(currentId).classList.add("active");
        document.getElementById(currentId).children[0].classList.add("active");
        let block = document.getElementById(currentId);
        let children = block.childNodes;
        totalVouchers = 0;
        for (let i = 0; i < children.length; i++) {
          totalVouchers += children[i].childElementCount;
        }
        pagination.block = currentId;
        pagination.totalVouchers = totalVouchers;
        pagination.currentPage = 1;
        doScrolling(`#${e.target.parentElement.id}`, 200);
        setPaginationTitle(pagination, currentPaging);
      }

      if (e.target.classList.contains("cps-toggle-page")) {
        totalPage = Math.ceil(pagination.totalVouchers / pagination.pageSize);
        let step = 1;
        if (e.target.id === "cps-previous") {
          step = -1;
        }

        pagination.currentPage += step;
        if (pagination.currentPage > totalPage) {
          pagination.currentPage = 1;
        }

        if (pagination.currentPage <= 0) {
          pagination.currentPage = totalPage;
        }
        removeActive("cps-vouchers-page");
        document
          .getElementById(pagination.block + "-page-" + pagination.currentPage)
          .classList.add("active");
        setPaginationTitle(
          pagination,
          e.target.parentElement.previousElementSibling.id
        );
        doScrolling(
          `#${e.target.parentElement.previousElementSibling.previousElementSibling.id}`,
          200
        );
      }

      if (e.target.id === "cps-back-btn") {
        if (!backBtnEnable) return false;
        pagination = {
          block: "tat-ca",
          pageSize: 10,
          currentPage: 1,
          totalVouchers: moVouchersData.length,
        };
        setPaginationTitle(pagination);
        getRelatedProducts("");
        getChartHistory();

        if (moVouchersData.length <= 0) {
          moErrorMessage.innerHTML = "Chưa có mã!";
        } else {
          generateVouchersTabs(moVouchersData, moOrderType, moPriority);
        }
        matchedVouchers = [];
        backToAllBtn.classList.remove("show");
        loadingTitle.innerHTML = "";
        loadingBar.classList.remove("cps-show");
        moSearchInput.value = "";
        doScrolling("#cps-wrap", 200);
      }

      if (e.target.id === "cps-btn-setting") {
        if (!orderBlock) return false;
        orderBlock.classList.add("active");
      }

      if (e.target.classList.contains("cps-popup-confirm-button")) {
        orderBlock.classList.remove("active");
      }

      if (orderBlock.classList.contains("active")) {
        if (
          orderBlock
            .querySelector(".select-element")
            .classList.contains("select-arrow-active")
        ) {
          closeAllSelect(e.target);
        }
        if (typeof e.target) {
          popupConfirm[0].click();
        }
      }
    },
    false
  );

  document.addEventListener("scroll", () => {
    if (vouchersBlocks.offsetHeight > 500 && screen.width < 576) {
      if (
        window.scrollY >= getElementY("#cps-vouchers-blocks") &&
        window.scrollY <= getElementY("#cps-pagination") - 220
      ) {
        stickyBlock.classList.remove("unset");
        stickyBlock.classList.add("fixed");
      } else {
        stickyBlock.classList.remove("fixed");
        if (window.scrollY < getElementY("#cps-vouchers-blocks")) {
          stickyBlock.classList.add("unset");
        }
      }
    } else {
      stickyBlock.classList.remove("fixed");
      stickyBlock.classList.add("unset");
    }
  });

  document.addEventListener("paste", (e) => {
    if (e.target.id === "cps-search-url") {
      let pasteData = (e.clipboardData || window.clipboardData)
        .getData("text")
        .trim()
        .split(/[?#]/)[0];
      e.target.value = pasteData;
      getRelatedProducts(pasteData);
      getChartHistory();
      e.target.blur();
      return true;
    }
    return false;
  });

  document.addEventListener("change", (e) => {
    if (e.target.id === "cps-search-url") {
      let inputText = e.target.value.split(/[?#]/)[0];
      if (inputText !== e.target.value) {
        e.target.value = inputText;
        getRelatedProducts(inputText);
        getChartHistory();
        return false;
      }
      getRelatedProducts(inputText);
      getChartHistory();
      return true;
    }
    return false;
  });

  "cut keydown".split(" ").forEach(function (e) {
    let eventHandler = (e) => {
      let flag = e.code || e.key || e.type;
      if (e.target.id !== "cps-search-url") return;
      switch (true) {
        case flag.toLowerCase() === "backspace":
        case flag.toLowerCase() === "delete":
        case flag === "cut":
          setTimeout(() => {
            if (e.target.value === "") {
              getRelatedProducts("");
              getChartHistory();
            }
          }, 0);
          break;
        default:
          break;
      }
    };
    window.addEventListener(e, eventHandler, false);
  });

  function getRelatedProducts(url) {
    if (isValidHttpUrl(url)) {
      let parsedUrl = document.createElement("a");
      parsedUrl.href = url;
      let productParams = [];
      if (parsedUrl.pathname.indexOf("/product/") !== -1) {
        productParams = parsedUrl.pathname.split("/").slice(-2);
      } else {
        productParams = parsedUrl.pathname.split(".").slice(-2);
      }
      if (
        productParams.length < 2 ||
        !productParams[0].isNumber() ||
        !productParams[1].isNumber()
      ) {
        moErrorMessage.innerHTML =
          "Link sản phẩm không hợp lệ. Vui lòng kiểm tra lại!";
      } else {
        moErrorMessage.innerHTML = "";
      }
      var requestOptions = {
        method: "GET",
        body: null,
        mode: "cors",
      };
      fetch(
        "https://promotion-api.masoffer.net/v1/promotion/get-relate-products" +
          "?item_id=" +
          productParams[1] +
          "&shop_id=" +
          productParams[0] +
          "&encoded_publisher_id=" +
          "MGUYSvZ9xgl_dGJ8LUf8WA" +
          "&selectedOffer=" +
          "tiki" +
          "&domain=" +
          "rutgon.me",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          // show prod related block
          let template = "";
          let products = JSON.parse(result);
          products.forEach((item) => {
            template += TEMPLATE["product"](item);
          });
          // draw content
          relatedBlock.querySelector(".cps-content").innerHTML = template;
          relatedBlock.classList.add("show");
          // do animation
          doAnimation();
        })
        .catch((error) => {
          relatedBlock.classList.remove("show");
          return error;
        });
    } else {
      relatedBlock.classList.remove("show");
      relatedBlock.querySelector(".cps-content").innerHTML = "";
    }
  }

  function getChartHistory() {
    let moSearchUrl = moSearchInput.value.trim();
    if (moSearchUrl !== "") {
      let parsedUrl = document.createElement("a");
      parsedUrl.href = moSearchUrl;

      let productParams = [];
      if (parsedUrl.pathname.indexOf("/product/") !== -1) {
        productParams = parsedUrl.pathname.split("/").slice(-2);
      } else {
        productParams = parsedUrl.pathname.split(".").slice(-2);
      }

      let requestOptions = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prodId: productParams[1],
          shopId: productParams[0],
        }),
      };

      let chartOuter = document.getElementById("cps-price-chart-outer");
      let chart = document.getElementById("cps-price-chart");

      fetch(
        "https://promotion-api.masoffer.net/v1/promotion/chart-history",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          if (result) {
            result = JSON.parse(result);
            chartOuter.style.height = "130px";
          } else {
            chartOuter.style.height = "0px";
          }

          if (
            typeof window.priceChart === "object" &&
            typeof window.priceChart.destroy === "function"
          ) {
            window.priceChart.destroy();
          }
          chart.style.height = "130px";
          chart.style.width = "100%";
          chart.removeAttribute("height");
          chart.removeAttribute("width");

          return result;
        })
        .then((result) => {
          window.ctx = document
            .getElementById("cps-price-chart")
            .getContext("2d");
          window.priceChart = new Chart(ctx, {
            type: "line",
            data: {
              labels: result.data.price_ts,
              datasets: [
                {
                  label: "Giá Sản phẩm",
                  data: result.data.price,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  max: result.data.price_ceil,
                  min: result.data.price_floor,
                  ticks: {
                    stepSize: 1000,
                  },
                },
              },
            },
          });
        })
        .catch((error) => {
          console.error("Cannot draw canvas", error);
        });
    } else {
      if (
        typeof window.priceChart === "object" &&
        typeof window.priceChart.destroy === "function"
      ) {
        window.priceChart.destroy();
        document.getElementById("cps-price-chart-outer").style.height = "0px";
        document.getElementById("cps-price-chart").removeAttribute("height");
        document.getElementById("cps-price-chart").removeAttribute("width");
      }
    }
  }

  let TEMPLATE = {
    product: function (data) {
      return `<a href="${data.prod_url}" class="cps-prod-related" target="_blank">
    <div class="cps-prod-image">
        <img src="${data.image_url}" alt="">
    </div>
    <div class="cps-prod-info">
        <div class="cps-prod-name">${data.name}</div>
        <div class="cps-prod-price">${data.price}</div>
    </div>
</a>`;
    },
  };

  function doScrolling(element, duration) {
    let startingY = window.pageYOffset;
    let elementY = getElementY(element);
    let targetY =
      document.body.scrollHeight - elementY < window.innerHeight
        ? document.body.scrollHeight - window.innerHeight
        : elementY;
    let diff = targetY - startingY;
    let easing = function (t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    let start;

    if (!diff) return;
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      let time = timestamp - start;
      let percent = Math.min(time / duration, 1);
      percent = easing(percent);
      window.scrollTo(0, startingY + diff * percent);
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    });
  }

  function doAnimation(elemId, animation, duration = 1000) {
    return setTimeout(() => {
      switch (animation) {
        case "show-slide-down":
          // document.
          break;
        default:
          break;
      }
    }, duration);
  }

  function isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  let x, i, j, l, ll, selElmnt, a, b, c;
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-element selected-element");
    a.innerHTML = selElmnt.options[0].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < ll; j++) {
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        let y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        switch (s.id) {
          case "select-priority":
            moPriority = s.value;
            break;
          case "select-order-type":
            moOrderType = s.value;
            break;
          default:
            break;
        }

        onOrderChange(moOrderType, moPriority);
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  function closeAllSelect(elmnt) {
    let x,
      y,
      i,
      xl,
      yl,
      arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-element");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  function capitalizeFirstLetter(string) {
    const mapper = {
      đ: "Đ",
      ô: "Ô",
    };
    Object.freeze(mapper);
    const getUpperCaseMap = (val) => mapper[val] || val.toUpperCase();

    let rs = string
      .replaceAll("-", " - ")
      .replace(
        /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+\S*/gi,
        (w) => {
          return w.replace(/^(\w|[ôđ]{1})/, (c) => {
            return getUpperCaseMap(c);
          });
        }
      );
    return rs.replaceAll("Shopeepay", "ShopeePay").replaceAll("3G/4g", "3G/4G");
  }
};

function overrideAnchorClick() {
  Array.from(document.querySelectorAll('#cps-wrap a[target="_blank"]')).forEach(
    (link) => link.removeAttribute("target")
  );
}

window.mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

(function () {
  mo_voucher_recommend();
  if (document.location.hostname === "magiamgiashopee.vn") {
    document.getElementById("cps-feedback").style.display = "block";
  }
})();
