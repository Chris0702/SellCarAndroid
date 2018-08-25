function responseFunc(functionType, result){
	var resultObj = result;
	//var resultObj = JSON.parse(result);
	if(functionType == 'error'){
		console.log('----------------------error');
		console.log(resultObj);
	}else if(functionType == 'insertLanguage'){
		if(localStorage.getItem('langJs') != resultObj.lang){
			dashboardMui.initLanguage(resultObj.lang);
			dashboardMui.muiFunctions.run();
		}
	}
	else if(functionType == 'error'){
		console.log('----------------------error');
		console.log(resultObj);
	}else{

	}
};


(function (global) {
    if (global.tagsInfoGroup) {
        return;
    }
    var tagsInfoGroup = new Object();
	
	tagsInfoGroup.init = function(){
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();

		$('#backHome').on('click',function(){
			tagsInfoGroup.backHome();
		});

		$('#groupList').on('click',function(e){
			if($(e.target).parents('li[data-value]').length > 0
				|| $(e.target).is('li[data-value]')){
				if($(e.target).parents('li[data-value]').length > 0){
					var dataValue = $(e.target).parents('li[data-value]').first().attr('data-value');
					tagsInfoGroup.gotoTagsList(dataValue);
				}else{
					var dataValue = $(e.target).attr('data-value');
					tagsInfoGroup.gotoTagsList(dataValue);
				}
			}
		});

		/*$('#iconSearchBtn').on('click',function(){
			tagsInfoGroup.backHome();
		});
		$('#closeSearchBtn').on('click',function(){
			tagsInfoGroup.backHome();
		});*/
	};

	tagsInfoGroup.gotoTagsList = function(groupName){
		//localStorage.setItem('tagsGroupName', groupName);
		callNativeInterface.setLocalStorageMem('tagsGroupName',groupName);
		callNativeInterface.setLocalStorageMem('tagLiCurPage','');
		callNativeInterface.setLocalStorageMem('tagLiSearchStart','');
		callNativeInterface.setLocalStorageMem('tagLiSearchCurPage','');
		callNativeInterface.changePage('tagsInfoList');
	};

	tagsInfoGroup.backHome = function(){
		callNativeInterface.changePage('homePage');
	};


    global.tagsInfoGroup = tagsInfoGroup;
})(this);