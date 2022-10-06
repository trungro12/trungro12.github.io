'use strict';
	var jq11 = jQuery.noConflict(true);

	var accesskey = document.getElementById('atScript6626').getAttribute('data-accesskey')
	var at_src = document.getElementById('atScript6626').getAttribute("src");
	var utm_source = document.getElementById('atScript6626').getAttribute('data-utm-source')
	var utm_medium = document.getElementById('atScript6626').getAttribute('data-utm-medium')
	var utm_content = document.getElementById('atScript6626').getAttribute('data-utm-content')
	var utm_campaign = document.getElementById('atScript6626').getAttribute('data-utm-campaign')
	var data_sub1 = document.getElementById('atScript6626').getAttribute('data-sub1')
	var data_sub2 = document.getElementById('atScript6626').getAttribute('data-sub2')
	var data_sub3 = document.getElementById('atScript6626').getAttribute('data-sub3')
	var data_sub4 = document.getElementById('atScript6626').getAttribute('data-sub4')
	var data_sub5 = document.getElementById('atScript6626').getAttribute('data-sub5')
	var data_style_color = document.getElementById('atScript6626').getAttribute('data-style-color')
	var data_limit = document.getElementById('atScript6626').getAttribute('data-limit')
	var data_coupon_row = document.getElementById('atScript6626').getAttribute('data-row')
	var filters = document.getElementById('atScript6626').getAttribute('data-filters')
	if (!utm_source) {
		utm_source = ''
	}
	if (!utm_medium) {
		utm_medium = ''
	}
	if (!utm_content) {
		utm_content = ''
	}
	if (!utm_campaign) {
		utm_campaign = ''
	}
	if (!data_sub1) {
		data_sub1 = ''
	}
	if (!data_sub2) {
		data_sub2 = ''
	}
	if (!data_sub3) {
		data_sub3 = ''
	}
	if (!data_sub4) {
		data_sub4 = ''
	}
	if (!data_sub5) {
		data_sub5 = ''
	}
    if (!data_style_color) {
		data_style_color = '#6C5CE7'
	}
    if (!data_limit) {
		data_limit = 10
	}
    if (!data_coupon_row) {
		data_coupon_row = 2
	}
	if (!filters) {
		filters = {"merchant":"","category":"","campaign":""}
	}
	else {
		filters = JSON.parse(filters)
	}
	var merchant = ''
	var category = ''
	var campaign = ''
	var keyword = ''
	var sort = 0
	var limit = data_limit
	var is_next_day_coupon = 'True'
	var url = ''
	var page = 1
	var totalCoupon = 0
	var totalCouponNext = 0
	var merchantIdArray = []
	if (!filters['merchant']) {
		filters['merchant'] = ''
	}
	if (!filters['category']) {
		filters['category'] = ''
	}
	if (!filters['campaign']) {
		filters['campaign'] = ''
	}
	const merchantInit = filters['merchant']

	if(filters['merchant']) {
		merchant = filters['merchant']
	}
	if (filters['category']) {
		category = filters['category']
	}
	if (filters['campaign']) {
		campaign = filters['campaign']
	}
	const campaignInit = filters['campaign']
	var token = `Token ${accesskey}`
	function request(method, url, params = null, options = null) {
    if (!options)
        options = {
            contentType: 'application/json',
            dataType: 'json',
			async: false,
        }
	return jq11.ajax({
		beforeSend: function (xhrObj) {
			xhrObj.setRequestHeader("Authorization", token);
		},
		method: method,
		url: url,
		...options,
		data: params
	}).always(() => {
	});
	}

    var source_static = "https://static.accesstrade.vn/coupon/v2/"

	var atService = function () {
		var api_url = "https://api.accesstrade.vn/v1/offers_informations/";
        return {
            getCouponList: function () {
                const params = {
                    "page": page,
                    "limit": limit,
                    "merchant": merchant,
                    "category": category,
                    "campaign": campaign,
                    "keyword": keyword,
                    "url": url,
                    "utm_source": utm_source,
                    "utm_medium": utm_medium,
                    "utm_campaign": utm_campaign,
                    "utm_content": utm_content,
                    "data_sub1": data_sub1,
                    "data_sub2": data_sub2,
                    "data_sub3": data_sub3,
                    "data_sub4": data_sub4,
                    "data_sub5": data_sub5,
                    "sort": sort,
                }

                return request('GET', api_url + 'coupon', params);
            },
		getCouponNextDay: function () {
            const params = {
            	"page":page,
            	"limit":limit,
				"url": url,
				"merchant": merchant,
				"category": category,
				"campaign": campaign,
				"keyword":keyword,
				"is_next_day_coupon":is_next_day_coupon,
				"utm_source": utm_source,
				"utm_medium": utm_medium,
				"utm_campaign": utm_campaign,
				"utm_content": utm_content,
				"data_sub1":data_sub1,
				"data_sub2":data_sub2,
				"data_sub3":data_sub3,
				"data_sub4":data_sub4,
				"data_sub5":data_sub5,
			}
            return request('GET', api_url + 'coupon', params);
        },
        getCouponHot: function () {
            const params = {
            	"limit":limit,
				"merchant": merchant,
				"category": category,
				"utm_source": utm_source,
				"utm_medium": utm_medium,
				"utm_campaign": utm_campaign,
				"utm_content": utm_content,
				"data_sub1":data_sub1,
				"data_sub2":data_sub2,
				"data_sub3":data_sub3,
				"data_sub4":data_sub4,
				"data_sub5":data_sub5,
			}
            return request('GET', api_url + 'coupon_hot', params);
        },
		getMerchants: function () {
        	const params = {
				"merchant": merchant,
				"category": category,
			}
            return request('GET', api_url + 'merchant_list', params);
        },
		getKeywords: function () {
        	const params = {
				"merchant": merchant,
			}
            return request('GET', api_url + 'keyword_list', params);
        },
    }
}

    async function sequentialStart() {
      // 1. Execution gets here almost instantly
      const slow = await generateBlocks()
      await init()
      if (jq11(".atEQPOIVFSDFSDG-filter-keyword").length > 0) {
        await get_list_keyword()
        // filter coupon theo keyword
        jq11("ul.atEQPOIVFSDFSDG-tags > li").click(function(event) {
			loading();
            restartFilter()
            if (jq11("body").width() > 767) {
                jq11("div.atEQPOIVFSDFSDG-filters-and-delete-search button.atEQPOIVFSDFSDG-delete-search").show()
            } else {
                jq11("div.atEQPOIVFSDFSDG-dealcouponlist-title button.atEQPOIVFSDFSDG-delete-search").show()
                jq11("div.atEQPOIVFSDFSDG-dealcouponlist-title button.atEQPOIVFSDFSDG-delete-search").css('display','flex')
            }
            jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item").map(function (item) {
                jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item")[item].style.display = ''
            })
            merchant = merchantInit
            jq11("#dropdownMenuButton2 span")[0].innerText = 'Tất cả nhà cung cấp';
            jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item")[0].style.display = 'none'
            merchantIdArray = []
            keyword = this.getElementsByTagName("a")[0].dataset["keyword"]
            jq11(".item-brand").removeClass("active");
            jq11(this).siblings().removeClass('active')
            jq11(this).addClass("active");
            get_coupon_current()
            get_coupon_next()
            scrollToCouponsContainer()
        });
      }

      await get_list_merchants()
        jq11("a.atEQPOIVFSDFSDG-dropdown-item").on('click', function (event){
            event.preventDefault();
			loading();
            if (jq11("body").width() > 767) {
                jq11("div.atEQPOIVFSDFSDG-filters-and-delete-search button.atEQPOIVFSDFSDG-delete-search").show()
            } else {
                jq11("div.atEQPOIVFSDFSDG-dealcouponlist-title button.atEQPOIVFSDFSDG-delete-search").show()
                jq11("div.atEQPOIVFSDFSDG-dealcouponlist-title button.atEQPOIVFSDFSDG-delete-search").css('display','flex')
            }
            if (event.target.parentElement.getAttribute("id") === "dropdownMenuSort") {
                jq11("#dropdownMenuSort a.atEQPOIVFSDFSDG-dropdown-item").map(function (item) {
                    jq11("#dropdownMenuSort a.atEQPOIVFSDFSDG-dropdown-item")[item].style.display = ''
                })
                sort = event.target.attributes['data-sort'].value
            } else if (event.target.parentElement.getAttribute("id") === "dropdownMenuMerchant") {
                jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item").map(function (item) {
                    jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item")[item].style.display = ''
                })
                campaign = ''
                merchant = event.target.attributes['data-merchant'].value
            }

            event.target.parentNode.previousElementSibling.getElementsByTagName('span')[0].innerHTML = event.target.text
            if (event.target.parentNode.previousElementSibling.getElementsByTagName('span')[0].innerText === event.target.text) {
                event.target.style.display = 'none'
            }
            page = 1
            get_coupon_current()
            get_coupon_next()
        });
      // action click search
        jq11(".atEQPOIVFSDFSDG-btn-search").click(function (){
			loading();
            restartFilter()
            jq11("#dropdownMenuButton2 span")[0].innerText = 'Tất cả nhà cung cấp';
            jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item").map(function (item) {
                jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item")[item].style.display = ''
            })
            jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item")[0].style.display = 'none'
            // merchant = product_link_by_merchant
            is_next_day_coupon= null
            url = jq11("#atEQPOIVFSDFSDG-search").val().trim()
            jq11("ul[class='atEQPOIVFSDFSDG-pagination'] > li").slice(-3).hide()
            get_coupon_current()
            is_next_day_coupon= "True"
            if (!url.includes('https')) {
                get_coupon_next()
            } else {
                if (jq11(".atEQPOIVFSDFSDG-title-tabs").length > 0) {
				    jq11("#record-tabs")[0].innerHTML = `Sắp mở <em>(0)</em>`
                }
                var tabContentCouponNextDayElement = jq11("#deal-soon .atEQPOIVFSDFSDG-dealpromo-body");
                tabContentCouponNextDayElement[0].innerHTML = ''
                jq11("#no-coupon").show()
                jq11("ul[name='pagination']").hide()
                jq11("span[name='text-muted']").hide()
            }
            jq11("ul[class='atEQPOIVFSDFSDG-tags'] > li").removeClass("active")
            scrollToCouponsContainer()
        });
        // action click search
        jq11('#atEQPOIVFSDFSDG-search').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
			loading();
            restartFilter()
            jq11("#dropdownMenuButton2 span")[0].innerText = 'Tất cả nhà cung cấp';
            jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item").map(function (item) {
                jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item")[item].style.display = ''
            })
            jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item")[0].style.display = 'none'
            is_next_day_coupon= null
            url = jq11("#atEQPOIVFSDFSDG-search").val().trim()
            jq11("ul[class='atEQPOIVFSDFSDG-pagination'] > li").slice(-3).hide()
            get_coupon_current()
            is_next_day_coupon= "True"
            if (!url.includes('https')) {
                get_coupon_next()
            } else {
                if (jq11(".atEQPOIVFSDFSDG-title-tabs").length > 0) {
				    jq11("#record-tabs")[0].innerHTML = `Sắp mở <em>(0)</em>`
                }
                var tabContentCouponNextDayElement = jq11("#deal-soon .atEQPOIVFSDFSDG-dealpromo-body");
                tabContentCouponNextDayElement[0].innerHTML = ''
                jq11("#no-coupon").show()
                jq11("ul[name='pagination']").hide()
                jq11("span[name='text-muted']").hide()
            }
            jq11("ul[class='atEQPOIVFSDFSDG-tags'] > li").removeClass("active")
            scrollToCouponsContainer()
        }
        });
      await get_coupon_current()
      await get_coupon_next()
      await changeStyleScript()
      await generateModal();
      jq11(".atEQPOIVFSDFSDG-container")[0].style.display = ''
    }


    function init() {
        if (jq11(".atEQPOIVFSDFSDG-search").length > 0) {
            let new_title = document.createElement("h4")
            new_title.innerText = "Tìm kiếm mã giảm giá"
            new_title.className = 'atEQPOIVFSDFSDG-search-title'
            let parentDiv = jq11("div.atEQPOIVFSDFSDG-first-block")[0].parentNode
            jq11("div.atEQPOIVFSDFSDG-input-main-search div.atEQPOIVFSDFSDG-input-search input").attr('placeholder', 'Nhập link sản phẩm, tên nhãn hàng, tên sản phẩm để tìm kiếm')
            parentDiv.insertBefore(new_title, jq11("div.atEQPOIVFSDFSDG-first-block")[0])
        }
        if (jq11(".atEQPOIVFSDFSDG-filter-keyword").length > 0 && jq11(".atEQPOIVFSDFSDG-search").length === 0) {
            let new_title = document.createElement("h4")
            new_title.innerText = "Từ khoá mã giảm giá shopee"
            new_title.className = "atEQPOIVFSDFSDG-keywords"
            let parentDiv = jq11(".atEQPOIVFSDFSDG-tags")[0].parentNode
            parentDiv.insertBefore(new_title, jq11(".atEQPOIVFSDFSDG-tags")[0])
        }
        if (jq11(".atEQPOIVFSDFSDG-filters-and-delete-search").length > 0 && jq11(".atEQPOIVFSDFSDG-title-tabs").length === 0) {
            let new_title = document.createElement("div")
            let content_html = "<h4 style='padding: 1rem; margin: 0'>Lọc theo</h4>"
            new_title.innerHTML = content_html + jq11("div.atEQPOIVFSDFSDG-filters-and-delete-search")[0].innerHTML
            new_title.className = "atEQPOIVFSDFSDG-filters"
            let parentDiv = jq11("div.atEQPOIVFSDFSDG-filters-and-delete-search")[0].parentNode
            parentDiv.insertBefore(new_title, jq11("div.atEQPOIVFSDFSDG-voucher-dealcoupon")[0])
            jq11("div.atEQPOIVFSDFSDG-filters-and-delete-search")[0].remove()
            jq11(".atEQPOIVFSDFSDG-at-filters").css("padding", "0px 1rem")
        }
    }

    jq11(document).ready(()=>{
        sequentialStart();

        jq11(document).click(function(event){
        var $trigger = jq11(".atEQPOIVFSDFSDG-dropdown");
        if($trigger !== event.target && !$trigger.has(event.target).length){
            jq11(".atEQPOIVFSDFSDG-dropdown-menu").slideUp("fast");
        }
        });

        jq11(".atEQPOIVFSDFSDG-dropdown").click(function (){
            let dropdownMenu = this.children[1].getAttribute('id');
            jq11(`#${dropdownMenu}`).toggle();
        });


        // button delete sort
        jq11("button.atEQPOIVFSDFSDG-delete-search").click(function (){
            jq11("#atEQPOIVFSDFSDG-search").val('');
            jq11('.atEQPOIVFSDFSDG-search-clear').hide()
            jq11("button.atEQPOIVFSDFSDG-delete-search").hide()
            jq11("#dropdownMenuSort a.atEQPOIVFSDFSDG-dropdown-item").map(function (item) {
                jq11("#dropdownMenuSort a.atEQPOIVFSDFSDG-dropdown-item")[item].style.display = ''
            })
            jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item").map(function (item) {
                jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item")[item].style.display = ''
            })
            jq11("#dropdownMenuSort a.atEQPOIVFSDFSDG-dropdown-item")[0].style.display = 'none'
            jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item")[0].style.display = 'none'
            jq11("ul[class='atEQPOIVFSDFSDG-tags'] > li").removeClass("active")
            restartFilter()
            merchant = merchantInit;
            sort = 0;
            jq11("#dropdownMenuButton span")[0].innerText = 'Mới nhất';
            jq11("#dropdownMenuButton2 span")[0].innerText = 'Tất cả nhà cung cấp';
            get_coupon_current()
            get_coupon_next()
        });

        // type input search
        jq11('#atEQPOIVFSDFSDG-search').change(function (){
            jq11('.atEQPOIVFSDFSDG-search-clear').show()
            if (jq11("body").width() > 767) {
                jq11("div.atEQPOIVFSDFSDG-filters-and-delete-search button.atEQPOIVFSDFSDG-delete-search").show()
            } else {
                jq11("div.atEQPOIVFSDFSDG-dealcouponlist-title button.atEQPOIVFSDFSDG-delete-search").show()
                jq11("div.atEQPOIVFSDFSDG-dealcouponlist-title button.atEQPOIVFSDFSDG-delete-search").css('display','flex')
            }
            if (jq11('#atEQPOIVFSDFSDG-search').val() === '') {
                jq11('.atEQPOIVFSDFSDG-search-clear').hide()
                jq11("button.atEQPOIVFSDFSDG-delete-search").hide()
            }
        });

        // clear search
        jq11('.atEQPOIVFSDFSDG-search-clear').click(function() {
            jq11("#atEQPOIVFSDFSDG-search").val('');
            jq11('.atEQPOIVFSDFSDG-search-clear').hide()
            jq11("button.atEQPOIVFSDFSDG-delete-search").hide()
            jq11("#dropdownMenuSort a.atEQPOIVFSDFSDG-dropdown-item").map(function (item) {
                jq11("#dropdownMenuSort a.atEQPOIVFSDFSDG-dropdown-item")[item].style.display = ''
            })
            jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item").map(function (item) {
                jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item")[item].style.display = ''
            })
            jq11("#dropdownMenuSort a.atEQPOIVFSDFSDG-dropdown-item")[0].style.display = 'none'
            jq11("#dropdownMenuMerchant a.atEQPOIVFSDFSDG-dropdown-item")[0].style.display = 'none'
            jq11("ul[class='atEQPOIVFSDFSDG-tags'] > li").removeClass("active")
            restartFilter()
            merchant = merchantInit;
            sort = 0;
            jq11("#dropdownMenuButton span")[0].innerText = 'Mới nhất';
            jq11("#dropdownMenuButton2 span")[0].innerText = 'Tất cả nhà cung cấp';
            get_coupon_current()
            get_coupon_next()
        });

        // tab
        jq11("#record-tabs").click(function (event){
			loading();
        event.preventDefault();
        if (jq11("#deal-soon")[0].className.includes("active")) {
            return 1
        }
		page = 1;
        jq11(this).addClass("active");
        if (jq11("#history-tabs")[0].className.includes("active")) {
            jq11("#history-tabs").removeClass("active");
            jq11("#deal-opening").toggle();
            jq11("#deal-opening").removeClass("active show");
        }
        jq11("#deal-soon").toggle();
        jq11("#deal-soon").addClass('active show');
		if (url && url.includes('https')) {
			jq11("#record-tabs")[0].innerHTML = `Sắp mở <em>(0)</em>`
			var tabContentCouponNextDayElement = jq11("#deal-soon .atEQPOIVFSDFSDG-dealpromo-body");
			tabContentCouponNextDayElement[0].innerHTML = ''
			jq11("span[name='text-muted-soon']").hide()
			jq11("ul[name='pagination-soon']").hide()
		} else {
			get_coupon_next()
		}
	});
	    jq11("#history-tabs").click(function (event){
			loading();
        event.preventDefault();
        if (jq11("#deal-opening")[0].className.includes("active")) {
            return 1
        }
		page = 1;
        jq11(this).addClass("active");
        if (jq11("#record-tabs")[0].className.includes("active")) {
            jq11("#record-tabs").removeClass("active");
            jq11("#deal-soon").toggle();
            jq11("#deal-soon").removeClass("active show");
        }

        jq11("#deal-opening").toggle();
        jq11("#deal-opening").addClass('active show');
		if (url && url.includes('https')) {
			jq11("span[name='text-muted']").hide()
			jq11("ul[name='pagination']").hide()
		} else {
			get_coupon_current()
		}
	});

        // last page
        jq11("ul[name='pagination'] > li:last-child").click(function(){
			loading();
            next(event,roundUp(totalCoupon/limit))
            jq11("#prev-page-active")[0].innerText = page - 1
            if (page < totalCoupon/limit ) {
                jq11("ul[name='pagination'] > li").slice(-3).show()
            }
            else {
                jq11("ul[name='pagination'] > li").slice(-3).hide()
            }
            let total = roundUp(totalCoupon/limit)
            jq11("span[name='text-muted']")[0].innerText = `Trên ${total} trang`
        });

        jq11("ul[name='pagination-soon'] > li:last-child").click(function(){
			loading();
            next(event,roundUp(totalCouponNext/limit),true)
            jq11("#prev-soon-page-active")[0].innerText = page - 1
            if (page < totalCouponNext/limit ) {
                jq11("ul[name='pagination-soon'] > li").slice(-3).show()
            }
            else {
                jq11("ul[name='pagination-soon'] > li").slice(-3).hide()
            }
            let total = roundUp(totalCouponNext/limit)
            jq11("span[name='text-muted-soon']")[0].innerText = `Trên ${total} trang`
        });

        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            };
            i[r].l = 1 * new Date();
            a = s.createElement(o);
            m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })


		(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		// ua-... id tren ga
		ga('create', 'UA-209200275-1', 'auto', 'at');
		ga('at.send', 'pageview');
		ga('at.send', {hitType: 'event',eventCategory: 'couponsV2',eventAction: 'loaded',eventLabel: window.location.hostname});
	})


	var service = atService()
    function get_list_keyword () {
        var list_keyword = service.getKeywords()
		.done(res => {
			let data = res.data
			if (data.length ===0) {
				jq11("ul.tags").hide()
			}
			let product_template = ''
			var productElement = []
			data.map(element =>{
            product_template = `<li class="atEQPOIVFSDFSDG-btn-keyword"><a data-keyword="${element.keyword}" href="javascript:void(0);">${element.keyword}&nbsp;(${element.total_offer})</a></li>`
            productElement.push(product_template)
            })
			var atProductGenerateElement = jq11(".atEQPOIVFSDFSDG-tags");
			atProductGenerateElement[0].innerHTML = productElement.join('')
            if (jq11(".atEQPOIVFSDFSDG-title-tabs").length > 0) {
                jq11("#history-tabs")[0].innerHTML = `Đang mở <em>(${productElement.length})</em>`
            }
		})
		.fail(err => {
			console.log(err)
		})
    }


	function get_list_merchants() {
        var list_merchant = service.getMerchants()
		.done(res => {
			let data = res.data
			let product_template = ''
			var productElement = []
			data.map(element =>{
            if(!element.logo){
                element.logo = 'https://pub2.accesstrade.vn/assets/images/default.jpeg'
            }
			product_template = `<a class="atEQPOIVFSDFSDG-dropdown-item" data-merchant="${element.id}" href="#">${element.display_name}</a>`

            productElement.push(product_template)
            })
			var atProductGenerateElement = jq11("#dropdownMenuMerchant");
			atProductGenerateElement[0].innerHTML = `<a class="atEQPOIVFSDFSDG-dropdown-item" data-merchant="${merchantInit}" href="#" style="display: none">Tất cả nhà cung cấp</a>` + productElement.join('')
            if (jq11(".atEQPOIVFSDFSDG-title-tabs").length > 0) {
                jq11("#history-tabs")[0].innerHTML = `Đang mở <em>(${productElement.length})</em>`
            }
		})
		.fail(err => {
			console.log(err)
		})
    }

	function prev(event, page_,is_next) {
		if (!is_next) {
			event.preventDefault()
		page -= 1
		if (page_) {
			page = page_
		}
		get_coupon_current()
		} else {
			event.preventDefault()
			page -= 1
			if (page_) {
				page = page_
			}
			get_coupon_next()
		}
	}

	function next(event, page_,is_next) {
		if (!is_next) {
			event.preventDefault()
		page += 1
		if (page_) {
			page = page_
		}
		get_coupon_current()
		} else {
			event.preventDefault()
			page += 1
			if (page_) {
				page = page_
			}
			get_coupon_next()
		}

	}

	function get_coupon_current() {
		jq11(".atEQPOIVFSDFSDG-dealpromo-body")[0].innerHTML = '<i class="fas fa-spinner" style="text-align: end; font-size: 2em"></i>'
		var coupon_current = service.getCouponList()
		.done(res => {
			let data = res.data
            console.log("DONE")
			if (res.count) {
				totalCoupon =  res.count
			} else {
				totalCoupon =  data.length
			}
			let product_template = ''
			var productElement = []
			if (res.status !=null && res.status === false) {
				jq11("#no-coupon-link")[0].innerHTML = `<p style='color:red'>Invalid URL ${res.message} <br> Please typing product link</p>`
				jq11("#no-coupon-link").show()
				jq11("#history-tabs")[0].innerHTML = `Đang mở <em>(${totalCoupon})</em>`
			} else if (data.length ===0 && res.message) {
				jq11("#no-coupon-link")[0].innerHTML = `<p style='color:red'>Không có mã giảm giá thích hợp</p>`
				jq11("#no-coupon-link").show()
				jq11("#history-tabs")[0].innerHTML = `Đang mở <em>(${totalCoupon})</em>`
			} else if (data.length ===0) {
				jq11("#no-coupon-link").show()
				jq11("#history-tabs")[0].innerHTML = `Đang mở <em>(${totalCoupon})</em>`
			}
			else {
				jq11("#no-coupon-link").hide()
			}
            jq11(".fas.fa-spinner").hide()
			data.map(element =>{
            if(!element.image){
                element.image = 'https://pub2.accesstrade.vn/assets/images/default.jpeg'
            }
			let tranform = element.remain - 100
			let time_left = element.time_left.includes('ngày') ? true : false
			let coupon_code = 'Mã trên web'
			if (!element.id.includes('lazada')) {
				coupon_code = element.coupons[0]['coupon_code']
			}
            if (time_left) {
				product_template = `
					<div class='atEQPOIVFSDFSDG-coupon-grid'>
					  <div class='atEQPOIVFSDFSDG-promo--img'>
						<img class='atEQPOIVFSDFSDG-img-cover' src="${element.image}" alt="${element.name}">
					  </div>
					  <div class='atEQPOIVFSDFSDG-promo-item'>
						<span class="atEQPOIVFSDFSDG-title">
							<a href="javascript:void(0);" class="dealpromo-item-cta" data-id="${element.id}" alt="${element.content}"">${element.name}</a>
						</span>
						<div class='atEQPOIVFSDFSDG-loading'>
						  <span data-remain="${element.remain_true}">Còn lại ${element.remain}%</span>
						  <div class="atEQPOIVFSDFSDG-line">
							<div class="atEQPOIVFSDFSDG-line--content" style="transform: translateX(${tranform}%)"></div>
						  </div>
						</div>
						<div class='atEQPOIVFSDFSDG-remain'>
						  <div class="atEQPOIVFSDFSDG-item-timer">${element.time_left}</div>
						  <span class="atEQPOIVFSDFSDG-item-label">${element.merchant}</span>
						</div>
						<div class='atEQPOIVFSDFSDG-container-btncopy'>
						  <button class='btn-copy atEQPOIVFSDFSDG-dealact-copy dealpromo-item-cta' data-link="${element.aff_link}" data-code="${coupon_code}" type="button">Lấy code</button>
						</div>
					  </div>
					</div>
				  `
			} else {
				product_template = `
					<div class='atEQPOIVFSDFSDG-coupon-grid'>
					  <div class='atEQPOIVFSDFSDG-promo--img'>
						<img class='atEQPOIVFSDFSDG-img-cover' src="${element.image}" alt="${element.name}">
					  </div>
					  <div class='atEQPOIVFSDFSDG-promo-item'>
						<span class="atEQPOIVFSDFSDG-title">
							<a href="javascript:void(0);" class="dealpromo-item-cta" data-id="${element.id}" alt="${element.content}"">${element.name}</a>
						</span>
						<div class='atEQPOIVFSDFSDG-loading'>
						  <span data-remain="${element.remain_true}">Còn lại ${element.remain}%</span>
						  <div class="atEQPOIVFSDFSDG-line">
							<div class="atEQPOIVFSDFSDG-line--content" style="transform: translateX(${tranform}%)"></div>
						  </div>
						</div>
						<div class='atEQPOIVFSDFSDG-remain'>
						  <div class="atEQPOIVFSDFSDG-item-timer atEQPOIVFSDFSDG-item-timer-alert">${element.time_left}</div>
						  <span class="atEQPOIVFSDFSDG-item-label">${element.merchant}</span>
						</div>
						<div class='atEQPOIVFSDFSDG-container-btncopy'>
						  <button class='btn-copy atEQPOIVFSDFSDG-dealact-copy dealpromo-item-cta' data-link="${element.aff_link}" data-code="${coupon_code}" type="button">Lấy code</button>
						</div>
					  </div>
					</div>
				  `
			}

            productElement.push(product_template)
            })
			var atProductGenerateElement = jq11(".atEQPOIVFSDFSDG-dealpromo-body");
			atProductGenerateElement[0].innerHTML = productElement.join('')
            console.log("DONE add content")
            if (jq11(".atEQPOIVFSDFSDG-title-tabs").length > 0) {
                jq11("#history-tabs")[0].innerHTML = `Đang mở <em>(${totalCoupon})</em>`
            }
			pagination()

			jq11("#deal-opening .dealpromo-item-cta").click(function() {
				loading();
				var dealObj = jq11(this).closest('.atEQPOIVFSDFSDG-coupon-grid');
				if (jq11("body").width() > 767) {
					jq11('#myModalDesktop img.atEQPOIVFSDFSDG-img-cover').attr("src", dealObj.find('img.atEQPOIVFSDFSDG-img-cover').attr("src"));

				jq11('#myModalDesktop div.atEQPOIVFSDFSDG-heading--title p').text(dealObj.find('span.atEQPOIVFSDFSDG-title a').text());
				jq11('#myModalDesktop .atEQPOIVFSDFSDG-heading--label span').text(dealObj.find('span.atEQPOIVFSDFSDG-item-label').text());
				jq11('#myModalDesktop div.atEQPOIVFSDFSDG-item-timer span').text(dealObj.find('div.atEQPOIVFSDFSDG-item-timer').text());
				// jq11('#myModal div.atEQPOIVFSDFSDG-details-description p').text(dealObj.find('h4.atEQPOIVFSDFSDG-title a').attr("alt"));
				let description = dealObj.find('span.atEQPOIVFSDFSDG-title a').attr("alt").includes('\n') ? dealObj.find('span.atEQPOIVFSDFSDG-title a').attr("alt").split('.\n') : dealObj.find('span.atEQPOIVFSDFSDG-title a').attr("alt").split('. ')
				let desciptionElement = [];
				description.map(item=>desciptionElement.push(`${item}<br>`))
				jq11('#myModalDesktop div.atEQPOIVFSDFSDG-details-description p')[0].innerHTML = desciptionElement.join('')
				jq11('#myModalDesktop a.atEQPOIVFSDFSDG-code-coupon').text(dealObj.find('button.atEQPOIVFSDFSDG-dealact-copy')[0].dataset['code']);
				jq11('#myModalDesktop a.atEQPOIVFSDFSDG-details-dealact-copy').attr("href", dealObj.find('button.atEQPOIVFSDFSDG-dealact-copy')[0].dataset['link']);
				jq11('#myModalDesktop a.atEQPOIVFSDFSDG-details-dealact-copy').attr("data-code", dealObj.find('button.atEQPOIVFSDFSDG-dealact-copy')[0].dataset['code']);
				if (dealObj.find('div.atEQPOIVFSDFSDG-loading span')[0].dataset['remain'] === 'true') {
					jq11("#myModalDesktop div.atEQPOIVFSDFSDG-details-remain").removeClass("atEQPOIVFSDFSDG-alert")
					jq11('#myModalDesktop div.at-alert').hide();
					jq11('#myModalDesktop div.atEQPOIVFSDFSDG-item-loading').show();
					jq11('#myModalDesktop div.atEQPOIVFSDFSDG-line--content').css("transform", dealObj.find('div.atEQPOIVFSDFSDG-line--content')[0].style.transform);
					jq11('#myModalDesktop div.atEQPOIVFSDFSDG-item-loading span').text(dealObj.find('div.atEQPOIVFSDFSDG-loading span').text());
				} else {
					jq11("#myModalDesktop div.atEQPOIVFSDFSDG-details-remain").addClass("atEQPOIVFSDFSDG-alert")
					jq11('#myModalDesktop div.atEQPOIVFSDFSDG-item-loading').hide();
					jq11('#myModalDesktop div.at-alert').show();
				}
				jq11('#myModalDesktop').modal();
				} else {
					jq11('#myModal img.atEQPOIVFSDFSDG-img-cover').attr("src", dealObj.find('img.atEQPOIVFSDFSDG-img-cover').attr("src"));
					jq11('#myModal div.atEQPOIVFSDFSDG-heading--title p').text(dealObj.find('span.atEQPOIVFSDFSDG-title a').text());
					jq11('#myModal .atEQPOIVFSDFSDG-heading--label span').text(dealObj.find('span.atEQPOIVFSDFSDG-item-label').text());
					jq11('#myModal div.atEQPOIVFSDFSDG-item-timer-mb-ongoing span').text(dealObj.find('div.atEQPOIVFSDFSDG-item-timer').text());
					let description = dealObj.find('span.atEQPOIVFSDFSDG-title a').attr("alt").includes('\n') ? dealObj.find('span.atEQPOIVFSDFSDG-title a').attr("alt").split('.\n') : dealObj.find('span.atEQPOIVFSDFSDG-title a').attr("alt").split('. ')
					let desciptionElement = [];
					description.map(item=>desciptionElement.push(`${item}<br>`))
					jq11('#myModal div.atEQPOIVFSDFSDG-details-description p')[0].innerHTML = desciptionElement.join('')
					jq11('#myModal div.atEQPOIVFSDFSDG-code-coupon-mb').text(dealObj.find('button.atEQPOIVFSDFSDG-dealact-copy')[0].dataset['code']);
					jq11('#myModal div.atEQPOIVFSDFSDG-details-dealact-copy-vmb a').attr("href", dealObj.find('button.atEQPOIVFSDFSDG-dealact-copy')[0].dataset['link']);
					jq11('#myModal div.atEQPOIVFSDFSDG-details-dealact-copy-vmb a').attr("data-code", dealObj.find('button.atEQPOIVFSDFSDG-dealact-copy')[0].dataset['code']);
					jq11('#myModal a.atEQPOIVFSDFSDG-details-copy-btn-large').attr("href", dealObj.find('button.atEQPOIVFSDFSDG-dealact-copy')[0].dataset['link']);
					jq11('#myModal a.atEQPOIVFSDFSDG-details-copy-btn-large').attr("data-code", dealObj.find('button.atEQPOIVFSDFSDG-dealact-copy')[0].dataset['code']);
					if (dealObj.find('div.atEQPOIVFSDFSDG-loading span')[0].dataset['remain'] === 'true') {
						jq11("#myModal div.atEQPOIVFSDFSDG-details-remain").removeClass("atEQPOIVFSDFSDG-alert")
						jq11('#myModal div.at-alert').hide();
						jq11('#myModal div.atEQPOIVFSDFSDG-item-loading').show();
						jq11('#myModal div.atEQPOIVFSDFSDG-line--content').css("transform", dealObj.find('div.atEQPOIVFSDFSDG-line--content')[0].style.transform);
						jq11('#myModal div.atEQPOIVFSDFSDG-item-loading span').text(dealObj.find('div.atEQPOIVFSDFSDG-loading span').text());
					} else {
						jq11("#myModal div.atEQPOIVFSDFSDG-details-remain").addClass("atEQPOIVFSDFSDG-alert")
						jq11("#myModal div.atEQPOIVFSDFSDG-details-expiry").css("padding","8px 0 0 0")
						jq11("#myModal div.atEQPOIVFSDFSDG-details-expiry").css("align-self","flex-start")
						jq11('#myModal div.atEQPOIVFSDFSDG-item-loading').hide();
						jq11('#myModal div.at-alert').show();
					}
					jq11('#myModal').modal();
					}
				return;
			});
		})
		.fail(err => {
			console.log(err)
		})
	}
	function get_coupon_next(){
		jq11("#deal-soon .atEQPOIVFSDFSDG-dealpromo-body")[0].innerHTML = '<i class="fas fa-spinner" style="text-align: end; font-size: 2em"></i>'
		var coupon_next_day = service.getCouponNextDay()
		.done(res => {
			let data = res.data
			let product_template = ''
			var productElement = []
			if (res.count) {
				totalCouponNext =  res.count
			} else {
				totalCouponNext =  data.length
			}
			if (data.length === 0) {
				jq11("#no-coupon").show()
                if (jq11(".atEQPOIVFSDFSDG-title-tabs").length > 0) {
				    jq11("#record-tabs")[0].innerHTML = `Sắp mở <em>(${totalCouponNext})</em>`
                }
			} else {
				jq11("#no-coupon").hide()
			}
            jq11(".fas.fa-spinner").hide()
			data.map(element =>{
			let date_opening = element.start_time
			date_opening = date_opening.split(' ')
			date_opening = date_opening.join('<br>')
			if(!element.image){
				element.image = 'https://pub2.accesstrade.vn/assets/images/default.jpeg'
			}
			product_template = `<div class="atEQPOIVFSDFSDG-coupon-grid">
									<div class='atEQPOIVFSDFSDG-promo--img'>
										<img class='atEQPOIVFSDFSDG-img-cover' src="${element.image}" alt="${element.name}">
								    </div>
									<div class='atEQPOIVFSDFSDG-promo-item'>
										<span class="atEQPOIVFSDFSDG-title">
											<a href="javascript:void(0);" class="dealpromo-item-cta" data-id="${element.id}" alt="${element.content}"">${element.name}</a>
										</span>
										<div style="padding: 0 0.5rem 0 0;margin-left: auto;">
										  <span class="atEQPOIVFSDFSDG-promo-item-soon">Sắp mở</span>
										</div>
										<div class='atEQPOIVFSDFSDG-remain'>
										  <div class="atEQPOIVFSDFSDG-item-timer">${element.time_left}</div>
										  <span class="atEQPOIVFSDFSDG-item-label">${element.merchant}</span>
										</div>
										<div style="display: flex; justify-content: flex-end; align-items: center; padding: 0 0.5rem 0 0;margin-left: auto;">
										  <p class="atEQPOIVFSDFSDG-date-opening" >${date_opening}</p>
										</div>
								    </div>
								</div> <!-- .dealpromo-item -->`
			productElement.push(product_template)
			})
			var tabContentCouponNextDayElement = jq11("#deal-soon .atEQPOIVFSDFSDG-dealpromo-body");
			tabContentCouponNextDayElement[0].innerHTML = productElement.join('')
            if (jq11(".atEQPOIVFSDFSDG-title-tabs").length > 0) {
			    jq11("#record-tabs")[0].innerHTML = `Sắp mở <em>(${totalCouponNext})</em>`
            }
			pagination(true)
			jq11("#deal-soon .dealpromo-item-cta").click(function() {
				loading();
				var dealObj = jq11(this).closest('.atEQPOIVFSDFSDG-coupon-grid');
				if (jq11("body").width() > 767) {
					jq11('#myModalNextCouponDesktop img.atEQPOIVFSDFSDG-img-cover').attr("src", dealObj.find('img.atEQPOIVFSDFSDG-img-cover').attr("src"));
					jq11('#myModalNextCouponDesktop div.atEQPOIVFSDFSDG-heading--title p').text(dealObj.find('span.atEQPOIVFSDFSDG-title a').text());
					jq11('#myModalNextCouponDesktop .atEQPOIVFSDFSDG-heading--label span').text(dealObj.find('span.atEQPOIVFSDFSDG-item-label').text());
					jq11('#myModalNextCouponDesktop div.atEQPOIVFSDFSDG-item-loading')[0].innerHTML = `
					<div class="atEQPOIVFSDFSDG-container-upgoing">
						<span class="atEQPOIVFSDFSDG-item-upgoing">Sắp diễn ra</span>
						<span class="atEQPOIVFSDFSDG-item-upgoing-starttime">${jq11(dealObj.find('p.atEQPOIVFSDFSDG-date-opening')[0])[0].outerText.replace('\n', '-')}</span>
					</div>`;
					jq11('#myModalNextCouponDesktop div.atEQPOIVFSDFSDG-line').hide();
					jq11('#myModalNextCouponDesktop div.atEQPOIVFSDFSDG-item-timer').text(dealObj.find('div.atEQPOIVFSDFSDG-item-timer').text());
					jq11('#myModalNextCouponDesktop div.atEQPOIVFSDFSDG-item-timer').addClass("atEQPOIVFSDFSDG-item-timer-mb-upgoing")
					jq11('#myModalNextCouponDesktop div.atEQPOIVFSDFSDG-item-timer').removeClass("atEQPOIVFSDFSDG-item-timer")
					let description = dealObj.find('span.atEQPOIVFSDFSDG-title a').attr("alt").includes('\n') ? dealObj.find('span.atEQPOIVFSDFSDG-title a').attr("alt").split('.\n') : dealObj.find('span.atEQPOIVFSDFSDG-title a').attr("alt").split('. ')
					let desciptionElement = [];
					description.map(item => desciptionElement.push(`${item}<br>`))
					jq11('#myModalNextCouponDesktop div.atEQPOIVFSDFSDG-details-description p')[0].innerHTML = desciptionElement.join('')
					jq11('#myModalNextCouponDesktop .atEQPOIVFSDFSDG-details-action').hide();
					jq11('#myModalNextCouponDesktop').modal('show');
				} else {
					jq11('#myModalNextCoupon img.atEQPOIVFSDFSDG-img-cover').attr("src", dealObj.find('img.atEQPOIVFSDFSDG-img-cover').attr("src"));
					jq11('#myModalNextCoupon div.atEQPOIVFSDFSDG-heading--title p').text(dealObj.find('span.atEQPOIVFSDFSDG-title a').text());
					jq11('#myModalNextCoupon .atEQPOIVFSDFSDG-heading--label span').text(dealObj.find('span.atEQPOIVFSDFSDG-item-label').text());
					jq11('#myModalNextCoupon div.atEQPOIVFSDFSDG-item-loading')[0].innerHTML = `
					<div class="atEQPOIVFSDFSDG-container-upgoing">
						<span class="atEQPOIVFSDFSDG-item-upgoing">Sắp diễn ra</span>
						<span class="atEQPOIVFSDFSDG-item-upgoing-starttime">${jq11(dealObj.find('p.atEQPOIVFSDFSDG-date-opening')[0])[0].outerText.replace('\n', '-')}</span>
					</div>`;
					jq11('#myModalNextCoupon div.atEQPOIVFSDFSDG-line').hide();
					jq11('#myModalNextCoupon div.atEQPOIVFSDFSDG-item-timer').text(dealObj.find('div.atEQPOIVFSDFSDG-item-timer').text());
					jq11('#myModalNextCoupon div.atEQPOIVFSDFSDG-item-timer').addClass("atEQPOIVFSDFSDG-item-timer-mb-upgoing")
					jq11('#myModalNextCoupon div.atEQPOIVFSDFSDG-item-timer').removeClass("atEQPOIVFSDFSDG-item-timer")
					let description = dealObj.find('span.atEQPOIVFSDFSDG-title a').attr("alt").includes('\n') ? dealObj.find('span.atEQPOIVFSDFSDG-title a').attr("alt").split('.\n') : dealObj.find('span.atEQPOIVFSDFSDG-title a').attr("alt").split('. ')
					let desciptionElement = [];
					description.map(item => desciptionElement.push(`${item}<br>`))
					jq11('#myModalNextCoupon div.atEQPOIVFSDFSDG-details-description p')[0].innerHTML = desciptionElement.join('')
					jq11('#myModalNextCoupon .atEQPOIVFSDFSDG-details-action').hide();
					jq11('#myModalNextCoupon').modal('show');
				}
				return;
			});
		})
		.fail(err => {
			console.log(err)
		})
	}

    function scrollToCouponsContainer() {
            jq11('html,body').animate({
                scrollTop: jq11(".atEQPOIVFSDFSDG-voucher-dealcoupon").offset().top
            }, 'slow');
        }


	function restartFilter() {
		url = null
		page = 1
		keyword = null
		merchant = merchantInit
		campaign = campaignInit
	}
	// detail coupon

    function changeStyleScript() {
        jq11(`<link rel="stylesheet" type="text/css" href="${at_src.replace("js/main_at_v3.js", "css/css-voucher_at_v3.css")}" media="all" />`).appendTo(jq11('head'))
        let templateStyle = '<style>';
        if (data_style_color) {
            templateStyle += `
                #tabsdeal--link .atEQPOIVFSDFSDG-nav-link.active,
                #tabsdeal--link .atEQPOIVFSDFSDG-nav-link.active em {
                  color: ${data_style_color};
                }
                #tabsdeal--link .atEQPOIVFSDFSDG-nav-link.active:after {
                    background: ${data_style_color};
                }
                .atEQPOIVFSDFSDG-btn-keyword:hover,
                .atEQPOIVFSDFSDG-btn-keyword a:hover,
                li.active a {
                  /* Auto Layout */
                  background: ${data_style_color};
                }
                .atEQPOIVFSDFSDG-btn-search {
                    background: ${data_style_color};
                }
                .atEQPOIVFSDFSDG-btn-copy {
                    background: ${data_style_color};
                }
                .atEQPOIVFSDFSDG-voucher-btn {
                    background: ${data_style_color};
                }
                .atEQPOIVFSDFSDG-line--content {
                    background: ${data_style_color};
                }
                .atEQPOIVFSDFSDG-coupon-pagination nav ul.atEQPOIVFSDFSDG-pagination li.active a {
                    background: ${data_style_color};
                }
                .atEQPOIVFSDFSDG-container-btncopy .atEQPOIVFSDFSDG-dealact-copy {
                    background: ${data_style_color};
                }
                ul.atEQPOIVFSDFSDG-tags li.active {
                  background: ${data_style_color};
                }
                `
        }
        if (data_coupon_row) {
            templateStyle += `
                .atEQPOIVFSDFSDG-dealpromo-body {
                   grid-template-columns: repeat(${data_coupon_row}, 1fr);
                }
                @media (max-width: 820px) {
                    .atEQPOIVFSDFSDG-dealpromo-body {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 767px) {
                    .atEQPOIVFSDFSDG-dealpromo-body {
                        padding: 16px 0;
                        grid-row-gap: 8px;
                        grid-template-columns: repeat(1, 1fr) !important;
                    }
                    .atEQPOIVFSDFSDG-promo-item .atEQPOIVFSDFSDG-title a {
                        max-width: 100% !important;
                    }
                }
            `
        }
        if (data_coupon_row == 3) {
            templateStyle += `
                .atEQPOIVFSDFSDG-loading {
                   padding: 0 0.5rem 0 0;
                }
                .atEQPOIVFSDFSDG-promo-item {
                    grid-template:
                        'title loading'
                        'remain btncopy' / 65% 35%
                }
                .atEQPOIVFSDFSDG-container-btncopy {
                    padding: 0 0.5rem 0 0;
                }
                .atEQPOIVFSDFSDG-container-btncopy .atEQPOIVFSDFSDG-dealact-copy {
                    padding: 4px 8px;
                    white-space: nowrap;
                }
                .atEQPOIVFSDFSDG-promo-item .atEQPOIVFSDFSDG-title a {
                    max-width: 7rem;
                }
            `
        }
        jq11(`${templateStyle} + <style>`).appendTo(jq11('head'))

    }

    function generateBlocks() {
        if (jq11(".atEQPOIVFSDFSDG-search").length > 0) {
            jq11(`
            <div class='atEQPOIVFSDFSDG-input-main-search'>
              <div class='atEQPOIVFSDFSDG-input-search'>
                <input class="atEQPOIVFSDFSDG-form-control" id="atEQPOIVFSDFSDG-search" placeholder="Nhập link sản phẩm, tên nhãn hàng, tên sản phẩm để tìm kiếm" type="text" value="">
                <span class='atEQPOIVFSDFSDG-search-clear'>
                  <i class="fas fa-times-circle" aria-hidden="true"></i>
                </span>
              </div>
              <button class='atEQPOIVFSDFSDG-btn-search'>
                <label class='atEQPOIVFSDFSDG-label-search'>Tìm kiếm</label>
                <span class='atEQPOIVFSDFSDG-icon-search'><i class="fas fa-search"></i></span>
              </button>
            </div>`).appendTo(jq11('.atEQPOIVFSDFSDG-search'))
        }
        if (jq11(".atEQPOIVFSDFSDG-filter-keyword").length > 0 && jq11(".atEQPOIVFSDFSDG-search").length === 0) {
            jq11(".atEQPOIVFSDFSDG-filter-keyword").css("margin-top", "0")
            jq11(".atEQPOIVFSDFSDG-search").css("box-shadow", 'rgba(61, 63, 64, 0.2) 0px 0px 0px 1px')
            jq11(".atEQPOIVFSDFSDG-search").css("border-radius", '4px 4px 0px 0px')
            jq11(".atEQPOIVFSDFSDG-btn-keyword").hover(() => {jq11(this).css("background","#45ca4d")},() => {jq11(this).css("background","#E5EBED")})
            jq11(".atEQPOIVFSDFSDG-btn-keyword a").hover(() => {jq11(this).css("background","#45ca4d")},() => {jq11(this).css("background","#E5EBED")})

        }
        if (jq11('.atEQPOIVFSDFSDG-title-tabs').length > 0) {
            jq11(`<div class='atEQPOIVFSDFSDG-title'>
                <span style='margin-right:8px;'>
                  <img src="${source_static}images/Vector.png">
                </span>
                <div class="atEQPOIVFSDFSDG-dealcouponlist-title">
                  <div class="atEQPOIVFSDFSDG-list-title">
                    <h4>DANH SÁCH COUPON</h4>
                    <button class='atEQPOIVFSDFSDG-delete-search' style="">
                    <span style='margin-right:8px;'>
                      <img src="${source_static}images/arrow-left.png">
                    </span>
                    <span style='color:red; font-weight: bold;'>Hủy tìm kiếm</span>
                  </button>
                </div>
                </div>
              </div>
              <div class='atEQPOIVFSDFSDG-title-tabslist'>
                <ul class="atEQPOIVFSDFSDG-nav atEQPOIVFSDFSDG-nav-tabs" id="tabsdeal--link" role="tablist">
                  <li class="atEQPOIVFSDFSDG-nav-item">
                    <a class="atEQPOIVFSDFSDG-nav-link active" id="history-tabs" data-toggle="tab" data-color="#45ca4d" href="#deal-opening" style="font-weight: bold;"  role="tab">Đang mở <em></em></a>
                  </li>
                  <li class="atEQPOIVFSDFSDG-nav-item">
                    <a class="atEQPOIVFSDFSDG-nav-link" id="record-tabs" data-toggle="tab" href="#deal-soon" style="font-weight: bold;" role="tab">Sắp mở <em></em></a>
                  </li>
                </ul>
              </div>`).appendTo(jq11(".atEQPOIVFSDFSDG-title-tabs"))
        }
        if (jq11('.atEQPOIVFSDFSDG-filters-and-delete-search').length > 0) {
            jq11(`<div class="atEQPOIVFSDFSDG-at-filters">
                <div class="atEQPOIVFSDFSDG-dropdown atEQPOIVFSDFSDG-filter-sort">
                    <div class="atEQPOIVFSDFSDG-dropdown-container">
                        <button class="atEQPOIVFSDFSDG-dropdown-toggle" type="button" id="dropdownMenuButton">
                            <span>Mới nhất</span>
                        </button>
                        <img src="${source_static}images/icon-caret.svg" alt="" style="margin-left: 0.5rem">
                    </div>

                    <div class="atEQPOIVFSDFSDG-dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropdownMenuSort">
                        <a class="atEQPOIVFSDFSDG-dropdown-item" data-sort="0" href="#" style="display: none">Mới nhất</a>
                        <a class="atEQPOIVFSDFSDG-dropdown-item" data-sort="4" href="#">Deal hot</a>
                        <a class="atEQPOIVFSDFSDG-dropdown-item" data-sort="2" href="#">Dùng nhiều</a>
                        <a class="atEQPOIVFSDFSDG-dropdown-item" data-sort="3" href="#">Thời gian còn lại</a>
                    </div>
                </div>
                <div class="atEQPOIVFSDFSDG-dropdown atEQPOIVFSDFSDG-filter-sort">
                    <div class="atEQPOIVFSDFSDG-dropdown-container">
                        <button class="atEQPOIVFSDFSDG-dropdown-toggle" type="button" id="dropdownMenuButton2">
                            <span>Tất cả nhà cung cấp</span>
                        </button>
                        <img src="${source_static}images/icon-caret.svg" alt="" style="margin-left: 0.5rem">
                    </div>

                    <div class="atEQPOIVFSDFSDG-dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropdownMenuMerchant" style="">
                    </div>
                </div>
              </div>
              <button class='atEQPOIVFSDFSDG-delete-search'>
                <span style='margin-right:8px;'>
                  <img src="${source_static}images/arrow-left.png">
                </span>
                <span style='color:red; font-weight: bold;'>Hủy tìm kiếm</span>
              </button>`).appendTo(jq11(".atEQPOIVFSDFSDG-filters-and-delete-search"))
        }
        if (jq11('.atEQPOIVFSDFSDG-voucher-dealcoupon').length > 0) {
            jq11(`
            <div class="atEQPOIVFSDFSDG-tab-content" id="tabsdeal--content">
                <div class="atEQPOIVFSDFSDG-tab-pane atEQPOIVFSDFSDG-fade show active" id="deal-opening" role="tabpanel">
                    <div id="no-coupon-link" style="display: none;text-align: center;padding: 1em;">
                        <h4>Đang cập nhật</h4>
                    </div>
                    <div class='atEQPOIVFSDFSDG-dealpromo-body'>
                    </div>
                    <div class="atEQPOIVFSDFSDG-coupon-pagination">
                      <nav>
                        <ul class="atEQPOIVFSDFSDG-pagination" name='pagination'>
                          <li class="atEQPOIVFSDFSDG-page-item" style="display: none">
                            <a onclick="prev(event,1)" class="atEQPOIVFSDFSDG-page-link" href="#" tabindex="-1"><i class="fas fa-angle-double-left"></i></a>
                          </li>
                          <li class="atEQPOIVFSDFSDG-page-item" style="display: none">
                            <a onclick="prev(event)" class="atEQPOIVFSDFSDG-page-link" href="#" tabindex="-1"><i class="fas fa-angle-left"></i></a>
                          </li>
                          <li  class="atEQPOIVFSDFSDG-page-item" style="display: none">
                            <a onclick="prev(event)" class="atEQPOIVFSDFSDG-page-link" id="prev-page-active" href="#"></a>
                          </li>
                          <li class="atEQPOIVFSDFSDG-page-item active">
                            <a class="atEQPOIVFSDFSDG-page-link" href="#"><span class="atEQPOIVFSDFSDG-sr-only"></span>1</a>
                          </li>
                          <li class="atEQPOIVFSDFSDG-page-item" style="display: none" >
                            <a onclick="next(event)" class="atEQPOIVFSDFSDG-page-link" id="next-page-active" href="#"></a>
                          </li>
                          <li class="atEQPOIVFSDFSDG-page-item" style="display: none">
                            <a onclick="next(event)" class="atEQPOIVFSDFSDG-page-link" href="#" tabindex="-1"><i class="fas fa-angle-right"></i></a>
                          </li>
                          <li class="atEQPOIVFSDFSDG-page-item" style="display: none">
                            <a  class="atEQPOIVFSDFSDG-page-link" href="#" tabindex="-1"><i class="fas fa-angle-double-right"></i></a>
                          </li>
                        </ul>
                      </nav>
                      <div class="atEQPOIVFSDFSDG-page-box">
                        <span class="atEQPOIVFSDFSDG-p-0" style="display: none"> <input class="page-selected" type="text"></span>
                        <span class="atEQPOIVFSDFSDG-text-muted" name="text-muted">Trên  trang</span>
                      </div>
                    </div>
                </div>
                <div class="atEQPOIVFSDFSDG-tab-pane atEQPOIVFSDFSDG-fade" id="deal-soon" role="tabpanel">
                    <div id="no-coupon" style="display: none;text-align: center;padding: 1em;">
                        <h4>Đang cập nhật</h4>
                    </div>
                    <div class='atEQPOIVFSDFSDG-dealpromo-body'>
                    </div>
                    <div class="atEQPOIVFSDFSDG-coupon-pagination">
                        <nav>
                            <ul class="atEQPOIVFSDFSDG-pagination" name="pagination-soon">
                                <li class="atEQPOIVFSDFSDG-page-item" style="display: none">
                                    <a onclick="prev(event,1,true)" class="atEQPOIVFSDFSDG-page-link" href="#" tabindex="-1"><i
                                            class="fas fa-angle-double-left"></i></a>
                                </li>
                                <li class="atEQPOIVFSDFSDG-page-item" style="display: none">
                                    <a onclick="prev(event,null,true)" class="atEQPOIVFSDFSDG-page-link" href="#" tabindex="-1"><i
                                            class="fas fa-angle-left"></i></a>
                                </li>
                                <li class="atEQPOIVFSDFSDG-page-item" style="display: none">
                                    <a onclick="prev(event,null,true)" class="atEQPOIVFSDFSDG-page-link" id="prev-soon-page-active"
                                       href="#"></a>
                                </li>
                                <li class="atEQPOIVFSDFSDG-page-item active">
                                    <a class="atEQPOIVFSDFSDG-page-link" href="#"><span class="atEQPOIVFSDFSDG-sr-only"></span>1</a>
                                </li>
                                <li class="atEQPOIVFSDFSDG-page-item" style="display: none">
                                    <a onclick="next(event,null,true)" class="atEQPOIVFSDFSDG-page-link" id="next-soon-page-active"
                                       href="#"></a>
                                </li>
                                <li class="atEQPOIVFSDFSDG-page-item" style="display: none">
                                    <a onclick="next(event,null,true)" class="atEQPOIVFSDFSDG-page-link" href="#" tabindex="-1"><i
                                            class="fas fa-angle-right"></i></a>
                                </li>
                                <li class="atEQPOIVFSDFSDG-page-item" style="display: none">
                                    <a class="atEQPOIVFSDFSDG-page-link" href="#" tabindex="-1"><i
                                            class="fas fa-angle-double-right"></i></a>
                                </li>
                            </ul>
                        </nav>
                        <div class="atEQPOIVFSDFSDG-page-box">
                         <span class="atEQPOIVFSDFSDG-p-0" style="display: none">
                            <input class="page-selected" type="text">
                         </span>
                         <span class="atEQPOIVFSDFSDG-text-muted" name="text-muted-soon">Trên trang</span>
                        </div>
                    </div>
                </div>
            </div>`).appendTo(jq11('.atEQPOIVFSDFSDG-voucher-dealcoupon'))
            return new Promise(resolve => {
                setTimeout(function() {
                  resolve("fast")
                  console.log("fast promise is done")
                }, 1000)
              })

        }


    }

	function generateModal() {
	jq11(`
<div id="myModalDesktop" class="atEQPOIVFSDFSDG-modal" tabindex="-1" role="dialog" aria-hidden="true" >
		<!-- Modal content -->
		<div class="atEQPOIVFSDFSDG-at-modal-content">
		<div class='atEQPOIVFSDFSDG-details'>
		  <div class='atEQPOIVFSDFSDG-details-header'>
			<div class="atEQPOIVFSDFSDG-heading--img">
			  <img class="img-fluid atEQPOIVFSDFSDG-img-cover" src="${source_static}images/logo-m1.png" alt="">
			</div>
			<div class='atEQPOIVFSDFSDG-heading--title'>
			  <p>Giảm 20K- Tối đa cho đơn hàng 200K</p>
			  <span type="button" data-dismiss="modal" aria-label="Close" class="atEQPOIVFSDFSDG-close">
				<img src="${source_static}images/icon-close.svg" alt="">
			  </span>
			</div>
			<div class='atEQPOIVFSDFSDG-heading--label'>
			  <span>shopee</span>
			</div>
		  </div>
		</div>
		<div class='atEQPOIVFSDFSDG-dotline'></div>
		<div class='atEQPOIVFSDFSDG-details-content'>
		  <div class='atEQPOIVFSDFSDG-details-remain'>
			<div class='details-loading'>
			  <div class="info-bar">
				<div class="at-alert" >
					<span style="color: red; font-size: 0.6rem; font-style: italic; line-height: 1rem">Số lượt sử dụng có hạn, chương trình và mã có thể kết thúc khi hết lượt ưu đãi hoặc khi hết hạn ưu đãi, tùy điều kiện nào đến trước.</span>
				</div>
			  </div>
			  <div class="atEQPOIVFSDFSDG-item-loading">
				<span class="atEQPOIVFSDFSDG-item-loading-desk">Còn lại 80%</span>
				<div class="atEQPOIVFSDFSDG-line">
				  <div class="atEQPOIVFSDFSDG-line--content" style="transform: translateX(-20%)"></div>
				</div>
			  </div>
			</div>
			<div class='atEQPOIVFSDFSDG-details-expiry'>
			  <div class='atEQPOIVFSDFSDG-item-timer'>
				<span>còn lại 2 ngày 3 giờ</span>
			  </div>
			</div>
		  </div>
		  <div class='atEQPOIVFSDFSDG-details-description'>
			<h3>Mô tả chi tiết</h3>
			<p></p>
		  </div>
		  <div class='atEQPOIVFSDFSDG-details-action'>
			<a class="atEQPOIVFSDFSDG-code-coupon">CASE20NHE</a>
			<a class="atEQPOIVFSDFSDG-details-dealact-copy atEQPOIVFSDFSDG-btn atEQPOIVFSDFSDG-voucher-btn atEQPOIVFSDFSDG-btnGoToLinkAff" target="_blank" href="" data-code="" type="button">Sao chép</a>
		  </div>
		</div>
		</div>
</div>
<!-- The Modal -->
<div id="myModal" class="atEQPOIVFSDFSDG-modal" tabindex="-1" role="dialog" aria-hidden="true" >
	<!-- Modal content -->
	<div class="atEQPOIVFSDFSDG-at-modal-content modal-content">
		<div class="atEQPOIVFSDFSDG-at-header">
			<div class="atEQPOIVFSDFSDG-at-header-backpage">
				<span type="button" data-dismiss="modal" aria-label="Close" class="atEQPOIVFSDFSDG-close">
					<img src="${source_static}images/return-arrow.png" alt="">
				</span>
			</div>
			<div class="atEQPOIVFSDFSDG-at-header-title">
				<p>Chi tiết Voucher</p>
			</div>
		</div>
		<div class="atEQPOIVFSDFSDG-at-body">
			<div class='atEQPOIVFSDFSDG-details'>
			  <div class='atEQPOIVFSDFSDG-details-header'>
				<div class="atEQPOIVFSDFSDG-heading--img">
				  <img class="img-fluid atEQPOIVFSDFSDG-img-cover" src="${source_static}images/logo-m1.png" alt="">
				</div>
				<div class='atEQPOIVFSDFSDG-heading--title'>
				  <p>Giảm 20K- Tối đa cho đơn hàng 200K</p>
				</div>
				<div class='atEQPOIVFSDFSDG-heading--label'>
				  <span>shopee</span>
				</div>
			  </div>
			</div>
			<div class='atEQPOIVFSDFSDG-dotline'></div>
			<div class='atEQPOIVFSDFSDG-details-content'>
			  <div class='atEQPOIVFSDFSDG-details-remain'>
				<div class='details-loading'>
				  <div class="info-bar">
					<div class="at-alert" >
						<span style="color: red; font-size: 0.6rem; font-style: italic; line-height: 1rem">Số lượt sử dụng có hạn, chương trình và mã có thể kết thúc khi hết lượt ưu đãi hoặc khi hết hạn ưu đãi, tùy điều kiện nào đến trước.</span>
					</div>
				  </div>
				  <div class="atEQPOIVFSDFSDG-item-loading">
					<span>Còn lại 80%</span>
					<div class="atEQPOIVFSDFSDG-line">
					  <div class="atEQPOIVFSDFSDG-line--content" style="transform: translateX(-20%)"></div>
					</div>
				  </div>
				</div>
				<div class='atEQPOIVFSDFSDG-details-expiry'>
				  <div class='atEQPOIVFSDFSDG-item-timer-mb-ongoing'>
					<span>còn lại 2 ngày 3 giờ</span>
				  </div>
				</div>
			  </div>
			  <div class='atEQPOIVFSDFSDG-details-action'>
				<div class="atEQPOIVFSDFSDG-details-action-label">
					<span>Mã Coupon</span>
				</div>
				<div class="atEQPOIVFSDFSDG-details-action-content">
					<div class="atEQPOIVFSDFSDG-code-coupon-vmb">
						<div class="atEQPOIVFSDFSDG-code-coupon-mb">CASE20NHE</span>
						</div>
						<div class="atEQPOIVFSDFSDG-details-dealact-copy-vmb atEQPOIVFSDFSDG-btn atEQPOIVFSDFSDG-voucher-btn">
							<a target="_blank" href="" data-code="" class="atEQPOIVFSDFSDG-btnGoToLinkAff" type="button">
							<span >
								<img src="${source_static}images/btn-copy.png" alt="">
							</span>
							Sao chép</a>
						</div>
					</div>
				</div>
			  </div>
			  <div class='atEQPOIVFSDFSDG-details-description'>
				<h3>Mô tả chi tiết</h3>
				<p></p>
			  </div>
			</div>
		</div>
		<div class="atEQPOIVFSDFSDG-details-footer">
			<a target="_blank" href="" style="color: white" data-code="" class="atEQPOIVFSDFSDG-details-copy-btn-large atEQPOIVFSDFSDG-btn atEQPOIVFSDFSDG-voucher-btn atEQPOIVFSDFSDG-btnGoToLinkAff" type="button">Sao chép mã</a>
		</div>
	</div>
</div>
<div id="myModalNextCoupon" class="atEQPOIVFSDFSDG-modal">
	<div class="atEQPOIVFSDFSDG-at-modal-content modal-content">
		<div class="atEQPOIVFSDFSDG-at-header">
			<div class="atEQPOIVFSDFSDG-at-header-backpage">
				<span type="button" data-dismiss="modal" aria-label="Close" class="atEQPOIVFSDFSDG-close">
					<img src="${source_static}images/return-arrow.png" alt="">
				</span>
			</div>
			<div class="atEQPOIVFSDFSDG-at-header-title">
				<p>Chi tiết Voucher</p>
			</div>
		</div>
		<div class="atEQPOIVFSDFSDG-at-body">
			<div class='atEQPOIVFSDFSDG-details'>
			  <div class='atEQPOIVFSDFSDG-details-header'>
				<div class="atEQPOIVFSDFSDG-heading--img">
				  <img class="img-fluid atEQPOIVFSDFSDG-img-cover" src="${source_static}images/logo-m1.png" alt="">
				</div>
				<div class='atEQPOIVFSDFSDG-heading--title'>
				  <p>Giảm 20K- Tối đa cho đơn hàng 200K</p>
				</div>
				<div class='atEQPOIVFSDFSDG-heading--label'>
				  <span>shopee</span>
				</div>
			  </div>
			</div>
			<div class='atEQPOIVFSDFSDG-dotline'></div>
			<div class='atEQPOIVFSDFSDG-details-content'>
			  <div class='atEQPOIVFSDFSDG-details-remain'>
				<div class='details-loading'>
				  <div class="atEQPOIVFSDFSDG-item-loading">
					<span class="atEQPOIVFSDFSDG-item-loading-desk">Còn lại 80%</span>
					<div class="atEQPOIVFSDFSDG-line">
					  <div class="atEQPOIVFSDFSDG-line--content" style="transform: translateX(-20%)"></div>
					</div>
				  </div>
				</div>
				<div class='atEQPOIVFSDFSDG-details-expiry'>
				  <div class='atEQPOIVFSDFSDG-item-timer'>
					<span>còn lại 2 ngày 3 giờ</span>
				  </div>
				</div>
			  </div>
			  <div class='atEQPOIVFSDFSDG-details-action'>
			  	<div class="atEQPOIVFSDFSDG-details-action-label">
			  		<span>Mã Coupon</span>
			  	</div>
				<div class="atEQPOIVFSDFSDG-details-action-content">
					<div class="atEQPOIVFSDFSDG-code-coupon-vmb">
						<div class="atEQPOIVFSDFSDG-code-coupon-mb">CASE20NHE</span>
						</div>
						<div class="atEQPOIVFSDFSDG-details-dealact-copy-vmb atEQPOIVFSDFSDG-btn atEQPOIVFSDFSDG-voucher-btn">
							<span >
								<img src="${source_static}images/btn-copy.png" alt="">
							</span>
							<a target="_blank" href="" data-code="" class="atEQPOIVFSDFSDG-btnGoToLinkAff" type="button">Sao chép</a>
						</div>
					</div>
				</div>
			  </div>
			  <div class='atEQPOIVFSDFSDG-details-description'>
				<h3>Mô tả chi tiết</h3>
				<p></p>
			  </div>
			</div>
		</div>
	</div>

</div>

<div id="myModalNextCouponDesktop" class="atEQPOIVFSDFSDG-modal">
	<!-- Modal content -->
	<div class="atEQPOIVFSDFSDG-at-modal-content">
	<div class='atEQPOIVFSDFSDG-details'>
	  <div class='atEQPOIVFSDFSDG-details-header'>
		<div class="atEQPOIVFSDFSDG-heading--img">
		  <img class="img-fluid atEQPOIVFSDFSDG-img-cover" src="${source_static}images/logo-m1.png" alt="">
		</div>
		<div class='atEQPOIVFSDFSDG-heading--title'>
		  <p>Giảm 20K- Tối đa cho đơn hàng 200K</p>
		  <span type="button" data-dismiss="modal" aria-label="Close" class="atEQPOIVFSDFSDG-close">
			<img src="${source_static}images/icon-close.svg" alt="">
		  </span>
		</div>
		<div class='atEQPOIVFSDFSDG-heading--label'>
		  <span>shopee</span>
		</div>
	  </div>
	  <div class='atEQPOIVFSDFSDG-dotline'></div>
	</div>
	<div class='atEQPOIVFSDFSDG-details-content'>
	  <div class='atEQPOIVFSDFSDG-details-remain'>
		<div class='details-loading'>
		  <div class="atEQPOIVFSDFSDG-item-loading">
			<span>Còn lại 80%</span>
			<div class="atEQPOIVFSDFSDG-line">
			  <div class="atEQPOIVFSDFSDG-line--content" style="transform: translateX(-20%)"></div>
			</div>
		  </div>
		</div>
		<div class='atEQPOIVFSDFSDG-details-expiry'>
		  <div class='atEQPOIVFSDFSDG-item-timer'>
			<span>còn lại 2 ngày 3 giờ</span>
		  </div>
		</div>
	  </div>
	  <div class='atEQPOIVFSDFSDG-details-description'>
		<h3>Mô tả chi tiết</h3>
		<p></p>
	  </div>
	  <div class='atEQPOIVFSDFSDG-details-action'>
		<a class="atEQPOIVFSDFSDG-code-coupon">CASE20NHE</a>
		<a class="atEQPOIVFSDFSDG-details-dealact-copy atEQPOIVFSDFSDG-btn atEQPOIVFSDFSDG-voucher-btn atEQPOIVFSDFSDG-btnGoToLinkAff" target="_blank" href="" data-code="" type="button">Sao chép</a>
	  </div>
	</div>
	</div>
</div>`).appendTo(jq11(".atEQPOIVFSDFSDG-voucher-main"));
	}

    jq11(document).on('click', '.atEQPOIVFSDFSDG-btnGoToLinkAff', function() {
		const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.attributes['data-code'].value;
		this.appendChild(selBox)
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        this.removeChild(selBox);
        ga('at.send', {hitType: 'event',eventCategory: 'couponsV2',eventAction: 'usevoucher',eventLabel: window.location.hostname});
	});
	// end detail coupon

	function roundUp(value){
    	return Math.ceil(value);
  	}

	// pagination
	function pagination(is_next=null){
		if (!is_next) {
			jq11("#prev-page-active")[0].innerText = page - 1
			jq11(".atEQPOIVFSDFSDG-page-item.active > a")[0].innerText = page
			jq11("#next-page-active")[0].innerText = page + 1
			if(page >=2 ) {
				jq11("ul[name='pagination'] > li").slice(0,3).show()
			}
			if(page === 1 ) {
				jq11("ul[name='pagination'] > li").slice(0,3).hide()
			}
			if (page < totalCoupon/limit ) {
				jq11("ul[name='pagination'] > li").slice(-3).show()
			}
			else {
				jq11("ul[name='pagination'] > li").slice(-3).hide()
			}
			let total = roundUp(totalCoupon/limit)
			if(total===0) {
				jq11("ul[name='pagination']").hide()
			}
			else {
				jq11("ul[name='pagination']").show()
				jq11("span[name='text-muted']").show()
			}
			if (url && url.includes('https')) {
				jq11("span[name='text-muted']").hide()
				jq11("ul[name='pagination']").hide()
			}
			jq11("span[name='text-muted']")[0].innerText = `Trên ${total} trang`
		} else {
			jq11("#prev-soon-page-active")[0].innerText = page - 1
			jq11(".atEQPOIVFSDFSDG-page-item.active > a")[1].innerText = page
			jq11("#next-soon-page-active")[0].innerText = page + 1
			if(page >=2 ) {
				jq11("ul[name='pagination-soon'] > li").slice(0,3).show()
			}
			if(page === 1 ) {
				jq11("ul[name='pagination-soon'] > li").slice(0,3).hide()
			}
			if (page < totalCouponNext/limit ) {
				jq11("ul[name='pagination-soon'] > li").slice(-3).show()
			}
			else {
				jq11("ul[name='pagination-soon'] > li").slice(-3).hide()
			}
			let total = roundUp(totalCouponNext/limit)
			if(total===0) {
				jq11("ul[name='pagination-soon']").hide()
			}
			else {
				jq11("ul[name='pagination-soon']").show()
				jq11("span[name='text-muted-soon']").show()
			}
			if (url && url.includes('https')) {
                if (jq11(".atEQPOIVFSDFSDG-title-tabs").length > 0) {
				    jq11("#record-tabs")[0].innerHTML = `Sắp mở <em>(0)</em>`
                }
				var tabContentCouponNextDayElement = jq11("#deal-soon .atEQPOIVFSDFSDG-dealpromo-body");
				tabContentCouponNextDayElement[0].innerHTML = ''
				jq11("#no-coupon").show()
				jq11("span[name='text-muted-soon']").hide()
				jq11("ul[name='pagination-soon']").hide()
			}
			jq11("span[name='text-muted-soon']")[0].innerText = `Trên ${total} trang`
		}
	}
