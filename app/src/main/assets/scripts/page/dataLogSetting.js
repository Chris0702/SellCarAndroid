function responseFunc(functionType, result){
	var resultObj = result;
	if(functionType == 'insertLanguage'){
		if(localStorage.getItem('langJs') != resultObj.lang){
			dashboardMui.initLanguage(resultObj.lang);
			dashboardMui.muiFunctions.run();
		}
	}
	else if(functionType == 'error'){
		console.log('----------------------error');
		console.log(resultObj);
	}else{}
};


(function (global) {
    if (global.dataLogSetting) {
        return;
    }
    var dataLogSetting = new Object();
	
	dataLogSetting.init = function(){
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();
		$('#cancelBtn').on('click', function() {
			dataLogSetting.cancelSet();
		});
		$('#applyBtn').on('click', function() {
			dataLogSetting.applySet();
		});
	};

	dataLogSetting.cancelSet = function() {
		callNativeInterface.changePage('dataLog');
	};

	dataLogSetting.applySet = function() {
		callNativeInterface.changePage('dataLog');
	};


    global.dataLogSetting = dataLogSetting;
})(this);