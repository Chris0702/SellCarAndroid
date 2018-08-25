function responseFunc(functionType, result){
	var resultObj = result;
	if(functionType == 'insertAlarmLog'){
		alarmLog.insertAlarmLog(resultObj);
	}else if(functionType == 'insertNodeList'){
		alarmLog.insertNodeList(resultObj);
	}else if(functionType == 'insertLanguage'){
		if(localStorage.getItem('langJs') != resultObj.lang){
			dashboardMui.initLanguage(resultObj.lang);
			dashboardMui.muiFunctions.run();
		}
	}else if(functionType == 'error'){
		console.log('----------------------error');
		console.log(resultObj);
	}else{

	}
};



(function (global) {
    if (global.alarmLog) {
        return;
    }
    var alarmLog = new Object();
	
    alarmLog.currentPage = 1;
    alarmLog.pageSize = 20;
    alarmLog.totalCount = 0;
    alarmLog.totalPage = 0;
    alarmLog.nodeName = '';

	alarmLog.init = function(){
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();
		
		$('#backHome').on('click',function(){
			alarmLog.backHome();
		});

		$('#prevPage').on('click',function(){
			if(alarmLog.currentPage != 1){
				alarmLog.currentPage -= 1;
				alarmLog.getAlarmLogAndCount();	
			}
		});

		$('#nextPage').on('click',function(){
			if(alarmLog.currentPage * alarmLog.pageSize < alarmLog.totalCount){
				alarmLog.currentPage += 1;
				alarmLog.getAlarmLogAndCount();
			}
		});

		$('#nodeList').on('change',function(){
			alarmLog.changeNode();
		});

		alarmLog.getNodeList();
	};

	alarmLog.backHome = function(){
		callNativeInterface.changePage('homePage');
	};

	alarmLog.getNodeList = function(){
		callNativeInterface.getNodeList();
	};

	alarmLog.insertNodeList = function(resultObj){
		var nodeLists = resultObj.nodeLists;
		var str = '';
		for(var i=0;i<nodeLists.length;i++){
			str += '<option value="'+nodeLists[i]['nodeName']+'">'+nodeLists[i]['nodeName']+'</option>';
		}
		$('#nodeList').html(str);
		$("#nodeList option:first").attr('selected','selected');
		alarmLog.nodeName = $('#nodeList').val();
		alarmLog.getAlarmLogAndCount();
	};

	alarmLog.changeNode = function(){
		//alarmLog.nodeName = $("#nodeList").val();
		alarmLog.getAlarmLogAndCount();
	};

	alarmLog.getAlarmLogAndCount = function(){
		if(alarmLog.nodeName != $("#nodeList").val()){
			alarmLog.nodeName = $("#nodeList").val();
			alarmLog.currentPage = 1;
		}
		var start = ( alarmLog.currentPage - 1 ) * alarmLog.pageSize;
		var count = alarmLog.pageSize;
		var nodeName = $.trim(alarmLog.nodeName);
		if(nodeName.length > 0){
			callNativeInterface.getAlarmLogAndCount(start,count,nodeName);
		}
	};

	alarmLog.insertAlarmLog = function(resultObj){
		var alarmLogList = resultObj.alarmLogs;
		alarmLog.totalCount = resultObj.totalCount * 1;
		alarmLog.totalPage = Math.ceil(alarmLog.totalCount / alarmLog.pageSize);
		//$('#totalPageNum').text(alarmLog.totalPage);
		var str = '';
		var infoDateStr = '';
		for(var i=0;i<alarmLogList.length;i++){
			var date = alarmLogList[i]['time'].split(' ');
			/*str += '<li>';
			str += alarmLogList[i]['action'];
			str += alarmLogList[i]['description'];
			str += alarmLogList[i]['priority'];
			str += alarmLogList[i]['tagName'];
			str += alarmLogList[i]['time'];
			str += '</li>';*/
			if(infoDateStr != date[0]){
				infoDateStr = date[0];
				str += '<li class="infoDate"><div><span>' + infoDateStr + '</span></div></li>';
			}

			str += '<li class="infoContent">';
			str += '<div class="alarmTagName"><span class="tagNameArea">'+alarmLogList[i]['tagName']+'</span></div>';
			str += '	<div class="displayTable">';
			// str += '		<div class="displayTr">';
			// str += '			<div class="displayTd alarmTagName">'+alarmLogList[i]['tagName']+'</div>';
			// str += '			<div class="displayTd"></div>';
			// str += '		</div>';
			str += '		<div class="displayTr">';
			str += '			<div class="displayTd vLineParent">';
			str += '				<div><span class="displayTime" jql>t_0040_time</span></div>';
			//if(typeof(date[0]) !="undefined"){str += '<div>'+date[0]+'</div>';}
			if(typeof(date[1]) !="undefined"){str += '<div class="displayTimeString">'+date[1]+'</div>';}
			str += '				<div class="vLine"></div>';
			str += '			</div>';
			str += '			<div class="displayTd">';
			if(typeof(alarmLogList[i]['action']) !="undefined"){
				str += '<div><span></span>'+alarmLogList[i]['action']+'</div>';
			}
			if(typeof(alarmLogList[i]['priority']) !="undefined"
				&& $.trim(alarmLogList[i]['priority']).length > 0){
				str += '<div><span>p:</span>'+alarmLogList[i]['priority']+'</div>';
			}
			if(typeof(alarmLogList[i]['description']) !="undefined"){
				str += '<div><span></span>'+alarmLogList[i]['description']+'</div>';
			}
			str += '            </div>';
			str += '		</div>';
			str += '	</div>';
			str += '</li>';

		}
		$('#alarmLogList').html(str);
		dashboardMui.muiFunctions.runByDivId(localStorage.getItem('langJs'), 'alarmLogList');
		//$('#pageNum').val(alarmLog.currentPage);
		$('#currentListCount').text(alarmLog.pagetext());
	};

	alarmLog.pagetext = function(){
		var start = ( alarmLog.currentPage - 1 ) * alarmLog.pageSize;
		var count = alarmLog.pageSize;

		var text = '';
		text = start + '~' + (start + count);
		return text;
	};

    global.alarmLog = alarmLog;
})(this);