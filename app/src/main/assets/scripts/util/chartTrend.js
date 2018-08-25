//------
// this.jElement
// this.svgObj
// this.defSeries
// this.defaultGlobalOption
// this.svgNS
// this.w
// this.h
// this.originPoint
// this.xLength
// this.yLength
// this.drawingArea
// this.mainSeries
//------
function chartTrend(element, chartGlobalOpts, series, type) {
	var defaultGlobalOption = {
		mainSeries: {
			index: 0
		},
		padding: {
			width: 10
		},
		xaxis: {
			refLines: 0,
			lineWidth: 1,
			color: '#E0E0E0',
			show: true,
			font: {
				color: '#0B71BF',
				size: 12
			},
			mode: "time",
			timezone: "browser"
		},
		yaxis: {
			lineWidth: 2,
			refLines: 10,
			color: '#0B71BF',
			show: true,
			tickFormatter: null,
			max: null,
			min: null,
			font: {
				color: '#0B71BF',
				size: 10
			},
			tick: {
				length: 10
			}
		},
		grid: {
			show: true,
			color: '#E0E0E0',
			backgroundColor: null,
			borderWidth: 0,
			tickColor: '#0B71BF',
			tickWidth: 1,
			hoverable: true,
			clickable: true
		},
		legend: {
			show: true,
			backgroundColor: null,
			backgroundOpacity: 1,
			position: 'sc',
			labelBoxBorderColor: null,
			noColumns: 1,
			fontResizable: true,
			labelFormatter: null,
			font: {
				color: '#404040',
				size: 12
			}
		},
		series: {
			curvedLines: {
				active: true
			}
		},
		tooltip:{
			padding:1,
			font: {
				size: 16
			}
		},
		palette: ['#A7CC61', '#64A3D8', '#ED4853', '#FFDD5C', '#FF834D', '#C4B7DA', '#AEC18B', '#7D9DB7', '#B46267', '#ECDB9B', '#D19378', '#C2BBCD']
	}
	var defSeries = [];
	if (Array.isArray(series)) {
		$.extend(true, defSeries, series);
	}
	if (chartGlobalOpts) {
		$.extend(true, defaultGlobalOption, chartGlobalOpts);
	}
	var drawingArea = {
		padding: {
			bottom: 25,
			top: 10,
			left: 5,
			right: 10
		}
	};
	this.drawingArea = drawingArea;
	this.defSeries = defSeries;
	this.defaultGlobalOption = defaultGlobalOption;
	this.svgNS = "http://www.w3.org/2000/svg";
	var svgObj;
	if ($(element).prop("tagName").toUpperCase() == "SVG") {
		svgObj = $(element).get(0);
	} else if ($(element).prop("tagName").toUpperCase() == "DIV") {
		var jElement = $(element);
		this.jElement = jElement;
		if (jElement.css("position") == "static") {
			jElement.css("position", "relative");
		}
		if (jElement.children("svg").length > 0) {
			svgObj = jElement.children("svg").first().get(0);
		} else {
			svgObj = document.createElementNS(this.svgNS, 'svg');
			jElement.html(svgObj);
		}
		svgObj.setAttribute("width", jElement.width() + "px");
		svgObj.setAttribute("height", jElement.height() + "px");

	} else {
		return false;
	}
	svgObj.setAttribute("version", "1.1"); // IE9+ support SVG 1.1 version
	svgObj.setAttribute("baseProfile", "tiny");
	svgObj.setAttribute("shape-rendering", "geometricPrecision"); //默认注重绘图精度，而不是速度和边缘
	//svgObj.setAttribute("shape-rendering", "optimizeSpeed");


	this.svgObj = svgObj;
	this.svgObj.innerHTML = '';
	this.w = this.svgObj.getBoundingClientRect().width;
	this.h = this.svgObj.getBoundingClientRect().height;
	/*------------------*/
	this.type = type;

	this.drawChart();
	this.mouseEvent();
};

chartTrend.prototype.alert = function() {
	alert('AA');
};

chartTrend.prototype.destroy = function() {
	this.clear('all');
	if (this.jElement) {
		var divNode = this.jElement.get(0);
		while (divNode.firstChild) {
			divNode.removeChild(divNode.firstChild);
		}
	}
	for (var key in this) {
		this[key] = null;
	}
	delete this;
};

chartTrend.prototype.resetSvgSizeByDiv = function() {
	if (this.jElement) {
		this.svgObj.setAttribute("width", jElement.width() + "px");
		this.svgObj.setAttribute("height", jElement.height() + "px");
		this.drawChart();
	}
};

//移除事件
chartTrend.prototype.removeEvents = function(elem) {
	$(elem).off(); //removes all handlers attached by jquery
	if (elem.highLight) delete elem.highLight;
	return elem;
}

chartTrend.prototype.clear = function(type) {
	var items, i, l, svg = this.svgObj;
	switch (type) {
		case "columns":
			items = this.svgObj.querySelectorAll("rect");
			for (i = items.length - 1; i >= 0; i--) {
				this.svgObj.removeChild(this.removeEvents(items[i]));
			}
			break;
		case "pline":
		case "trendLines":
			items = this.svgObj.querySelectorAll("polyline [elemType=pline]");
			if (items.length > 0) {
				for (i = items.length - 1; i >= 0; i--) {
					this.svgObj.removeChild(this.removeEvents(items[i]));
				}
			} else {
				items = this.svgObj.querySelectorAll("polyline");
				for (i = items.length - 1; i >= 0; i--) {
					if ("pline" == items[i].getAttribute("elemType")) {
						this.svgObj.removeChild(this.removeEvents(items[i]));
					}
				}
			}
			break;
		case "all":
			var childs = this.svgObj.childNodes;
			for (i = this.svgObj.childNodes.length - 1; i >= 0; i--) {
				this.svgObj.removeChild(this.removeEvents(this.svgObj.childNodes[i]));
			}
			this.svgObj.setAttribute("coordinated", "0");
			break;
	}
};

chartTrend.prototype.mouseEvent = function() {
	var that = this;

	var mouseFunc = {};
	mouseFunc.move = function(e) {
		if (document.documentElement.getBoundingClientRect) {
			var rect = this.getBoundingClientRect(),
				x = e.clientX - rect.left;
			y = e.clientY - rect.top;
			that.mouseX = x;
			that.mouseY = y;
			that.mousePosition();
		}

	};

	mouseFunc.Out = function(e) {
		var items = that.svgObj.querySelectorAll(".hoverVLine,.hoverVText");
		for (i = items.length - 1; i >= 0; i--) {
			that.svgObj.removeChild(that.removeEvents(items[i]));
		}
	};

	// mouseFunc.handleStart = function(evt) {
	// 	evt.preventDefault();
	// 	log("touchstart.");
	// 	var el = document.getElementsByTagName("canvas")[0];
	// 	var ctx = el.getContext("2d");
	// 	var touches = evt.changedTouches;
	// 	if(touches.length > 0){
	// 		var rect = evt.target.getBoundingClientRect();,
	// 			x = touches[0].pageX - rect.left;
	// 		y = touches[0].pageY - rect.top;
	// 		that.mouseX = x;
	// 		that.mouseY = y;
	// 		that.mousePosition();
	// 	}
	// }

	//垂直參考線
	this.svgObj.onmousemove = mouseFunc.move;

	this.svgObj.onmouseout = mouseFunc.Out;

	// this.svgObj.addEventListener("touchstart", handleStart, false);
	// this.svgObj.addEventListener("touchend", handleEnd, false);
	// this.svgObj.addEventListener("touchcancel", handleCancel, false);
	// this.svgObj.addEventListener("touchmove", handleMove, false);
};


chartTrend.prototype.mousePosition = function() {
	var index = this.defaultGlobalOption.mainSeries.index;
	var currentPointIndex = null;
	this.defSeries[index].unitXPartition = this.defSeries[index]['data'].length > 1 ? this.xLength / (this.defSeries[index]['data'].length - 1) : this.xLength;
	var center = null;
	var nextCenter = null;
	for (var j = 0; j < this.defSeries[index]['data'].length; j++) {
		//this.defSeries[index]['data'][j][1]
		var tempCenter = {
			x: this.originPoint.x + this.defSeries[index].unitXPartition * j,
			y: this.originPoint.y - this.defSeries[index].unitYPartition * (this.defSeries[index]['data'][j][1] - this.defSeries[index].min)
		};
		if ((j + 1) < this.defSeries[index]['data'].length) {
			var tempNextCenter = {
				x: this.originPoint.x + this.defSeries[index].unitXPartition * (j + 1),
				y: this.originPoint.y - this.defSeries[index].unitYPartition * (this.defSeries[index]['data'][j + 1][1] - this.defSeries[index].min)
			};
		}
		if (this.mouseX >= tempCenter.x) {
			center = tempCenter;
			nextCenter = tempNextCenter;
			currentPointIndex = j;
		} else {
			break;
		}
	}

	var items = this.svgObj.querySelectorAll(".hoverVLine,.hoverVText");
	for (i = items.length - 1; i >= 0; i--) {
		this.svgObj.removeChild(this.removeEvents(items[i]));
	}

	if (center && nextCenter) {
		var startPosv;
		if (Math.abs(center.x - this.mouseX) <= Math.abs(nextCenter.x - this.mouseX)) {
			startPosv = {
				x: center.x,
				y: this.originPoint.y
			};
			startTxtPosv = {
				x: center.x,
				y: center.y
			};
		} else {
			currentPointIndex++;
			startPosv = {
				x: nextCenter.x,
				y: this.originPoint.y
			};
			startTxtPosv = {
				x: nextCenter.x,
				y: nextCenter.y
			};
		}
		this.drawVerticalLineWithOption(startPosv,
			this.yLength,
			'#505050',
			this.defaultGlobalOption.grid.tickWidth, undefined, {
				attrs: [{
					name: "class",
					value: "hoverVLine"
				}, {
					name: "stroke-dashoffset",
					value: "3"
				}, {
					name: "stroke-dasharray",
					value: "5"
				}]
			});

		//繪製文字
		//this.defSeries[index]['data'][currentPointIndex][1]
		var drawingText =this.defSeries[index]['data'][currentPointIndex][1];
		if(typeof(drawingText) != "undefined" &&
			typeof(drawingText) != "object"){
			drawingText =this.defSeries[index]['data'][currentPointIndex][1];
		}else{
			drawingText = "";
		}
		var tooltipTextSize = this.defaultGlobalOption.tooltip.font.size;
		var mtext = this.measureText(drawingText, tooltipTextSize);
		var tAlignX = 'right';
		var tAlignY = 'middle';

		if(startTxtPosv.x - mtext < 0 || currentPointIndex == 0){
			tAlignX = 'left';
		}

		if(drawingText.toString().length > 0){
			this.drawText(drawingText,
			startTxtPosv,
			'#ffffff',
			undefined,
			tooltipTextSize + 'px',
			undefined,
			tAlignX,
			tAlignY,undefined, {
				drawRect:true,
				bgColor:'#000000',
				rectPadding:this.defaultGlobalOption.tooltip.padding,
				attrs: [{
					name: "class",
					value: "hoverVText"
				}],
				rectOption:{
					class: "hoverVText"
				}
			});	
		}
		
		//text, position, fontColor, fontFamily, fontSize, fontWeight, alignX, alignY, transformStyle, otherOpts
	} else {

	}
}

chartTrend.prototype.drawVerticalLineWithOption = function(startPos, distance, color, width, otherStyle, options) {
	this.drawLine(startPos, {
		x: startPos.x,
		y: startPos.y - distance
	}, color, width, otherStyle, options);
};

chartTrend.prototype.drawChart = function() {
	this.clear('all');
    function roundFun(value, n) {
        return Math.round(value*Math.pow(10,n))/Math.pow(10,n);
    }
	if (this.type == 'RT') {
		//this.alert();
		//計算Y軸文字長度
		//this.defaultGlobalOption.mainSeries.index
		this.getMainSeries();
		if (this.defSeries.length > 0 &&
			this.defSeries[this.defaultGlobalOption.mainSeries.index]) {
			this.mainSeries = this.defSeries[this.defaultGlobalOption.mainSeries.index];
		} else if (this.defSeries.length > 0) {
			this.defaultGlobalOption.mainSeries.index = 0;
			this.mainSeries = this.defSeries[0];
		} else {
			this.mainSeries = null;
		}

		var tempMax = 0,
			tempMin = 0;
		if (this.mainSeries) {
			tempMax = this.getMaxNumber(this.mainSeries['data']);
			tempMin = this.getMinNumber(this.mainSeries['data']);
		}
		if (this.defaultGlobalOption.yaxis.max) {
			tempMax = Math.max(tempMax, this.defaultGlobalOption.yaxis.max);
		}
		if (this.defaultGlobalOption.yaxis.min) {
			tempMin = Math.min(tempMin, this.defaultGlobalOption.yaxis.min);
		}
		//計算y間距**
		var partition = (tempMax - tempMin) / this.defaultGlobalOption.yaxis.refLines;
        
		var maxTextLength = Math.max(this.measureText(tempMax, this.defaultGlobalOption.yaxis.font.size),
			this.measureText(tempMin, this.defaultGlobalOption.yaxis.font.size));
		for (var i = 0; i < this.defaultGlobalOption.yaxis.refLines; i++) {
			maxTextLength = Math.max(maxTextLength,
				this.measureText(roundFun(tempMin + partition * i, partition.toString().split(".")[1].length), this.defaultGlobalOption.yaxis.font.size));
		}
		maxTextLength = maxTextLength + this.defaultGlobalOption.yaxis.tick.length;
		// this.defaultGlobalOption.yaxis.max = tempMax;
		// this.defaultGlobalOption.yaxis.min = tempMin;
		this.drawingArea.padding.left = maxTextLength;
		this.defaultGlobalOption.yaxis.partition = partition;
		//繪製座標
		this.drawRTCoordinate();

		//繪製X軸刻度
		//底色
		this.drawLine({
				x: 0,
				y: this.h - 10
			}, {
				x: this.w,
				y: this.h - 10
			},
			'rgb(181,212,235)',
			20);
		this.drawLine({
				x: this.drawingArea.padding.left,
				y: this.h - 10
			}, {
				x: this.originPoint.x + this.xLength,
				y: this.h - 10
			},
			'#000000',
			this.defaultGlobalOption.xaxis.lineWidth,
			'stroke-dasharray:5, 5;');
		//依主線//繪製Y軸刻度
		for (var i = 0; i <= this.defaultGlobalOption.yaxis.refLines; i++) {
			var startTickPosv = {
				x: this.originPoint.x,
				y: this.originPoint.y - (i) * this.yLength / this.defaultGlobalOption.yaxis.refLines
			};
			var startTxtPosv = {
				x: this.originPoint.x - this.defaultGlobalOption.yaxis.tick.length,
				y: this.originPoint.y - (i) * this.yLength / this.defaultGlobalOption.yaxis.refLines
			};
			//繪製tick
			this.drawHorizonLine(startTickPosv, -1 * this.defaultGlobalOption.yaxis.tick.length, this.defaultGlobalOption.yaxis.color, this.defaultGlobalOption.yaxis.lineWidth);

            //繪製文字
			this.drawText(roundFun(tempMin + partition * i, partition.toString().split(".")[1].length),
				startTxtPosv,
				this.defaultGlobalOption.yaxis.font.color,
				undefined,
				this.defaultGlobalOption.yaxis.font.size + 'px',
				undefined,
				'right',
				'middle');
		}
		//繪製曲線	
		for (var i = 0; i < this.defSeries.length; i++) {
			//計算間距&單位間距**
			var partition = (tempMax - tempMin) / this.defaultGlobalOption.yaxis.refLines;
			var tempMax = this.getMaxNumber(this.defSeries[i]['data']);
			var tempMin = this.getMinNumber(this.defSeries[i]['data']);
			if (this.defaultGlobalOption.yaxis.max) {
				tempMax = Math.max(tempMax, this.defaultGlobalOption.yaxis.max);
			}
			if (this.defaultGlobalOption.yaxis.min) {
				tempMin = Math.min(tempMin, this.defaultGlobalOption.yaxis.min);
			}
			this.defSeries[i].max = tempMax;
			this.defSeries[i].min = tempMin;
			this.defSeries[i].partition = partition;
			this.defSeries[i].unitYPartition = (tempMax - tempMin) > 0 ? this.yLength / (tempMax - tempMin) : this.yLength;
			this.defSeries[i].unitXPartition = this.defSeries[i]['data'].length > 1 ? this.xLength / (this.defSeries[i]['data'].length - 1) : this.xLength;
			for (var j = 0; j < this.defSeries[i]['data'].length; j++) {
				if ($.isNumeric(this.defSeries[i]['data'][j][1])) {
					var center = {
						x: this.originPoint.x + this.defSeries[i].unitXPartition * j,
						y: this.originPoint.y - this.defSeries[i].unitYPartition * (this.defSeries[i]['data'][j][1] - this.defSeries[i].min)
					};
					var radius = 1;
					if (this.defSeries[i]['points']['radius'] > 0 && this.defSeries[i]['points']['show']) {
						radius = this.defSeries[i]['points']['radius'];
					}
					var fillColor = this.defSeries[i]['color'];
					var lineColor = this.defSeries[i]['color'];
					var lineWidth = 1;
					if (this.defSeries[i]['lineWidth'] > 0) {
						lineWidth = this.defSeries[i]['lineWidth'];
					}
					this.drawCircle(center, radius, fillColor, lineColor, lineWidth);
					if ((j + 1) < this.defSeries[i]['data'].length && $.isNumeric(this.defSeries[i]['data'][j + 1][1])) {
						var nextCenter = {
							x: this.originPoint.x + this.defSeries[i].unitXPartition * (j + 1),
							y: this.originPoint.y - this.defSeries[i].unitYPartition * (this.defSeries[i]['data'][j + 1][1] - this.defSeries[i].min)
						};
						this.drawLine(center, nextCenter, fillColor, lineWidth);
					}
				}
			}

		}
		//垂直參考線
	} else {

	}
};

chartTrend.prototype.measureText = function(txt, txtSize, fontFamily) {
	var canv = document.createElement('canvas');
	var ctx = canv.getContext("2d");
	var fontSize = 16,
		txtFamily = 'Arial';
	if ($.isNumeric(txtSize)) {
		fontSize = txtSize + 'px';
	} else if (typeof(txtSize) == 'string') {
		fontSize = txtSize;
	}
	if (fontFamily) {
		txtFamily = fontFamily;
	}
	ctx.font = fontSize + " " + txtFamily;
	var txtWidth = ctx.measureText(txt).width;
	canv = null, ctx = null;
	delete canv;
	delete ctx;
	return txtWidth;
};

//获取文字所占区域尺寸
chartTrend.prototype.GetTextRectSize = function(text, fontFamily, fontSize, fontWeight) {
	// var sp = document.createElement("SPAN");
	// if (undefined != fontFamily) sp.style.fontFamily = fontFamily;
	// if (undefined != fontSize) sp.style.fontSize = fontSize;
	// if (undefined != fontWeight) sp.style.fontWeight = fontWeight;
	// sp.innerHTML = text;
	// document.body.appendChild(sp);
	// var rect = {
	// 	width: sp.offsetWidth,
	// 	height: sp.offsetHeight
	// };
	// document.body.removeChild(sp);

	var rect = {
		width: this.measureText(text, fontSize, fontFamily),
		height: $.isNumeric(fontSize) ? Number(fontSize) : parseFloat(fontSize)
	}

	return rect;
}

chartTrend.prototype.getMainSeries = function() {
	var index = null;
	for (var i = 0; i < this.defSeries.length; i++) {
		if (typeof(this.defSeries[i]['main']) == "boolean" && this.defSeries[i]['main']) {
			index = i;
		}
	}
	if (!isNaN(index)) {
		this.defaultGlobalOption.mainSeries.index = index;
	}

	return index;
}


//找出一个数组中的最大值
//输入的数据应该是一个数组，数组元素可以是数值，也可以是数组
chartTrend.prototype.getMaxNumber = function(arr) {
	// if(!$.isArray(arr))return 0;
	// var max, tmp=NaN;
	// for(var i=0,l=arr.length;i<l;i++){
	// 	if($.isArray(arr[i])){
	// 		tmp = GetMaxNumber(arr[i]);
	// 	}else{
	// 		tmp=Number(arr[i]);
	// 	}
	// 	if(!isNaN(tmp)){
	// 		if(undefined!=max){
	// 			if(max<tmp)max=tmp;
	// 		}else{
	// 			max = tmp;
	// 		}
	// 	}
	// }
	var max;
	for (var i = 0, l = arr.length; i < l; i++) {
		if (undefined != max) {
			max = Math.max(max, arr[i][1]);
		} else {
			max = arr[i][1];
		}
	}
	if (!$.isNumeric(max)) {
		max = 0;
	}
	return max;
}

//找出一个数组中的最小值
//输入的数据应该是一个数组，数组元素可以是数值，也可以是数组
chartTrend.prototype.getMinNumber = function(arr, invalidVal) {
	// if(!$.isArray(arr))return 0;
	// var min, tmp=NaN;
	// if(undefined==invalidVal){invalidVal=-1;}
	// for(var i=0,l=arr.length;i<l;i++){
	// 	if($.isArray(arr[i])){
	// 		tmp = GetMinNumber(arr[i]);
	// 	}else{
	// 		tmp=Number(arr[i]);
	// 	}
	// 	if(!isNaN(tmp)){
	// 		if(undefined!=min){
	// 			if(min>tmp && tmp!=invalidVal)min=tmp;
	// 		}else if(tmp!=invalidVal){
	// 			min = tmp;
	// 		}
	// 	}
	// }
	var min;
	for (var i = 0, l = arr.length; i < l; i++) {
		if (undefined != min) {
			min = Math.min(min, arr[i][1]);
		} else {
			min = arr[i][1];
		}
	}
	if (!$.isNumeric(min)) {
		min = 0;
	}
	return min;
}

chartTrend.prototype.drawRTCoordinate = function(originPoint, options, drawParams) {
	//绘制X轴
	this.originPoint = {
		x: this.drawingArea.padding.left,
		y: this.h - this.drawingArea.padding.bottom
	};
	this.xLength = this.w - this.drawingArea.padding.left - this.drawingArea.padding.right;
	this.yLength = this.h - this.drawingArea.padding.bottom - this.drawingArea.padding.top;

	this.drawLine(
		this.originPoint, {
			x: this.originPoint.x + this.xLength,
			y: this.originPoint.y
		},
		this.defaultGlobalOption.xaxis.color,
		this.defaultGlobalOption.xaxis.lineWidth);
	//绘制Y轴
	this.drawLine(
		this.originPoint, {
			x: this.originPoint.x,
			y: this.originPoint.y - this.yLength
		},
		this.defaultGlobalOption.yaxis.color,
		this.defaultGlobalOption.yaxis.lineWidth);
	//水平参考线
	for (var i = 0; this.defaultGlobalOption.yaxis.refLines && i < this.defaultGlobalOption.yaxis.refLines; i++) {
		var startPosv = {
			x: this.originPoint.x,
			y: this.originPoint.y - (i + 1) * this.yLength / this.defaultGlobalOption.yaxis.refLines
		};
		this.drawHorizonLine(startPosv,
			this.xLength,
			this.defaultGlobalOption.grid.color,
			this.defaultGlobalOption.grid.tickWidth);
	}
	//垂直参考线
	for (var i = 0; this.defaultGlobalOption.xaxis.refLines && i < this.defaultGlobalOption.xaxis.refLines; i++) {
		var startPosv = {
			x: this.originPoint.x + (i + 1) * this.xLength / this.defaultGlobalOption.xaxis.refLines,
			y: this.originPoint.y
		};
		this.drawVerticalLine(startPosv,
			this.yLength,
			this.defaultGlobalOption.grid.color,
			this.defaultGlobalOption.grid.tickWidth);
	}

};

//画一条线段
chartTrend.prototype.drawLine = function(p1, p2, color, width, otherStyle, otherOpts) {
	var line = document.createElementNS(this.svgNS, "line");
	line.setAttribute("x1", p1.x);
	line.setAttribute("y1", p1.y);
	line.setAttribute("x2", p2.x);
	line.setAttribute("y2", p2.y);
	if (undefined == color) color = "#000";
	if (undefined == width) width = "1";
	var style = "stroke:" + color + ";stroke-width:" + width + ';';
	if ("string" == typeof(otherStyle) && otherStyle.length > 0) {
		style += otherStyle;
	}
	line.setAttribute("style", style);
	//line.setAttribute("shape-rendering", "crispEdges"); //注重绘制清晰的图形边缘，绘制时，图形边缘会对齐到像素
	line.setAttribute("shape-rendering", "geometricPrecision");
	if (otherOpts && $.isArray(otherOpts.attrs)) {
		var a, aname, aval;
		for (var i = 0, l = otherOpts.attrs.length; i < l; i++) {
			a = otherOpts.attrs[i];
			aname = a.name;
			aval = a.value;
			if (aname && aval) {
				line.setAttribute(aname, aval);
			}
		}
	}

	this.svgObj.appendChild(line);
	return line;
};

//绘制水平线, 从 startPos 开始向右画 distance 像素, 如果 distance 是负值, 则向左画
chartTrend.prototype.drawHorizonLine = function(startPos, distance, color, width) {
	this.drawLine(startPos, {
		x: startPos.x + distance,
		y: startPos.y
	}, color, width);
};

chartTrend.prototype.drawVerticalLine = function(startPos, distance, color, width) {
	this.drawLine(startPos, {
		x: startPos.x,
		y: startPos.y - distance
	}, color, width);
};

//画向右的箭头
chartTrend.prototype.drawRightArrow = function(arrowPoint, width, height, fillColor, lineColor) {
	var p2 = {
		x: arrowPoint.x - height,
		y: arrowPoint.y - Math.floor(width / 2)
	};
	var p3 = {
		x: p2.x,
		y: p2.y + width
	};
	this.drawPolyLine([arrowPoint, p2, p3], fillColor, lineColor).setAttribute("shape-rendering", "geometricPrecision");
};

//画向上的箭头
chartTrend.prototype.drawUpArrow = function(arrowPoint, width, height, fillColor, lineColor) {
	var p2 = {
		x: arrowPoint.x - Math.floor(width / 2),
		y: arrowPoint.y + height
	};
	var p3 = {
		x: p2.x + width,
		y: p2.y
	};
	this.drawPolyLine([arrowPoint, p2, p3], fillColor, lineColor).setAttribute("shape-rendering", "geometricPrecision");
};

/*用对象传参的方式画柱形图
drawParams
	.width            number
	.height           number
	.leftBottomPoint  object{x,y}
	.fillColor        string
	.lineColor        string
	.lineWidth        number
	.opacity          number
	.borderRadius     number or object{rx,ry}
	.shapeRend        string, auto, optimizeSpeed, crispEdges or geometricPrecision
	.rectTitle        string, tooltip of the rect
	.attr:            object, will setAttribute to the rect
*/
chartTrend.prototype.drawRect2 = function(drawParams, otherOpts) {
		drawParams = $.extend({}, drawParams);
		drawParams.width = Number(drawParams.width);
		drawParams.height = Number(drawParams.height);
		if (isNaN(drawParams.width) || drawParams.width <= 0) return;
		if (isNaN(drawParams.height) || drawParams.height < 0) {
			return;
			drawParams.height = 0;
		}
		var rect;
		if (0 == drawParams.height) {
			rect = this.drawLine({
					x: drawParams.leftBottomPoint.x,
					y: drawParams.leftBottomPoint.y
				}, //p1
				{
					x: drawParams.leftBottomPoint.x + drawParams.width,
					y: drawParams.leftBottomPoint.y
				}, //p2
				drawParams.fillColor,
				1
			);
		} else {
			rect = document.createElementNS(this.svgNS, "rect");
			rect.setAttribute("x", drawParams.leftBottomPoint.x);
			rect.setAttribute("y", drawParams.leftBottomPoint.y - drawParams.height);
			rect.setAttribute("width", drawParams.width);
			rect.setAttribute("height", drawParams.height);
			if ("object" == typeof(drawParams.attr)) {
				for (a in drawParams.attr) {
					rect.setAttribute(a, drawParams.attr[a]);
				}
			}
			var style = "";
			var fillColor = drawParams.fillColor;
			var lineColor = drawParams.lineColor;
			var lineWidth = drawParams.lineWidth;
			var opacity = drawParams.opacity;
			var borderRadius = drawParams.borderRadius;
			var shapeRend = drawParams.shapeRend;
			var rectTitle = drawParams.rectTitle;
			if (undefined == fillColor || null == fillColor || 0 == fillColor.length) {
				style += "fill:none;";
			} else {
				style += "fill:" + fillColor + ";";
			}
			if (undefined != lineColor && null != lineColor && lineColor.length > 0) {
				style += "stroke:" + lineColor + ";";
			}
			if (undefined != lineWidth && null != lineWidth && lineWidth.length > 0) {
				style += "stroke-width:" + lineWidth + ";";
			}
			if (!isNaN(opacity = Number(opacity)) && opacity > 0) {
				style += "opacity:" + opacity + ";";
			}
			if (style.length > 0) {
				rect.setAttribute("style", style);
			}
			switch (typeof(borderRadius)) {
				case "number":
					rect.setAttribute("rx", borderRadius);
					break;
				case "object":
					if ("number" == typeof(borderRadius.rx))
						rect.setAttribute("rx", borderRadius.rx);
					if ("number" == typeof(borderRadius.ry))
						rect.setAttribute("ry", borderRadius.ry);
					break;
			}
			if ("string" == typeof(shapeRend) && shapeRend.length > 0) {
				rect.setAttribute("shape-rendering", shapeRend);
			}
		}

		if (undefined != rectTitle) {
			var title = document.createElementNS(this.svgNS, "title");
			if (undefined != title.textContent) {
				title.textContent = rectTitle;
			} else if (undefined != title.innerHTML) {
				title.innerHTML = rectTitle;
			}
			rect.appendChild(title);
			rect.setAttribute("title", rectTitle);
		}

		this.svgObj.appendChild(rect);
		return rect;
	}
	//画柱形图
chartTrend.prototype.drawRect = function(leftBottomPoint, width, height, fillColor, lineColor, lineWidth, opacity, borderRadius, shapeRend, rectTitle, otherAttr) {
	return this.drawRect2({
		leftBottomPoint: leftBottomPoint,
		width: width,
		height: height,
		fillColor: fillColor,
		lineColor: lineColor,
		lineWidth: lineWidth,
		opacity: opacity,
		borderRadius: borderRadius,
		shapeRend: shapeRend,
		rectTitle: rectTitle,
		attr: otherAttr
	});
};

//画圆
chartTrend.prototype.drawCircle = function(center, radius, fillColor, lineColor, lineWidth) {
	var c = document.createElementNS(this.svgNS, "circle");
	c.setAttribute("cx", center.x);
	c.setAttribute("cy", center.y);
	c.setAttribute("r", radius);

	var style = "";
	if ("string" == typeof(fillColor) && fillColor.length > 0) {
		style += "fill:" + fillColor + ";";
	} else {
		style += "fill:none;";
	}
	if (undefined != lineColor && null != lineColor && lineColor.length > 0) {
		style += "stroke:" + lineColor + ";";
	}
	if (undefined != lineWidth && null != lineWidth && lineWidth.length > 0) {
		style += "stroke-width:" + lineWidth + ";";
	}
	if (style.length > 0) {
		c.setAttribute("style", style);
	}
	this.svgObj.appendChild(c);
	return c;
};

/*绘制文本
	  text标签中的x,y是文字左下角的位置
	参数:
	  position: 文字的基准位置
	  fontColor: 可选
	  fontFamily: 可选
	  fontSize: 可选
	  fontWeight: 可选
	  alignX: 水平对齐方式，可以是'left' or 'center' or 'right'，表示文字在横向与position的对齐方式; 默认position在文字的left-bottom
	  alignY: 垂直对齐方式, 可以是'top' or 'middle' or 'bottom'，表示文字在纵向与position的对齐方式
	  transformStyle:
	  otherOpts: 可选, 其他参数, 内容={
	    lastPos:  上一个文字的位置
	    lastRect: 上一个文字的尺寸
	    offsetDirection: 文字方向, 目前仅支持'R', 即从左向右
	    textDistance: 可选, 相邻文字的水平间距, 默认为5px
	    drawRect: Boolean, 是否绘制文字的边框
		lineColor: drawRect==true时, 边框的颜色
		bgColor: drawRect==true时, 边框所围矩形的背景颜色
		rectOption:
	  }
	*/
chartTrend.prototype.drawText = function(text, position, fontColor, fontFamily, fontSize, fontWeight, alignX, alignY, transformStyle, otherOpts) {
	var tElem = document.createElementNS(this.svgNS, "text");
	var tRect;
	var t = text.toString();
	if ("object" == typeof(this.TextRect)) {
		tRect = this.TextRect;
	} else {
		tRect = this.GetTextRectSize(t, fontFamily, fontSize);
	}
	var pos = {
		x: position.x,
		y: position.y
	};
	switch (alignX) {
		case "center":
			pos.x -= tRect.width / 2;
			break;
		case "right":
			pos.x -= tRect.width;
			break;
	}
	switch (alignY) {
		case "middle":
			pos.y += tRect.height / 2;
			break;
		case "top":
			pos.y += tRect.height;
			break;
	}
	if (otherOpts) {
		if (otherOpts.lastPos && otherOpts.lastRect) {
			if ("R" == otherOpts.offsetDirection) { //如果文字是向右写，则只需判断前一个文字的最右侧位置
				var textDistance = otherOpts.textDistance || 5; //文字间距留5个像素，或者根据参数
				if (pos.x < otherOpts.lastPos.x + otherOpts.lastRect.width + textDistance) {
					return;
				}
			}
		}
		otherOpts.lastPos = {
			x: pos.x,
			y: pos.y
		}; //输出文字实际位置
		otherOpts.lastRect = {
			width: tRect.width,
			height: tRect.height
		}; //输出文字实际尺寸
		if (otherOpts.drawRect){
			var rectPadding = 0;
			if($.isNumeric(otherOpts.rectPadding)){
				rectPadding = otherOpts.rectPadding;
			}
			var rectPos = {
				x: pos.x - rectPadding,
				y: pos.y - rectPadding
			}
			pos = {
				x: pos.x - rectPadding/2,
				y: pos.y - 2 * rectPadding
			}
			//绘制文字所占区域的矩形
			this.drawRect(rectPos, tRect.width + 2 * rectPadding, tRect.height + 2 * rectPadding, otherOpts.bgColor, otherOpts.lineColor, 1, 1, 3,undefined,undefined,otherOpts.rectOption);
		} 
		//leftBottomPoint, width, height, fillColor, lineColor, lineWidth, opacity, borderRadius, shapeRend, rectTitle, otherAttr
	}
	tElem.setAttribute("x", pos.x);
	tElem.setAttribute("y", pos.y);
	if (undefined != transformStyle && null != transformStyle && transformStyle.length > 0) {
		tElem.setAttribute("transform", transformStyle);
	}
	if (undefined != fontColor && null != fontColor && fontColor.length > 0) {
		tElem.setAttribute("fill", fontColor);
	}
	if (undefined != fontFamily && null != fontFamily && "" != fontFamily) tElem.style.fontFamily = fontFamily;
	if (undefined != fontSize && null != fontSize && "" != fontSize) tElem.style.fontSize = fontSize;
	if (undefined != fontWeight && null != fontWeight && "" != fontWeight) tElem.style.fontWeight = fontWeight;
	if (undefined != tElem.innerHTML) {
		tElem.innerHTML = t;
	} else {
		tElem.appendChild(document.createTextNode(t));
	}

	if (otherOpts && $.isArray(otherOpts.attrs)) {
		var a, aname, aval;
		for (var i = 0, l = otherOpts.attrs.length; i < l; i++) {
			a = otherOpts.attrs[i];
			aname = a.name;
			aval = a.value;
			if (aname && aval) {
				tElem.setAttribute(aname, aval);
			}
		}
	}
	this.svgObj.appendChild(tElem);
	return tElem;
};
