let name = "";
let company = "";
let phone = "";
let address = "台北市文山區";
let paymentType = "現金";
let carName ="閃電霹靂車";
let carCompany = "管生車隊";
let carVersion = "";
let carColor = "金色";
let hopeTime = "3000年7月2日";

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
	if(functionType == 'setCarsInfo'){
		testDrive.setCarsInfo(result);
	}
	else if(functionType == 'error'){
		console.log('----------------------error');
		console.log(result);
	}
};



(function (global) {
    if (global.testDrive) {
        return;
    }
    var testDrive = new Object();

	
	testDrive.init = function(){
		console.log("=========testDrive============init")
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
			callNativeInterface.changePage("pricePage","");
		});

		$('#reference').on('click',function(){
			console.log("reference  click")
			callNativeInterface.changePage("referencePage","");
		});
		callNativeInterface.getCarsInfoById();
		$('#subscribe').on('click',function(){
			console.log("subscribe  click")
			name = $('#name').val();
			company = $('#user_company').val();
			phone = $('#phone').val();
			address = $('#address').val();
			paymentType = $('#paymentType').val();
			carColor = $('#carColor').val();
			hopeTime = $('#hopeDate').val()+" "+$('#hopeTime').val();
			if(name==""||phone==""){
				callNativeInterface.toast("姓名、電話 未填寫");
			}else{
				callNativeInterface.orderTestDrive(name, company, phone, address, paymentType, carName, carCompany, carVersion, carColor, hopeTime);
			}
		});
	};

	testDrive.changePage = function(pageName){
		callNativeInterface.changePage(pageName);
	};

	testDrive.setCarsInfo = function(resultObj){
		// $('#content').children().remove();
		console.log("======setCarsInfo======resultObj.carsInfo===========")
        console.log(resultObj.carsInfo)
        console.log("======setCarsInfo======resultObj.serverUrl===========")
        console.log(resultObj.serverUrl)
		console.log("======setCarsInfo=======================")
		if(resultObj.carsInfo.length>0){
			var car = resultObj.carsInfo[0];
			console.log("======@@@@@@======car._id===========")
        	console.log(car._id)
        	console.log("======@@@@@@======car.company===========")
        	console.log(car.company)
        	console.log("======@@@@@@======car.name===========")
        	console.log(car.name)
        	console.log("======@@@@@@======car.color===========")
        	console.log(car.color)
        	console.log("======@@@@@@======car.price===========")
        	console.log(car.price)
        	console.log("======@@@@@@======car.special_price===========")
        	console.log(car.special_price)
        	console.log("======@@@@@@======car.description===========")
        	console.log(car.description)
        	console.log("======@@@@@@======car.imgPath===========")
        	console.log(car.imgPath)
        	carName = car.name;
        	carCompany = car.company;
        	$('#carCompany').html(car.company);
        	$('#carName').html(car.name);
        	for(var i=0;i<car.color.length;i++){
        		$('#carColor').append($("<option></option>").attr("value", car.color[i]).text(car.color[i]));
        		
        	}

		}
		

        // for(var i =0;i<resultObj.carsInfo.length;i++){
        // 	var imgPath = resultObj.serverUrl + '/' + resultObj.carsInfo[i].imgPath;
        // 	createCarItem(resultObj.carsInfo[i]._id,resultObj.carsInfo[i].name,resultObj.carsInfo[i].special_price,resultObj.carsInfo[i].price,resultObj.carsInfo[i].description,imgPath);
        // }
  //       $('.testDrive').on('click',function(){
		// 	console.log("testDrive  click")
		// 	callNativeInterface.setFavoriteCar($(this).val());
		// 	callNativeInterface.changePage("testDrivePage","");
		// });
	};

    global.testDrive = testDrive;
})(this);
