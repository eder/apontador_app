localanalytics.localapp.validatephone = (function (context) {
    'use strict';
    var _private, accessToken, body, endPoint,
        verifyCorrectPhone, execute, reasonWrongPhone, css;

    css = '.validatephone-reason{background: #FFF9B2; width: 385px; min-height: 70px; padding: 15px 0px 0 0px; color: #666; display: block; text-align: center; margin-bottom: 10px; } .validatephone-reason ul{font-weight: 300; font-size: 19px; list-style: none; } .validatephone-reason ul li{line-height:35px; display: inline-block; margin-right: 10px; } .validatephone-reason ul li:last-child{padding-right: 0px; } .validatephone-reason label, input[type="radio"] {vertical-align: middle; } .validatephone-reason p{font-size: 13px; font-weight: 300; margin-bottom: 0; } .validatephone-label, .validatephone-reason-label {-webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; background: #f47820; font-size: 13px; display: block; line-height: 18px; padding: 5px; position: relative; top: -24px; color: #FFF; width: 50px; cursor: pointer; text-align: center; } .validatephone-reason-label  {width: 130px } /*--- Este telefone está correto?---*/ ul.validatephone-phone {font-weight: 300; font-size: 19px; list-style: none; clear: both; } ul.validatephone-phone  li{display: inline-block; } ul.validatephone-phone  li:last-child{padding-right: 0px; } /*--- Obrigado----*/ p.validatephone-thanks{padding-top: 10px; font-size: 18px; } }';    
    accessToken = "c39ced23-7fae-4779-8265-cb737b769c91";
     var _sendData = function(params) {
       jQuery.ajax({
            headers: {'Authorization': 'Bearer' + accessToken},
            type: params.type,
            url: endPoint(),
            data: params.body,
            success: function (data) {
                params.callback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                _error();
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('content-type','application/json');
                xhr.setRequestHeader('Accept','application/json');
            }
        });
     },
     _error = function() {
         jQuery('.validatephone-reason').hide();
     };
    

    reasonWrongPhone = (function () {
        var makeHtmlReason = function (data) {
            jQuery('.validatephone-reason').hide();
            var html = '<div class="validatephone-reason"> <p>Qual o motivo?</p> <ul class="validatephone-phone"> <li> <input type="radio" name="reason-phone-wrong" value="BUSY" id="phone-busy"> <label  for="phone-busy" class="validatephone-reason-label">Ocupado/Só chama</label> </li> <li> <input type="radio" name="reason-phone-wrong" value="NO_LONGER_EXISTS"  id="phone-only_calls"> <label for = "phone-only_calls" class="validatephone-reason-label">Engano/Não existe</label> </li> </ul> </div>';
                jQuery('.admanager-phone').append(html);
                jQuery('input:radio[name=reason-phone-wrong]').on('click', function (e) {
                    e.preventDefault();
                    var result = $("input:radio[name=reason-phone-wrong]:checked").val();
                    request(data, result);
            });

        },
        success = function () {
            var html = '<div class="validatephone-reason"> <p class="validatephone-thanks">Obrigado!</p> </div>';
                jQuery('.validatephone-reason').hide();
                jQuery( ".admanager-phone" ).fadeIn( "slow", function() {
                     jQuery('.admanager-phone').append(html);
                });
        },
        request=  function (data, reason) {
                var body = JSON.stringify({'placePhoneModeration': {'id': data.id, 'reason': reason }});
                _sendData({body: body, type: "PUT", callback: success});
        };
        return {
            success: function() {
                success();
            },
            process : function (data) {
                makeHtmlReason(data);
            }
        };
    })();

    verifyCorrectPhone = (function () {
        endPoint = function () {
            var uri = 'https://api.apontador.com.br/v2/places/',
                id = jQuery('#review_lbsId').val(),
                url = uri + id + '/phones/moderation';
            return url;
        };
        _private = {
            fixPhone : function (isValid, phone, callback) {
                body = JSON.stringify({'placePhoneModeration': {'valid': isValid, 'phone': phone }});
                _sendData({body: body, type: "POST", callback: callback});
            }
        };


        return {
            validateActicon : function (action) {
                if (action === 'false') {
                    _private.fixPhone(action, this.getPhone(),  reasonWrongPhone.process);
                } else {
                    _private.fixPhone(action, this.getPhone(),  reasonWrongPhone.success);
                }
            },

            phonePlaceOnlyDigits: function (phonePlace) {
                var numberPattern = /\d+/g,
                    phone = phonePlace.match(numberPattern).join("");
                if (phone.length < 12) {
                    phone  = '55' + phone;
                }
                return phone;
            },
            getPhone : function () {    
                if ($('.info-icon-phone strong').attr('data-content').length > 0) {
                    var phone_place = $('.info-icon-phone strong').attr('data-content');
                    return this.phonePlaceOnlyDigits(phone_place);
                }
            },
            makeHtmlPhone :  function () {
                var that = this,
                    html = '<div class="validatephone-reason"> <p>Este telefone está correto?</p> <ul class="phone"> <li> <input type="radio" name="fix-phone" id="correct-phone"  value="true"> <label for="correct-phone" class="validatephone-label">Sim</label> </li> <li><input type="radio" name="fix-phone" id="wrong-phone", value="false"> <label for="wrong-phone" class="validatephone-label">Não</label> </li> </ul> </div>';
                jQuery('.admanager-phone').append(html);
                jQuery('input:radio[name=fix-phone]').on('click', function (e) {
                    e.preventDefault();
                    var result = jQuery('input:radio[name=fix-phone]:checked').val();
                    that.validateActicon(result);
                    
                });
            },
            process :  function () {
                var that = this;
                if (typeof jQuery('#review_lbsId').val() !== 'undefined') {
                    jQuery('.info-icon-phone').on('click', function(e) {
                        e.preventDefault();
                        if (jQuery('.validatephone-reason').length === 0) {
                            that.makeHtmlPhone();
                        }   
                    });
                        
                }
            }
        };
    })();

    execute = function () {
        localUtil.loadJsCssFile(css, 'codecss');
        verifyCorrectPhone.process();
    };
    return {
        execute : execute
    };
});
var app = {
    "clientId": "validatephone",
    "appId": "validatephone",
    "type": 2,
    "params" : null,
    "matchPath" : "/local/[a-z]{2}/.*/",
    "enabled" : true
};

localanalytics.localapp.includeApp(app);
