function mGauge(element, option, valueObj) {
	//valueObj = [{value:500}]
    var defaultOption = {
        max: 1000,
        min: 0,
        startAngle: -180,
        endAngle: 0,
        counterclockwise:false,
        lineWidth:20,
        font:{
        	size:16,
        	color:"#565656"
        },
        rangeContainer: {
            offset: 0,
            backgroundColor: "#EAEAEA",
            baseColor:"#0B71BF",
            ranges: [
                //{startValue:0,endValue:100,color:"#00FF00"}
            ]
        }
    }
    var defaultValue = [];
    if (option) {
        $.extend(true, defaultOption, option);
    }
    if (valueObj) {
        $.extend(true, defaultValue, valueObj);
    }
    var jElement;
    var canvas;
    var ctx;
    if ($(element).prop("tagName") == "CANVAS") {
        jElement = $(element);
        canvas = $(element).get(0);
        canvas.className = "canvasGauge";
        ctx = canvas.getContext("2d");
    } else if ($(element).prop("tagName") == "DIV") {
        jElement = $(element);
        if (jElement.css("position") == "static") {
            jElement.css("position", "relative");
        }

        if (jElement.children(".canvasGauge").length > 0) {
            canvas = jElement.children(".canvasGauge").get(0);
        } else {
            canvas = document.createElement('canvas');
            canvas.className = "canvasGauge";
            canvas.width = jElement.width();
            canvas.height = jElement.height();
            jElement.html(canvas);
        }
        //canvas = $(element).get(0);
        ctx = canvas.getContext("2d");
    } else {
        return false;
    }

    //dimensions
    var W = canvas.width;
    var H = canvas.height;
    var old_value = null;
    var new_value = null;
    var diff_value = null;
    var max = 1000, min = 0;
    var startAngle = 0 * Math.PI / 180;
    var endAngle = Math.PI * 2;
    var counterclockwise = false;

    if ($.isNumeric(defaultOption.max)){
    	max = defaultOption.max;
    }
    if ($.isNumeric(defaultOption.min)){
    	min = defaultOption.min;
    }

    if(defaultValue && defaultValue.length > 0){
    	new_value = defaultValue[0].value;
    }else{
    	new_value = min;	
    }

    if ($.isNumeric(defaultOption.startAngle)){
    	startAngle = defaultOption.startAngle;
    }
    if ($.isNumeric(defaultOption.endAngle)) {
    	endAngle = defaultOption.endAngle;
    }
    if (defaultOption.startAngle % 360 >= defaultOption.endAngle % 360) {
        startAngle = (defaultOption.startAngle % 360) * Math.PI / 180;
        endAngle = (defaultOption.endAngle % 360 + 360) * Math.PI / 180;
        defaultOption.startAngle = defaultOption.startAngle % 360;
        defaultOption.endAngle = defaultOption.endAngle % 360 + 360;
    } else {
        startAngle = (defaultOption.startAngle % 360) * Math.PI / 180;
        endAngle = (defaultOption.endAngle % 360) * Math.PI / 180;
        defaultOption.startAngle = defaultOption.startAngle % 360;
        defaultOption.endAngle = defaultOption.endAngle % 360;
    }
    var rangeDegree = defaultOption.endAngle - defaultOption.startAngle;
    counterclockwise = defaultOption.counterclockwise;

    var degrees;
    degrees = (new_value - min)/(max - min) * rangeDegree + defaultOption.startAngle;
    var padding = 10;
    ctx.clearRect(0, 0, W, H);
    var centerX = W / 2;
    var centerY = H / 2;
    var outerRadius = Math.min(W, H) / 2 - defaultOption.lineWidth;


    if (W > H) {
                if (W > 2 * H) {
                    centerX = W / 2;
                    centerY = H / 2 + (H / 2 - padding) - defaultOption.lineWidth;
                    outerRadius = 2 * outerRadius - 2 * padding;
                    //console.log("t_1");
                } else {
                    centerX = W / 2;
                    centerY = H / 2 + (W / 4 - padding) - defaultOption.lineWidth;
                    outerRadius = W / 2 - defaultOption.lineWidth - 2 * padding;
                    //console.log("t_2");
                }
            } else {
                centerX = W / 2;
                centerY = H / 2 + W / 4 - defaultOption.lineWidth;
                outerRadius = outerRadius - 2 * padding;
                //console.log("t_3");
            }

    //Background 360 degree arc
        ctx.beginPath();
        ctx.strokeStyle = defaultOption.rangeContainer.backgroundColor;
        ctx.lineWidth = defaultOption.lineWidth;
        ctx.lineCap = "round";
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle, defaultOption.counterclockwise);
        ctx.stroke();
    //range color
    var radius = outerRadius;
    	var radians = degrees * Math.PI / 180;
        var lineWidth = defaultOption.lineWidth;
    if(new_value != min){
        if(radians > endAngle){radians = endAngle;}
    	ctx.beginPath();
        ctx.strokeStyle = defaultOption.rangeContainer.baseColor;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.arc(centerX, centerY, radius, startAngle, radians, defaultOption.counterclockwise);
        ctx.stroke();
    }
    	
        
        //text
        ctx.font = defaultOption.font.size + 'px Calibri';
        ctx.fillText(min, centerX - radius - ctx.measureText(min).width / 2, centerY + lineWidth*1.2);
        ctx.fillText(max, centerX + radius - ctx.measureText(max).width / 2, centerY + lineWidth*1.2);

        //center dot
        /*ctx.beginPath();
        ctx.strokeStyle = defaultOption.rangeContainer.baseColor;
        ctx.lineWidth = 5;
        ctx.arc(centerX, centerY, 2, 0, Math.PI * 2, defaultOption.counterclockwise);
        ctx.stroke();*/
        //center text
        var fontSize = 50;
        var text = new_value;
        ctx.font = fontSize + 'px Calibri';
        do{
                fontSize--;
                ctx.font = fontSize +'px Calibri';
        }while(ctx.measureText(text).width>W);
        var textWidth = ctx.measureText(text).width;

        //center block
        /*var r = 5;
        var x = centerX - Math.ceil(textWidth / 2);
        var y = centerY - fontSize/2;
        var w = textWidth;
        var h = fontSize;
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        ctx.fillStyle = 'rgb(234,234,234)';
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x+w, y, x+w, y+h, r);
        ctx.arcTo(x+w, y+h, x, y+h, r);
        ctx.arcTo(x, y+h, x, y, r);
        ctx.arcTo(x, y, x+w, y, r);
        ctx.closePath();
        ctx.fill();*/
        
        ctx.fillStyle = 'rgb(58,58,58)';
        ctx.fillText(text, centerX - Math.ceil(textWidth / 2), centerY + fontSize/2, W);

}


function mDigital(element, option, valueObj){
    //valueObj = [{value:500}]
    var defaultOption = {
        max: 7,
        min: 0,
        lineWidth:20,
        font:{
            size:10,
            color:"#565656"
        },
        legend: {
            backgroundColor: "#FFFFFF",
            activeColor:"#0B71BF"
        },
        descript:['W','SW','S','SE','E','NE','N','NW']
    }
    var defaultValue = [];
    if (option) {
        $.extend(true, defaultOption, option);
    }
    if (valueObj) {
        $.extend(true, defaultValue, valueObj);
    }
    var jElement;
    var canvas;
    var ctx;
    if ($(element).prop("tagName") == "CANVAS") {
        jElement = $(element);
        canvas = $(element).get(0);
        canvas.className = "canvasGauge";
        ctx = canvas.getContext("2d");
    } else if ($(element).prop("tagName") == "DIV") {
        jElement = $(element);
        if (jElement.css("position") == "static") {
            jElement.css("position", "relative");
        }

        if (jElement.children(".canvasGauge").length > 0) {
            canvas = jElement.children(".canvasGauge").get(0);
        } else {
            canvas = document.createElement('canvas');
            canvas.className = "canvasGauge";
            canvas.width = jElement.width();
            canvas.height = jElement.height();
            jElement.html(canvas);
        }
        //canvas = $(element).get(0);
        ctx = canvas.getContext("2d");
    } else {
        return false;
    }
    //dimensions
    
    var W = canvas.width;
    var H = canvas.height;
    var padding = Math.round(Math.min(W,H)/10);
    var marginWidth  = 10;
    var marginHeight  = 15;

    var old_value = null;
    var new_value = null;
    var diff_value = null;
    var max = 7, min = 0;

    if ($.isNumeric(defaultOption.max)){
        max = defaultOption.max * 1;
    }
    if ($.isNumeric(defaultOption.min)){
        min = defaultOption.min * 1;
    }

    if(defaultValue && defaultValue.length > 0){
        new_value = defaultValue[0].value;
    }else{
        new_value = min;    
    }

    var areaWidth = W - 2 * padding;
    var areaHeight =  H - 2 * padding;

    var row = Math.ceil((max+1) / 2);
    var row = 4;

    var blockHeight = Math.floor((areaHeight - (row - 1)*marginHeight) / row);
    var blockwidth = Math.floor(areaWidth / 8);
    var blockwidth = 40;
    var bgblockwidth = Math.floor(areaWidth/2) - marginWidth;
    var textblockwidth = bgblockwidth - blockwidth - marginWidth;

    var lefts = [
    padding,
    W - (bgblockwidth+padding)
    ];
    var tops = [
    padding,
    padding + blockHeight + marginHeight,
    padding + 2 * blockHeight + 2 * marginHeight,
    padding + 3 * blockHeight + 3 * marginHeight
    ];
    var txtLeft = [
    padding + blockwidth,
    W - (bgblockwidth+padding) + blockwidth
    ];

    /*ctx.moveTo(left1, top1);
    ctx.lineTo( left1, top1+blockHeight);
    ctx.lineTo(left1+blockwidth, top1+blockHeight);
    ctx.lineTo(left1+blockwidth, top1);
    ctx.lineTo(left1, top1);
    ctx.stroke();*/
    var shiftY_row = Math.ceil((max+1) / 2);
    var shiftY = 0;
    if(shiftY_row == 1){
        shiftY = H/2 - blockHeight/2 - padding;
    }else if(shiftY_row == 2){
        shiftY = H/2 - (2*blockHeight+marginHeight)/2 - padding;
    }else if(shiftY_row == 3){
        shiftY = H/2 - (3*blockHeight+3*marginHeight)/2 - padding;
    }

    for(var j = 0;j<tops.length;j++){
        for(var i = 0;i<lefts.length;i++){
            //i+2*j
            if(i+2*j > max){break;}

            //draw background
            ctx.fillStyle = '#EEEEEE';
            var block_margin = 4;
            var r = 5;
            var x = lefts[i] - block_margin;
            var y = shiftY+tops[j]-block_margin;
            var w = bgblockwidth+2*block_margin;
            var h = blockHeight+2*block_margin;
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x+w, y, x+w, y+h, r);
            ctx.arcTo(x+w, y+h, x, y+h, r);
            ctx.arcTo(x, y+h, x, y, r);
            ctx.arcTo(x, y, x+w, y, r);
//          ctx.arcTo(x+r, y);
            ctx.closePath();
            ctx.fill();  



            if(parseInt(new_value) != i+2*j){
                ctx.fillStyle = defaultOption.legend.backgroundColor;
            }else{
                ctx.fillStyle = defaultOption.legend.activeColor;   
            }

            //draw legend
            /*ctx.beginPath();
            ctx.moveTo(lefts[i], shiftY+tops[j]);
            ctx.lineTo(lefts[i], shiftY+tops[j]+blockHeight);
            ctx.lineTo(lefts[i]+blockwidth, shiftY+tops[j]+blockHeight);
            ctx.lineTo(lefts[i]+blockwidth, shiftY+tops[j]);
            ctx.lineTo(lefts[i], shiftY+tops[j]);
            ctx.closePath();
            ctx.fill();*/
            //draw round rect
            var r = 5;
            var x = lefts[i];
            var y = shiftY+tops[j];
            var w = blockwidth;
            var h = blockHeight;
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x+w, y, x+w, y+h, r);
            ctx.arcTo(x+w, y+h, x, y+h, r);
            ctx.arcTo(x, y+h, x, y, r);
            ctx.arcTo(x, y, x+w, y, r);
//          ctx.arcTo(x+r, y);
            ctx.closePath();
            ctx.fill();

            //draw text(ctx.measureText(min).width)
            //defaultOption.font.size
            var text = defaultOption.descript[i+2*j];
            var fontSize = blockHeight;
            var fontface = 'Calibri';
            ctx.font = fontSize + 'px Calibri';
            if(!text){text='';}
            do{
                fontSize--;
                ctx.font = fontSize +"px "+fontface;
            }while(ctx.measureText(text).width>textblockwidth);
            ctx.fillStyle = defaultOption.font.color;
            ctx.fillText(text, marginWidth + txtLeft[i], shiftY+tops[j] + blockHeight / 2  + fontSize / 4, textblockwidth);
        }
    }
    

};


function mText(element, option, valueObj){
    //valueObj = [{value:500}]
    var defaultOption = {
        lineWidth:20,
        font:{
            size:10,
            color:"#0B71BF"
        },
        legend: {
            backgroundColor: "#64A3D8",
            activeColor:"#FF0000"
        }
    }
    var defaultValue = [];
    if (option) {
        $.extend(true, defaultOption, option);
    }
    if (valueObj) {
        $.extend(true, defaultValue, valueObj);
    }
    var jElement;
    var canvas;
    var ctx;
    if ($(element).prop("tagName") == "CANVAS") {
        jElement = $(element);
        canvas = $(element).get(0);
        canvas.className = "canvasGauge";
        ctx = canvas.getContext("2d");
    } else if ($(element).prop("tagName") == "DIV") {
        jElement = $(element);
        if (jElement.css("position") == "static") {
            jElement.css("position", "relative");
        }

        if (jElement.children(".canvasGauge").length > 0) {
            canvas = jElement.children(".canvasGauge").get(0);
        } else {
            canvas = document.createElement('canvas');
            canvas.className = "canvasGauge";
            canvas.width = jElement.width();
            canvas.height = jElement.height();
            jElement.html(canvas);
        }
        //canvas = $(element).get(0);
        ctx = canvas.getContext("2d");
    } else {
        return false;
    }
    //dimensions
    
    var W = canvas.width;
    var H = canvas.height;
    var padding = Math.round(Math.min(W,H)/10);
    var marginWidth  = Math.round(W/20);
    var marginHeight  = Math.round(H/10);

    var old_value = null;
    var new_value = null;
    var diff_value = null;

    var areaWidth = W - 2 * padding;
    var areaHeight =  H - 2 * padding;

    var fontSize = defaultOption.font.size;
    var fontface = 'Calibri';
    var text = '';
    
    if(defaultValue && defaultValue.length > 0){
        text = defaultValue[0]['value'];
    }
    // temp font
    fontSize = areaHeight;
    do{
        fontSize--;
        ctx.font = fontSize +"px "+fontface;
    }while(ctx.measureText(text).width>areaWidth)

    ctx.font = fontSize + 'px Calibri';
    
            console.log(ctx.measureText(text));
    ctx.fillStyle = defaultOption.font.color;
    ctx.fillText(text, padding, H / 2  + fontSize / 4, areaWidth);

};