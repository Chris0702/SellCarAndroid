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
    if (global.price) {
        return;
    }
    var price = new Object();

	
	price.init = function(){
		console.log("=========poster============init")
		$('#projArea,#userArea,#pwdArea,#rememberMeArea,#loginArea').hide();
		$('#top').css('height','50%');
		$('#bottom').css('height','calc(50% - 5vh)');
		$('#bottom').css('margin-left','20%');
		$('#bottom').css('margin-right','20%');
		

		$('#company').on('click',function(){
			console.log("company  click")
			callNativeInterface.changePage("homePage","");
		});

		$('#poster').on('click',function(){
			console.log("poster  click")
			callNativeInterface.changePage("posterPage","");
		});

		$('#price').on('click',function(){
			console.log("price  click")
			// callNativeInterface.changePage("pricePage","");
		});

		$('#reference').on('click',function(){
			console.log("reference  click")
			callNativeInterface.changePage("referencePage","");
		});
		$('.testDrive').on('click',function(){
			console.log("reference  click")
			callNativeInterface.changePage("testDrivePage","");
		});
	};

	price.changePage = function(pageName){
		callNativeInterface.changePage(pageName);
	};

	price.drawBackground = function(){
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

    global.price = price;
})(this);