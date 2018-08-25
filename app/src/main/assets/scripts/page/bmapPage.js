function responseFunc(functionType, result) {
	var resultObj = result;
	//var resultObj = JSON.parse(result);
	if (functionType == 'insertTagValue') {
		bmapPage.insertTagValue(resultObj);
	} else if (functionType == 'insertMapConfig') {
		bmapPage.insertMapFile(resultObj);
	} else if (functionType == 'insertLanguage') {
		if (localStorage.getItem('langJs') != resultObj.lang) {
			dashboardMui.initLanguage(resultObj.lang);
			dashboardMui.muiFunctions.run();
		}
	} else if (functionType == 'insertLocalStorageMem') {

	} else if (functionType == 'insertLocalStorageMemAll') {
		bmapPage.successInit(resultObj);
	} else if (functionType == 'error') {
		console.log('----------------------error');
		console.log(resultObj);
	} else {}
};

(function(global) {
	if (global.bmapPage) {
		return;
	}
	var bmapPage = new Object();

	bmapPage.beforeInit = function() {
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
            bmapPage.backMapList();
        });
		//------------
		// var str = '';
		// for (var i = 0; i < markers.length; i++) {
		// 	str += '<li class="markerItem">';
		// 	str += '	<span class="itemSelect"></span>';
		// 	str += '	<span class="itemText">' + markers[i].title + '</span>';
		// 	str += '	<input type="hidden" name="markerNum" value="'+i+'">';
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
				TrackingMarker = markers[n];
				map.panTo(TrackingMarker.myGMarker.marker_.getPosition());
			}
		});

		$('#searchTagsList').on('input',function(){
			bmapPage.searchMarkerList($('#searchTagsList').val());
		});
		$('#closeSearchBtn').on('click',function(){
			$('#searchTagsList').val('');
			bmapPage.searchMarkerList('');
		});
	};

	bmapPage.successInit = function(jObj) {
		bmapPage.jObj = jObj;
		bmapPage.nodeName = bmapPage.jObj['mapScadaNode'];
		bmapPage.mapType = bmapPage.jObj['mapType'];
		bmapPage.mapName = bmapPage.jObj['mapName'];
        // 2018.06.13 Elvis add for marker image with user upload
        bmapPage.projectName = bmapPage.jObj['projectName'];
        bmapPage.ip = bmapPage.jObj['ip'];
        
		bmapPage.init();
	};

	bmapPage.init = function() {
		bmapPage.getMapFile(bmapPage.nodeName, bmapPage.mapType, bmapPage.mapName);
		// $('#openLabelBtn').on('click', function() {
		// 	$('.markerdiv').toggle();
		// });
		// $('#openMListBtn').on('click', function() {
		// });
		//http://maps.google.com/maps/api/js?sensor=false&key=AIzaSyB0PXz28Mq4YRW352-6n65rIfh9zcROrbw
		//http://ditu.google.cn/maps/api/js?sensor=false&key=AIzaSyB0PXz28Mq4YRW352-6n65rIfh9zcROrbw
	};

	bmapPage.getMapFile = function(nodeName, mapType, mapName) {
		//callNativeInterface.getLocalStorageMemAll(nodeName, mapType, mapName);
        callNativeInterface.getMapConfig(nodeName, mapType, mapName)
	};

	bmapPage.insertMapFile = function(resultObj) {
		if(resultObj){$.globalEval(resultObj);}
		var tagList = [];
		if (markers) {
			var str = '';
			for (var i = 0; i < markers.length; i++) {
				str += '<li class="markerItem">';
				str += '	<span class="itemSelect"></span>';
				str += '	<span class="itemText">' + markers[i].title + '</span>';
				str += '	<input type="hidden" name="markerNum" value="'+i+'">';
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
				for (var j = 0;markers[i]['labels'] && j < markers[i]['labels'].length; j++) {
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
			bmapPage.getTagValue(tagList);
		}

		initialize();
		$(window).resize(function() {
			NodeListControl.UpdateSize();
		});
	};

	bmapPage.getTagValue = function(tags) {
		callNativeInterface.getTagValue(tags);
	};

	bmapPage.insertTagValue = function(resultObj) {
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

			bmapPage.tagInfos = resultObj.tagInfos;
			//tagsInfoValue.updatedTagInfos(tagInfos);
			//tagsInfoValue.redrawChart(tagInfos);

			refreshValue();
		}
	};

	bmapPage.getTagValueFromObj = function(args) {
		var tagVal = '*';
		if (args && bmapPage.tagInfos) {
			var objName;
			if (args.indexOf('.') > -1) {
				var filedName = args.split('.')[1];
				var tagName = args.split('.')[0];
				objName = tagName + '.' + filedName.toUpperCase();
			} else {
				objName = args;
			}
			for (var i = 0; i < bmapPage.tagInfos.length; i++) {
				if (bmapPage.tagInfos[i]['tagName'] == objName) {
					tagVal = bmapPage.tagInfos[i]['value'];
					//console.log("getTagValueFromObj tagVal: " + tagVal)
				}
			}
		}
		return tagVal;
	};

	bmapPage.searchMarkerList = function(searchStr){
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

    // 2018.05.30 Elvis add
    bmapPage.backMapList = function() {
        callNativeInterface.changePage('mapList');
    };
 
    //
	bmapPage.testTemp = function(){
		$.ajax({
			url:'./scripts/util/bmap/baiduMap1.js',
			success:function(result){
				//console.log(result);
				bmapPage.insertMapFile(result);
			}
		});	
	}
 
	global.bmapPage = bmapPage;
})(this);
