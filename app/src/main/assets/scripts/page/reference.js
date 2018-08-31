function responseFunc(functionType, result){
};



(function (global) {
    if (global.reference) {
        return;
    }
    var reference = new Object();

	reference.init = function(){
		console.log("=========reference============init")
		$('#back').on('click',function(){
			console.log("back  click")
			callNativeInterface.changePage("homePage","");
		});
	};

	reference.changePage = function(pageName){
		callNativeInterface.changePage(pageName);
	};

    global.reference = reference;
})(this);