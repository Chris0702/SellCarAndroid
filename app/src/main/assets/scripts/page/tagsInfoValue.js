function responseFunc(functionType, result){
	var resultObj = result;
	//var resultObj = JSON.parse(result);
	if(functionType == 'insertTagValue'){
		tagsInfoValue.insertTagValue(resultObj);
	}else if(functionType == 'insertLanguage'){
		if(localStorage.getItem('langJs') != resultObj.lang){
			dashboardMui.initLanguage(resultObj.lang);
			dashboardMui.muiFunctions.run();
		}
	}else if(functionType == 'insertLocalStorageMem'){
		
	}else if(functionType == 'insertLocalStorageMemAll'){
		tagsInfoValue.successInit(resultObj);
	}else if(functionType == 'error'){
		console.log('----------------------error');
		console.log(resultObj);
	}else{}
};


(function (global) {
    if (global.tagsInfoValue) {
        return;
    }
    var tagsInfoValue = new Object();
	
    tagsInfoValue.tagName = localStorage.getItem('currentTag');
    tagsInfoValue.tagInfos = null;

    tagsInfoValue.value = null;
    tagsInfoValue.type = null;
    tagsInfoValue.spanhi = null;
    tagsInfoValue.spanlo = null;
    tagsInfoValue.descrp = null;
    tagsInfoValue.enunit = null;
    tagsInfoValue.almst = null;
    tagsInfoValue.descr0 = null;
    tagsInfoValue.descr1 = null;
    tagsInfoValue.descr2 = null;
    tagsInfoValue.descr3 = null;
    tagsInfoValue.descr4 = null;
    tagsInfoValue.descr5 = null;
    tagsInfoValue.descr6 = null;
    tagsInfoValue.descr7 = null;

    tagsInfoValue.jObj = {};

    tagsInfoValue.beforeInit = function(){
    	callNativeInterface.getLocalStorageMemAll();
    };

    tagsInfoValue.successInit = function(jObj){
    	tagsInfoValue.jObj = jObj;
    	tagsInfoValue.tagName = tagsInfoValue.jObj['currentTag'];
    	tagsInfoValue.init();
    };

	tagsInfoValue.init = function(){
		$('.displayType').hide();
		//if(localStorage.getItem('currentTag')){
		//	tagsInfoValue.getTagValue(localStorage.getItem('currentTag'));	
		//}
		if(tagsInfoValue.jObj['currentTag']){
			tagsInfoValue.getTagValue(tagsInfoValue.jObj['currentTag']);	
		}else{
			tagsInfoValue.backTagsList();
		}
		
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();

		$('#backHome').on('click',function(){
			tagsInfoValue.backTagsList();
		});
		$('#ackTagBtn').on('click',function(){
			callNativeInterface.alarmAck([ { "tagName": tagsInfoValue.tagName}]);
		});
		$('#setBtn').on('click',function(){
			tagsInfoValue.setValueDialog();
		});

		//mText($('#contentTagChart'),{},[{value:500}]) ;
		//mGauge($('#contentTagChart'),{},[{value:500}]);
		//mDigital($('#contentTagChart'),{},[]);	
		$( window ).resize(function() {console.log($('#contentTagChart').width());
			$('#contentTagChart').empty();
			//mGauge($('#contentTagChart'),{},[{value:500}]);
			//mDigital($('#contentTagChart'),{},[]);	
			if(tagsInfoValue.tagInfos){
				tagsInfoValue.redrawChart(tagsInfoValue.tagInfos);	
			}
				
		});
		//tagsInfoValue.testAnalog();
		//tagsInfoValue.testDigital();
		//tagsInfoValue.testText();
	};

	tagsInfoValue.backTagsList = function(){
		//localStorage.removeItem('currentTag');
		if(tagsInfoValue.jObj['currentTag']){
			callNativeInterface.removeLocalStorageMem('currentTag');
		}
		callNativeInterface.changePage('tagsInfoList');
	};

	tagsInfoValue.getTagValue = function(tagName){
		$('#contentTagName').text(tagName);
		//"NAME", "DESCRP", "TYPE", "ENUNIT", "SECL", "DESCR0", 
		//"DESCR1", "DESCR2", "DESCR3", "DESCR4", 
		//"DESCR5", "DESCR6", "DESCR7", "DSPFMT" ,'almst'
		//tags: [{	"Name": "ana_1",	"Attributes":[]}]
		var tags = [];
		if(tagName.indexOf('.') < 0){
			tags.push({"tagName":tagName});
			tags.push({"tagName":tagName+'.TYPE'});
			tags.push({"tagName":tagName+'.DESCRP'});
			tags.push({"tagName":tagName+'.SPANHI'});
			tags.push({"tagName":tagName+'.SPANLO'});
			tags.push({"tagName":tagName+'.ENUNIT'});
			tags.push({"tagName":tagName+'.ALMST'});
			tags.push({"tagName":tagName+'.DSPFMT'});
			tags.push({"tagName":tagName+'.DESCR0'});
			tags.push({"tagName":tagName+'.DESCR1'});
			tags.push({"tagName":tagName+'.DESCR2'});
			tags.push({"tagName":tagName+'.DESCR3'});
			tags.push({"tagName":tagName+'.DESCR4'});
			tags.push({"tagName":tagName+'.DESCR5'});
			tags.push({"tagName":tagName+'.DESCR6'});
			tags.push({"tagName":tagName+'.DESCR7'});
		}else{
			tags.push({"tagName":tagName});
		}
		callNativeInterface.getTagValue(tags);
	};

	tagsInfoValue.insertTagValue = function(resultObj){
		if(resultObj){
			var tagInfos = resultObj.tagInfos;
			tagsInfoValue.updatedTagInfos(tagInfos);
			tagsInfoValue.redrawChart(tagInfos);

		}
	};
	tagsInfoValue.updatedTagInfos = function(tagInfos) {
    	if (!tagsInfoValue.tagInfos) {
        	tagsInfoValue.tagInfos = tagInfos
    	} else {
        	for (var j = 0; j < tagInfos.length; j++) {
        		var exist = false;
        		for (var i = 0; i < tagsInfoValue.tagInfos.length; i++) {
                	if (tagsInfoValue.tagInfos[i].tagName == tagInfos[j].tagName) {
                    	tagsInfoValue.tagInfos[i].value = tagInfos[j].value;
                    	exist = true;
                	    break;
            	    }
        	    }
        	    if(!exist){
        	    	tagsInfoValue.tagInfos.push(tagInfos[j]);
        	    }
    	    }
	    }
	};
	tagsInfoValue.redrawChart = function(tagInfos){
		var value;
		var spanhi;
		var spanlo;
		var type,descrp,enunit,almst,dspfmt;
		var descr0,descr1,descr2,descr3,descr4,descr5,descr6,descr7;
		//"tagName":"",  "tagType":"",  "value":""
			for (var i = 0; i < tagInfos.length; i++) {
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName){
					$('#contentTagChart').text(tagInfos[i]['value']);
					value = tagInfos[i]['value'];
					tagsInfoValue.value = value;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.TYPE'){
					type = tagInfos[i]['value'];
					tagsInfoValue.type = parseInt(type);
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.SPANHI'){
					spanhi = tagInfos[i]['value'];
					tagsInfoValue.spanhi = spanhi;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.SPANLO'){
					spanlo = tagInfos[i]['value'];
					tagsInfoValue.spanlo = spanlo;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.DESCRP'){
					descrp = tagInfos[i]['value'];
					tagsInfoValue.descrp = descrp;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.ENUNIT'){
					enunit = tagInfos[i]['value'];
					tagsInfoValue.enunit = enunit;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.ALMST'){
					almst = tagInfos[i]['value'];
					tagsInfoValue.almst = almst;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.DSPFMT'){
					dspfmt = tagInfos[i]['value'];
					tagsInfoValue.dspfmt = dspfmt;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.DESCR0'){
					descr0 = tagInfos[i]['value'];
					tagsInfoValue.descr0 = descr0;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.DESCR1'){
					descr1 = tagInfos[i]['value'];
					tagsInfoValue.descr1 = descr1;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.DESCR2'){
					descr2 = tagInfos[i]['value'];
					tagsInfoValue.descr2 = descr2;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.DESCR3'){
					descr3 = tagInfos[i]['value'];
					tagsInfoValue.descr3 = descr3;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.DESCR4'){
					descr4 = tagInfos[i]['value'];
					tagsInfoValue.descr4 = descr4;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.DESCR5'){
					descr5 = tagInfos[i]['value'];
					tagsInfoValue.descr5 = descr5;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.DESCR6'){
					descr6 = tagInfos[i]['value'];
					tagsInfoValue.descr6 = descr6;
				}
				if(tagInfos[i]['tagName'] == tagsInfoValue.tagName+'.DESCR7'){
					descr7 = tagInfos[i]['value'];
					tagsInfoValue.descr7 = descr7;
				}
			}
			

		$('#contentTagName').text(tagsInfoValue.tagName);
		if(tagsInfoValue.type == 0){//analog
			$('.typeAna').show();
			var valueObj = [];
			valueObj.push({value:mathUtil.dspFmtVal(tagsInfoValue.dspfmt, tagsInfoValue.value)});
			var option = {max:tagsInfoValue.spanhi,min:tagsInfoValue.spanlo};
			mGauge($('#contentTagChart'), option, valueObj) ;
			//$('#fieldType').find('.infoValue > input').val(tagsInfoValue.fieldTypeToText(tagsInfoValue.type));
			$('#pointTypeText').text(tagsInfoValue.fieldTypeToText(tagsInfoValue.type));
			$('#fieldDescrp').find('.infoValue > input').val(tagsInfoValue.descrp);
			$('#fieldSpanhi').find('.infoValue > input').val(tagsInfoValue.spanhi);
			$('#fieldSpanlo').find('.infoValue > input').val(tagsInfoValue.spanlo);
			$('#fieldEnunit').find('.infoValue > input').val(tagsInfoValue.enunit);
		}else if(tagsInfoValue.type == 1){//digital
			$('.typeDis').show();
			var valueObj = [];
			valueObj.push({value:tagsInfoValue.value});
			var option = {
				max:tagsInfoValue.spanhi,
				min:tagsInfoValue.spanlo,
				descript:[]
			};
			option.descript.push(tagsInfoValue.descr0);
			option.descript.push(tagsInfoValue.descr1);
			option.descript.push(tagsInfoValue.descr2);
			option.descript.push(tagsInfoValue.descr3);
			option.descript.push(tagsInfoValue.descr4);
			option.descript.push(tagsInfoValue.descr5);
			option.descript.push(tagsInfoValue.descr6);
			option.descript.push(tagsInfoValue.descr7);
			mDigital($('#contentTagChart'), option, valueObj) ;
			//$('#fieldType').find('.infoValue > input').val(tagsInfoValue.fieldTypeToText(tagsInfoValue.type));
			$('#pointTypeText').text(tagsInfoValue.fieldTypeToText(tagsInfoValue.type));
			$('#fieldDescrp').find('.infoValue > input').val(tagsInfoValue.descrp);
			$('#fieldSpanhi').find('.infoValue > input').val(tagsInfoValue.spanhi);
			$('#fieldSpanlo').find('.infoValue > input').val(tagsInfoValue.spanlo);
		}else{//2 TEXT
			$('.typeTxt').show();
			var valueObj = [];
			valueObj.push({value:tagsInfoValue.value});
			var option = {};
			console.log('tagsInfoValue.value----------------------------------------');
			console.log(tagsInfoValue.value);
			mText($('#contentTagChart'), option, valueObj) ;
			//$('#fieldType').find('.infoValue > input').val(tagsInfoValue.fieldTypeToText(tagsInfoValue.type));
			$('#pointTypeText').text(tagsInfoValue.fieldTypeToText(tagsInfoValue.type));
			$('#fieldDescrp').find('.infoValue > input').val(tagsInfoValue.descrp);
		}
		if(tagsInfoValue.almst * 1  == 2){
			$('#pointAlarmText').css("backgroundImage","url(./image/alarm-green.png)"); //alarm ack
		}else if(tagsInfoValue.almst * 1  == 1){
			$('#pointAlarmText').css("backgroundImage","url(./image/alarm-red.png)"); //alarm
		}else{
			$('#pointAlarmText').css("backgroundImage","url(./image/alarm-grey.png)"); //normal not act
		}

	};
	
	tagsInfoValue.fieldTypeToText = function(typeNo){
		var lang = localStorage.getItem('langJs');
		var num = parseInt(typeNo);
		switch(num){
			case 0:
				return dashboardMui.muiFunctions.convert("t_0015_Analog", lang);
			break;
			case 1:
				return dashboardMui.muiFunctions.convert("t_0016_Discrete", lang);
			break;
			case 2:
				return dashboardMui.muiFunctions.convert("t_0017_Text", lang);
			break;
			default:
				return dashboardMui.muiFunctions.convert("t_0017_Text", lang);
			break;
		}
	};

	tagsInfoValue.setValueDialog = function(){
		$('#defaultDialog,#blockWindow').show();
		$('#dialogclose,#dialogCancel').one('click',function(){
			$('#defaultDialog,#blockWindow').hide();
		});
		var tempHtml = '';
		if(Number(tagsInfoValue.type) == 0){//analog
			tempHtml += '<div id="analogArea0"><span jql>t_0033_EnterValue</span></div>';
			tempHtml += '<div id="analogArea"><input id="analogValue" type="text" value="' + Number(tagsInfoValue.value) + '" /></div>';
		}else if(Number(tagsInfoValue.type) == 1){//digital
			tempHtml += '<div id="digitalValueTable" class="displayTable">';
			tempHtml += '	<div class="displayTr">';
			tempHtml += '		<div class="displayTd">';
			if(Number(tagsInfoValue.spanhi) >= 0){
				tempHtml += '<label><input type="radio" name="digitalValue" value=0><span class="dgTextBtn">'+tagsInfoValue.descr0+'</span></label>';
			}
			tempHtml += '		</div>';
			tempHtml += '		<div class="displayTd">';
			if(Number(tagsInfoValue.spanhi) >= 1){
				tempHtml += '<label><input type="radio" name="digitalValue" value=1><span class="dgTextBtn">'+tagsInfoValue.descr1+'</span></label>';	
			}			
			tempHtml += '		</div>';
			tempHtml += '	</div>';
			
			tempHtml += '	<div class="displayTr">';
			tempHtml += '		<div class="displayTd">';
			if(Number(tagsInfoValue.spanhi) >= 2){
				tempHtml += '<label><input type="radio" name="digitalValue" value=2><span class="dgTextBtn">'+tagsInfoValue.descr2+'</span></label>';
			}
			tempHtml += '		</div>';
			tempHtml += '		<div class="displayTd">';
			if(Number(tagsInfoValue.spanhi) >= 3){
				tempHtml += '<label><input type="radio" name="digitalValue" value=3><span class="dgTextBtn">'+tagsInfoValue.descr3+'</span></label>';
			}
			tempHtml += '		</div>';
			tempHtml += '	</div>';
			
			tempHtml += '	<div class="displayTr">';
			tempHtml += '		<div class="displayTd">';
			if(Number(tagsInfoValue.spanhi) >= 4){
				tempHtml += '<label><input type="radio" name="digitalValue" value=4><span class="dgTextBtn">'+tagsInfoValue.descr4+'</span></label>';
			}
			tempHtml += '		</div>';
			tempHtml += '		<div class="displayTd">';
			if(Number(tagsInfoValue.spanhi) >= 5){
				tempHtml += '<label><input type="radio" name="digitalValue" value=5><span class="dgTextBtn">'+tagsInfoValue.descr5+'</span></label>';
			}
			tempHtml += '		</div>';
			tempHtml += '	</div>';
			
			tempHtml += '	<div class="displayTr">';
			tempHtml += '		<div class="displayTd">';
			if(Number(tagsInfoValue.spanhi) >= 6){
				tempHtml += '<label><input type="radio" name="digitalValue" value=6><span class="dgTextBtn">'+tagsInfoValue.descr6+'</span></label>';
			}
			tempHtml += '		</div>';
			tempHtml += '		<div class="displayTd">';
			if(Number(tagsInfoValue.spanhi) >= 7){
				tempHtml += '<label><input type="radio" name="digitalValue" value=7><span class="dgTextBtn">'+tagsInfoValue.descr7+'</span></label>';
			}
			tempHtml += '		</div>';
			tempHtml += '	</div>';
			tempHtml += '</div>';
		}else{
			tempHtml += '<div id="textArea0"><span jql>t_0034_EnterText</span></div>';
			tempHtml += '<div id="textArea"><input id="textValue" type="text" value="' + tagsInfoValue.value + '" /></div>';
		}
		$('#dialogContent').html(tempHtml);
		dashboardMui.muiFunctions.runByDivId(localStorage.getItem('langJs'),'dialogContent');

		if(Number(tagsInfoValue.type) == 1){
		 	$('#dialogContent input[name="digitalValue"][value='+Number(tagsInfoValue.value)+']').attr("checked",true);
		}

		 $( "#dialogApply" ).one( "click", function() {
		 	if(Number(tagsInfoValue.type) == 0){
		 		var validate = true;
		 		var value = $('#analogValue').val();
		 		if($.isNumeric(value)){
		 			if($.isNumeric(tagsInfoValue.spanhi) && $.isNumeric(tagsInfoValue.spanlo) ){
		 				if(Number(value) > Number(tagsInfoValue.spanhi)){validate = false;}
		 				if(Number(value) < Number(tagsInfoValue.spanlo)){validate = false;}
		 			}
		 			if(validate){
		 				tagsInfoValue.setTagValue(Number(value));	
		 			}
		 		}
		 	}else if(Number(tagsInfoValue.type) == 1){
		 		var value = $('#dialogContent input[name="digitalValue"]:checked').val()
		 		tagsInfoValue.setTagValue($.trim(value));
		 	}else{
		 		var value = $('#textValue').val();
		 		tagsInfoValue.setTagValue($.trim(value));
		 	}
		 	$('#defaultDialog,#blockWindow').hide();
		});
	};

	tagsInfoValue.setTagValue = function(value){
		var tags = [ { "tagName": tagsInfoValue.tagName, "value":value}];
		callNativeInterface.setTagValue(tags);
	};

	tagsInfoValue.testAnalog = function(){
		var value = {"tagInfos":[{"tagName":"calc_ana_01","tagType":"","value":"18","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.TYPE","tagType":"","value":"0","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.DESCRP","tagType":"","value":"Description","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.SPANHI","tagType":"","value":"1000.00","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.SPANLO","tagType":"","value":"-1000.00","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.ENUNIT","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.ALMST","tagType":"","value":"1","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.DSPFMT","tagType":"","value":"4.2","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.DESCR0","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.DESCR1","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.DESCR2","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.DESCR3","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.DESCR4","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.DESCR5","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.DESCR6","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"calc_ana_01.DESCR7","tagType":"","value":"","spanHi":0,"spanLo":0}],"resStatus":"0"};
console.log(value);
	tagsInfoValue.tagName = 'calc_ana_01';
	tagsInfoValue.insertTagValue(value);

	}

	tagsInfoValue.testDigital = function(){
		var value = {"tagInfos":[{"tagName":"con_dis_x8_01","tagType":"","value":"0","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.TYPE","tagType":"","value":"1","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.DESCRP","tagType":"","value":"Description","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.SPANHI","tagType":"","value":"7","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.SPANLO","tagType":"","value":"0","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.ENUNIT","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.ALMST","tagType":"","value":"0","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.DSPFMT","tagType":"","value":"0.0","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.DESCR0","tagType":"","value":"ABCDEFGHIJKLMNOPQRSTUV","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.DESCR1","tagType":"","value":"B","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.DESCR2","tagType":"","value":"C","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.DESCR3","tagType":"","value":"D","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.DESCR4","tagType":"","value":"E","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.DESCR5","tagType":"","value":"F","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.DESCR6","tagType":"","value":"G","spanHi":0,"spanLo":0},
{"tagName":"con_dis_x8_01.DESCR7","tagType":"","value":"H","spanHi":0,"spanLo":0}],"resStatus":"0"}
console.log(value);
	tagsInfoValue.tagName = 'con_dis_x8_01';
	tagsInfoValue.insertTagValue(value);

	}

tagsInfoValue.testText = function(){
		var value = {"tagInfos":[{"tagName":"con_txt_01","tagType":"","value":"TEXT","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.TYPE","tagType":"","value":"2","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.DESCRP","tagType":"","value":"Description","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.SPANHI","tagType":"","value":"1","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.SPANLO","tagType":"","value":"0","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.ENUNIT","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.ALMST","tagType":"","value":"0","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.DSPFMT","tagType":"","value":"0.0","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.DESCR0","tagType":"","value":"\u0014TEXTrrrrrrrrrr","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.DESCR1","tagType":"","value":"rr","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.DESCR2","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.DESCR3","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.DESCR4","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.DESCR5","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.DESCR6","tagType":"","value":"","spanHi":0,"spanLo":0},
{"tagName":"con_txt_01.DESCR7","tagType":"","value":"","spanHi":0,"spanLo":0}],"resStatus":"0"}
console.log(value);
	tagsInfoValue.tagName = 'con_txt_01';
	tagsInfoValue.insertTagValue(value);

	}




    global.tagsInfoValue = tagsInfoValue;
})(this);