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
		$('#projArea,#userArea,#pwdArea,#rememberMeArea,#loginArea').hide();
		$('#top').css('height','50%');
		$('#bottom').css('height','calc(50% - 5vh)');
		$('#bottom').css('margin-left','20%');
		$('#bottom').css('margin-right','20%');
		

		$('#introduction').on('click',function(){
			console.log("introduction  click")
			callNativeInterface.changePage("introduction");
		});

		$('#mergeImage').on('click',function(){
			console.log("mergeImage  click")
			callNativeInterface.changePage("mergeImage");
		});

		$('#upload').on('click',function(){
			console.log("upload  click")
			callNativeInterface.changePage("upload");
		});

		$('#about').on('click',function(){
			console.log("about  click")
			callNativeInterface.changePage("about");
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