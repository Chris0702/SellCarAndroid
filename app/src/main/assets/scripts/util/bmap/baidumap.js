function trim(s){
	return s.replace( /\s*$/, "").replace( /^\s*/, "");
}
function CancelEventBubble()
{
	var e=(event)?event:window.event;
	if(window.event) {//IE
		e.cancelBubble=true;
	} else { //FF
		e.stopPropagation();
	}
}
//compute offset(px) of a element to it's parent element(which id is parendId)
//return a offset object: {x:offsetLeft, y:offsetTop}
function getObjOffset(o, parendId){
	var l=o.offsetLeft, t=o.offsetTop, op=o.offsetParent;
	while(op.id!=parendId && op.nodeName!="BODY"){
		l += op.offsetLeft;
		t += op.offsetTop;
		op=op.offsetParent;
	}
	return {x:l, y:t};
}
function ChkEmptySpecialChar(s){
	if(0==s.length)
		throw {description:"Can not be empty"};
	if(s.match(/['";&#$\/\\]/))
		throw {description:"Character '\",;&#$/\\ are not allowed"};
}
function ChkSpecialChar(s){
	if(s.match(/['";&#$\/\\]/))
		throw {description:"Character '\",;&#$/\\ are not allowed"};
}
function ChkSpecialCharForLab(s){
	if(s.match(/[';&#$\/\\]/))
		throw {description:"Character ',;&#$/\\ are not allowed"};
}
function ChkHexaColor(sNum){
	return (typeof(sNum)=="string") && sNum.length==6 && !isNaN(parseInt(sNum, 16));
}
function ChkQuoteChar(s){
	if(s.match(/['"\\]/))
		throw {description:"Character '\"\\ are not allowed"};
}
function fixedEncodeURIComponent(s){
	return encodeURIComponent(s).replace(/[!'()*]/g, escape);
}
function getImgFileNameFromUrl(ImgUrl){
	var i=ImgUrl.lastIndexOf("/");
	if(i>0){
		return ImgUrl.substring(i+1, ImgUrl.length);
	}
	return "";
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
function CImgToString(oImg){
	if(oImg){
		var v = oImg.val.replace(/'/g, "\\'").replace(/\"/g, "\\\"");
		return "{fi:'" + oImg.fi + "',tp:" + oImg.tp + ",val:'" + v + "'}";
	}
	return "null";
}
function contains(a,obj){
	var i = a.length;
	while(i--){if(a[i].toLowerCase()==obj){return i;}}
	return -1;
}
function loadMap(){
	document.getElementById("mtype").value=1;
	document.forms["save"].submit();
}
function AddImg(img, imgTp){
	var oimgtd = document.getElementById("idimgtd");
	if(oimgtd){
		var isize = GetImgOriSize(img.src, 32, 32);
		var imgFi = getImgFileNameFromUrl(img.src);
		var odiv=document.createElement('div');
		var oimg=document.createElement('img');
		odiv.style.width="32px";
		odiv.style.height="32px";
		odiv.style.styleFloat="left"; //for ie
		odiv.style.cssFloat="left"; //for firefox,chorme,safari
		oimg.src = img.src;
		oimg.style.width=isize.w+"px";
		oimg.style.height=isize.h+"px";
		oimg.style.cursor="hand";
		if(isize.h<31){oimg.style.marginTop=((32-isize.h)/2)+"px";}
		if(isize.w<31){oimg.style.marginLeft=((32-isize.w)/2)+"px";}
		oimg.title = imgFi;
		oimg.fi = imgFi;
		oimg.imgTp = imgTp;
		oimg.Val = '';
		odiv.appendChild(oimg);
		var AddImgBtn = document.getElementById("idAddImg");
		if(AddImgBtn)
			oimgtd.insertBefore(odiv,AddImgBtn);
		else
			oimgtd.appendChild(odiv);
	}
}
function lockchg(o,mid){
	for(var i=0;i<markers.length;i++){
		if(markers[i].myGMarker.id==mid) {
			markers[i].myGMarker.marker_.draggable=!o.checked;
			break;
		}
	}
}
function onMarkerClick(e){
	//object [this] is the map.Marker object
	//alert('marker click on ' + this.title);
	var infoStr = OpenMarkerInformation(this,null,null);
	var opts={enableMessage:false,width:350}
	infoWindow = new BMap.InfoWindow(infoStr, opts);
	map.openInfoWindow(infoWindow, new BMap.Point(e.point.lng, e.point.lat));
}
function TagAdvFn(o){
	return;
	var otbl = o.parentNode.parentNode.parentNode.parentNode;
	var odiv = document.createElement("DIV");
	odiv.style.position = "absolute";
	odiv.style.left = otbl.offsetLeft + "px";
	odiv.style.top = otbl.offsetTop + "px";
	odiv.style.width = otbl.offsetWidth + "px";
	odiv.style.height = otbl.offsetHeight + "px";
	odiv.style.backgroundColor = "#FFFFFF";
	otbl.parentNode.appendChild(odiv);
	var obtn = document.createElement("INPUT");
	obtn.type = "button";
	obtn.value = "click me";
	obtn.onclick=function(){this.parentNode.parentNode.removeChild(this.parentNode);};
	odiv.appendChild(obtn);
}
function rclickHandle(evt)
{
	evt.cancelBubble=true;
	evt.returnValue = false;
	return false;
}
function onimgtdmsup(oTD,evt){
	if(window.event){
		if(1==window.event.button){
			var o = window.event.srcElement;
			if("IMG"==o.nodeName && o.id!="idAddImg"){
				var pdiv = document.getElementById("divImgVal");
				if(pdiv)pdiv.parentNode.removeChild(pdiv);
				showImgStatInput(o,0);
				window.event.returnValue = false;
			}
		}
		else if(2==window.event.button){
			var o = window.event.srcElement;
			if("IMG"==o.nodeName && o.id!="idAddImg"){
				if(confirm("Delete image [%s]?".replace("%s", o.src.substr(o.src.lastIndexOf('/')+1))))
				{
				o.parentNode.parentNode.removeChild(o.parentNode);
				window.event.cancelBubble=true;
				window.event.returnValue = false;
				}
			}
		}
	}
}
function onMarkerRightClick(e){
	//object [this] is the map.Marker object
	var infoStr = OpenMarkerInformation(this,null,null);
	var opts={enableMessage:false,width:350}
	infoWindow = new BMap.InfoWindow(infoStr, opts);
	map.openInfoWindow(infoWindow, new BMap.Point(e.point.lng, e.point.lat));
}
function newMap()
{
	if("1"==document.getElementById("ChgFlg").value){
		var mname = trim(document.getElementById("mname").value);
		var s="Map [%s] has been changed, save it?"; //1167
		if(""==mname){s=s.replace("[%s]", "");}else{s=s.replace("%s", mname);}
		if(confirm(s)){
			if(""==mname){
				saveMap(true);
			}else{
				saveMap(false);
			}
		}
	}
	document.getElementById("mtype").value="3";
	document.getElementById("mname").value="";
	document.forms["save"].submit();
}
function CMarkerLabelToString(oLabel){
	if(oLabel){
		if(oLabel.color1 && oLabel.twinkle1){
			return "{title:'" + oLabel.title + "',tag:'" + oLabel.tag + "',img:" + CImgToString(oLabel.img)
			+ " ,color1:'"+oLabel.color1+"' ,color2:'"+oLabel.color2+"' ,color3:'"+oLabel.color3
			+"' ,twinkle1:'"+oLabel.twinkle1+"' ,twinkle2:'"+oLabel.twinkle2+"' ,twinkle3:'"+oLabel.twinkle3+"'}";
		}else{
			return "{title:'" + oLabel.title + "',tag:'" + oLabel.tag + "',img:" + CImgToString(oLabel.img)
			+ " ,color1:'000000' ,color2:'000000' ,color3:'000000' ,twinkle1:'false' ,twinkle2:'false' ,twinkle3:'false'}";
		}
	}
	return "null";
}
function saveMap(bConfirm){
	var mlat = map.getCenter().lat;
	var mlng = map.getCenter().lng;
	var mzoom = map.getZoom();
	var content="/*\nv=1.1\n";
	var a = document.getElementById("a").value;
	var b = document.getElementById("b").value;
	var c = document.getElementById("c").value;
	var d = document.getElementById("d").value;
	var e = document.getElementById("e").value;
	var f = document.getElementById("f").value;
	var g = document.getElementById("g").value;
	var h = document.getElementById("h0").value;
	//var i = document.getElementById("i").value;
	content += "a=" + a + "\n";
	content += "b=" + b + "\n";
	content += "c=" + c + "\n";
	content += "d=" + d + "\n";
	content += "e=" + e + "\n";
	content += "f=" + f + "\n";
	content += "g=" + g + "\n";
	content += "h=" + h + "\n*/\n";
	//content += "h=" + h + "\n";
	//content += "i=" + i + "\n*/\n";

	content += "var MapZoom=" + mzoom + ";\n";
	content += "var MapCenter=new BMap.Point(" + mlng + "," + mlat + ");\n";
	if(document.getElementById("mapTtl")){
		content += "var MapTitle='" + document.getElementById("mapTtl").innerText + "';\n";
	}else{
		content += "var MapTitle='';\n"
	}
	var last=content;
	last+="var markers=[];";

	content += "var markers=[";
	var i, idxIcon, idxLbl, strtmp;
	for (i=0;i<markers.length;i++){
		if(i>0){content+=",";}
		content += "{title:'" + markers[i].title + "',";
		//icon
		content += "icon:[";
		for(idxIcon=0;idxIcon<markers[i].icon.length;idxIcon++){
			if(idxIcon>0)content += ",";
			content += CImgToString(markers[i].icon[idxIcon]);
		}
		content += "],";		//end icon array
		if(typeof(markers[i].defaultTag)=="undefined" || markers[i].defaultTag=='undefined' || markers[i].defaultTag==null){
			markers[i].defaultTag=false;
		}
		content += "la:"+markers[i].la + ",lo:" + markers[i].lo + ",tag:'" + markers[i].tag + "',defaultTag:" + markers[i].defaultTag + ",point:'" + markers[i].point + "',lcmd:'" + markers[i].lcmd + "',";

		//labels
		if(markers[i].labels){
			content += "labels:[";
			for(idxLbl=0;idxLbl<markers[i].labels.length;idxLbl++){
				if(idxLbl>0)content += ",";
				content += CMarkerLabelToString(markers[i].labels[idxLbl]);
			}
			content += "],";		//end label array
		} else {
			content += "labels:null,";
		}
		content += "lockp:"+(markers[i].lockp?1:0);
		content += "}";
	}
	content += "];";	//end marker array
	document.getElementById("mcontent").value = escape(content);
	document.getElementById("last").value = escape(last);

	var itype = document.getElementById("mtype");
	if(itype) itype.value = 0;	//set save flag
	var iname = document.getElementById("mname");
	var newname = "";
	var b=true;

	if(bConfirm){
		while(1){
			if(0==newname.length)
				newname = prompt("Map Name:", iname.value);
			else
				newname = prompt("Map Name:", newname);
			if(newname===null || newname.length==0) return;
			if(newname.length<=32){
				try{ChkSpecialChar(newname);break;}catch(e){alert(e.description)}
			}else{
				alert('Map Name'+' '+'can have only up to'+' '+'32');
			}
		}
	}else{
		newname = iname.value;
	}

	if(newname.toLowerCase() != iname.value.toLowerCase())
	{
		var idx = contains(mapfiles, newname.toLowerCase());//mapfiles temp
		if (idx>=0){
			if (!confirm("Map [%s] exists, overwrite it?".replace("%s", newname))){
				b=false;
			}
			else if(maptypes[idx]==1){
				document.getElementById("delGMapName").value = newname;
			}
		}
		
	}

	if(b){
		iname.value = newname;
		document.getElementById("SaveFlg").value = "1";
		document.getElementById("ChgFlg").value = "0";
		document.forms["save"].submit();
	}
} //end function saveMap()

function DelMap()
{
	var mname=document.getElementById("mname").value;
	if(mname.length > 0)
	{
		if(confirm("Sure to delete map["+mname+"]?"))
		{
			document.getElementById("mtype").value="2";
			document.forms["save"].submit();
		}
	}else{
		alert("no map can be delete!");
	}
}
function MapOpt(){
	var o=document.getElementById("opt");
	if(o)o.style.display="block";
}
function closeOpt(){
	var o=document.getElementById("opt");
	if(o)o.style.display="none";
	o=document.getElementById("fontpicker");
	if(o)o.parentNode.removeChild(o);
	return false;
}
function submitopt(){
	closeOpt();
	var aa = document.getElementsByName('aa');
	var bb = document.getElementsByName('bb');
	var a=document.getElementById("a").value = aa[0].checked?aa[0].value:aa[1].checked?aa[1].value:aa[2].value;
	var b=document.getElementById("b").value = bb[0].checked?bb[0].value:bb[1].value;
	var c=document.getElementById("c").value=document.getElementById("cc").value;
	var d=document.getElementById("d").value=document.getElementById("dd").value;
	var e=document.getElementById("e").value=document.getElementById("ee").value;
	var f=document.getElementById("f").value=document.getElementById("ff").value;
	var g=document.getElementById("g").value=document.getElementById("gg").value;
	var h=document.getElementById("h0").value=document.getElementById("hh").value;

	for(var n=document.styleSheets.length-1;n>=0;n--){
		var css=document.styleSheets[n].cssRules || document.styleSheets[n].rules;
		if(3==css.length){
			if("DIV.mt"==css[0].selectorText){
			css[0].style.fontFamily=c;
			css[0].style.fontSize=d+'pt';
			css[0].style.color='#'+e;
			css[1].style.fontFamily=f;
			css[1].style.fontSize=g+'pt';
			css[1].style.color='#'+h;
			css[2].style.fontFamily=f;
			css[2].style.fontSize=g+'pt';
			break;
			}
		}
	}
	for(var i=0;i<markers.length;i++){
		markers[i].myGMarker.updateDisplay(); //update size
		markers[i].myGMarker.draw(); //update position
		markers[i].myGMarker.setShowIconOnly(a); //must be the last operation, otherwise size and pos will mistake due to div.display="none"
	}
	//if(NodeListControl)NodeListControl.Show(b==1?true:false);
	document.getElementById("ChgFlg").value="1";
} //end submitopt()

//remove marker
function remMarker(){
	var mid = document.getElementById("mid").value;
	var i;
	for (i=0; i < markers.length; i++) {
		if (markers[i].myGMarker.id == mid) {
			break;
		}
	}
	if(i < markers.length){
		//if(NodeListControl)NodeListControl.DelItem(markers[i]);
		map.removeOverlay(markers[i].myGMarker.marker_);
		map.removeOverlay(markers[i].myGMarker);
		markers.splice(i, 1);		//remove the element markers[index] from array
	}

	map.closeInfoWindow();
	document.getElementById("ChgFlg").value = "1";
} //end remMarker()

function fsc(o, id){
	var e=document.getElementById(id);
	if(e){e.style.fontSize = o.value + 'pt';}
}
function fcc(o, id){
	var e=document.getElementById(id);
	if(e){e.style.color = '#'+o.value;}
}
function bbchg(){
	var bb=document.getElementsByName('bb');
	document.getElementById('b').value = bb[0].checked?bb[0].value:bb[1].value;
}
function jjchg(){
	var jj=document.getElementsByName('jj');
	document.getElementById('j').value = jj[0].checked?jj[0].value:jj[1].value;
}
function aachg(o){
	document.getElementById('a').value = o.value;
}
	function jjchg(o){
	document.getElementById('j').value = o.value;
}
function addClass(classname, elem){
	var cn = elem.className;
	if (cn.indexOf(classname) != -1){return;}
	if (cn != ''){classname = ' ' + classname;}	//add a space if the element already has class
	elem.className = cn + classname;
}
function removeClass(classname, elem){
	var cn = elem.className;
	var rxp = new RegExp("\\s?\\b" + classname + "\\b", "g");
	cn = cn.replace(rxp, '');
	elem.className = cn;
}

//Begin user defined control
function ZoomControl(){
	// set default postion and offset
	this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
	this.defaultOffset = new BMap.Size(10, 50);
}
if("undefined" != typeof(BMap)){
// Inherited from BMap.Control by using prototype
ZoomControl.prototype = new BMap.Control();
// user defined control muse implement initialize interface, and return the DOM element of the control
// create a div to contain the control, add it to map container
ZoomControl.prototype.initialize = function(map){
	// create a DOM element
	var div = document.createElement("div");
	// add text description
	div.appendChild(document.createTextNode("Center point and zoom="));
	// set display style
	div.style.cursor = "pointer";
	div.style.border = "1px solid gray";
	div.style.backgroundColor = "white";
	// Binding Events
	//div.onclick = function(e){
	//	//map.zoomTo(map.getZoom() + 2);  //zoom in 2 level
	//}
	var controlText=document.createElement("span");
	controlText.id="controlText";
	controlText.appendChild(document.createTextNode("lng:"+ map.getCenter().lng + ", lat:" + map.getCenter().lat));
	div.appendChild(controlText);
	// add the DOM element to map
	map.getContainer().appendChild(div);
	// return the DOM element
	return div;
};}
//End user defined control

//Begin user defined control
function MsgControl(){
	this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
	this.defaultOffset = new BMap.Size(10, 40);
}
if("undefined" != typeof(BMap)){
MsgControl.prototype = new BMap.Control();
MsgControl.prototype.initialize = function(map){
	var d = document.createElement("div");
	d.id="idShow";
	d.style.width = "400px";
	d.style.height = "500px";
	d.style.cursor = "pointer";
	d.style.border = "1px solid gray";
	d.style.backgroundColor = "white";
	d.style.overflowY="scroll";
	d.style.fontSize="8pt";
	map.getContainer().appendChild(d);
	return d;
};
}
//End user defined control
var omsg=null;
function AddMsg(msg){
	if(null==omsg){
		omsg=document.getElementById("idShow");
	}
	if(omsg){
		if(omsg.innerText.length>10000)omsg.innerHTML="";
		omsg.innerHTML += msg;
		omsg.scrollTop=omsg.scrollHeight
	}
}