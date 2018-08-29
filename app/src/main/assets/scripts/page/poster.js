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
    if (global.poster) {
        return;
    }
    var poster = new Object();

	
	poster.init = function(){
		console.log("=========poster============init")
		

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

	poster.changePage = function(pageName){
		callNativeInterface.changePage(pageName);
	};

	poster.drawBackground = function(){
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

	poster.setImageAll = function(resultObj){
		var imgArr = resultObj.imgArr;
        var serverUrl = resultObj.serverUrl
        var posterUrl = "../image/poster.jpg"
        console.log("======setImageAll======imgArr===========")
        console.log(imgArr)
        console.log("======setImageAll======serverUrl===========")
        console.log(serverUrl)
        	console.log("======setImageAll======serverUrl=======11111====")
        if(imgArr.length>0){
        	posterUrl = serverUrl + '/' + imgArr[0];
        }
        console.log("======setImageAll======posterUrl===========")
        console.log(posterUrl)
        $('#content').children().remove();
        var img = $('<img />', {
            id: posterUrl,
            src:  posterUrl,
            width: '100%',
            height: '100%'
        }).appendTo($('#content'));
	};

    global.poster = poster;
})(this);