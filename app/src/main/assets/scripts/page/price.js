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
		$('.testDrive').on('click',function(){
			console.log("reference  click")
			callNativeInterface.changePage("testDrivePage","");
		});
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
        	// console.log("======createCarItem======111=================")
        	var imgPath = resultObj.serverUrl + '/' + resultObj.carsInfo[i].imgPath;
        	// console.log(imgPath)
        	createCarItem(resultObj.carsInfo[i]._id,resultObj.carsInfo[i].name,resultObj.carsInfo[i].special_price,resultObj.carsInfo[i].price,resultObj.carsInfo[i].description,imgPath)
        	// console.log("======createCarItem======222=================")
        }
        


		// for(let i =0;i<resultObj.carsInfo.length;i++){
		// 	console.log("======setCarsInfo===@@@@@@@===resultObj.carsInfo[i].imgPath==111=========")
  //       console.log(resultObj.carsInfo[i].imgPath)
		// 	resultObj.carsInfo[i].imgPath= valueUtil.filter(resultObj.carsInfo[i].imgPath[i],"\\");
		// 	 console.log("======setCarsInfo===@@@@@@@===resultObj.carsInfo[i].imgPath==222=========")
  //       console.log(resultObj.carsInfo[i].imgPath)
		// }
		// var imgArr = resultObj.imgArr;
  //       var serverUrl = resultObj.serverUrl
  //       var carUrl = "../image/poster.jpg"
  //       console.log("======setImageAll======imgArr===========")
  //       console.log(imgArr)
  //       console.log("======setImageAll======carUrl===========")
  //       console.log(carUrl)
  //       if(imgArr.length>0){
  //       	for(var i =0;i<imgArr.length;i++){
  //       		carUrl = serverUrl + '/' + imgArr[i];
  //       		console.log("======setImageAll======carUrl===========")
  //       		console.log(carUrl)
  //       		var img = $('<img />', {
  //           	id: carUrl,
  //           	src:  carUrl,
  //       		}).appendTo($('#content'));
  //       		}
  //       }  
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
		// $('<img/>', {
		// 	src: imgPath,
  //       	class: 'col-md-4 col-sm-4 col-xs-4 col-lg-4'
  //   	}).appendTo($('#content'));


  		// $('#content').html("<br>");
		$('<br/>', {}).appendTo($('#content'));
		var item = $('<div/>', {
			id:id
			// id:id,
   //      	class: 'col-md-12 col-sm-12 col-xs-12 col-lg-12'
    	}).appendTo($('#content'));
		// item.css('background-color','blue');
		item.css('width','100%');
		item.css('height','20%');


		// var img = $('<img/>', {
		// 	src: imgPath,
		// 	height: "100%",
  //       	class: 'col-md-7 col-sm-7 col-xs-7 col-lg-7'
  //   	}).appendTo(item);

		// img.css('background-color','yellow')


  //   	var text =$('<div/>', {
  //   		id:"text_"+id,
  //       	class: 'col-md-5 col-sm-5 col-xs-5 col-lg-5'
  //   	}).appendTo(item);
  //   	var drive = $('<button/>', {
  //   		id:"button_"+id,
  //       	class: 'col-md-3 col-sm-3 col-xs-3 col-lg-3 btn-success testDrive'
  //   	}).appendTo($('#content'));
  //   	drive.html("試乘")
  //   	text.html("sdfdsdddddf");


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
        	class: 'col-md-3 col-sm-3 col-xs-3 col-lg-3 btn-success testDrive'
    	}).appendTo(item);
    	drive.html("試乘")
    	text.html("sdfdsdddddf");





    	// $('<p/>', {
    	// 	id:"text_"+id,
     //    	class: 'col-md-4 col-sm-4 col-xs-4 col-lg-4'
    	// }).appendTo($("text_"+id));
		// $('<font color="red">紅色</font>', {}).appendTo($("text_"+id));

    	


    	// var button = $('<button/>', {
     //    	id: 'downloadResult',
     //    	class: 'col-md-6 btn btn-success'
    	// }).appendTo($('#content'));;
    	
    	// $('<div/>', {
     //    	class: 'col-md-3'
    	// }).appendTo($('#content'));


	}


    global.price = price;
})(this);