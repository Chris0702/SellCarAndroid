function responseFunc(functionType, result){
	var resultObj = result;
	if(functionType == 'insertActionLog'){
		actionLog.insertActionLog(resultObj);
	}else if(functionType == 'insertNodeList'){
		actionLog.insertNodeList(resultObj);
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
    if (global.actionLog) {
        return;
    }
    var actionLog = new Object();

    actionLog.currentPage = 1;
    actionLog.pageSize = 20;
    actionLog.totalCount = 0;
    actionLog.totalPage = 0;
    actionLog.nodeName = '';

	actionLog.init = function(){
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();
		
		$('#backHome').on('click',function(){
			actionLog.backHome();
		});

		$('#prevPage').on('click',function(){
			if(actionLog.currentPage != 1){
				actionLog.currentPage -= 1;
				actionLog.getActionLogAndCount();	
			}
		});

		$('#nextPage').on('click',function(){
			if(actionLog.currentPage * actionLog.pageSize < actionLog.totalCount){
				actionLog.currentPage += 1;
				actionLog.getActionLogAndCount();
			}
		});

		$('#nodeList').on('change',function(){
			actionLog.changeNode();
		});

		actionLog.getNodeList();
	};

	actionLog.backHome = function(){
		callNativeInterface.changePage('homePage');
	};

	actionLog.getNodeList = function(){
		callNativeInterface.getNodeList();
	};

	actionLog.insertNodeList = function(resultObj){
		var nodeLists = resultObj.nodeLists;
		var str = '';
		for(var i=0;i<nodeLists.length;i++){
			str += '<option value="'+nodeLists[i]['nodeName']+'">'+nodeLists[i]['nodeName']+'</option>';
		}
		$('#nodeList').html(str);
		$("#nodeList option:first").attr('selected','selected');
		actionLog.nodeName = $('#nodeList').val();
		actionLog.getActionLogAndCount();
	};

	actionLog.changeNode = function(){
		//actionLog.nodeName = $("#nodeList").val();
		actionLog.getActionLogAndCount();
	};

	actionLog.getActionLogAndCount = function(){
		if(actionLog.nodeName != $("#nodeList").val()){
			actionLog.nodeName = $("#nodeList").val();
			actionLog.currentPage = 1;
		}
		var start = ( actionLog.currentPage - 1 ) * actionLog.pageSize;
		var count = actionLog.pageSize;
		var nodeName = $.trim(actionLog.nodeName);
		if(nodeName.length > 0){
			callNativeInterface.getActionLogAndCount(start,count,nodeName);	
		}
	};

	actionLog.insertActionLog = function(resultObj){
		var actionLogList = resultObj.actionLogs;
		actionLog.totalCount = resultObj.totalCount * 1;
		actionLog.totalPage = Math.ceil(actionLog.totalCount / actionLog.pageSize);
		//$('#totalPageNum').text(actionLog.totalPage);
		var str = '';
		var infoDateStr = '';
		for(var i=0;i<actionLogList.length;i++){
			/*str += '<li>';
			str += actionLogList[i]['action'];
			str += actionLogList[i]['description'];
			str += actionLogList[i]['priority'];
			str += actionLogList[i]['tagName'];
			str += actionLogList[i]['time'];
			str += '</li>';*/
			var date = actionLogList[i]['time'].split(' ');

			if(infoDateStr != date[0]){
				infoDateStr = date[0];
				str += '<li class="infoDate"><div><span>' + infoDateStr + '</span></div></li>';
			}

			var action = [];
			if(actionLogList[i]['action']){
				action = actionLogList[i]['action'].split("  ");	
			}
			var value = [];
			for(var j =0;j<action.length;j++){
				if(action[j].length > 0){value.push(action[j]);}
			}
			var actionTxt = value[0];
			var oldValue = value[1];
			var newValue = value[2];
			str += '<li class="infoContent">';
			str += '	<div class="displayTable">';
			str += '		<div class="displayTr">';
			str += '			<div class="displayTd">'
			//str += '				<div>'+date[0]+'</div>';
			str += '				<div><span class="displayTime" jql>t_0040_time</span></div>';
			str += '				<div class="displayTimeString">'+date[1]+'</div>';
			str += '				<div class="vLine"></div>';
			str += '			</div>';
			str += '			<div class="displayTd">';
			if(actionTxt){str += '<div>'+actionTxt+'</div>';}
			//not disply in viewDAQ
			//if(actionLogList[i]['tagName']){str += '<div><span>tagName:</span>'+actionLogList[i]['tagName']+'</div>';}
			if(typeof(oldValue) !="undefined" || typeof(newValue) !="undefined"){str += '<div>';}
			if(typeof(oldValue) !="undefined"){str += '<span jql>t_0038_OldValue</span>:'+oldValue+'';}
			if(typeof(newValue) !="undefined"){str += '<span jql>t_0039_NewValue</span>:'+newValue+'';}
			if(typeof(oldValue) !="undefined" || typeof(newValue) !="undefined"){str += '</div>';}
			if(typeof(actionLogList[i]['priority']) !="undefined"
				&& $.trim(actionLogList[i]['priority']).length > 0){
				str += '<div><span>p:</span>'+actionLogList[i]['priority']+'</div>';
			}
			if(typeof(actionLogList[i]['description']) !="undefined"
				&& $.trim(actionLogList[i]['description']).length > 0){
				str += '<div><span jql>t_0037_DashDesc</span>:'+actionLogList[i]['description']+'</div>';
			}
			str += '            </div>';
			str += '		</div>';
			str += '	</div>';
			str += '</li>';

		}
		$('#actionLogList').html(str);
		dashboardMui.muiFunctions.runByDivId(localStorage.getItem('langJs'), 'actionLogList');
		//$('#pageNum').val(actionLog.currentPage);
		$('#currentListCount').text(actionLog.pagetext());
		dashboardMui.muiFunctions.run();
	};

	actionLog.pagetext = function(){
		var start = ( actionLog.currentPage - 1 ) * actionLog.pageSize;
		var count = actionLog.pageSize;

		var text = '';
		text = start + '~' + (start + count);
		return text;
	};


    global.actionLog = actionLog;
})(this);