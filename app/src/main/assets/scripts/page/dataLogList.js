function responseFunc(functionType, result) {
	var resultObj = result;
	if (functionType == 'insertHisTrendGroupId') {
		dataLogList.insertdataLogListByNode(resultObj);
	} else if (functionType == 'insertNodeList') {
		dataLogList.insertNodeList(resultObj);
	} else if (functionType == 'insertLanguage'){
		if(localStorage.getItem('langJs') != resultObj.lang){
			dashboardMui.initLanguage(resultObj.lang);
			dashboardMui.muiFunctions.run();
		}
	} else if (functionType == 'error') {
		console.log('----------------------error');
		console.log(resultObj);
	} else {

	}
};


(function(global) {
	if (global.dataLogList) {
		return;
	}
	var dataLogList = new Object();

	dataLogList.nodeName = '';

	dataLogList.init = function() {
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();

		$('#backHome').on('click', function() {
			dataLogList.backHome();
		});

		$('#nodeList').on('change', function() {
			dataLogList.changeNode();
		});

		$('#dataLogList').on('click',function(e){
			if($(e.target).is('.mapItem') || $(e.target).parents('.mapItem').length > 0){
				var mapName = '';
				if($(e.target).is('.mapItem')){
					mapName = $(e.target).find('input[name=mapName]').first().val();
				}else{
					mapName = $(e.target).parents('.mapItem').find('input[name=mapName]').first().val();
				}
				dataLogList.gotoTrendPage(mapName);
			}
		});

		dataLogList.getNodeList();
	};

	dataLogList.getNodeList = function() {
		callNativeInterface.getNodeList();
	};

	dataLogList.backHome = function() {
		callNativeInterface.changePage('homePage');
	};

	dataLogList.changeNode = function() {
		dataLogList.nodeName = $("#nodeList").val();
		dataLogList.getdataLogListByNode();
	};

	dataLogList.insertNodeList = function(resultObj) {
		var nodeLists = resultObj.nodeLists;
		var str = '';
		for (var i = 0; i < nodeLists.length; i++) {
			str += '<option value="' + nodeLists[i]['nodeName'] + '">' + nodeLists[i]['nodeName'] + '</option>';
		}
		$('#nodeList').html(str);
		$("#nodeList option:first").attr('selected', 'selected');
		dataLogList.nodeName = $('#nodeList').val();
		dataLogList.getdataLogListByNode();
	};

	dataLogList.getdataLogListByNode = function(){
		callNativeInterface.getHisTrendGroupId(dataLogList.nodeName);
	};

	dataLogList.insertdataLogListByNode = function(resultObj){
		var dataLogList = resultObj.dataLogList;
		var str = '';
		for (var i = 0; i < dataLogList.length; i++) {
			str += '<li class="mapItem">';
			str += '	<span class="itemSelect"></span>';
			str += '	<span class="itemText">'+dataLogList[i]['name']+'</span>';
			str += '	<button class="itemNext"></button>';
			str += '	<input type="hidden" name="mapName" value="'+dataLogList[i]['name']+'">';
			str += '</li>';
		}
		$('#dataLogList').html(str);
	};

	dataLogList.gotoTrendPage = function(mapName){
		callNativeInterface.setLocalStorageMem('mapScadaNode',dataLogList.nodeName);
		callNativeInterface.setLocalStorageMem('mapName',mapName);
		callNativeInterface.changePage('dataLog');	
	};


	global.dataLogList = dataLogList;
})(this);