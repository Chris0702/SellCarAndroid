function responseFunc(functionType, result){
	if(functionType == 'setImageAll'){
		poster.setImageAll(result);
	}
	else if(functionType == 'error'){
		console.log('----------------------error');
		console.log(result);
	}
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

	poster.setImageAll = function(resultObj){
		$('#content').children().remove();
		var imgArr = resultObj.imgArr;
        var serverUrl = resultObj.serverUrl
        var posterUrl = "../image/poster.jpg"
        console.log("======setImageAll======imgArr===========")
        console.log(imgArr)
        console.log("======setImageAll======serverUrl===========")
        console.log(serverUrl)
        console.log("======setImageAll======serverUrl=======11111====")
        if(imgArr.length>0){
        	for(var i =0;i<imgArr.length;i++){
        		posterUrl = serverUrl + '/' + imgArr[i];
        		console.log("======setImageAll======posterUrl===========")
        		console.log(posterUrl)
        		var img = $('<img />', {
            	id: posterUrl,
            	src:  posterUrl,
            	width: '100%',
            	height: '100%',
            	class: 'poster'
        		}).appendTo($('#content'));
        		}
        }

        $('.poster').on('click',function(){
			console.log("poster  click")
			callNativeInterface.changePage("pricePage","");
		});

	};

    global.poster = poster;
})(this);