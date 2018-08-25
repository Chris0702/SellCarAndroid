//Convert ImgValue from string to a value object{lo, hi} array
//hi maybe null,or a object{v:value,t:type}, t=0 meaning open range,t=1 meaning close range
//if hi is null,lo is a float value. if hi is not null,lo also a object{v:value,t:type}
function ConvImgVal(ImgVal){
	var a=ImgVal.split(",");
	var av=new Array();
	var i=0, j=0;
	try{
		for(j=0; j<a.length; j++){
			if(a[j].match(/^[+-]?((\d+)|(\d+\.\d+))$/))
				av[i] = {lo:parseFloat(a[j]), hi:null};
			else if(a[j].match(/^[\[\(][+-]?((\d+)|(\d+\.\d+))$/)){
				if(j+1>=a.length)break;
				if(null==a[j+1].match(/^[+-]?((\d+)|(\d+\.\d+))[\]\)]$/))break;
				av[i] = {
					lo:{v:parseFloat(a[j].substring(1,a[j].length)), t:('('==a[j].substring(0,1)?0:1)},
					hi:{v:parseFloat(a[j+1].substring(0,a[j+1].length-1)), t:(')'==a[j+1].substring(a[j+1].length-1,a[j+1].length)?0:1)}
				};
				j++;
			}
			else
				break;
			i++;
		}
	}catch(e){}
	return av;
}

//check if val match iconValAry
function ChkImgVal(iconValAry, val){
	var i, j, hi, lo, fltVal;
	try{
		fltVal = parseFloat(val);
		if(iconValAry.length>0){
			if(typeof(iconValAry)=="string"){}
			for(i=0; i<iconValAry.length; i++){
				hi = iconValAry[i].hi;
				lo = iconValAry[i].lo;
				if(hi==null){
					if(fltVal==lo) return true;
				}
				else{
					if((0==lo.t && fltVal<=lo.v)||(1==lo.t && fltVal<lo.v)) continue;
					if((0==hi.t && fltVal>=hi.v)||(1==hi.t && fltVal>hi.v)) continue;
					return true;
				}
			}
		}
	}
	catch(e){/*alert(e.message);*/}
	return false;
}

var xmlHttpObj=null;
if(window.XMLHttpRequest){
	xmlHttpObj = new XMLHttpRequest();
}else if(window.ActiveXObject){
	xmlHttpObj=new ActiveXObject("Microsoft.XMLHTTP");
}


function GetBaiduLatLng_notuse(LatLng){
	//var s="http://api.map.baidu.com/geoconv/v1/?callback=?";
	var s="http://api.map.baidu.com/geoconv/v1/?ak=xIESC7QcBXB4cgGNuD4KZnN7&coords="+LatLng.lng+","+LatLng.lat+"&from=1&to=5&output=xml&tmp="+Math.random()+"&jsoncallback=?";
	alert(s);
	//debugger;
	$.getJSON(s,function(data){
		alert(data);
	});
}
function GetBaiduLatLng(marker,LatLng){
	if(isNaN(LatLng.lat) || isNaN(LatLng.lng))return;
	var s="http://api.map.baidu.com/geoconv/v1/?ak=xIESC7QcBXB4cgGNuD4KZnN7&coords="+LatLng.lng+","+LatLng.lat+"&from=1&to=5&output=json&tmp="+Math.random()+"&jsonpCallback=abc"; //jsoncallback=?总出错，用任何字符串代替?就会正常
	$.ajax({
		type:'GET',
		url:s,
		dataType:'jsonp',
		WAMarker:marker,
		//jsonpCallback:'callbackfun',  //加上这一行的话 callbackfun 就会被调用, 且只有一个参数data, 然后调用success
		success:function(data){//lng:data.result[0].x, lat:data.result[0].y
			AddMsg("jquery ajax success, this.WAMarker.title=[" + this.WAMarker.title + "]");
			var op=this.WAMarker.myGMarker.marker_.getPosition();
			if(op.lng!=data.result[0].x || op.lat!=data.result[0].y)
			{
				var np = new BMap.Point(data.result[0].x, data.result[0].y);  //(lng, lat)
				this.WAMarker.myGMarker.setPosition(np);
				this.WAMarker.myGMarker.marker_.setPosition(np);
				this.WAMarker.myGMarker.draw();
			}
		},
		//complete:function(xmlHttpReqObj,statusStr){AddMsg("jquery ajax complete, ");},  //若加上这句，这个function会被调用（success之后）
		error:function(xmlHttpReqObj,errDesc,e){AddMsg(" jquery ajax error:"+e.description);}
	});
}
//function callbackfun(data){debugger;}

function GetBaiduLatLng_old(LatLng){
	if(xmlHttpObj){
		var s="http://api.map.baidu.com/geoconv/v1/?ak=xIESC7QcBXB4cgGNuD4KZnN7&coords="+LatLng.lng+","+LatLng.lat+"&from=1&to=5&output=xml&tmp="+Math.random();
		xmlHttpObj.open("GET", s, true);
		xmlHttpObj.onreadystatechange=function(){
			AddMsg(" readyState=" + this.readyState);
			//if(this.readyState == 4) {		//0 = NOT INIT,1 = Loading,2 = Loaded,3 = communion,4 = Complete
			
			//}
		};
		xmlHttpObj.send(null);
	}
	return null;
}