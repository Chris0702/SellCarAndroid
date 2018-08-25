function responseFunc(functionType, result){
	var resultObj = result;
	//var resultObj = JSON.parse(result);
	if(functionType == 'insertFunctionList'){
		config.insertFunctionList(resultObj);
	}else if(functionType == 'cbLanguage'){

	}else if(functionType == 'insertLanguage'){
		if(localStorage.getItem('langJs') != resultObj.lang){
			dashboardMui.initLanguage(resultObj.lang);
			dashboardMui.muiFunctions.run();
		}
    }else if(functionType == 'insertVersion'){
        alert(resultObj);
            config.insertVersion(resultObj);
    }else{}
};



(function (global) {
    if (global.config) {
        return;
    }
    var config = new Object();
	
	config.init = function(){
		callNativeInterface.getFunctionList();
		$('#backHome').on('click',function(){
			config.backHome();
		});
		$('.func').on('change',function(){
			config.saveFunctionList();
		});
		$('#langType').on('click',function(e){
			if($(e.target).is('button[data-value]')){
				config.setLanguage($(e.target).attr('data-value'));
			}
		});
		if(localStorage.getItem('langJs')){
			config.setLanguage(localStorage.getItem('langJs'));
		}
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();
        callNativeInterface.getVersion();
		
		$('.titleList').on('click',function(e){
			if($(e.target).is('.openBtn')){
				if(!$(e.target).hasClass('opened')){
					$(e.target).addClass('opened');
				}else{
					$(e.target).removeClass('opened');
				}
				config.openContent($(e.target).parent('li.titleList'));
			}else if($(e.target).parents('li.titleList').find('.openBtn').length > 0){
				if(!$(e.target).parents('li.titleList').find('.openBtn').first().hasClass('opened')){
					$(e.target).parents('li.titleList').find('.openBtn').first().addClass('opened');
				}else{
					$(e.target).parents('li.titleList').find('.openBtn').first().removeClass('opened');
				}
				config.openContent($(e.target).parents('li.titleList').first());				
			}else if($(e.target).parents('li.titleList').first().is('#logoutBtn')){
				callNativeInterface.logout();
			}

		});
		/*$('.openBtn').on('click',function(e){
			if(!$(this).hasClass('opened')){
				$(this).addClass('opened');
			}else{
				$(this).removeClass('opened');
			}
			config.openContent($(this).parent('li.titleList'));
		});

		$('#logoutBtn').on('click',function(e){
			callNativeInterface.logout();
		});*/
	};

	config.backHome = function(){
		callNativeInterface.changePage('homePage');
	};

	config.logout = function(){
		callNativeInterface.logout();
	};

	config.insertFunctionList = function(resultObj){
		if(resultObj && resultObj.funcList){
			var funcList = resultObj.funcList;
			if(funcList.nodeStatus == 'true'){$('input[name=nodeStatus]').get(0).checked = true;}
			if(funcList.actionLog == 'true'){$('input[name=actionLog]').get(0).checked = true;}
			if(funcList.alarmLog == 'true'){$('input[name=alarmLog]').get(0).checked = true;}
			if(funcList.alarmSummary == 'true'){$('input[name=alarmSummary]').get(0).checked = true;}
			if(funcList.trend == 'true'){$('input[name=trend]').get(0).checked = true;}
			if(funcList.dashboard == 'true'){$('input[name=dashboard]').get(0).checked = true;}
			if(funcList.tagsInfo == 'true'){$('input[name=tagsInfo]').get(0).checked = true;}
			if(funcList.map == 'true'){$('input[name=map]').get(0).checked = true;}
			if(funcList.datalog == 'true'){$('input[name=datalog]').get(0).checked = true;}
			if(funcList.stationStatus == 'true'){$('input[name=stationStatus]').get(0).checked = true;}
		}
	};

	config.getFunctionList = function(){
		callNativeInterface.getFunctionList();
	};

	config.saveFunctionList = function(){
		var funcList = {};
		funcList.nodeStatus = $('input[name=nodeStatus]').get(0).checked;
		funcList.actionLog = $('input[name=actionLog]').get(0).checked;
		funcList.alarmLog = $('input[name=alarmLog]').get(0).checked;
		funcList.alarmSummary = $('input[name=alarmSummary]').get(0).checked;
		funcList.trend = $('input[name=trend]').get(0).checked;
		funcList.dashboard = $('input[name=dashboard]').get(0).checked;
		funcList.tagsInfo = $('input[name=tagsInfo]').get(0).checked;
		funcList.map = $('input[name=map]').get(0).checked;
		funcList.datalog = $('input[name=datalog]').get(0).checked;
		funcList.stationStatus = $('input[name=stationStatus]').get(0).checked;
		callNativeInterface.saveFunctionList(funcList);
	};

	config.setLanguage = function(lang){
		localStorage.setItem('langJs', lang);
		dashboardMui.muiFunctions.change(lang);
		callNativeInterface.setLanguage(lang);
		//localStorage.getItem('langJs')
		//$('#langType').val(localStorage.getItem('langJs'));
		$('#langType').find('button[data-value]').removeClass('selectLang');
		$('#langType').find('button[data-value = '+lang+']').addClass('selectLang');
	};
 
    config.insertVersion = function(resultObj){
        if(resultObj && resultObj.version){
            $('#versionType').find('span[name=appVersion]').text(resultObj.version.appVersion);
            if(resultObj.version.serverVersion){
                $('#versionType').children('div.displayTr').eq(1).show();
                $('#versionType').find('span[name=serverVersion]').text(resultObj.version.serverVersion);
            }else{
                $('#versionType').children('div.displayTr').eq(1).hide();
            }
        }
    };

	config.cbLanguage = function(){

	};

	config.openContent = function(liElem){
		$('li.titleList').removeClass('currentOpen');
		if($(liElem).hasClass('openContent')){
			$(liElem).removeClass('openContent');
			$(liElem).next('.contentList').hide();	
		}else{
			$(liElem).addClass('openContent');
			$(liElem).addClass('currentOpen');
			$(liElem).next('.contentList').show();
		}

		$('li.titleList').each(function(index){
			if($(this).hasClass('openContent') && !$(this).hasClass('currentOpen')){
				$(this).removeClass('openContent');
				$(this).next('.contentList').hide();
				$(this).find('.openBtn').removeClass('opened');	
			}	
		});
		
	};


    global.config = config;
})(this);
