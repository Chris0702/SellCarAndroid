let name = "克里斯";
let company = "克里斯公司";
let phone = "0909636123";
let address = "台北市文山區";
let paymentType = "現金";
let carName ="閃電霹靂車";
let carCompany = "管生車隊";
let carVersion = "阿斯拉1234";
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

		// $('#subscribe').on('click',function(){
		// 	console.log("subscribe  click")
		// 	callNativeInterface.orderTestDrive(name, company, phone, address, paymentType, carName, carCompany, carVersion, carColor, hopeTime);
		// });
	};

	testDrive.changePage = function(pageName){
		callNativeInterface.changePage(pageName);
	};

    global.testDrive = testDrive;
})(this);