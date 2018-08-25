function responseFunc(functionType, result) {
	var resultObj = result;
	if (functionType == 'insertStationStatus') {
		stationStatus.insertStationStatus(resultObj);
	} else if (functionType == 'insertNodeList') {
		stationStatus.insertNodeList(resultObj);
	} else if (functionType == 'error') {
		console.log('----------------------error');
		console.log(resultObj);
	} else {

	}
};



(function(global) {
	if (global.stationStatus) {
		return;
	}
	var stationStatus = new Object();

	stationStatus.nodeName = '';

	stationStatus.init = function() {
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();

		$('#backHome').on('click', function() {
			stationStatus.backHome();
		});

		$('#nodeList').on('change', function() {
			stationStatus.changeNode();
		});

		$('#statusList').on('click', function(e) {
			if ($(e.target).is('.iconBtn')) {
				stationStatus.setComportStatus(
					$(e.target).parent('li.comportTitle').attr('data-comport'),
					$(e.target).parent('li.comportTitle').attr('data-portState')
				);
			} else if ($(e.target).is('.openBtn')) {
				if (!$(e.target).hasClass('opened')) {
					$(e.target).addClass('opened');
				} else {
					$(e.target).removeClass('opened');
				}
				stationStatus.openContent($(e.target).parent('li.comportTitle'));
			} else if ($(e.target).is('.deviceBlock')) {
				var unit = $(e.target).text();
				var enable; /*1=disable,0=enable*/
				if ($(e.target).hasClass("devices0")) {
					enable = 1;
				}else if ($(e.target).hasClass("devices1")) {
					enable = 1;
				}else{
					enable = 0;
				}
				var port = $(e.target).parent('li.deviceArea').attr('data-device');
				stationStatus.setDeviceStatus(port,unit,enable);
			}

		});

		stationStatus.getNodeList();
	};

	stationStatus.backHome = function() {
		callNativeInterface.changePage('homePage');
	};

	stationStatus.getNodeList = function() {
		callNativeInterface.getNodeList();
	};

	stationStatus.insertNodeList = function(resultObj) {
		var nodeLists = resultObj.nodeLists;
		var str = '';
		for (var i = 0; i < nodeLists.length; i++) {
			str += '<option value="' + nodeLists[i]['nodeName'] + '">' + nodeLists[i]['nodeName'] + '</option>';
		}
		$('#nodeList').html(str);
		$("#nodeList option:first").attr('selected', 'selected');
		stationStatus.nodeName = $('#nodeList').val();
		stationStatus.getStationStatus();
	};

	stationStatus.getStationStatus = function() {
		if (stationStatus.nodeName != $("#nodeList").val()) {
			stationStatus.nodeName = $("#nodeList").val();
		}
		var nodeName = stationStatus.nodeName;
		callNativeInterface.getStationStatus(nodeName);
	};

	stationStatus.insertStationStatus = function(resultObj) {
		var staComps = resultObj.staComps;

		for (var i = 0; i < staComps.length; i++) {
			if ($('li[data-comport=' + staComps[i]['port'] + ']').length > 0) {
				$('li[data-comport=' + staComps[i]['port'] + ']').attr('data-portState', staComps[i]['status']);
				var str = '';
				for (var j = 0; j < staComps[i]['devices'].length; j++) {
					str += '<div class="deviceBlock devices' + staComps[i]['devices'][j]['status'] + ' ">' + staComps[i]['devices'][j]['unit'] + '</div>';
				}
				$('li[data-device=' + staComps[i]['port'] + ']').html(str);
			} else {
				var str = '';
				str += '<li class="comportTitle" data-comport=' + staComps[i]['port'] + ' data-portState =' + staComps[i]['status'] + '>';
				str += '	<div class="iconBtn"></div>';
				str += '	<div class="titleBtn"><span jql>Com 1</span></div>';
				str += '	<div class="openBtn"></div>';
				str += '</li>';
				str += '<li class="deviceArea" data-device=' + staComps[i]['port'] + '>';
				for (var j = 0; j < staComps[i]['devices'].length; j++) {
					str += '<div class="deviceBlock devices' + staComps[i]['devices'][j]['status'] + ' ">' + staComps[i]['devices'][j]['unit'] + '</div>';
				}
				str += '</li>';
				$('#statusList').append(str);
			}
		}
		$('li[data-comport]').each(function(){
			if($(this).attr('data-portState') == '0'){
				$(this).children('.iconBtn').css('backgroundImage','url(../image/alarm-green.png)');
			}else{
				$(this).children('.iconBtn').css('backgroundImage','url(../image/alarm-grey.png)');
			}
		});
	};

	stationStatus.setComportStatus = function(port, currentState) {
		var enable = currentState * 1 == 0 ? 1 : 0;
		callNativeInterface.setComportStatus(stationStatus.nodeName, port, enable);
	};

	stationStatus.setDeviceStatus = function(port,unit,enable) {
		callNativeInterface.setDeviceStatus(stationStatus.nodeName,port,unit,enable);
	};

	stationStatus.changeNode = function() {
		stationStatus.nodeName = $("#nodeList").val();
		stationStatus.getStationStatus();
	};

	stationStatus.openContent = function(liElem) {
		$('li.comportTitle').removeClass('currentOpen');
		if ($(liElem).hasClass('openContent')) {
			$(liElem).removeClass('openContent');
			$(liElem).next('.deviceArea').hide();
		} else {
			$(liElem).addClass('openContent');
			$(liElem).addClass('currentOpen');
			$(liElem).next('.deviceArea').show();
		}

		$('li.comportTitle').each(function(index) {
			if ($(this).hasClass('openContent') && !$(this).hasClass('currentOpen')) {
				$(this).removeClass('openContent');
				$(this).next('.deviceArea').hide();
				$(this).find('.openBtn').removeClass('opened');
			}
		});
	};

	global.stationStatus = stationStatus;
})(this);