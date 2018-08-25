function responseFunc(functionType, result) {
	var resultObj = result;
	//var resultObj = JSON.parse(result);
	if (functionType == 'insertTagValue') {
		mapPage.insertTagValue(resultObj);
	} else if (functionType == 'insertMapConfig') {
		mapPage.insertMapFile(resultObj);
	} else if (functionType == 'insertLanguage') {
		if (localStorage.getItem('langJs') != resultObj.lang) {
			dashboardMui.initLanguage(resultObj.lang);
			dashboardMui.muiFunctions.run();
		}
	} else if (functionType == 'insertLocalStorageMem') {

	} else if (functionType == 'insertLocalStorageMemAll') {
		mapPage.successInit(resultObj);
	} else if (functionType == 'error') {
		console.log('----------------------error');
		console.log(resultObj);
	} else {}
};

(function(global) {
	if (global.mapPage) {
		return;
	}
	var mapPage = new Object();

	mapPage.beforeInit = function() {
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();
		callNativeInterface.getLocalStorageMemAll();
		$('#openLabelBtn').on('click', function() {
			$('.markerdiv').toggle();
			if($('#openLabelBtn').hasClass('hideMarker')){
				$('#openLabelBtn').removeClass('hideMarker');
				$('#openLabelBtn').addClass('openMarker');
			}else{
				$('#openLabelBtn').removeClass('openMarker');
				$('#openLabelBtn').addClass('hideMarker');
			}
		});
		$('#openMListBtn').on('click', function() {
			$('#markerListPage').show();
		});
		$('#mlBackHome').on('click', function() {
			$('#markerListPage').hide();
		});
        // 2018.05.28 Elivs add
        $('#backHome').on('click', function() {
            mapPage.backMapList();
        });

		//------------
		// var str = '';
		// for (var i = 0; i < markers.length; i++) {
		// 	str += '<li class="markerItem">';
		// 	str += '	<span class="itemSelect"></span>';
		// 	str += '	<span class="itemText">' + markers[i].title + '</span>';
		// 	str += '	<input type="hidden" name="markerNum" value="' + i + '">';
		// 	str += '</li>';
		// }
		// $('#markerListUl').html(str);
		$('#markerListUl').on('click', function(e) {
			$('#markerListPage').hide();
			//markers
			var n;
			if ($(e.target).is('.markerItem')) {
				//n = $(e.target).prevAll('li.markerItem').length;
				n = $(e.target).find("input[name=markerNum]").first().val();
			} else {
				//n = $(e.target).parents('.markerItem').prevAll('li.markerItem').length;
				n = $(e.target).parents('.markerItem').find("input[name=markerNum]").first().val();
			}
			if (map && markers && markers[n] && markers[n].myGMarker && markers[n].myGMarker.marker_) {
				currentMarker = markers[n].myGMarker.marker_;
				map.panTo(currentMarker.getPosition());
			}
		});

		$('#searchTagsList').on('input',function(){
			mapPage.searchMarkerList($('#searchTagsList').val());
		});
		$('#closeSearchBtn').on('click',function(){
			$('#searchTagsList').val('');
			mapPage.searchMarkerList('');
		});
	};

	mapPage.successInit = function(jObj) {
		mapPage.jObj = jObj;
		mapPage.nodeName = mapPage.jObj['mapScadaNode'];
		mapPage.mapType = mapPage.jObj['mapType'];
		mapPage.mapName = mapPage.jObj['mapName'];
        // 2018.06.13 Elvis add for marker image with user upload
        mapPage.projectName = mapPage.jObj['projectName'];
        mapPage.ip = mapPage.jObj['ip'];
 
        mapPage.init();
	};

	mapPage.init = function() {
		mapPage.getMapFile(mapPage.nodeName, mapPage.mapType, mapPage.mapName);
		// $('#openLabelBtn').on('click', function() {
		// 	$('.markerdiv').toggle();
		// });
		// $('#openMListBtn').on('click', function() {
		// });
		//http://maps.google.com/maps/api/js?sensor=false&key=AIzaSyB0PXz28Mq4YRW352-6n65rIfh9zcROrbw
		//http://ditu.google.cn/maps/api/js?sensor=false&key=AIzaSyB0PXz28Mq4YRW352-6n65rIfh9zcROrbw
	};

	mapPage.getMapFile = function(nodeName, mapType, mapName) {
        callNativeInterface.getMapConfig(nodeName, mapType, mapName);
	};
 
	mapPage.insertMapFile = function(resultObj) {
        //console.log("map.js insertMapFile")
        //console.log(resultObj);
 
		if(resultObj){$.globalEval(resultObj);}
		var tagList = [];
		if (markers) {
			var str = '';
			var str = '';
			for (var i = 0; i < markers.length; i++) {
				str += '<li class="markerItem">';
				str += '	<span class="itemSelect"></span>';
				str += '	<span class="itemText">' + markers[i].title + '</span>';
				str += '	<input type="hidden" name="markerNum" value="' + i + '">';
				str += '</li>';
			}
			$('#markerListUl').html(str);
			for (var i = 0; i < markers.length; i++) {
				if (markers[i]['point']) {
					tagList.push({
						"tagName": markers[i]['point']
					});
				}
				if (markers[i]['tag']) {
					tagList.push({
						"tagName": markers[i]['tag']
					});
				}
				for (var j = 0; markers[i]['labels'] && j < markers[i]['labels'].length; j++) {
					tagList.push({
                        //tagName": markers[i]['tag']
						"tagName": markers[i]['labels'][j]['tag']
					});
					tagList.push({
                        //markers[i]['tag'] + ".ALMST"
						"tagName": markers[i]['labels'][j]['tag'] + ".ALMST"
					});
					tagList.push({
						//"tagName": markers[i]['tag'] + ".ALMTP"
                        "tagName": markers[i]['labels'][j]['tag'] + ".ALMTP"
					});
					tagList.push({
						//"tagName": markers[i]['tag'] + ".TYPE"
                        "tagName": markers[i]['labels'][j]['tag'] + ".TYPE"
					});
					tagList.push({
						//"tagName": markers[i]['tag'] + ".DESCR0"
                        "tagName": markers[i]['labels'][j]['tag'] + ".DESCR0"
					});
					tagList.push({
						//"tagName": markers[i]['tag'] + ".DESCR1"
                        "tagName": markers[i]['labels'][j]['tag'] + ".DESCR1"
					});
					tagList.push({
						//"tagName": markers[i]['tag'] + ".DESCR2"
                        "tagName": markers[i]['labels'][j]['tag'] + ".DESCR2"
					});
					tagList.push({
						//"tagName": markers[i]['tag'] + ".DESCR3"
                        "tagName": markers[i]['labels'][j]['tag'] + ".DESCR3"
					});
					tagList.push({
						//"tagName": markers[i]['tag'] + ".DESCR4"
                        "tagName": markers[i]['labels'][j]['tag'] + ".DESCR4"
					});
					tagList.push({
						//"tagName": markers[i]['tag'] + ".DESCR5"
                        "tagName": markers[i]['labels'][j]['tag'] + ".DESCR5"
					});
					tagList.push({
						//"tagName": markers[i]['tag'] + ".DESCR6"
                        "tagName": markers[i]['labels'][j]['tag'] + ".DESCR6"
					});
					tagList.push({
						//"tagName": markers[i]['tag'] + ".DESCR7"
                        "tagName": markers[i]['labels'][j]['tag'] + ".DESCR7"
					});
				}
			}
		}
		if (tagList.length > 0) {
			mapPage.getTagValue(tagList);
		}

		initialize();
		$(window).resize(function() {
			NodeListControl.UpdateSize();
		});
	};

	mapPage.getTagValue = function(tags) {
		callNativeInterface.getTagValue(tags);
	};

	mapPage.insertTagValue = function(resultObj) {
		if (resultObj) {
		    /*
		    for (var i = 0; i < resultObj.tagInfos.length; i++) {
                var tagName = resultObj.tagInfos[i]['tagName']
                var tagVal = resultObj.tagInfos[i]['value'];
                if (tagVal != null && tagVal > 500) {
                   console.log("tagName: " + tagName)
                   console.log("tagVal: " + tagVal)
               }
            }*/
 
			mapPage.tagInfos = resultObj.tagInfos;
            //console.log("mapPage.tagInfos: " + mapPage.tagInfos)
            //tagsInfoValue.updatedTagInfos(tagInfos);
			//tagsInfoValue.redrawChart(tagInfos);

			refreshValue();
		}
	};

	mapPage.getTagValueFromObj = function(args) {
		var tagVal = '*';
		if (args && mapPage.tagInfos) {
			var objName;
			if (args.indexOf('.') > -1) {
				var filedName = args.split('.')[1];
				var tagName = args.split('.')[0];
				objName = tagName + '.' + filedName.toUpperCase();
			} else {
				objName = args;
			}
			for (var i = 0; i < mapPage.tagInfos.length; i++) {
				if (mapPage.tagInfos[i]['tagName'] == objName) {
					tagVal = mapPage.tagInfos[i]['value'];
                    //console.log("getTagValueFromObj tagVal: " + tagVal)
				}
			}
		}
		return tagVal;
	};

	mapPage.searchMarkerList = function(searchStr) {
		var inserMarkerList = [];
		var str = '';
		if (searchStr && searchStr.length > 0) {
			//markers[i].title
			for (var i = 0; i < markers.length; i++) {
				if (markers[i].title.toLowerCase().indexOf(searchStr.toLowerCase()) > -1) {
					str += '<li class="markerItem">';
					str += '	<span class="itemSelect"></span>';
					str += '	<span class="itemText">' + markers[i].title + '</span>';
					str += '	<input type="hidden" name="markerNum" value="' + i + '">';
					str += '</li>';
				}
			}
		} else {
			for (var i = 0; i < markers.length; i++) {
				str += '<li class="markerItem">';
				str += '	<span class="itemSelect"></span>';
				str += '	<span class="itemText">' + markers[i].title + '</span>';
				str += '	<input type="hidden" name="markerNum" value="' + i + '">';
				str += '</li>';
			}
		}
		$('#markerListUl').html(str);
	};

    // 2018.05.28 Elvis add
    mapPage.backMapList = function() {
        callNativeInterface.changePage('mapList');
    };
 
    //
	mapPage.testTemp = function(){
		$.ajax({
			url:'./scripts/util/map1.js',
			success:function(result){
				//console.log(result);
				mapPage.insertMapFile(result);
			}
		});	
	}

	global.mapPage = mapPage;
})(this);
