function responseFunc(functionType, result){
	var resultObj = result;
	//var resultObj = JSON.parse(result);
	if(functionType == 'insertNodeStatus'){
		nodeStatus.insertNodeStatus(resultObj);
	} else if(functionType == 'insertLanguage'){
		if(localStorage.getItem('langJs') != resultObj.lang){
			dashboardMui.initLanguage(resultObj.lang);
			dashboardMui.muiFunctions.run();
		}
	}
	else if(functionType == 'error'){
		console.log('----------------------error');
		console.log(resultObj);
	}else{

	}
};


(function (global) {
    if (global.nodeStatus) {
        return;
    }
    var nodeStatus = new Object();
	
	nodeStatus.init = function(){
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();

		$('#backHome').on('click',function(){
			nodeStatus.backHome();
		});

		callNativeInterface.getNodeStatus();

		// var obj = {
		// 	nodeLists:[
		// 		{nodeName:'SCADA 2',status:1},
		// 		{nodeName:'SCADA 1',status:1},
		// 		{nodeName:'SCADA 0',status:0}
		// 	]
		// }
		// nodeStatus.insertNodeStatus(obj);

	};

	nodeStatus.insertNodeStatus = function(resultObj){
		if(resultObj && resultObj.nodeLists && Array.isArray(resultObj.nodeLists)){
			var str = '';
			for(var i=0;i<resultObj.nodeLists.length;i++){
				var nodeName = $.trim(resultObj.nodeLists[i]['nodeName']);
				if(nodeName.length != 0){
					str += '<div class="nodeList displayTr">';
					str += '	<div class="displayTd"><span>'+resultObj.nodeLists[i]['nodeName']+'</span></div>';
					if(resultObj.nodeLists[i]['status'] == 1){
						str += '	<div class="displayTd"><span class="statusColor statusGreen">&nbsp</span></div>';	
					} else {
						str += '	<div class="displayTd"><span class="statusColor statusRed">&nbsp</span></div>';	
					}
					str += '</div>';
				}
			}
			$('#contentArea .displayTable').find('.nodeList').remove();
			$('#contentArea .displayTable').append(str);
		}
	}


	nodeStatus.backHome = function(){
		callNativeInterface.changePage('homePage');
	};


    global.nodeStatus = nodeStatus;
})(this);