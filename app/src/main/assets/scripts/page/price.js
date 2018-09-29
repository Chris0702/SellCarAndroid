function responseFunc(functionType, result){
	if(functionType == 'setCarsInfo'){
		price.setCarsInfo(result);
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
		// $('.testDrive').on('click',function(){
		// 	console.log("testDrive  click")
		// 	callNativeInterface.changePage("testDrivePage","");
		// });
		callNativeInterface.getCarsInfoByCompany();
	};

	price.changePage = function(pageName){
		callNativeInterface.changePage(pageName);
	};

	price.setCarsInfo = function(resultObj){
		$('#content').children().remove();
        for(var i =0;i<resultObj.carsInfo.length;i++){
        	var imgPath = resultObj.serverUrl + '/' + resultObj.carsInfo[i].imgPath;
        	createCarItem(resultObj.carsInfo[i]._id,resultObj.carsInfo[i].name,resultObj.carsInfo[i].special_price,resultObj.carsInfo[i].price,resultObj.carsInfo[i].description,imgPath);
        }
        $('.testDrive').on('click',function(){
			console.log("testDrive  click")
			callNativeInterface.setFavoriteCar($(this).attr('name'));
			callNativeInterface.changePage("testDrivePage","");
		});
	};

	function createCarItem(id,name,special_price,price,description,imgPath){
		// $('<br/>', {}).appendTo($('#content'));
		var titleName =$('<div/>', {
        	class: 'col-md-12 col-sm-12 col-xs-12 col-lg-12'
    	}).appendTo($('#content'));
    	titleName.html("車型: "+ name)
    	titleName.css("color","blue")
    	titleName.css("margin-top","5%")
		var img = $('<img/>', {
			src: imgPath,
        	class: 'col-md-6 col-sm-6 col-xs-6 col-lg-6'
    	}).appendTo($('#content'));

    	var priceText =$('<div/>', {
    		id:"priceText"+id,
        	class: 'col-md-6 col-sm-6 col-xs-6 col-lg-6'
    	}).appendTo($('#content'));
    	priceText.css("font-size","1em")
   		priceText.css("color","red")
    	priceText.html(special_price+" ~ "+price+" 萬元");
    	var descriptionText = $('<div/>', {
        	class: 'col-md-7 col-sm-7 col-xs-7 col-lg-7'
    	}).appendTo($('#content'));
    	descriptionText.html(description)
    	var drive = $('<a/>', {
    		id:"button_"+id,
    		name:id,
    		href:"#",
        	class: 'button button-3d-action button-pill col-md-5 col-sm-5 col-xs-5 col-lg-5 testDrive'
    	}).appendTo($('#content'));
    	drive.html("預約試乘")
	}


    global.price = price;
})(this);