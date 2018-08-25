function responseFunc(functionType, result) {
	var resultObj = result;
	if (functionType == 'insertLanguage') {
		if (localStorage.getItem('langJs') != resultObj.lang) {
			dashboardMui.initLanguage(resultObj.lang);
			dashboardMui.muiFunctions.run();
		}
	} else if (functionType == 'insertRealTimeTagValues') {
		console.log('----------------------insertRealTimeTagValues');
		trend.insertRealTimeTagValues(resultObj);
    } else if (functionType == 'insertTagsData') {
        console.log('----------------------insertTagsData');
        trend.insertTagsData(resultObj);
	} else if (functionType == 'insertRTrendConfig') {
		console.log('----------------------insertRTrendConfig');
		trend.insertConfig(resultObj);
	} else if(functionType == 'insertLocalStorageMemAll'){
      	trend.successInit(resultObj);
    } else if (functionType == 'error') {
		console.log('----------------------error');
		console.log(resultObj);
	} else {}
};


(function(global) {
	if (global.trend) {
		return;
	}
	var trend = new Object();

	trend.mainTag = 0;

    trend.beforeInit = function(){
    	callNativeInterface.getLocalStorageMemAll();
    };

    trend.successInit = function(jObj){
        trend.jObj = jObj;
        trend.nodeName = trend.jObj['trendScadaNode'];
        trend.trendGroupId = trend.jObj['trendGroupId'];
        trend.init();
    };

	trend.init = function() {
		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();
		callNativeInterface.getRTrendConfig(trend.nodeName, trend.trendGroupId);

		$('#backHome').on('click', function() {
			trend.backList();
		});

		//temp
		//trend.drawChart();
		$(window).on('resize',function(){
			trend.drawChart();
		});
		
	};

	trend.backList = function() {
		callNativeInterface.changePage('trendList');
	};

	trend.palette = ['#A7CC61', '#64A3D8', '#ED4853', '#FFDD5C', '#FF834D', '#C4B7DA', '#AEC18B', '#7D9DB7', '#B46267', '#ECDB9B', '#D19378', '#C2BBCD'];
	trend.drawChart = function() {
	    var dataSeries = [];
	    if(trend.tagValue && trend.tagValue.length){
	        for(var i=0; i<trend.tagValue.length; i++){
	        var tagDataArray = [];
	            for(var j=0; j<trend.tagValue[i].Values.length; j++){
	                tagDataArray.push([j, (trend.tagValue[i].Values[j]=='*')? null: trend.tagValue[i].Values[j]*1]);
	            }
	            dataSeries.push({
	                main: (trend.mainTag == i),
                    label: 'label'+(i+1)*1,
                    color: trend.palette[i],
                    lineWidth: (trend.mainTag == i)?4:2,
                    points: {
                        show: true,
                        radius: 1
                    },
                    data: tagDataArray
	            });
	        }
	    }
        var globalSetting = {
            yaxis:{
                max: trend.tagInfos.Tags[trend.mainTag].DispH,
                min: trend.tagInfos.Tags[trend.mainTag].DispL,
            }
        }
        trend.chart = new chartTrend($('#contentChart').get(0), globalSetting, dataSeries, 'RT');
	};

	trend.insertConfig = function(resultObj){
        if(resultObj){
			var trendConfig = resultObj.trendConfig[0];
 
            trend.tagInfos = trendConfig;
 
            //get tag spanH spanL
            var tagArray = [];
            for(var i=0; i<trend.tagInfos.Tags.length; i++){
                tagArray.push({
                      "Name": trend.tagInfos.Tags[i].Name,
                      "Attributes":[{"Name":"SPANHI"}, {"Name":"SPANLO"}]
                });
            }
            if(tagArray.length){
                callNativeInterface.getTagsData(tagArray);
            }
		}
	};
 
    trend.insertTagsData = function(resultObj){
        if(resultObj){
            //verify spanHigh and spanLow
            for(var i=0; i<trend.tagInfos.Tags.length; i++){
                if(trend.tagInfos.Tags[i].DispH === "" || trend.tagInfos.Tags[i].DispL === "" || (trend.tagInfos.Tags[i].DispL >= trend.tagInfos.Tags[i].DispH)){

                    trend.tagInfos.Tags[i].DispH = resultObj.tagsData[i].SPANHI;
                    trend.tagInfos.Tags[i].DispL = resultObj.tagsData[i].SPANLO;
                }
            }
        }
        trend.updatedTagInfos();
    };

    trend.updatedTagInfos = function (){
        var str = '<ul>';
        if(trend.tagInfos && trend.tagInfos.Tags){
        for(var i=0; i<trend.tagInfos.Tags.length; i++){
                str += '<label>';
                str += '	<input type="radio" name="openTAG">';
                str += '	<li class="tagTitleLi">';
                str += '	    <div>';
                str += '	        <span class="tagColorBar"></span>';
                str += '	        <span class="tagText">' + trend.tagInfos.Tags[i].Name + '</span>';
                str += '	    </div>';
                str += '    </li>';
                str += '    <li class="tagContentLi">';
                str += '        <div class="tagDetailTable">';
                str += '            <div class="tagDetailTr">';
                str += '                <div class="tagDetailTd">';
                str += '                    <div class="proptitle" jql>t_0046_displayLow</div>';
                str += '                    <div class="propvalue tagDispL">' + trend.tagInfos.Tags[i].DispL + '</div>';
                str += '	            </div>';
                str += '                <div class="tagDetailTd">';
                str += '                    <div class="proptitle" jql>t_0048_currentValue</div>';
                str += '                    <div class="propvalue tagValue">' + '*' + '</div>';
                str += '	            </div>';
                str += '                <div class="tagDetailTd">';
                str += '                    <div class="proptitle" jql>t_0047_displayHigh</div>';
                str += '                    <div class="propvalue tagDispH">' + trend.tagInfos.Tags[i].DispH  + '</div>';
                str += '	            </div>';
                str += '	        </div>';
                str += '	    </div>';
                str += '    </li>';
                str += '</label>';
            }
            str += '</ul>';
        }

        str += '</ul>';
        $('#contentArea').html(str);
        dashboardMui.muiFunctions.runByDivId(localStorage.getItem('langJs'),'contentArea');

        $('input[name=openTAG]').on('change',function(){
            trend.mainTag = $(this).parents('label').prevAll().length;
            trend.drawChart();
        });

        trend.getRealTimeTagValues();
    };

	trend.getRealTimeTagValues = function(){
	    if(trend.tagInfos && trend.tagInfos.Tags){
	        var tagsArray = [];
            for(var i=0; i< trend.tagInfos.Tags.length; i++){
                tagsArray.push({"tagName": trend.tagInfos.Tags[i].Name});
            }

            callNativeInterface.getRealTimeTagValues(trend.tagInfos.SampleRate, 120, tagsArray);
	    }
	};

	trend.insertRealTimeTagValues = function(resultObj){
	    var startTime;
        if(resultObj && resultObj.RealTimeTagValue && resultObj.RealTimeTagValue.length){
			trend.startTime = resultObj.RealTimeTagValue[0].StartTime;
            trend.tagValue = resultObj.RealTimeTagValue;
		    trend.updateView();
		}
	};


	trend.updateView = function(){
        //date & time
        if(trend.startTime){
            $('#rDate').text(trend.startTime.split(" ")[0]);
            $('#rTime').text(timeFormat(trend.startTime.split(" ")[1]));
        }
        //chart
        if(trend.tagValue && trend.tagValue.length){
            trend.drawChart();
        }
        //tagInfo
        if(trend.tagValue && trend.tagValue.length){
            $(".tagContentLi").each(function(index) {
                $(this).find('.tagValue').text(trend.tagValue[index].Values[0]);
            });
        }

	};

	function timeFormat(timeStr){
	    var hms = timeStr.split(':');
	    return ((hms[0].length<2)? ('0'+hms[0]):hms[0])+':'+((hms[1].length<2)? ('0'+hms[1]):hms[1])+':'+((hms[2].length<2)? ('0'+hms[2]):hms[2]);
	}


	global.trend = trend;
})(this);
