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
		console.log("======setCarsInfo======resultObj.carsInfo===========")
        console.log(resultObj.carsInfo)
        console.log("======setCarsInfo======resultObj.serverUrl===========")
        console.log(resultObj.serverUrl)
		console.log("======setCarsInfo=======================")


        for(var i =0;i<resultObj.carsInfo.length;i++){
        	var imgPath = resultObj.serverUrl + '/' + resultObj.carsInfo[i].imgPath;
        	createCarItem(resultObj.carsInfo[i]._id,resultObj.carsInfo[i].name,resultObj.carsInfo[i].special_price,resultObj.carsInfo[i].price,resultObj.carsInfo[i].description,imgPath);
        }
        $('.testDrive').on('click',function(){
			console.log("testDrive  click")
			callNativeInterface.setFavoriteCar($(this).val());
			callNativeInterface.changePage("testDrivePage","");
		});
	};

	function createCarItem(id,name,special_price,price,description,imgPath){
		console.log("======createCarItem======id=================")
		console.log(id)
		console.log("======createCarItem======name=================")
		console.log(name)
		console.log("======createCarItem======special_price=================")
		console.log(special_price)
		console.log("======createCarItem======price=================")
		console.log(price)
		console.log("======createCarItem======description=================")
		console.log(description)
		console.log("======createCarItem======imgPath=================")
		console.log(imgPath)
		$('<br/>', {}).appendTo($('#content'));
		var item = $('<div/>', {
			id:"item_"+id
    	}).appendTo($('#content'));
		item.css('width','100%');
		item.css('height','20%');


		var img = $('<img/>', {
			src: imgPath,
			height: "100%",
        	class: 'col-md-5 col-sm-5 col-xs-5 col-lg-5'
    	}).appendTo(item);

		img.css('background-color','yellow')


    	var text =$('<div/>', {
    		id:"text_"+id,
        	class: 'col-md-4 col-sm-4 col-xs-4 col-lg-4'
    	}).appendTo(item);
    	var drive = $('<button/>', {
    		id:"button_"+id,
    		value:id,
        	class: 'col-md-3 col-sm-3 col-xs-3 col-lg-3 btn-success testDrive'
    	}).appendTo(item);
    	drive.html("試乘")
    	text.html(description);

	}


    global.price = price;
})(this);