var originImage=new Image();
var oriImgSrc = "";
var browser = {tp:0};

if(!window.ActiveXObject)
{
if(document.getBoxObjectFor)	//firefox
browser.tp=1;
else if(window.MessageEvent)	//chrome
browser.tp=2;
else if(window.opera)	//opera
browser.tp=3;
else if(window.openDatabase)	//safari
browser.tp=4;
}
////////////////////////////////////////////////////////
function CIMG(imgFile,imgTp, imgVal){
	this.fi=imgFile;
	this.tp=imgTp;
	this.val=imgVal;
	this.url="";
}

function CMarkLabel(title,tag,oimg){
	this.title=title;			//string
	this.tag=tag;					//string
	this.img=oimg;				//CIMG object or null
}
////////////////////////////////////////////////////////

var MarkerId=1;
/*WAMarker is user defined object that defined as:
	{
		title: mtitle,    //string
		icon: MarkerIcon, //defined as:{fi:oimg.fi, tp:oimg.imgTp, val:oimg.Val}
		la: Lat,          //float value  纬度
		lo: Lng,          //float value  经度
		tag: latLngTag,   //string
		defaultTag: false,
		point: mpoint,    //string
		lcmd: mlcmd,      //string
		labels:null,
		lockp:lock        //bool
	}
*/
function CmyGMarker(map, WAMarker, iconurl, bIsConfig){
	if("undefined"==typeof(BMap)){return;}
	this.id = MarkerId++;
	this.GLatLng_ = new BMap.Point(WAMarker.lo, WAMarker.la);
	this.img_ = iconurl;  //full img url
	this.WAMarker = WAMarker;
	this.marker_ = null;
	this.map_ = map;
	this.div_ = null;
	this.titlediv=null;
	this.la = null;			//label div array
	this.ta = null;			//tag div array
	this.iscfg = bIsConfig;
	this.markerClickHandler = null;
	this.markerDblclickHandler = null;
	this.markerRClickHandler=null;
	this.mouseMoveHandler=null;
	this.mouseOutHandler=null;
	this.hfnMouseMove=null;
	this.hfnMouseOut=null;
	this.ShowIconOnly=0; //0=always,1=mouse over,2=disabled
	this.complete = false;
}
if("undefined"!=typeof(BMap)){
CmyGMarker.prototype = new BMap.Overlay();
CmyGMarker.prototype.initialize = function(){ //addOverlay时被调用
	//1st, create a BMap marker
	var WAMarker=this.WAMarker;
	var isize = GetImgOriSize(this.img_, 50, 50);
	var iconOpt = {anchor:new BMap.Size(isize.w/2, isize.h)};
	var myIcon = new BMap.Icon(this.img_, new BMap.Size(isize.w, isize.h),iconOpt);
	AddMsg("initialize:Lat=" + this.GLatLng_.lat + ", Lng=" + this.GLatLng_.lng + ", isize=[" + isize.w + ", " + isize.h + "]<br />");
	var marker = new BMap.Marker(this.GLatLng_,{icon:myIcon});	// 创建标注对象并添加到地图
	if(this.iscfg==true){
		if(WAMarker.lockp){marker.disableDragging();}else{marker.enableDragging();}
	}else{
		marker.disableDragging();
	}
	marker.ovl = this;
	marker.iw = isize.w;
	marker.ih = isize.h;
	this.marker_ = marker;
	map.addOverlay(marker);

	//2nd, create infoDiv
	var d, d1;
	var panes = this.map_.getPanes();
	d = document.createElement('DIV');
	d.className="markerdiv";
	var t = document.createElement('DIV');
	t.className = "mt";
	t.appendChild(document.createTextNode(WAMarker.title));
	d.appendChild(t);
	panes.floatShadow.appendChild(d);
	this.titlediv=t;
	this.div_ = d;
	this.marker_.infoDiv=d;

	//labels and tags
	if (WAMarker.labels){
		var LabelCnt=WAMarker.labels.length;
		this.la = new Array(LabelCnt);
		this.ta = new Array(LabelCnt);
		for (i = 0; i < LabelCnt; i++){
			if (WAMarker.labels[i]){
				if (WAMarker.labels[i].title.length > 0){
					d = document.createElement('DIV');
					d.className = "mln";
					d.appendChild(document.createTextNode(WAMarker.labels[i].title));
					this.div_.appendChild(d);
					this.la[i] = d;
					if (WAMarker.labels[i].tag.length > 0){
						d1 = document.createElement('DIV');
						d1.className = "mlt";
						if(this.iscfg && (typeof WAMarker.labels[i].color1=="string") && WAMarker.labels[i].color1.length==6 && !isNaN(parseInt(WAMarker.labels[i].color1, 16))){
							d1.style.color = "#" + WAMarker.labels[i].color1;
						}
						d1.appendChild(document.createTextNode(WAMarker.labels[i].tag));
						this.div_.appendChild(d1);
						this.ta[i] = d1;
					}
				}
			}
		}
	}

	////event handler
	if(this.markerClickHandler)this.marker_.addEventListener('click', this.markerClickHandler);
	if(this.markerDblclickHandler)this.marker_.addEventListener('dblclick', this.markerDblclickHandler);
	if(this.markerRClickHandler)this.marker_.addEventListener('rightclick', this.markerRClickHandler);
	if(this.mouseMoveHandler)this.hfnMouseMove=this.marker_.addEventListener('mouseover', this.mouseMoveHandler);
	if(this.mouseOutHandler)this.hfnMouseOut=this.marker_.addEventListener('mouseout', this.mouseOutHandler);

	if(this.iscfg==true){
	this.marker_.addEventListener('dragging', function(e){
		this.ovl.GLatLng_ = e.point;
		this.ovl.draw();
	});
	this.marker_.addEventListener('dragend', function(e){
		this.ovl.setPosition(e.point);
		this.ovl.draw();
		if(document.getElementById("ChgFlg")){document.getElementById("ChgFlg").value="1";}
	});
	}
	this.updateDisplay();
	this.complete=true;
	return this.div_;
}; //end initialize

function GetPixPos(latLng){
	var oc = map.pointToOverlayPixel({lng:latLng.lng,lat:latLng.lat});
	return {x:oc.x, y:oc.y};
}
CmyGMarker.prototype.updateDisplay = function(){
	var tw=0, lwm=0, twm=0, h=0, dw=0; dh=0, i=0;
	//this.titlediv.style.width="5px";
	this.titlediv.style.height="5px";
	tw=this.titlediv.offsetWidth;
	h=this.titlediv.offsetHeight;
	if(tw<this.titlediv.scrollWidth){tw=this.titlediv.scrollWidth;}
	if(h<this.titlediv.scrollHeight){h=this.titlediv.scrollHeight;}
	//this.titlediv.style.width=tw+"px";
	this.titlediv.style.height=h+"px";

	if(this.la){ //计算所有LabelDiv和TagDiv的最大宽度和高度，并设置所有LabelDiv和TagDiv的高度
		for(i=0;i<this.la.length;i++){
			this.la[i].style.width="5px";
			this.la[i].style.height="5px";
			dw=this.la[i].offsetWidth;
			dh=this.la[i].offsetHeight;
			if(dw<this.la[i].scrollWidth)dw=this.la[i].scrollWidth;
			if(dh<this.la[i].scrollHeight)dh=this.la[i].scrollHeight;
			if(lwm<dw)lwm=dw;
			if(this.ta[i]){
				this.ta[i].style.width="5px";
				this.ta[i].style.height="5px";
				if(twm<this.ta[i].offsetWidth)twm=this.ta[i].offsetWidth;
				if(twm<this.ta[i].scrollWidth)twm=this.ta[i].scrollWidth;
				if(dh<this.ta[i].offsetHeight)dh=this.ta[i].offsetHeight;
				if(dh<this.ta[i].scrollHeight)dh=this.ta[i].scrollHeight;
			}
			this.la[i].style.height=dh+"px";
			this.la[i].style.top=h+"px";
			if(this.ta[i]){
				this.ta[i].style.height=dh+"px";
				this.ta[i].style.top=h+"px";
			}
			h+=dh;
		}
	}
	if(this.iscfg==false){
		if(this.ta){
			for(i=0;i<this.ta.length;i++){
				if(this.ta[i]){
					twm=100;
					break;
				}
			}
		}
	}
	if(twm>0){
		if(lwm+twm+5>tw){
			this.marker_.InfoDivWidth=lwm+twm+15; //labelDiv.left(5) + lwm + tagDiv.marginLeft(5) + twm + tagDiv.marginRight(5)
		}else{
			this.marker_.InfoDivWidth=tw+10;
		}
	}else{
		if(lwm>tw){
			this.marker_.InfoDivWidth=lwm+10;
		}else{
			this.marker_.InfoDivWidth=tw+10;
		}
	}
	this.marker_.InfoDivHeight=h+2;
	this.div_.style.width=this.marker_.InfoDivWidth+"px";
	this.div_.style.height=this.marker_.InfoDivHeight+"px";
	//设置所有LabelDiv和TagDiv的宽度和LeftPos
	if(this.la){
		for(i=0;i<this.la.length;i++){
			this.la[i].style.width=lwm;
			if(this.ta[i]){
				this.ta[i].style.width=twm+"px";
				this.ta[i].style.left=(lwm+5)+"px";
			}
		}
	}
}; //updateDisplay()
CmyGMarker.prototype.draw=function(){
	var pixPos = GetPixPos(this.GLatLng_);
	var left = Math.round(pixPos.x - this.marker_.InfoDivWidth/2);
	var top = Math.round(pixPos.y - this.marker_.ih - this.marker_.InfoDivHeight);
	if(browser.tp==2)top-=2; //chrome
	if(this.div_){
		this.div_.style.left = left + "px";
		this.div_.style.top = top + "px";
	}
	if(0!=this.ShowIconOnly)this.div_.style.display="none";
};
CmyGMarker.prototype.update = function(){
	//Title
	if(this.titlediv.innerText!=this.WAMarker.title){
		this.titlediv.style.width="auto";
		this.titlediv.style.height="auto";
		this.titlediv.innerText=this.WAMarker.title;
	}
	var i,d;
	if(this.WAMarker.labels){
		if(!this.la){
			this.la=new Array();
			this.ta=new Array();
		}
		if(this.WAMarker.labels.length>0){
			for(i=0;i<this.WAMarker.labels.length;i++){
				if(i < this.la.length){
					if(this.la[i].innerText!=this.WAMarker.labels[i].title){
						this.la[i].innerText=this.WAMarker.labels[i].title;
						this.la[i].style.width="auto";
						this.la[i].style.height="auto";
					}
					if(this.WAMarker.labels[i].tag.length>0){
						if(this.ta[i]){
							this.ta[i].innerText=this.WAMarker.labels[i].tag;
							this.ta[i].style.width="auto";
							this.ta[i].style.height="auto";
							this.ta[i].style.color="#"+this.WAMarker.labels[i].color1;
						}else{
							d=document.createElement('DIV');
							d.className = "mlt";
							d.style.color="#"+this.WAMarker.labels[i].color1;
							d.appendChild(document.createTextNode(this.WAMarker.labels[i].tag));
							this.div_.appendChild(d);
							this.ta[i] = d;
						}
					}
				}else{
					//新增Labels
					d=document.createElement('DIV');
					d.className = "mln";
					d.appendChild(document.createTextNode(this.WAMarker.labels[i].title));
					this.div_.appendChild(d);
					this.la[i] = d;
					if(this.WAMarker.labels[i].tag.length>0){
						d=document.createElement('DIV');
						d.className = "mlt";
						d.style.color="#"+this.WAMarker.labels[i].color1;
						d.appendChild(document.createTextNode(this.WAMarker.labels[i].tag));
						this.div_.appendChild(d);
						
						this.ta[i] = d;
					}
				}
			}
			//清理被删除的Label
			if(this.WAMarker.labels.length < this.la.length){
				for(i=this.WAMarker.labels.length; i<this.la.length; i++){
					this.div_.removeChild(this.la[i]);
					this.div_.removeChild(this.ta[i]);
				}
				this.la.length=this.WAMarker.labels.length;
			}
		}else if(this.la.length>0){
			for(i=0; i<this.la.length; i++){
				this.div_.removeChild(this.la[i]);
				this.div_.removeChild(this.ta[i]);
			}
			this.la.length=0;
		}
	}
	//Icon
	if(this.WAMarker.icon.length>0){
		this.img_=((1==this.WAMarker.icon[0].tp)?ProjIconUrl:pubIconUrl) + this.WAMarker.icon[0].fi;
		var isize = GetImgOriSize(this.img_, 50, 50);
		var iconOpt = {anchor:new BMap.Size(isize.w/2, isize.h)};
		var myIcon = new BMap.Icon(this.img_, new BMap.Size(isize.w, isize.h),iconOpt);
		this.marker_.setIcon(myIcon);
	}
	//Lock
	if(this.WAMarker.lockp){this.marker_.disableDragging();}else{this.marker_.enableDragging();}
	this.updateDisplay(); //update size
	this.draw(); //update position
}; //update()
CmyGMarker.prototype.onMouseMove = function(){
	if(this.ovl.div_){
		if(1==this.ovl.ShowIconOnly){
			this.ovl.div_.style.display='';
		}
	}
};
CmyGMarker.prototype.onMouseOut = function(){
	if(this.ovl.div_){
		if(1==this.ovl.ShowIconOnly){
			this.ovl.div_.style.display='none';
		}
	}
};
CmyGMarker.prototype.setShowIconOnly = function(a){
	a=parseInt(a);
	if(this.div_){this.div_.style.display=0==a?'block':'none';}
	switch(a)
	{
	case 0:	//display always
	case 2:	//disable
		if(this.hfnMouseMove)this.marker_.removeEventListener('mouseover',this.hfnMouseMove);
		if(this.hfnMouseOut)this.marker_.removeEventListener('mouseout',this.hfnMouseOut);
		break;
	case 1:	//display when mouse over
		if(this.complete){
			this.hfnMouseMove=this.marker_.addEventListener('mouseover', this.onMouseMove);
			this.hfnMouseOut=this.marker_.addEventListener('mouseout', this.onMouseOut);
		}else{
			this.mouseMoveHandler=this.onMouseMove;
			this.mouseOutHandler=this.onMouseOut;
		}
		break;
	}
	this.ShowIconOnly=a;
};
CmyGMarker.prototype.setPosition=function(point){
	this.GLatLng_=point;
	this.WAMarker.la=point.lat;
	this.WAMarker.lo=point.lng;
}
CmyGMarker.prototype.setImg=function(imgurl){
	var isize = GetImgOriSize(imgurl, 50, 50);
	var iconOpt = {anchor:new BMap.Size(isize.w/2, isize.h)};
	var oicon = new BMap.Icon(imgurl, new BMap.Size(isize.w, isize.h), iconOpt);
	this.marker_.setIcon(oicon);
	this.marker_.iw=isize.w;
	this.marker_.ih=isize.h;
	this.draw();
};
} //do not delete this line
