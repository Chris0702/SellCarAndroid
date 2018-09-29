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
    if (global.test) {
        return;
    }
    var test = new Object();
   
	
	test.init = function(){
		console.log("=========test============init")
		// $('#top').css('height','50%');
		// $('#content').css('height','40%');
		// $('#content').css('margin-left','20%');
		// $('#content').css('margin-right','20%');
		// $('#bottom').css('height','10%');

		$('#nissan').on('click',function(){
			console.log("nissan  click")
			$('#nissan').css('height','50%');
			// callNativeInterface.changePage("posterPage","NISSAN");
		});

	};

	

    global.test = test;
})(this);