function responseFunc(functionType, result){
	if(functionType == 'setImageAll'){
		price.setImageAll(result);
	}
	else if(functionType == 'error'){
		console.log('----------------------error');
		console.log(result);
	}
};



(function (global) {
    if (global.price) {
        return;
    }
    var price = new Object();

	
	price.init = function(){
		console.log("=========price============init")
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
		callNativeInterface.getCarImagePathByFolder('car');
	};

	price.changePage = function(pageName){
		callNativeInterface.changePage(pageName);
	};

	price.setImageAll = function(resultObj){
		$('#content').children().remove();
		var imgArr = resultObj.imgArr;
        var serverUrl = resultObj.serverUrl
        var carUrl = "../image/poster.jpg"
        console.log("======setImageAll======imgArr===========")
        console.log(imgArr)
        console.log("======setImageAll======carUrl===========")
        console.log(carUrl)
        if(imgArr.length>0){
        	for(var i =0;i<imgArr.length;i++){
        		carUrl = serverUrl + '/' + imgArr[i];
        		console.log("======setImageAll======carUrl===========")
        		console.log(carUrl)
        		var img = $('<img />', {
            	id: carUrl,
            	src:  carUrl,
        		}).appendTo($('#content'));
        		}
        }  
	};

    global.price = price;
})(this);