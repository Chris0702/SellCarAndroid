function myListControl(map, markerArray){
	this.defaultAnchor =BMAP_ANCHOR_BOTTOM_LEFT ; //;BMAP_ANCHOR_TOP_LEFT
	this.defaultOffset = new BMap.Size(10, 30);
	this.d_ = null;
	this.map=map;
	this.markerArray=markerArray;
}
myListControl.prototype = new BMap.Control();
myListControl.prototype.initialize = function(map){
	var d=document.createElement('DIV');
	d.className = "markerListdiv";
	d.style.padding = '5px';
	d.style.width = "5px";
	d.style.height = "5px";
	d.style.whiteSpace = "nowrap";
	d.style.backgroundColor='#FFFFFF';
	d.style.border = 'solid 1px #ABABAB';
	d.style.cursor = 'pointer';
	d.style.textAlign = 'left';
	d.style.fontFamily = 'Microsoft YaHei,Arial,Helvetica,sans-serif';
	d.style.fontSize = '9pt';
	d.style.lineHeight = "18px";
	d.style.paddingLeft = '4px';
	d.style.paddingRight = '4px';
	d.style.overflowX = 'hidden';
	d.style.overflowY = 'hidden';
	d.title = '';
	for(var i=0; i<this.markerArray.length; i++){
		var a = document.createElement("A");
		var t=this.markerArray[i].title;
		a.setAttribute("href","#");
		if(t.length<11)
			a.appendChild(document.createTextNode(t));
		else
			a.appendChild(document.createTextNode(t.substring(0, 10)+'...'));
		a.title=t;
		a.m = this.markerArray[i].myGMarker;
		a.map=this.map;
		a.onclick = function(){this.map.panTo(this.m.marker_.getPosition());}
		d.appendChild(a);
		d.appendChild(document.createElement("BR"));
	}
	this.map.getContainer().appendChild(d);
	this.d_ = d;
	this.updateDisplay();
	return d;
}
myListControl.prototype.updateDisplay=function(){
	var d = this.d_;
	if(d){
	var w=d.scrollWidth, h=d.scrollHeight;
	if(h>400){
		h=400;w+=12;if('hidden'==d.style.overflowY){d.style.overflowY='scroll';}
	}else if('hidden'!=d.style.overflowY){
		d.style.overflowY = 'hidden';
	}
	if(w<50)w=50; //限制最小宽度
	d.style.width=w+"px";
	d.style.height=h+"px";
	}
}
myListControl.prototype.AddItem = function(oMyGMarker){
	var d = this.d_;
	var a = document.createElement("A");
	var t=oMyGMarker.title;
	a.setAttribute("href","#");
	if(t.length<11)
		a.appendChild(document.createTextNode(t));
	else
		a.appendChild(document.createTextNode(t.substring(0, 10)+'...'));
	a.title=t;
	a.m = oMyGMarker.myGMarker;
	a.map=this.map;
	a.onclick = function(){this.map.panTo(this.m.marker_.getPosition());}
	d.appendChild(a);
	d.appendChild(document.createElement("BR"));
	this.updateDisplay();
}
myListControl.prototype.DelItem = function(oMyGMarker) {
	var d = this.d_;
	var a, i, ii;
	for(i=0; i<d.children.length;i++){
		a = d.children[i];
		if(a.m){
			if(a.m.id == oMyGMarker.myGMarker.id){
				ii = i + 1;
				if(ii<d.children.length)
					if("BR"==d.children[ii].nodeName)
						d.removeChild(d.children[ii]);
				d.removeChild(a);
				break;
			}
		}
	}
	d.style.width="auto";
	d.style.height="auto";
	this.updateDisplay();
}
myListControl.prototype.UpdateItem = function(MarkerId,newMarker) {
	var d = this.d_;
	var a, i, ii, t;
	for(i=0; i<d.children.length;i++){
		a = d.children[i];
		if(a.m){
			if(a.m.id == MarkerId){
				t = newMarker.title;
				if(t.length<11)
					a.innerText = t;
				else
					a.innerText = t.substring(0, 10)+'...';
				a.title=t;
				a.m = newMarker.myGMarker;
				break;
			}
		}
	}
	this.updateDisplay();
}
// myListControl.prototype.UpdateSize = function(){
	// if(this.d_.scrollHeight > document.body.clientHeight-100){
		// if(document.body.clientHeight-100>=0)
			// this.d_.style.height = document.body.clientHeight-100;
		// else
			// this.d_.style.height = 0;
	// } else if(this.d_.style.overflowY.length){
		// this.d_.style.removeAttribute("height");
	// }
// }
myListControl.prototype.Show = function(b){this.d_.style.display=b?'block':'none';}
function mtitleCtl(ctlDiv, mapTitle){
	ctlDiv.appendChild(document.createTextNode(mapTitle));
}