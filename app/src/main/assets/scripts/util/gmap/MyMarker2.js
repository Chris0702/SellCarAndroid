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

function GetImgOriSize(ImgSrc, maxWidth, maxHeight){
	if(oriImgSrc!=ImgSrc){
		oriImgSrc=ImgSrc;
		originImage.src=ImgSrc;
	}
	var nw=50,nh=50;
	if(originImage.complete){
		nw = originImage.width;
		nh = originImage.height;
		if(maxWidth){if(nw>maxWidth){nh=nh*maxWidth/nw;nw=maxWidth;}}
		if(maxHeight){if(nh>maxHeight){nw=nw*maxHeight/nh;nh=maxHeight;}}
		if(nw<1)nw=1;if(nh<1)nh=1;
		return {w:nw,h:nh};
	}else{
		if(maxWidth) nw=maxWidth;
		if(maxHeight) nh=maxHeight;
		return {w:nw,h:nh};
	}
}

////////////////////////////////////////////////////////
function CIMG(imgFile,imgTp, imgVal){
	this.fi=imgFile;
	this.tp=imgTp;
	this.val=imgVal;
}

function CMarkLabel(title,tag,oimg){
	this.title=title;			//string
	this.tag=tag;					//string
	this.img=oimg;				//CIMG object or null
}
////////////////////////////////////////////////////////
var MarkerId=1;
function CmyGMarker(map, WAMarker, iconurl, bIsConfig){
	if("undefined"==typeof(google)){
		return;
	}
	this.id = MarkerId++;
	this.GLatLng_ = new google.maps.LatLng(WAMarker.la, WAMarker.lo);
	this.img_ = iconurl;
	this.WAMarker = WAMarker;
	this.marker_ = null;
	this.map_ = map;
	this.div_ = null;
	this.la = null;			//label div array
	this.ta = null;			//tag div array
	this.setMap(map);
	this.iscfg = bIsConfig;
	this.markerClickHandler = null;
	this.markerDblclickHandler = null;
	this.markerRClickHandler=null;
	this.mouseMoveHandler=null;
	this.mouseOutHandler=null;
	this.hfnMouseMove=null;
	this.hfnMouseOut=null;
	this.complete = false;
}

if("undefined"!=typeof(google)){
CmyGMarker.prototype = new google.maps.OverlayView();
CmyGMarker.prototype.onAdd = function () {
    //1st, create a google marker
    var isize = GetImgOriSize(this.img_, 50, 50);
    this.marker_ = new google.maps.Marker({
        position: this.GLatLng_,
        map: this.map_,
        //title:this.WAMarker.title,		//tooltip on marker icon
        icon: new google.maps.MarkerImage(this.img_, null, null, null, new google.maps.Size(isize.w, isize.h)),
        ovl: this, 		//overlay
        infoDiv: null,
        InfoDivWidth: 0, 	//InfoDivWidth
        InfoDivHeight: 0, 	//InfoDivHeight
        iw: isize.w,
        ih: isize.h
    });
    this.marker_.setDraggable(this.WAMarker.lockp ? false : this.iscfg);
    this.marker_.setAnimation(null);

    ////2nd, create infoDiv
    var dw = 0, dh; 	//infoDivWidth, infoDivHeight
    var tw = 0, lwm = 0, twm = 0; 	//title div width, label div width max, tag div width max
    var d, d1;
    var panes = this.getPanes();
    d = document.createElement('DIV');
    // d.style.position = "absolute";
    // d.style.textAlign = "center";
    // d.style.whiteSpace = "nowrap";
    // d.style.border = "solid 1px #ABABAB";
    // d.style.backgroundColor = "#FFFFFF";
    d.className = "markerdiv";
    var t = document.createElement('DIV');
    t.className = "mt";
    t.appendChild(document.createTextNode(this.WAMarker.title));
    d.appendChild(t);
    //panes.overlayLayer.appendChild(d);
    panes.floatShadow.appendChild(d);
    tw = t.offsetWidth;
    dh = t.offsetHeight;

    this.div_ = d;
    this.marker_.infoDiv = d;
    //this.div_.parentNode.parentNode.style.zIndex = 2000; //--add ZIndex such the label will not be cover by Marker's icon
    this.div_.parentNode.parentNode.id = "chgZindex";
    //labels and tags
    var posTop = dh, posLeft = 0;
    if (this.WAMarker.labels) {
        this.la = new Array(this.WAMarker.labels.length);
        this.ta = new Array(this.WAMarker.labels.length);
        for (i = 0; i < this.WAMarker.labels.length; i++) {
            if (this.WAMarker.labels[i]) {
                if (this.WAMarker.labels[i].title.length > 0) {
                    d = document.createElement('DIV');
                    d.className = "mln";
                    d.style.top = posTop + "px";
                    d.appendChild(document.createTextNode(this.WAMarker.labels[i].title));
                    this.div_.appendChild(d);
                    this.la[i] = d;
                    if (lwm < d.offsetWidth) { lwm = d.offsetWidth; }
                    dh += d.offsetHeight;

                    if (this.WAMarker.labels[i].tag.length > 0) {
                        posLeft = d.offsetWidth;
                        d1 = document.createElement('DIV');
                        d1.className = "mlt";
                        d1.style.left = posLeft + "px";
                        d1.style.top = posTop + "px";
                        if (this.iscfg && (typeof this.WAMarker.labels[i].color1 === "string") && this.WAMarker.labels[i].color1.length === 6 && !isNaN(parseInt(this.WAMarker.labels[i].color1, 16))) {
                            d1.style.color = "#" + this.WAMarker.labels[i].color1;
                        }
                        d1.appendChild(document.createTextNode(this.WAMarker.labels[i].tag));
                        this.div_.appendChild(d1);
                        this.ta[i] = d1;
                        if (this.iscfg) { if (twm < d1.offsetWidth) { twm = d1.offsetWidth; } }
                    }
                    posTop += d.offsetHeight;
                }
            }
        }
        if (!this.iscfg) twm = 100;
        dw = lwm + twm + 10; 	// + label margin left + tag margin left
        if (dw < tw) { dw = tw; }
        for (i = 0; i < this.WAMarker.labels.length; i++) {
            if (this.la[i]) {
                this.la[i].style.width = lwm + 'px';
                if (this.ta[i]) {
                    this.ta[i].style.width = twm + 'px';
                    this.ta[i].style.left = 5 + lwm + "px";
                }
            }
        }
    }
    if (dw < tw) { dw = tw; }

    if (browser.tp == 0) //IE
        dh += 2; //add border width
    //in chrome, total height of div = style.height + borderWidth * 2
    //so, style.height = total height - 2 = dh + 2 - 2 = dh;

    this.marker_.InfoDivWidth = dw + 12;
    this.marker_.InfoDivHeight = dh;

    this.div_.style.width = dw + 12 + "px";
    this.div_.style.height = dh + "px";

    ////event handler
    if (this.markerClickHandler) {
        google.maps.event.addListener(this.marker_, 'click', this.markerClickHandler);
    }
    if (this.markerDblclickHandler) {
        google.maps.event.addListener(this.marker_, 'dblclick', this.markerDblclickHandler);
    }
    if (this.markerRClickHandler) {
        google.maps.event.addListener(this.marker_, 'rightclick', this.markerRClickHandler);
    }

    google.maps.event.addListener(this.marker_, 'drag', function (e) {
        var op = this.ovl.getProjection();
        var pixPos = op.fromLatLngToDivPixel(e.latLng);
        var left = Math.round(pixPos.x - this.InfoDivWidth / 2);
        var top = Math.round(pixPos.y - this.ih - this.InfoDivHeight);
        if (browser.tp == 2) top -= 2; //chrome
        this.infoDiv.style.left = left + "px";
        this.infoDiv.style.top = top + "px";
        var o = document.getElementById("idShow");
        if (o) o.innerText = e.latLng.toString();
    });
    google.maps.event.addListener(this.marker_, 'dragend', function (e) {
        var op = this.ovl.getProjection();
        var pixPos = op.fromLatLngToDivPixel(e.latLng);
        var left = Math.round(pixPos.x - this.InfoDivWidth / 2);
        var top = Math.round(pixPos.y - this.ih - this.InfoDivHeight);
        if (browser.tp == 2) top -= 2; //chrome
        this.infoDiv.style.left = left + "px";
        this.infoDiv.style.top = top + "px";
        this.ovl.GLatLng_ = e.latLng;
        this.ovl.WAMarker.la = e.latLng.lat();
        this.ovl.WAMarker.lo = e.latLng.lng();
        if (document.getElementById("ChgFlg")) { document.getElementById("ChgFlg").value = "1"; }
        var o = document.getElementById("idShow");
        if (o) o.innerText = e.latLng.toString();
    });
    switch (this.ShowIconOnly) {
        case 0:
            break;
        case 1:
            this.div_.style.display = 'none';
            if (this.mouseMoveHandler) this.hfnMouseMove = google.maps.event.addListener(this.marker_, 'mouseover', this.mouseMoveHandler);
            if (this.mouseOutHandler) this.hfnMouseOut = google.maps.event.addListener(this.marker_, 'mouseout', this.mouseOutHandler);
            break;
        case 2:
            this.div_.style.display = 'none';
    }
    this.complete = true;
}      //onAdd
CmyGMarker.prototype.draw = function(){
	var op = this.getProjection();
	var pixPos = op.fromLatLngToDivPixel(this.GLatLng_);
	var left = Math.round(pixPos.x - this.marker_.InfoDivWidth/2);
	var top = Math.round(pixPos.y - this.marker_.ih - this.marker_.InfoDivHeight);
	if(browser.tp==2)top-=2; //chrome
	if(this.div_){
	this.div_.style.left = left + "px";
	this.div_.style.top = top + "px";
	}
}
CmyGMarker.prototype.onRemove = function(){
	this.div_.parentNode.removeChild(this.div_);
	this.div_ = null;
	this.marker_.setMap(null);
}
CmyGMarker.prototype.onMouseMove = function(){
	if(this.ovl.div_){
		if(1==this.ovl.ShowIconOnly){
			this.ovl.div_.style.display='';
		}
	}
}
CmyGMarker.prototype.onMouseOut = function(){
	if(this.ovl.div_){
		if(1==this.ovl.ShowIconOnly){
			this.ovl.div_.style.display='none';
		}
	}
}
CmyGMarker.prototype.setShowIconOnly = function(a){
	a=parseInt(a);
	if(this.div_){this.div_.style.display=0==a?'':'none';}
	switch(a)
	{
	case 0:	//display always
	case 2:	//disable
		if(this.hfnMouseMove)google.maps.event.removeListener(this.hfnMouseMove);
		if(this.hfnMouseOut)google.maps.event.removeListener(this.hfnMouseOut);
		break;
	case 1:	//display when mouse over
		if(this.complete){
			this.hfnMouseMove=google.maps.event.addListener(this.marker_, 'mouseover', this.onMouseMove);
			this.hfnMouseOut=google.maps.event.addListener(this.marker_, 'mouseout', this.onMouseOut);
		}else{
			this.mouseMoveHandler=this.onMouseMove;
			this.mouseOutHandler=this.onMouseOut;
		}
		break;
	}
	this.ShowIconOnly=a;
}
}

function addClass(classname, element) {
    var cn = element.className;
    //test for existance
    if (cn.indexOf(classname) != -1) {
        return;
    }
    //add a space if the element already has class
    if (cn != '') {
        classname = ' ' + classname;
    }
    element.className = cn + classname;
}

function removeClass(classname, element) {
    var cn = element.className;
    var rxp = new RegExp("\\s?\\b" + classname + "\\b", "g");
    cn = cn.replace(rxp, '');
    element.className = cn;
}