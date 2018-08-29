function responseFunc(functionType, result){
	//var resultObj = JSON.parse(result);
	// var resultObj = result;
	if(functionType == 'setImageAll'){
		poster.setImageAll(result);
	}
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
	else if(functionType == 'error'){
		console.log('----------------------error');
		console.log(result);
	}
	// else{}
};



(function (global) {
    if (global.frame) {
        return;
    }
    var frame = new Object();

	
	frame.init = function(){
		console.log("=========poster============init")
		// $('#projArea,#userArea,#pwdArea,#rememberMeArea,#loginArea').hide();
		// $('#top').css('height','50%');
		// $('#bottom').css('height','calc(50% - 5vh)');
		// $('#bottom').css('margin-left','20%');
		// $('#bottom').css('margin-right','20%');
		

		$('#company').on('click',function(){
			console.log("company  click")
			callNativeInterface.changePage("homePage","");
		});

		$('#poster').on('click',function(){
			console.log("poster  click")
			// callNativeInterface.changePage("posterPage","");
		});

		$('#price').on('click',function(){
			console.log("price  click")
			callNativeInterface.changePage("pricePage","");
		});

		$('#reference').on('click',function(){
			console.log("reference  click")
			callNativeInterface.changePage("referencePage","");
		});
		callNativeInterface.getCarImagePathByFolder('poster');
	};

	frame.changePage = function(pageName){
		callNativeInterface.changePage(pageName);
	};

	frame.drawBackground = function(){
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

	frame.setImageAll = function(resultObj){
		var imgArr = resultObj.imgArr;
        var serverUrl = resultObj.serverUrl
        console.log("======setImageAll======imgArr===========")
        console.log(imgArr)
        console.log("======setImageAll======serverUrl===========")
        console.log(serverUrl)
	};

    global.frame = frame;
})(this);