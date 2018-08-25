function responseFunc(functionType, result){
	//var resultObj = JSON.parse(result);
	var resultObj = result;
	if(functionType == 'insertAlarmSummary'){
		alarmSummary.insertAlarmSummary(resultObj);
	}else if(functionType == 'alarmAckStatus'){
		alarmSummary.alarmAckStatus(resultObj);
	}else if(functionType == 'alarmAckAllStatus'){
		alarmSummary.alarmAckAllStatus(resultObj);
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
    if (global.alarmSummary) {
        return;
    }
    var alarmSummary = new Object();
	
    alarmSummary.currentPage = 1;
    alarmSummary.pageSize = 20;
    alarmSummary.totalCount = 0;
    alarmSummary.totalPage = 0;
    alarmSummary.dataTag = '';

	alarmSummary.init = function(){
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();
		
		$('#backHome').on('click',function(){
			alarmSummary.backHome();
		});

		$('#prevPage').on('click',function(){
			if(alarmSummary.currentPage != 1){
				alarmSummary.currentPage -= 1;
				alarmSummary.getAlarmSummaryByPage();	
			}
		});

		$('#nextPage').on('click',function(){
			if(alarmSummary.currentPage * alarmSummary.pageSize < alarmSummary.totalCount){
				alarmSummary.currentPage += 1;
				alarmSummary.getAlarmSummaryByPage();
			}
		});

		$('#alarmSummaryList').on('click',function(e){
			if($(e.target).parents('li[data-Tag]').length > 0){
				if($(e.target).parents('li[data-Tag]').first().hasClass('selecedAck')){
					alarmSummary.dataTag = '';
					$('li[data-Tag]').removeClass('selecedAck');
				}else{
					var dataTag = $(e.target).parents('li[data-Tag]').first().attr('data-Tag');
					alarmSummary.dataTag = dataTag;
					$('li[data-Tag]').removeClass('selecedAck');
					$(e.target).parents('li[data-Tag]').first().addClass('selecedAck');
				}
			}
		});

		$('#ackAllBtn').on('click',function(){
			callNativeInterface.alarmAckAll();
		});

		$('#ackAlarmBtn').on('click',function(){
			//tags: [ { "tagName": "AI_0"}]
			var tags = [];
			tags.push({ "tagName": alarmSummary.dataTag});
			if(alarmSummary.dataTag && alarmSummary.dataTag.length > 0){
				callNativeInterface.alarmAck(tags);
			}
			alarmSummary.dataTag = '';
		});

		alarmSummary.getAlarmSummaryByPage();

	};

	alarmSummary.backHome = function(){
		callNativeInterface.changePage('homePage');
	};

	alarmSummary.getAlarmSummaryByPage = function(){
		var start = ( alarmSummary.currentPage - 1 ) * alarmSummary.pageSize;
		var count = alarmSummary.pageSize;
		var filters = [];
		var sort = '';
		callNativeInterface.getAlarmSummaryByPage(start,count,filters,sort);
	};

	alarmSummary.insertAlarmSummary = function(resultObj){
		var alarmSummaries = resultObj.alarmSummaries;
		alarmSummary.totalCount = resultObj.totalCount * 1;
		alarmSummary.totalPage = Math.ceil(alarmSummary.totalCount / alarmSummary.pageSize);
		//$('#totalPageNum').text(alarmSummary.totalPage);
		var str = '';
		var infoDateStr = '';
		for(var i=0;i<alarmSummaries.length;i++){
			var date = alarmSummaries[i]['time'].split(' ');
			/*str += '<li data-Alram="'+alarmSummaries[i]['ackStatus']+'">';
			str += alarmSummaries[i]['name'];
			str += alarmSummaries[i]['nodeName'];
			str += alarmSummaries[i]['alarmValue'];
			str += alarmSummaries[i]['ackStatus'];
			str += alarmSummaries[i]['alarmGroup'];
			str += alarmSummaries[i]['alarmLimit'];
			str += alarmSummaries[i]['alarmType'];
			str += alarmSummaries[i]['locked'];
			str += alarmSummaries[i]['descrp'];
			str += '</li>';*/
			if(infoDateStr != date[0]){
				infoDateStr = date[0];
				str += '<li class="infoDate"><div><span>' + infoDateStr + '</span></div></li>';
			}
			str += '<li class="infoContent" data-Alram="'+alarmSummaries[i]['ackStatus']+'" data-Tag="'+alarmSummaries[i]['name']+'">';
			str += '<div class="alarmTagName"><span class="tagNameArea">'+alarmSummaries[i]['name']+'</span><span class="alarmStatusIcon iconArea"></span></div>';
			str += '	<div class="displayTable">';
			// str += '		<div class="displayTr">';
			// str += '			<div class="displayTd alarmTagName">'+alarmSummaries[i]['name']+'</div>';
			// str += '			<div class="displayTd iconArea"><span class="alarmStatusIcon"></span></div>';
			// str += '		</div>';
			str += '		<div class="displayTr">';
			str += '			<div class="displayTd vLineParent"><div>'+alarmSummaries[i]['nodeName']+'</div>';
			if(typeof(date[1]) !="undefined"){str += '<div class="displayTimeString">'+date[1]+'</div>';}
			str += '				<div class="vLine"></div>';
			str += '			</div>';
			str += '			<div class="displayTd vLineright">';
			if(typeof(alarmSummaries[i]['alarmLimit']) != "undefined" && alarmSummaries[i]['alarmLimit'] != null){
				str += '<div><span jql>t_0042_alarmLimit</span>:'+alarmSummaries[i]['alarmLimit']+'</div>';
			}
			if(typeof(alarmSummaries[i]['alarmGroup']) != "undefined" && alarmSummaries[i]['alarmGroup'] != null){
				str += '<div><span jql>t_0041_alarmGroup</span>:'+alarmSummaries[i]['alarmGroup']+'</div>';
			}
			if(typeof(alarmSummaries[i]['descrp']) != "undefined"){
				str += '<div><span jql>t_0037_DashDesc</span>:'+alarmSummaries[i]['descrp']+'</div>';
			}
			str += '            </div>';
			str += '		</div>';
			str += '	</div>';
			str += '</li>';
		}
		$('#alarmSummaryList').html(str);

		dashboardMui.muiFunctions.runByDivId(localStorage.getItem('langJs'), 'alarmSummaryList');
		
		$('li[data-Tag]').each(function(index){
			if($(this).attr('data-Tag') == alarmSummary.dataTag){
				$(this).addClass('selecedAck');
			}else{
				$(this).removeClass('selecedAck');
			};
		});
		//$('#alarmSummaryList li[data-Alram="0"]').css("color","rgba(0, 255, 0, 1)"); //normal not act
		//$('#alarmSummaryList li[data-Alram="1"]').css("color","rgba(255, 0, 0, 1)"); //alarm
		//$('#alarmSummaryList li[data-Alram="2"]').css("color","rgba(255, 255, 255, 1)"); //alarm ack

		$('#alarmSummaryList li[data-Alram="0"]').find('.alarmStatusIcon').css("backgroundImage","url(./image/alarm-green.png)"); //normal not act
		$('#alarmSummaryList li[data-Alram="1"]').find('.alarmStatusIcon').css("backgroundImage","url(./image/alarm-red.png)"); //alarm
		$('#alarmSummaryList li[data-Alram="2"]').find('.alarmStatusIcon').css("backgroundImage","url(./image/alarm-grey.png)"); //alarm ack

		//$('#pageNum').val(alarmSummary.currentPage);
		$('#currentListCount').text(alarmSummary.pagetext());
	};

	alarmSummary.pagetext = function(){
		var start = ( alarmSummary.currentPage - 1 ) * alarmSummary.pageSize;
		var count = alarmSummary.pageSize;

		var text = '';
		text = start + '~' + (start + count);
		return text;
	};

// [ { "tagName": “AI_0”}]
	alarmSummary.alarmAck = function(tagsList){
		callNativeInterface.alarmAck(tagsList);
	};

	alarmSummary.alarmAckStatus = function(resultObj){

	};

	alarmSummary.alarmAckAll = function(){
		callNativeInterface.alarmAckAll();
	};

	alarmSummary.alarmAckAllStatus = function(resultObj){

	};

    global.alarmSummary = alarmSummary;
})(this);