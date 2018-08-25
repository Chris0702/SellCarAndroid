var currentMarker = null;
var map;
var twinkleTime = 0; // used for display text at the same time.

var pubIconUrl = "deficons/";
var ProjIconUrl = "./scripts/util/icons/";//temp
//var ProjIconUrl = "<%=ProjName%>_<%=NodeName%>/icons/";
var Arg, NodeListControl;
var strHashString = window.location.toString();
var start = strHashString.indexOf("?");
Arg = strHashString.substring(start + 1, strHashString.length).split("&");//temp
/*var imgPreLoad = new Array();
for (var i = 0; i < markers.length; i++) {
	imgPreLoad[i] = new Image();
	if (1 == markers[i].icon[0].tp)
		imgPreLoad[i].src = ProjIconUrl + markers[i].icon[0].fi;
	else
		imgPreLoad[i].src = pubIconUrl + markers[i].icon[0].fi;
}*/

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

function ParseSpecialChar(str) {
	return (unescape(str));
}

function BwCommand(command, args) {
	var Tag, Value, TagFlash, nPos;
	try {
		if (command == "SENDCMD") {
			//document.ViewObj.SendCmd(args, ViewHwnd);
		} else if (command == "GETVAL") {
			//Value = document.ViewObj.GetValue(args, ViewHwnd);
			Value = mapPage.getTagValueFromObj(args);
		}
		return Value;
	} catch (e) { /*alert(e.message);*/ }

	return "*";
}

/*function onMarkerClick(e) {
	//object [this] is the google.maps.Marker object
	if (this.ovl.WAMarker.lcmd.length > 0) {
		BwCommand("SENDCMD", this.ovl.WAMarker.lcmd);
	}

}*/

function onMarkerDblclick(e) {
	currentMarker = this;
	map.panTo(currentMarker.getPosition());
}

function onMarkerRightClick(e) {
	//object [this] is the google.maps.Marker object
}

function initialize() {
	/*for (var i = 0; i < markers.length; i++) {
		imgPreLoad[i] = new Image();
		if (1 == markers[i].icon[0].tp)
			imgPreLoad[i].src = ProjIconUrl + markers[i].icon[0].fi;
		else
			imgPreLoad[i].src = pubIconUrl + markers[i].icon[0].fi;
	}*/

	var mapcanvas = document.getElementById("map_canvas");
	var myOptions = {
		zoom: MapZoom,
		center: MapCenter,
		mapTypeId: MapType,
		disableDoubleClickZoom: true,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.SMALL
		},
		scaleControl: true,
		streetViewControl: false
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	var i, j, iconurl;

	//document.getElementById("mapstd").innerText = MapTitle;
	for (i = 0; i < markers.length; i++) {
        if (1 == markers[i].icon[0].tp) {
			//iconurl = ProjIconUrl;
            // 2018.06.13 Elvis add for marker image with user upload
            iconurl = "http://" + mapPage.ip + "/broadweb/gmap/" + mapPage.projectName+ "_" + mapPage.nodeName + "/icons/";
        } else {
			iconurl = pubIconUrl;
        }
		
        markers[i].myGMarker = new CmyGMarker(map, markers[i], iconurl + markers[i].icon[0].fi, false);
		//markers[i].myGMarker.markerClickHandler = onMarkerClick;
		markers[i].myGMarker.markerDblclickHandler = onMarkerDblclick;
		markers[i].myGMarker.markerRClickHandler = onMarkerRightClick;
		markers[i].myGMarker.setShowIconOnly(0);
		markers[i].val = null;
		markers[i].ti = -1; //check if the point same to one of label tag, if so, ti(tagIndex) is index of the label

		for (j = 0; j < markers[i].icon.length; j++) {
			if (markers[i].icon[j].val.length > 0)
				markers[i].icon[j].val = markers[i].icon[j].val.replace(/\s+/g, "");
			markers[i].icon[j].valAry = ConvImgVal(markers[i].icon[j].val);
		}
		if (markers[i].labels) {
			for (j = 0; j < markers[i].labels.length; j++) {
				markers[i].labels[j].val = null;
				if (-1 == markers[i].ti) {
					if (markers[i].labels[j].tag == markers[i].point) {
						markers[i].ti = j;
					}
				}
			}
		}
	}

	var markerListDiv = document.createElement('DIV');
	try {
		//hide marker list
		//NodeListControl = new myListControl(markerListDiv, map, markers);
		//<%if 0=b then%>
        //NodeListControl.Show(false);
        //<%end if%>
		//markerListDiv.index = 1;
		//map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(markerListDiv);
		//map.controls[google.maps.ControlPosition.RIGHT_TOP].push(markerListDiv);

		google.maps.event.addListener(map, 'drag', function(e) {
			currentMarker = null;
		});
		/*google.maps.event.addListener(map, 'dblclick', function(e) {
			var b = 1; //<%=b%>
			if (0 != b) {
				if (NodeListControl.d_.style.display == 'block') {
					NodeListControl.d_.style.display = 'none';
				} else {
					NodeListControl.d_.style.display = 'block';
				}
			}
		});*/

		var setCurrentMark = setInterval(function() {
			var i;
			for (i = 0; i < markers.length; i++) {
				if (markers[i].defaultTag == true) {
					currentMarker = markers[i].myGMarker.marker_;
					var mapPanTO = setInterval(function() {
						if (currentMarker.getPosition()) {
							map.panTo(currentMarker.getPosition());
							clearInterval(mapPanTO);
						}
					});
					break;
				}
			}
			if (currentMarker) {
				clearInterval(setCurrentMark);
			}
		}, 400);
		//setInterval('refreshValue()', 500);

	} catch (ex) {
		setTimeout(function() {
			initialize()
		}, 500);
	}
}

//Convert ImgValue from string to a value object{lo, hi} array
//hi maybe null,or a object{v:value,t:type}, t=0 meaning open range,t=1 meaning close range
//if hi is null,lo is a float value. if hi is not null,lo also a object{v:value,t:type}
function ConvImgVal(ImgVal) {
	var a = ImgVal.split(",");
	var av = new Array();
	var i = 0,
		j = 0;
	try {
		for (j = 0; j < a.length; j++) {
			if (a[j].match(/^[+-]?((\d+)|(\d+\.\d+))$/))
				av[i] = {
					lo: parseFloat(a[j]),
					hi: null
				};
			else if (a[j].match(/^[\[\(][+-]?((\d+)|(\d+\.\d+))$/)) {
				if (j + 1 >= a.length) break;
				if (null == a[j + 1].match(/^[+-]?((\d+)|(\d+\.\d+))[\]\)]$/)) break;
				av[i] = {
					lo: {
						v: parseFloat(a[j].substring(1, a[j].length)),
						t: ('(' == a[j].substring(0, 1) ? 0 : 1)
					},
					hi: {
						v: parseFloat(a[j + 1].substring(0, a[j + 1].length - 1)),
						t: (')' == a[j + 1].substring(a[j + 1].length - 1, a[j + 1].length) ? 0 : 1)
					}
				};
				j++;
			} else
				break;
			i++;
		}
	} catch (e) {}
	return av;
}
//check if val match iconValAry
function ChkImgVal(iconValAry, val) {
	var i, j, hi, lo, fltVal;
	try {
		fltVal = parseFloat(val);
		if (iconValAry.length > 0) {
			for (i = 0; i < iconValAry.length; i++) {
				hi = iconValAry[i].hi;
				lo = iconValAry[i].lo;
				if (hi === null) {
					if (fltVal == lo) return true;
				} else {
					if ((0 == lo.t && fltVal <= lo.v) || (1 == lo.t && fltVal < lo.v)) continue;
					if ((0 == hi.t && fltVal >= hi.v) || (1 == hi.t && fltVal > hi.v)) continue;
					return true;
				}
			}
		}
	} catch (e) {}
	return false;
}

function ChkHexaColor(sNum) {
	return (typeof sNum === "string") && sNum.length === 6 && !isNaN(parseInt(sNum, 16));
}

function refreshValue() {
	var currentTime = new Date(); //add
	var i, j, imgIdx, TagVal, TagStatus;
	for (i = 0; i < markers.length; i++) {
		if (!markers[i].myGMarker.complete) continue;
		//get primary tag value and change marker icon
		if (markers[i].point.length > 0) {
			TagVal = BwCommand("GETVAL", markers[i].point);
			if (TagVal == "%T-1L$BAD" || TagVal == "%T-2L$NA") {
				TagVal = "*";
			}
			if (TagVal != markers[i].val) {
				imgIdx = 0;
				markers[i].val = TagVal;
				for (j = 0; j < markers[i].icon.length; j++) {
					if (ChkImgVal(markers[i].icon[j].valAry, TagVal)) {
						//set marker icon
						var oicon, imgurl, isize;
						if (1 == markers[i].icon[j].tp)
							imgurl = ProjIconUrl + markers[i].icon[j].fi;
						else
							imgurl = pubIconUrl + markers[i].icon[j].fi;
						isize = GetImgOriSize(imgurl, 50, 50);
						oicon = new google.maps.MarkerImage(imgurl, null, null, null, new google.maps.Size(isize.w, isize.h));
						markers[i].myGMarker.marker_.setIcon(oicon);
						break;
					}
				}
			}
		}

		//position refresh
		if (markers[i].tag != undefined && markers[i].tag.length > 0) {
			var originalLat = markers[i].myGMarker.marker_.getPosition().lat();
			var originalLng = markers[i].myGMarker.marker_.getPosition().lng();
			var markerTagVal = BwCommand("GETVAL", markers[i].tag);
			//if (TagVal !="%T-1L$BAD" && TagVal != "%T-2L$NA") {
			var mTagValArray = markerTagVal.split(",");
			if (mTagValArray.length >= 2) {
				var markposition = new google.maps.LatLng(mTagValArray[1] * 1, mTagValArray[0] * 1);
				if (originalLat != markposition.lat() || originalLng != markposition.lng())
					markers[i].myGMarker.marker_.setPosition(markposition);
				var op = markers[i].myGMarker.getProjection();
				var pixPos = op.fromLatLngToDivPixel(markers[i].myGMarker.marker_.getPosition());
				var left = Math.round(pixPos.x - markers[i].myGMarker.marker_.InfoDivWidth / 2);
				var top = Math.round(pixPos.y - markers[i].myGMarker.marker_.ih - markers[i].myGMarker.marker_.InfoDivHeight);
				if (browser.tp == 2) top -= 2; //chrome
				markers[i].myGMarker.div_.style.left = left + "px";
				markers[i].myGMarker.div_.style.top = top + "px";
			}
			//}

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
	} //end for markers
	twinkleTime++;
	if (Boolean(currentMarker) != false) {
		map.panTo(currentMarker.getPosition());
	}

}
