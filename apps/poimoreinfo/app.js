localanalytics.localapp.poimoreinfo = (function(context){
	var accessToken = '9a3d398e-a63b-4fe5-9b03-1b7fe15dd1a7';
	var css = '#info_tab {position: relative !important;} .poimoreinfo_box, .poimoreinfo_paymentsmethods_box { width: auto; height: auto; border-radius: 13px 13px 13px 0; padding: 15px; background-color: white; border: 1px solid #bdbdbd; box-shadow: 2px 1px 5px #A7A7A7; position: absolute; display: none; z-index: 10; text-indent: 0; line-height: 18px; left: -58px; top: 22px; } .triangle { background: url("https://s3-sa-east-1.amazonaws.com/localapp/apps/poimoreinfo/files/arrow-up.gif") no-repeat ; width: 20px; height: 11px; position: absolute; left: 28px; top: -9px; } .poimoreinfo_clock-icon { background: url("https://s3-sa-east-1.amazonaws.com/localapp/apps/poimoreinfo/files/clock.png") no-repeat; background-position: 3px 3px; height: 18px; cursor: pointer; margin-bottom: 7px!important; padding-bottom: 8px; display: inline-block; } .poimoreinfo_open-time { cursor: pointer; position: relative; } .poimoreinfo_open-time-label:hover { color: #0366c3; } .poimoreinfo_open-time_item { list-style: none; } .poimoreinfo_open-time_item strong { font-style: italic; width: 35px; display: block; float: left } .poimoreinfo_paymentsmethods_box { max-width: 150px; display: none; left: -30px; top: 36px; } .poimoreinfo_paymentsmethods-item { cursor: pointer; } .poimoreinfo-card_flag { background: url("https://s3-sa-east-1.amazonaws.com/localapp/apps/poimoreinfo/files/cards.jpg") no-repeat; width: 33px; height: 20px; display: inline-block; text-indent: 101%; overflow: hidden; white-space: nowrap; padding: 2px; } .poimoreinfo-card_flag.visa { background-position: 0 -50px; } .poimoreinfo-card_flag.mastercard { background-position: 0 0px; } .poimoreinfo-card_flag.maestro { background-position: 0 -25px; } .poimoreinfo-card_flag.diners { background-position: 0 -155px; } .poimoreinfo-card_flag.visa_electron { background-position: 0 -77px; } .poimoreinfo-card_flag.redeshop { background-position: 0 -102px; } .poimoreinfo-card_flag.dinheiro { background-position: 0 -259px; } .poimoreinfo-card_flag.cheque { background-position: 0 -285px; } .poimoreinfo-card_flag.credicard { background-position: 0 -312px; } .poimoreinfo-card_flag.amex { background-position: 0 -129px; } .poimoreinfo-card_flag.hipercard { background-position: 0 -364px; } .poimoreinfo-card_flag.aura { background-position: 0 -338px; } .poimoreinfo-card_flag.ticket_refeicao { background-position: 0 -182px; } .poimoreinfo-card_flag.sodex_refeicao { background-position: 0 -238px; } .poimoreinfo-card_flag.vale_refeicao { background-position: 0 -208px; } .poimoreinfo-card_flag.visa_vale_refeicao { background-position: 0 -390px; } .poimoreinfo-card_flag.sodex_alimentacao { background-position: 0 -418px; } .poimoreinfo-card_flag.visa_vale { background-position: 0 -546px; } .poimoreinfo-card_flag.vale_alimentacao { background-position: 0 -442px; } .poimoreinfo-card_flag.ticket_alimentacao { background-position: 0 -468px; } .poimoreinfo-card_flag.smart_vr { background-position: 0 -571px; } .poimoreinfo-card_flag.ticket_combustivel { background-position: 0 -496px; } .poimoreinfo-card_flag.outros { background-position: 0 -521px; }',
	openTimeHtml = '<li class="item info-icon poimoreinfo_clock-icon"><span class="poimoreinfo_open-time"><span class="poimoreinfo_open-time-label">[[label]]</span> <div class="poimoreinfo_box" style="display: none;">[[boxText]]</div></span></li>',
	openTimeHtmlItem = '<li class="poimoreinfo_open-time_item"><strong>[[day]]:</strong>[[openTime]]</li>',
	flagCards = '<span class= "poimoreinfo-card_flag [[card_name]]">[[card_name]]</span>',
	lbsid = jQuery('#review_lbsId').val(),

	getInfo = function () {
		var dfd = new jQuery.Deferred();
		jQuery.ajax({
			headers: {"Authorization": "Bearer " + accessToken},
			type: "GET",
			url: "https://api.apontador.com.br/v2/places/"  + lbsid +  "?wt=json&fl=openingHour,paymentMethods,services",
			success: function(data) {
				dfd.resolve(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				dfd.reject(textStatus);
			}
		});

		return dfd.promise();
	},
	renderOpenTime = function(openingHour) {
		var html;
		var splitedHours = openingHour.split(';');

		if(splitedHours.length >= 7) {
			var infos = [];
			for(var i = 0; i < splitedHours.length; i++) {
				if(splitedHours[i].trim().length > 0) {
					infos[(i + 1)%7] = splitedHours[i];
				}
			}

			var label = infos[new Date().getDay()];
			label = label.substring(4).trim();
			label = '<strong>Hoje:</strong> ' +  (label.length > 0 ? label:'fechado');

			var boxText = '<ul>';
			for(var i = 0; i < infos.length; i++) {
				var info = infos[i];

				var day = info.substring(0, 3);
				var openTime = info.substring(3);

				html = openTimeHtmlItem;
				html = localUtil.replaceAll('\\[\\[day\\]\\]', day, html);
				html = localUtil.replaceAll('\\[\\[openTime\\]\\]', openTime, html);

				boxText += html;
			}
			boxText += '</ul>';

			html = openTimeHtml;
			html = localUtil.replaceAll('\\[\\[label\\]\\]', label, html);
			html = localUtil.replaceAll('\\[\\[boxText\\]\\]', boxText, html);

			jQuery(html).insertAfter('.poi-content .item.info-icon.info-icon-address')

			jQuery('.poimoreinfo_open-time .poimoreinfo_box').html(boxText).prepend('<div class="triangle"></div>');
			var tip = toolTip($('.poimoreinfo_clock-icon'), $('.poimoreinfo_box'));
			tip.init();
		}

	},

	createContentToFlagCards = function () {
		if (jQuery("#info_tab > .information-list").length === 0) {
			jQuery("#info_tab").prepend('<ul class="information-list"></ul>');
		}
	},

	makeHtmllist = function(data) {
		jQuery.each(data,function(index, value) {
			var card_name = value.name.toLocaleLowerCase().replace(" ","_"),
			html = flagCards,
			html = localUtil.replaceAll('\\[\\[card_name\\]\\]', card_name, html);
			jQuery('.poimoreinfo_paymentsmethods_box').append(html);
		});
	},
	renderListPaymentsMethods = function (data) {
		if (jQuery('.poimoreinfo_paymentsmethods-item').length > 0) {
			jQuery('.poimoreinfo_paymentsmethods-item').append('<div class="poimoreinfo_paymentsmethods_box"><div class="triangle"></div></div>');
			makeHtmllist(data.credit);
			makeHtmllist(data.debit);
			jQuery('.poimoreinfo_paymentsmethods-item').hover(function() {
				jQuery('.poimoreinfo_paymentsmethods_box', jQuery(this)).show();
			}, function() {
				jQuery('.poimoreinfo_paymentsmethods_box', jQuery(this)).hide();
			});
		}
	},
	renderpaymentMethods = function(data) {
		createContentToFlagCards();
		var li = '<li class="item info-icon info-icon-default poimoreinfo_paymentsmethods-item"> </li>';
		jQuery("#info_tab > .information-list").prepend(li);
		jQuery.each(data.credit, function(index, value) {
			if (index <= 2) {
				var card_name = value.name.toLocaleLowerCase().replace(" ","_"),
				html = flagCards,
				html = localUtil.replaceAll('\\[\\[card_name\\]\\]', card_name, html);
				jQuery('.poimoreinfo_paymentsmethods-item').append(html);
			}
		});
		renderListPaymentsMethods(data);
	},
	toolTip = function (target, tooltip) {
		var $target  = target,
		$tooltip = tooltip;

		closeTooltip =  function () {
			$tooltip.mouseenter(function(){
				$tooltip.css("display", "block");
			}).mouseleave(function() {
				$tooltip.css("display", "none");
			});

			$tooltip.css("display", "none");

		};

		showTooltip = function ($this) {
			closeTooltip();
			$tooltip.css("display", "block");

		};
		return {
			init: function () {
				$target.mouseover(function () {
					var $this = $(this);
					showTooltip($this);
				}).mouseleave(function () {
					closeTooltip();
				});
			}
		};
	};

	execute = function(){
		localUtil.loadJsCssFile(css, 'codecss');
		if(typeof jQuery('#review_lbsId').val() !== "undefined") {
			getInfo().then(function(data){
				var paymentMethods = data.place.paymentMethods;
				var openingHour = data.place.openingHour;
				if(openingHour) {
					renderOpenTime(openingHour);
				}
				if(paymentMethods) {
					renderpaymentMethods(paymentMethods);
				}

			}, function(error){
				localUtil.debug('error:' + error);
			});
		}

	};
	return {
		execute : execute
	};
});


//var app = {
//	"clientId": "poimoreinfo",
//	"appId": "poimoreinfo",
//	"type": 2,
//	"params" : null,
//	"matchPath" : "/local/[a-z]{2}/.*/",
//	"enabled" : true
//}
//
//localanalytics.localapp.includeApp(app);
