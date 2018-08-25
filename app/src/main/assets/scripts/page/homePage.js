function responseFunc(functionType, result) {
	var resultObj = result;
	//var resultObj = JSON.parse(result);
	if (functionType == 'insertFunctionList') {
		homePage.insertFunctionList(resultObj);
	} else if (functionType == 'insertLanguage') {
		if (localStorage.getItem('langJs') != resultObj.lang) {
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
	if (global.homePage) {
		return;
	}
	var homePage = new Object();

	homePage.init = function() {
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();

		callNativeInterface.getFunctionList();

		$('#functionList').on('click', function(e) {
			if ($(e.target).parents('li[data-value]').length > 0) {
				var dataValue = $(e.target).parents('li[data-value]').first().attr('data-value');
				callNativeInterface.changePage(dataValue);
			}
		});

		//$('#logoutBtn').on('click',function(e){
		//	callNativeInterface.logout();
		//});	
		$('#settingBtn').on('click', function(e) {
			callNativeInterface.changePage('config');
		});

		// var funcList = {
		// 	actionLog: 'true',
		// 	alarmLog: 'true',
		// 	alarmSummary: 'true',
		// 	trend: 'true',
		// 	dashboard: 'true',
		// 	map: 'true',
		// 	datalog: 'true',
		// 	stationStatus: 'true',
		// 	nodeStatus: 'true'
		// }
		// var temp ={};
		// temp.funcList = funcList;
		// homePage.insertFunctionList(temp);
	};

	homePage.insertFunctionList = function(resultObj) {
		var str = '';
		if (resultObj && resultObj.funcList) {
			var funcList = resultObj.funcList;
			var lang = localStorage.getItem('langJs');
			if (funcList.nodeStatus == 'true') {
				str += homePage.funcListStructure('nodeStatus', dashboardMui.muiFunctions.convert("f_0011_NodeStatus", lang));
			}
			if (funcList.actionLog == 'true') {
				str += homePage.funcListStructure('actionLog', dashboardMui.muiFunctions.convert("f_0001_ActionLog", lang));
			}
			if (funcList.alarmLog == 'true') {
				str += homePage.funcListStructure('alarmLog', dashboardMui.muiFunctions.convert("f_0002_AlarmLog", lang));
			}
			if (funcList.alarmSummary == 'true') {
				str += homePage.funcListStructure('alarmSummary', dashboardMui.muiFunctions.convert("f_0003_AlarmSummary", lang));
			}
			if (funcList.trend == 'true') {
				str += homePage.funcListStructure('trendList', dashboardMui.muiFunctions.convert("f_0004_Trend", lang));
			}
			if (funcList.dashboard == 'true') {
				str += homePage.funcListStructure('dashboard', dashboardMui.muiFunctions.convert("f_0005_DashView", lang));
			}
			if (funcList.tagsInfo == 'true') {
				str += homePage.funcListStructure('tagsInfoGroup', dashboardMui.muiFunctions.convert("f_0006_TagInfo", lang));
			}
			if (funcList.map == 'true') {
				str += homePage.funcListStructure('mapList', dashboardMui.muiFunctions.convert("t_0043_Map", lang));
			}
			if (funcList.datalog == 'true') {
				str += homePage.funcListStructure('dataLogList', dashboardMui.muiFunctions.convert("f_0009_dataLogTrend", lang));
			}
			if (funcList.stationStatus == 'true') {
				str += homePage.funcListStructure('stationStatus', dashboardMui.muiFunctions.convert("f_0008_stationStatus", lang));
			}
			
		}
		//str += homePage.funcListStructure('config','Setting');

		$('#functionList').html(str);
	};

	homePage.funcListStructure = function(dataValue, titleString) {
		var str = '';
		str += '<li id="' + dataValue + '" data-value="' + dataValue + '">';
		str += '	<div class="funcIcon"></div>';
		str += '	<div class="funcText">';
		str += '	<span class="vLine"></span>';
		str += '	<span class="funcTitle" jql>' + titleString + '</span>';
		str += '	</div>';
		str += '</li>';
		return str;
	};

	global.homePage = homePage;
})(this);