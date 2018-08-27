function responseFunc(functionType, result){
	//var resultObj = JSON.parse(result);
	// var resultObj = result;
	// if(functionType == 'insertProjectList'){
	// 	loginAction.insertProjectList(resultObj);
	// }
	// else if(functionType == 'insertAccountHistoryList'){
	// 	loginAction.insertAccountHistoryList(resultObj);
	// }
	// else if(functionType == 'cbAccountLogin'){
	// 	loginAction.successGotoHome(resultObj);
	// }
	// else if(functionType == 'insertProjectList'){
	// 	loginAction.insertProjectList(resultObj);
	// }
	// else if(functionType == 'insertLanguage'){
	// 	if(localStorage.getItem('langJs') != resultObj.lang){
	// 		dashboardMui.initLanguage(resultObj.lang);
	// 		dashboardMui.muiFunctions.run();
	// 	}
	// }
	// else if(functionType == 'error'){
	// 	console.log('----------------------error');
	// 	console.log(resultObj);
	// }
	// else{}
};



(function (global) {
    if (global.home) {
        return;
    }
    var home = new Object();
    home.currentDrawMode = 0;
	
	home.init = function(){
		console.log("=========home============init")
		// $('#top').css('height','50%');
		// $('#content').css('height','40%');
		// $('#content').css('margin-left','20%');
		// $('#content').css('margin-right','20%');
		// $('#bottom').css('height','10%');

		$('#nissan').on('click',function(){
			console.log("nissan  click")
			callNativeInterface.changePage("posterPage","NISSAN");
		});

		$('#toyota').on('click',function(){
			console.log("toyota  click")
			callNativeInterface.changePage("posterPage","TOYOTA");
		});

		$('#honda').on('click',function(){
			console.log("honda  click")
			callNativeInterface.changePage("posterPage","HONDA");
		});

		$('#reference').on('click',function(){
			console.log("reference  click")
			callNativeInterface.changePage("referencePage","");
		});
	};

	home.changePage = function(pageName){
		callNativeInterface.changePage(pageName);
	};

	home.drawBackground = function(){
		// if(loginAction.currentDrawMode == 0){
		// 	$('#grad2').hide();
		// 	$('#grad1').show();
		// 	$('#top').css('background-position', 'center 80%');
		// 	$('#gradBackgroud').css('bottom', '35%');
		// }else{
		// 	$('#grad1').hide();
		// 	$('#grad2').show();
		// 	$('#top').css('background-position', 'center 100%');
		// 	$('#gradBackgroud').css('bottom', '20%');
		// }
	};

    global.home = home;
})(this);