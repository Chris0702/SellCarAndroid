function responseFunc(functionType, result) {
	var resultObj = result;
	if (functionType == 'insertMapListByNode') {
		mapList.insertMapListByNode(resultObj);
	} else if (functionType == 'insertNodeList') {
		mapList.insertNodeList(resultObj);
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
	if (global.mapList) {
		return;
	}
	var mapList = new Object();

	mapList.nodeName = '';

	mapList.init = function() {
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();

		$('#backHome').on('click', function() {
			mapList.backHome();
		});

		$('#nodeList').on('change', function() {
			mapList.changeNode();
		});

		$('#mapList').on('click',function(e){
			if($(e.target).is('.mapItem') || $(e.target).parents('.mapItem').length > 0){
				var mapType = '';
				var mapName = '';
				if($(e.target).is('.mapItem')){
					mapType = $(e.target).find('input[name=mapType]').first().val();
					mapName = $(e.target).find('input[name=mapName]').first().val();
				}else{
					mapType = $(e.target).parents('.mapItem').find('input[name=mapType]').first().val();
					mapName = $(e.target).parents('.mapItem').find('input[name=mapName]').first().val();
				}
				mapList.gotoMapPage(mapType, mapName);
			}
		});

		mapList.getNodeList();
	};

	mapList.getNodeList = function() {
		callNativeInterface.getNodeList();
	};

	mapList.backHome = function() {
		callNativeInterface.changePage('homePage');
	};

	mapList.changeNode = function() {
		mapList.nodeName = $("#nodeList").val();
		mapList.getMapListByNode();
	};

	mapList.insertNodeList = function(resultObj) {
		var nodeLists = resultObj.nodeLists;
		var str = '';
		for (var i = 0; i < nodeLists.length; i++) {
			str += '<option value="' + nodeLists[i]['nodeName'] + '">' + nodeLists[i]['nodeName'] + '</option>';
		}
		$('#nodeList').html(str);
		$("#nodeList option:first").attr('selected', 'selected');
		mapList.nodeName = $('#nodeList').val();
		mapList.getMapListByNode();
	};

	mapList.getMapListByNode = function(){
		callNativeInterface.getMapListByNode(mapList.nodeName);
	};

	mapList.insertMapListByNode = function(resultObj){
		var mapList = resultObj.mapList;
		var str = '';
		for (var i = 0; i < mapList.length; i++) {
			str += '<li class="mapItem">';
			str += '	<span class="itemSelect '+mapList[i]['type']+'"></span>';
			str += '	<span class="itemText">'+mapList[i]['name']+'</span>';
			str += '	<button class="itemNext"></button>';
			str += '	<input type="hidden" name="mapType" value="'+mapList[i]['type']+'">';
			str += '	<input type="hidden" name="mapName" value="'+mapList[i]['name']+'">';
			str += '</li>';
		}
		$('#mapList').html(str);
	};

	mapList.gotoMapPage = function(mapType, mapName){
		callNativeInterface.setLocalStorageMem('mapScadaNode',mapList.nodeName);
		callNativeInterface.setLocalStorageMem('mapType',mapType);
		callNativeInterface.setLocalStorageMem('mapName',mapName);
		if(mapType == 'g'){
			callNativeInterface.changePage('map');	
		}else{
			callNativeInterface.changePage('bmapPage');	
		}
		
	};


	global.mapList = mapList;
})(this);