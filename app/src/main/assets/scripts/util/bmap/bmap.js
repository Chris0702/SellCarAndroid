/*if not bMapLoaded then%>
var MapZoom = 5;
var MapCenter = new BMap.Point(107.745057,37.760334);
var MapTitle='';
var markers=new Array();
<%end if%>*/
var map,d,infowindow,curMarker,mapSel;
var lasticon="", lasticontp="";
var pubIconUrl = "deficons/";
var ProjIconUrl = "./scripts/util/icons/";//temp
//var ProjIconUrl = "<%=ProjName%>_<%=NodeName%>/icons/";
var imgFiles = [];//temp?
var imgTypes = [];//temp?
var mapfiles = [];//temp?
var currentmap = "";//temp?
var NodeListControl=null;
var twinkleTime = 0;
var TrackingMarker=null;

function resizemap(){//temp
	d.style.width=document.body.clientWidth+"px";
	d.style.height=document.body.clientHeight+"px";
}

var strHashString = window.location.toString();
var start = strHashString.indexOf("?");
var Arg = strHashString.substring(start + 1, strHashString.length).split("&");//temp
function getQueryString(item) {
  var strValue = "";
  var i;
  var item1;
  item1 = item + "=";
  for (i = 0; i < Arg.length; i++) {
    var tmpValue = Arg[i];
    var nPos1 = tmpValue.indexOf(item1);
    if (nPos1 == 0) {
       strValue = tmpValue.substring(item1.length, tmpValue.length);
       break;
    }
  }
  return strValue;
}
var ViewHwnd = getQueryString("hwnd");
function BwCommand(command, args){
	var Tag, Value, TagFlash, nPos;
	try {
		if (command == "SENDCMD") {
			//document.ViewObj.SendCmd(args, ViewHwnd);
		} else if (command == "GETVAL") {
			//Value = document.ViewObj.GetValue(args, ViewHwnd);
			Value = bmapPage.getTagValueFromObj(args);
		}
		return Value;
	} catch (e) { /*alert(e.message);*/ }

	return "*";
}
function onMarkerClickRuntime(e){
	if(this.ovl.WAMarker.lcmd.length>0){
		BwCommand("SENDCMD", this.ovl.WAMarker.lcmd);
	}
}
function initialize(){
	if("undefined"==typeof(BMap)){alert("Can not load baidumap api");return;}
	d=document.getElementById("map");
	map=new BMap.Map('map');
	map.centerAndZoom(MapCenter, MapZoom);
	map.enableScrollWheelZoom();
	map.enableContinuousZoom();
	map.enableKeyboard();
	map.enableInertialDragging();

	//map.addControl(new MsgControl());
	var NaviControl = new BMap.NavigationControl();
	NaviControl.setAnchor(BMAP_ANCHOR_TOP_RIGHT);
	map.addControl(NaviControl);

	//add Markers
	var iconurl, curMarker, i,j;
	for(i=0; i<markers.length; i++){
        // 2018.06.13 Elvis add for marker image with user upload
        var imageUrl = "http://" + bmapPage.ip + "/broadweb/gmap/" + bmapPage.projectName+ "_" + bmapPage.nodeName + "/icons/";
		//iconurl = (1==markers[i].icon[0].tp) ? ProjIconUrl:pubIconUrl;
        iconurl = (1==markers[i].icon[0].tp) ? imageUrl:pubIconUrl;
		markers[i].myGMarker = new CmyGMarker(map, markers[i], iconurl+markers[i].icon[0].fi, false);
		markers[i].myGMarker.markerClickHandler = onMarkerClickRuntime;
		markers[i].myGMarker.setShowIconOnly(0);
		markers[i].val = null;
		markers[i].ti = -1;		//check if the point same to one of label tag, if so, ti(tagIndex) is index of the label
		if(null==TrackingMarker){
			if(markers[i].defaultTag){
				TrackingMarker=markers[i];
			}
		}
		for(j=0;j<markers[i].icon.length;j++)
		{
			if(markers[i].icon[j].val.length>0){
				markers[i].icon[j].val = markers[i].icon[j].val.replace(/\s+/g, "");
				markers[i].icon[j].valAry = ConvImgVal(markers[i].icon[j].val);
			}
		}
		if(markers[i].labels){
			for(j=0; j<markers[i].labels.length; j++){
				if(!ChkHexaColor(markers[i].labels[j].color1)){markers[i].labels[j].color1="#000000";}
				if(!ChkHexaColor(markers[i].labels[j].color2)){markers[i].labels[j].color2="#000000";}
				if(!ChkHexaColor(markers[i].labels[j].color3)){markers[i].labels[j].color3="#000000";}
			}
		}
		map.addOverlay(markers[i].myGMarker);
	}

	// create controls
	//hide marker list
	if(markers){
		//map.addControl(NodeListControl=new myListControl(map,markers));	
	}
	//NodeListControl.Show(true);


	//setInterval('refreshValue()',500);
	//setTimeout('refreshValue()',500);
} //end onload()


function refreshValue(){
	var currentTime = new Date();
	var i, j, imgIdx, TagVal, TagStatus;
	for(i=0; i<markers.length; i++){
		if(!markers[i].myGMarker.complete) continue;
		//get primary tag value and change marker icon
		if(markers[i].point.length>0){
			TagVal = BwCommand("GETVAL", markers[i].point);
			if(TagVal=="%T-1L$BAD" || TagVal=="%T-2L$NA"){
                TagVal="*";
            }
			if(TagVal!=markers[i].val){
				imgIdx=0;
				markers[i].val = TagVal;
				for(j=0; j<markers[i].icon.length; j++){
					if(ChkImgVal(markers[i].icon[j].valAry, TagVal)){
						//set marker icon
						var imgurl;
                        if(1==markers[i].icon[j].tp) {
							//imgurl = ProjIconUrl + markers[i].icon[j].fi;
                            // 2018.06.13 Elvis add for marker image with user upload
                            imgurl = "http://" + bmapPage.ip + "/broadweb/gmap/" + bmapPage.projectName+ "_" + bmapPage.nodeName + "/icons/";
                        } else
							imgurl = pubIconUrl + markers[i].icon[j].fi;
                        markers[i].myGMarker.setImg(imgurl);
						break;
					}
				}
			}
		}

		//position refresh
		if(markers[i].tag.length>0){
			//GetBaiduLatLng(markers[i],{lat:34.80111111,lng:113.64916667});
			//var origPos=markers[i].myGMarker.marker_.getPosition();
			//var oLat = origPos.lat, oLng = origPos.lng;
			var markerTagVal = BwCommand("GETVAL", markers[i].tag); //markerTagVal="113.66168599179,34.806255719349";
			var mTagValArray = markerTagVal.split(",");
			if(mTagValArray.length>=2){
				//GetBaiduLatLng(markers[i],{lat:34.80111111,lng:113.64916667});

				GetBaiduLatLng(markers[i],{lat:parseFloat(mTagValArray[1]),lng:parseFloat(mTagValArray[0])});

				//var markposition = new BMap.Point(mTagValArray[0]*1, mTagValArray[1]*1);
				//if(oLat != markposition.lat || oLng != markposition.lng)
				//markers[i].myGMarker.GLatLng_=markposition;
				//markers[i].myGMarker.marker_.setPosition(markposition);
				//markers[i].myGMarker.draw();
			}
		}

	    //labels:
	    if (markers[i].labels) {
            for (j = 0; j < markers[i].labels.length; j++) {
                if (markers[i].labels[j].tag.length > 0) {
                    if (j != markers[i].ti) {
                        TagVal = BwCommand("GETVAL", markers[i].labels[j].tag);
                        if (TagVal == "%T-1L$BAD" || TagVal == "%T-2L$NA") {
                            TagVal = "*";
                        }
                    } else {
                        TagVal = markers[i].val;
                    }

                    markers[i].labels[j].val = TagVal;
                    if (markers[i].myGMarker.ta) {
                        TagStatus = BwCommand("GETVAL", markers[i].labels[j].tag + ".ALMST") * 1;
                        var desc = BwCommand("GETVAL", markers[i].labels[j].tag + ".DESCR" + TagVal);

                        if (!ChkHexaColor(markers[i].labels[j].color1) || !ChkHexaColor(markers[i].labels[j].color2) || !ChkHexaColor(markers[i].labels[j].color3)) {
                            if (desc == "*")
                                markers[i].myGMarker.ta[j].innerText = TagVal;
                            else
                                markers[i].myGMarker.ta[j].innerText = desc;

                            markers[i].myGMarker.ta[j].style.color = '#000000';
                        } else if ("*" != TagVal) {
                            switch (TagStatus) {
                                case 0:
                                    markers[i].myGMarker.ta[j].style.color = '#' + markers[i].labels[j].color1;
                                    if (markers[i].labels[j].twinkle1.toString() == "true") {
                                        if (markers[i].myGMarker.ta[j].innerText == "" && twinkleTime % 2 == 1) {
                                            if (desc == "*")
                                                markers[i].myGMarker.ta[j].innerText = TagVal;
                                            else
                                                markers[i].myGMarker.ta[j].innerText = desc;
                                        } else {
                                            markers[i].myGMarker.ta[j].innerText = "";
                                        }
                                    } else {
                                        if (desc == "*")
                                            markers[i].myGMarker.ta[j].innerText = TagVal;
                                        else
                                            markers[i].myGMarker.ta[j].innerText = desc;
                                    }
                                    break;
                                case 1:
                                    markers[i].myGMarker.ta[j].style.color = '#' + markers[i].labels[j].color2;
                                    if (markers[i].labels[j].twinkle2.toString() == "true") {
                                        if (markers[i].myGMarker.ta[j].innerText == "" && twinkleTime % 2 == 1) {
                                            if (desc == "*")
                                                markers[i].myGMarker.ta[j].innerText = TagVal;
                                            else
                                                markers[i].myGMarker.ta[j].innerText = desc;
                                        } else {
                                            markers[i].myGMarker.ta[j].innerText = "";
                                        }
                                    } else {
                                        if (desc == "*")
                                            markers[i].myGMarker.ta[j].innerText = TagVal;
                                        else
                                            markers[i].myGMarker.ta[j].innerText = desc;
                                    }
                                    break;
                                case 2:
                                    markers[i].myGMarker.ta[j].style.color = '#' + markers[i].labels[j].color3;
                                    if (markers[i].labels[j].twinkle3.toString() == "true") {
                                        if (markers[i].myGMarker.ta[j].innerText == "" && twinkleTime % 2 == 1) {
                                            if (desc == "*")
                                                markers[i].myGMarker.ta[j].innerText = TagVal;
                                            else
                                                markers[i].myGMarker.ta[j].innerText = desc;
                                        } else {
                                            markers[i].myGMarker.ta[j].innerText = "";
                                        }
                                    } else {
                                        if (desc == "*")
                                            markers[i].myGMarker.ta[j].innerText = TagVal;
                                        else
                                            markers[i].myGMarker.ta[j].innerText = desc;
                                    }
                                    break;
                                default:
                                    markers[i].myGMarker.ta[j].style.color = '#' + markers[i].labels[j].color1;
                                    if (markers[i].labels[j].twinkle1.toString() == "true") {
                                        if (markers[i].myGMarker.ta[j].innerText == "" && twinkleTime % 2 == 1) {
                                            if (desc == "*")
                                                markers[i].myGMarker.ta[j].innerText = TagVal;
                                            else
                                                markers[i].myGMarker.ta[j].innerText = desc;
                                        } else {
                                            markers[i].myGMarker.ta[j].innerText = "";
                                        }
                                    } else {
                                        if (desc == "*")
                                            markers[i].myGMarker.ta[j].innerText = TagVal;
                                        else
                                            markers[i].myGMarker.ta[j].innerText = desc;
                                    }
                                    break;
                            }

                        } else {
                            markers[i].myGMarker.ta[j].style.color = "#FF0000";
                            markers[i].myGMarker.ta[j].innerText = TagVal;
                        }

                        //console.log("TagVal: " + TagVal);
                    }
                }
            } //end for loop labels
        } //end labels
	    /*
	    var desc;
	    if(markers[i].labels){
            for(j=0; j<markers[i].labels.length;j++){
                if(markers[i].labels[j].tag.length>0){
                    TagVal = BwCommand("GETVAL", markers[i].labels[j].tag);
                    if(TagVal=="%T-1L$BAD" || TagVal=="%T-2L$NA"){
                        TagVal="*";
                    }
                    if("*"!=TagVal){
                        TagStatus = BwCommand("GETVAL", markers[i].labels[j].tag+".ALMST")*1;
                    }else{
                        TagStatus = 1;
                    }

                    if(TagVal!=markers[i].labels[j].val){
                        markers[i].labels[j].val=TagVal;
                        if("*"!=TagVal){
                            desc = BwCommand("GETVAL", markers[i].labels[j].tag+".descr"+TagVal);
                        }else{
                            desc="%T-2L$NA";
                        }
                        markers[i].labels[j].desc = desc;
                    }else{
                        desc = markers[i].labels[j].desc;
                    }

                    if("*"!=TagVal){
                        switch(TagStatus) {
                        case 0:{
                            markers[i].myGMarker.ta[j].style.color = '#'+ markers[i].labels[j].color1;
                            if(markers[i].labels[j].twinkle1=="true"){
                                if(markers[i].myGMarker.ta[j].innerText=="" && 1==twinkleTime%2){
                                    if(desc=="%T-2L$NA")
                                        markers[i].myGMarker.ta[j].innerText = TagVal;
                                    else
                                        markers[i].myGMarker.ta[j].innerText = desc;
                                }else{
                                    markers[i].myGMarker.ta[j].innerText = "";
                                }
                            }else{
                                if(desc=="%T-2L$NA")
                                    markers[i].myGMarker.ta[j].innerText = TagVal;
                                else
                                    markers[i].myGMarker.ta[j].innerText = desc;
                            }
                            break;}
                        case 1:{
                            markers[i].myGMarker.ta[j].style.color='#'+markers[i].labels[j].color2;
                            if(markers[i].labels[j].twinkle2=="true"){
                                if(markers[i].myGMarker.ta[j].innerText=="" && 1==twinkleTime%2){
                                    if(desc=="%T-2L$NA")
                                        markers[i].myGMarker.ta[j].innerText = TagVal;
                                    else
                                        markers[i].myGMarker.ta[j].innerText = desc;
                                }else{
                                    markers[i].myGMarker.ta[j].innerText = "";
                                }
                            }else{
                                if(desc=="%T-2L$NA")
                                    markers[i].myGMarker.ta[j].innerText = TagVal;
                                else
                                    markers[i].myGMarker.ta[j].innerText = desc;
                            }
                            break;}
                        case 2:{
                            markers[i].myGMarker.ta[j].style.color='#'+ markers[i].labels[j].color3;
                            if(markers[i].labels[j].twinkle3=="true"){
                                if(markers[i].myGMarker.ta[j].innerText=="" && 1==twinkleTime%2){
                                    if(desc=="%T-2L$NA")
                                        markers[i].myGMarker.ta[j].innerText = TagVal;
                                    else
                                        markers[i].myGMarker.ta[j].innerText = desc;
                                }else{
                                    markers[i].myGMarker.ta[j].innerText = "";
                                }
                            }else{
                                if(desc == "%T-2L$NA")
                                    markers[i].myGMarker.ta[j].innerText = TagVal;
                                else
                                    markers[i].myGMarker.ta[j].innerText = desc;
                            }
                            break;}
                        default:
                            markers[i].myGMarker.ta[j].style.color = '#'+ markers[i].labels[j].color1;
                            if(markers[i].labels[j].twinkle1=="true"){
                                if(markers[i].myGMarker.ta[j].innerText == "" && twinkleTime%2 == 1){
                                    if(desc == "%T-2L$NA")
                                        markers[i].myGMarker.ta[j].innerText = TagVal;
                                    else
                                        markers[i].myGMarker.ta[j].innerText = desc;
                                }else{
                                    markers[i].myGMarker.ta[j].innerText = "";
                                }
                            }else{
                                if(desc == "%T-2L$NA")
                                    markers[i].myGMarker.ta[j].innerText = TagVal;
                                else
                                    markers[i].myGMarker.ta[j].innerText = desc;
                            }
                            break;
                        }//end switch
                    }else{
                        markers[i].myGMarker.ta[j].style.color = "#FF0000";
                        markers[i].myGMarker.ta[j].innerText = "***";
                    }

                    //console.log("TagVal: " + TagVal);
                }
            }//end for loop labels
	    }//end if labels
	    */
	}//end for loop markers
	twinkleTime++;
	if(TrackingMarker){map.panTo(TrackingMarker.myGMarker.marker_.getPosition());}
	//setTimeout('refreshValue()',500);
}//end refreshValue()
