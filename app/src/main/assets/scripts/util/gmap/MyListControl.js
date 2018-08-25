function myListControl(ctlDiv, map, markerArray) {
    ctlDiv.style.padding = '5px'; 
	ctlDiv.style.overflowY = 'auto';
	if(markerArray.length*18 > document.body.clientHeight-100){
		ctlDiv.style.height = document.body.clientHeight-100+'px';
	}
	this.d_ = ctlDiv;
	var controlUI = document.createElement('DIV');
	controlUI.className = "markerListdiv";
	controlUI.style.backgroundColor = 'white';
	controlUI.style.border = 'solid 1px #ABABAB';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'left';
	controlUI.style.fontFamily = 'Microsoft YaHei,Arial,Helvetica,sans-serif';
	controlUI.style.fontSize = '9pt';
	controlUI.style.lineHeight = "18px";
	controlUI.style.paddingLeft = '4px';
	controlUI.style.paddingRight = '4px';
	controlUI.style.overflowY = 'scroll';
	controlUI.title = '';
	for(var i=0; i<markerArray.length; i++){
		var a = document.createElement("A");
		var t=markerArray[i].title;
		a.setAttribute("href","#");
		if(t.length<11)
			a.appendChild(document.createTextNode(t));
		else
			a.appendChild(document.createTextNode(t.substring(0, 10)+'...'));
		a.title=t;
		a.m = markerArray[i].myGMarker;
		a.onclick = function () {
		    //map.panTo(this.m.GLatLng_);
		    currentMarker = this.m.marker_;
		    map.panTo(currentMarker.getPosition());
		}
		controlUI.appendChild(a);
		controlUI.appendChild(document.createElement("BR"));
	}
	ctlDiv.appendChild(controlUI);
}
myListControl.prototype.AddItem = function(oMyGMarker) {
	var d = this.d_.firstChild;
	var a = document.createElement("A");
	var t=oMyGMarker.title;
	a.setAttribute("href","#");
	if(t.length<11)
		a.appendChild(document.createTextNode(t));
	else
		a.appendChild(document.createTextNode(t.substring(0, 10)+'...'));
	a.title=t;
	a.m = oMyGMarker.myGMarker;
	a.onclick = function () {
		map.panTo(this.m.GLatLng_);
	}
	d.appendChild(a);
	d.appendChild(document.createElement("BR"));
	if(this.d_.scrollHeight > document.body.clientHeight-100){
		this.d_.style.height = document.body.clientHeight-100+'px';
	}
}
myListControl.prototype.DelItem = function(oMyGMarker) {
	var d = this.d_.firstChild;
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
				if(this.d_.scrollHeight<document.body.clientHeight-100){
					this.d_.style.removeAttribute("height");
				}
				break;
			}
		}
	}
}
myListControl.prototype.UpdateItem = function(MarkerId,newMarker) {
	var d = this.d_.firstChild;
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
}
myListControl.prototype.UpdateSize = function(){
	if(this.d_.scrollHeight > document.body.clientHeight-100){
		if(document.body.clientHeight-100>=0)
			this.d_.style.height = document.body.clientHeight-100;
		else
			this.d_.style.height = 0;
	} else if(this.d_.style.overflowY.length){
		this.d_.style.removeAttribute("height");
	}
}
myListControl.prototype.Show = function(b){
this.d_.style.display=b?'block':'none';
}
function mtitleCtl(ctlDiv, mapTitle){
	ctlDiv.appendChild(document.createTextNode(mapTitle));
}