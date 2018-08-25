function responseFunc(functionType, result) {
	var resultObj = result;
	if (functionType == 'insertRTrendId') {
		trendList.insertRTrendId(resultObj);
	} else if (functionType == 'insertNodeList') {
		trendList.insertNodeList(resultObj);
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
	if (global.trendList) {
		return;
	}
	var trendList = new Object();

	trendList.nodeName = '';

	trendList.init = function() {
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();

		$('#backHome').on('click', function() {
			trendList.backHome();
		});

		$('#nodeList').on('change', function() {
			trendList.changeNode();
		});

		$('#trendList').on('click',function(e){
			if($(e.target).is('.mapItem') || $(e.target).parents('.mapItem').length > 0){
				var mapName = '';
				if($(e.target).is('.mapItem')){
					mapName = $(e.target).find('input[name=mapName]').first().val();
				}else{
					mapName = $(e.target).parents('.mapItem').find('input[name=mapName]').first().val();
				}
				trendList.gotoTrendPage(mapName);
			}
		});

		trendList.getNodeList();
	};

	trendList.getNodeList = function() {
		callNativeInterface.getNodeList();
	};

	trendList.backHome = function() {
		callNativeInterface.changePage('homePage');
	};

	trendList.changeNode = function() {
		trendList.nodeName = $("#nodeList").val();
		trendList.gettrendListByNode();
	};

	trendList.insertNodeList = function(resultObj) {
		var nodeLists = resultObj.nodeLists;
		var str = '';
		for (var i = 0; i < nodeLists.length; i++) {
			str += '<option value="' + nodeLists[i]['nodeName'] + '">' + nodeLists[i]['nodeName'] + '</option>';
		}
		$('#nodeList').html(str);
		$("#nodeList option:first").attr('selected', 'selected');
		trendList.nodeName = $('#nodeList').val();
		trendList.gettrendListByNode();
	};

	trendList.gettrendListByNode = function(){
		callNativeInterface.getRTrendGroupId(trendList.nodeName);
	};

	trendList.insertRTrendId = function(resultObj){
		var trendList = resultObj.trendList;
		var str = '';
        for (var i = 0; i < trendList.length; i++) {
            str += '<li class="mapItem">';
            str += '	<span class="itemSelect"></span>';
            str += '	<span class="itemText">'+trendList[i]['GroupNbr']+'</span>';
            str += '	<button class="itemNext"></button>';
            str += '	<input type="hidden" name="mapName" value="'+trendList[i]['GroupNbr']+'">';
            str += '</li>';
        }
		$('#trendList').html(str);
	};

	trendList.gotoTrendPage = function(trendName){
		callNativeInterface.setLocalStorageMem('trendScadaNode',trendList.nodeName);
		callNativeInterface.setLocalStorageMem('trendGroupId',trendName);
		callNativeInterface.changePage('trend');	
	};


	global.trendList = trendList;
})(this);
