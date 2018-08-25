function responseFunc(functionType, result) {
	var resultObj = result;
	if (functionType == 'insertLanguage') {
		if (localStorage.getItem('langJs') != resultObj.lang) {
			dashboardMui.initLanguage(resultObj.lang);
			dashboardMui.muiFunctions.run();
		}
	} else if (functionType == 'insertDataLog') {
		console.log('----------------------insertDataLog');
		console.log(resultObj);
	} else if (functionType == 'error') {
		console.log('----------------------error');
		console.log(resultObj);
	} else {}
};


(function(global) {
	if (global.dataLog) {
		return;
	}
	var dataLog = new Object();

	dataLog.dataSetting = {};

	dataLog.mainTag = 0;

	dataLog.palette = ['#A7CC61', '#64A3D8', '#ED4853', '#FFDD5C', '#FF834D', '#C4B7DA', '#AEC18B', '#7D9DB7', '#B46267', '#ECDB9B', '#D19378', '#C2BBCD'];

	dataLog.init = function() {
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();

		$('#backHome').on('click', function() {
			dataLog.backList();
		});
		$('#openSettingBtn').on('click', function() {
			dataLog.gotoSetting();
		});

		$('input[name=openTAG]').on('change',function(){
			dataLog.mainTag = $(this).parents('label').prevAll().length;
			dataLog.drawChart();
		});

		dataLog.drawChart();
		$(window).on('resize', function() {
			dataLog.drawChart();
		});
	};

	dataLog.backList = function() {
		callNativeInterface.changePage('dataLogList');
	};

	dataLog.gotoSetting = function() {
		callNativeInterface.changePage('dataLogSetting');
	};
	
	dataLog.drawChart = function() {
		var dataSeries = [{
			main: (dataLog.mainTag == 0),
			label: 'label1',
			color: dataLog.palette[0],
			lineWidth: (dataLog.mainTag == 0)?3:2,
			points: {
				show: true,
				radius: 1
			},
			data: [
				[0, 100],
				[1, 110],
				[2, 80],
				[3, 130],
				[4, 100],
				[5, 1000]
			]
		}, {
			main: (dataLog.mainTag == 1),
			label: 'label2',
			color: dataLog.palette[1],
			lineWidth: (dataLog.mainTag == 1)?3:2,
			points: {
				show: true,
				radius: 1
			},
			data: [
				[0, 10],
				[1, 11],
				[2, 80],
				[3, 100],
				[4, 100],
				[5, 30]
			]
		}, {
			main: (dataLog.mainTag == 2),
			label: 'label2',
			color: dataLog.palette[2],
			lineWidth: (dataLog.mainTag == 2)?3:2,
			points: {
				show: true,
				radius: 1
			},
			data: [
				[0, 10],
				[1, 11],
				[2, 40],
				[3, 130],
				[4, 190],
				[5, 30]
			]
		}];


		dataLog.chart = new chartTrend($('#contentChart').get(0), {}, dataSeries, 'RT');
	};

// 	[{"Tags":[{"Name":"con_ana_01","DispH":"","DispL":""},{"Name":"con_ana_alrm_02",
// "DispH":"","DispL":""},{"Name":"con_ana_alrm_03","DispH":"","DispL":""},{"Name":
// "14_AO_01","DispH":"","DispL":""},{"Name":"14_AO_02","DispH":"","DispL":""}],"Pr
// oject":"Express","Node":"SCADA","Interval":1,"IntervalType":"M","SampleRate":655
// 37,"Description":"H"}]	

	dataLog.insertConfig = function(resultObj){
		if(Array.isArray(resultObj)){
			dataLog.dataSetting = resultObj[0];
			dataLog.dataSetting.Record = dataLog.dataSetting * 360;
		}
	}

	//insert tags data logs
	dataLog.insertDataLog = function(resultObj){

	};

	//get tags span high & low
	dataLog.getTagsData = function(tags){

	};

	//get tag data log
	dataLog.getDataLog = function(startTime, interval, intervalType, record, tags){
		//callNativeInterface.getDataLog = function(StartTime, IntervalType, Interval, Records, Tags){
	};



	global.dataLog = dataLog;
})(this);