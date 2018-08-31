(function(global) {
    if (global.callNativeInterface) {
        return;
    }

    function callIosNativeApp(funcName, msg) {
        var iosMsg = JSON.stringify({ "funcName": funcName, "msg": msg });
        try {
            console.log('call ios native');
            if (webkit && webkit.messageHandlers && webkit.messageHandlers.callIosNativeApp) {
                webkit.messageHandlers.callIosNativeApp.postMessage(iosMsg);
            }
        } catch (err) {
            console.log('The ios native context does not exist yet');
        }
    }

    //appJsInterface
    var callNativeInterface = new Object();

    callNativeInterface.toast = function(toastString) {
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.toast(toastString);
        } else {
            callIosNativeApp('changePage', cbJsonStr);
        }
    };

    callNativeInterface.setFavoriteCar = function(favoriteCar) {
        var cbObj = {};
        cbObj.favoriteCar = favoriteCar;
        var cbJsonStr = JSON.stringify(cbObj);
        console.log('!!!!!!!!!!!!!setFavoriteCar!!!!!!!!!!!!!!!!');
        if (typeof(appJsInterface) != 'undefined') {
            console.log('!!!!!!!!!!!!!setFavoriteCar!!!!!!appJsInterface!!!!!!!!!!');
            appJsInterface.setFavoriteCar(cbJsonStr);
        } else {
            callIosNativeApp('changePage', cbJsonStr);
        }
    };

    callNativeInterface.getCarsInfoById = function() {
        console.log('!!!!!!!!!!!!!getCarsInfoById!!!!!!!!!!!!!!!!');
        if (typeof(appJsInterface) != 'undefined') {
            console.log('!!!!!!!!!!!!!getCarsInfoById!!!!!!appJsInterface!!!!!!!!!!');
            appJsInterface.getCarsInfoById();
        } else {
            callIosNativeApp('changePage', );
        }
    };

     callNativeInterface.getCarsInfoByCompany = function() {
        console.log('!!!!!!!!!!!!!getCarsInfoByCompany!!!!!!!!!!!!!!!!');
        if (typeof(appJsInterface) != 'undefined') {
            console.log('!!!!!!!!!!!!!getCarsInfoByCompany!!!!!!appJsInterface!!!!!!!!!!');
            appJsInterface.getCarsInfoByCompany();
        } else {
            callIosNativeApp('changePage', cbJsonStr);
        }
    };

    callNativeInterface.orderTestDrive = function(name, company, phone, address, paymentType, carName, carCompany, carVersion, carColor, hopeTime) {
        console.log('!!!!!!!!!!!!!orderTestDrive!!!!!!!!!!!!!!!!');
        var cbObj = {};
        cbObj.name = name;
        cbObj.company = company;
        cbObj.phone = phone;
        cbObj.address = address;
        cbObj.payment_type = paymentType;
        cbObj.car_name = carName;
        cbObj.car_company = carCompany;
        cbObj.car_version = carVersion;
        cbObj.car_color = carColor;
        cbObj.hopeTime = hopeTime;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            console.log('!!!!!!!!!!!!!orderTestDrive!!!!!!appJsInterface!!!!!!!!!!');
            appJsInterface.orderTestDrive(cbJsonStr);
        } else {
            callIosNativeApp('changePage', cbJsonStr);
        }
    };

    callNativeInterface.selectImageFile = function() {
        console.log('!!!!!!!!!!!!!selectImageFile!!!!!!!!!!!!!!!!');
        if (typeof(appJsInterface) != 'undefined') {
            console.log('!!!!!!!!!!!!!selectImageFile!!!!!!appJsInterface!!!!!!!!!!');
            appJsInterface.selectImageFile();
        } else {
            callIosNativeApp('changePage', cbJsonStr);
        }
    };

    callNativeInterface.changePage = function(url, companyType) {
        var cbObj = {};
        cbObj.url = url;
        cbObj.companyType = companyType;
        var cbJsonStr = JSON.stringify(cbObj);
        console.log('!!!!!!!!!!!!!changePage!!!!!!!!!!!!!!!!');
        if (typeof(appJsInterface) != 'undefined') {
            console.log('!!!!!!!!!!!!!changePage!!!!!!appJsInterface!!!!!!!!!!');
            appJsInterface.changePage(cbJsonStr);
        } else {
            callIosNativeApp('changePage', cbJsonStr);
        }
    };

    callNativeInterface.getCarImagePathByFolder = function(folderName) {
        var cbObj = {};
        cbObj.folderName = folderName;
        var cbJsonStr = JSON.stringify(cbObj);
        console.log('!!!!!!!!!!!!!getCarImagePathByFolder!!!!!!!!!!!!!!!!');
        if (typeof(appJsInterface) != 'undefined') {
            console.log('!!!!!!!!!!!!!getCarImagePathByFolder!!!!!!appJsInterface!!!!!!!!!!');
            appJsInterface.getCarImagePathByFolder(cbJsonStr);
        } else {
            // callIosNativeApp('changePage', );
        }
    };

    callNativeInterface.mergeImageExe = function(mergeImgArr, targetImg) {
        var cbObj = {};
        cbObj.mergeImgArr = mergeImgArr;
        cbObj.targetImg = targetImg;
        var cbJsonStr = JSON.stringify(cbObj);
        console.log('!!!!!!!!!!!!!mergeImageExe!!!!!!!!!!!!!!!!');
        if (typeof(appJsInterface) != 'undefined') {
            console.log('!!!!!!!!!!!!!mergeImageExe!!!!!!appJsInterface!!!!!!!!!!');
            appJsInterface.mergeImageExe(cbJsonStr);
        } else {
            // callIosNativeApp('changePage', );
        }
    };


    callNativeInterface.inputConnectIP = function(ip, remember) {
        console.log('!!!!!!!!!!!!!!inputConnectIP!!!!!!!!!!!!!!!');
        var cbObj = {};
        cbObj.ip = ip;
        cbObj.remember = remember;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            console.log('!!!!!!!!!!!!!!inputConnectIP!!!!!!!!appJsInterface!!!!!!!');
            appJsInterface.inputConnectIP(cbJsonStr);
        } else {
            callIosNativeApp('inputConnectIP', cbJsonStr);
        }

    };

    callNativeInterface.getProjectListByIp = function(ip) {
        console.log('!!!!!!!!!!!!!!getProjectListByIp!!!!!!!!!!!!!!!');
        var cbObj = {};
        cbObj.ip = ip;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            console.log('!!!!!!!!!!!!!!getProjectListByIp!!!!!!!!appJsInterface!!!!!!!');
            appJsInterface.getProjectListByIp(cbJsonStr);
        } else {
            callIosNativeApp('getProjectListByIp', cbJsonStr);
        }

    };

    callNativeInterface.getProjectList = function() {
        console.log('!!!!!!!!!!!!!!getProjectList!!!!!!!!!!!!!!!');
        var cbObj = {};
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            console.log('!!!!!!!!!!!!!!getProjectList!!!!!!!!appJsInterface!!!!!!!');
            appJsInterface.getProjectList();
        } else {
            callIosNativeApp('getProjectList', '');
        }

    };

    callNativeInterface.getAccountHistoryList = function() {
        console.log('!!!!!!!!!!!!!!getAccountHistoryList!!!!!!!!!!!!!!!');
        var cbObj = {};
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            console.log('!!!!!!!!!!!!!!getAccountHistoryList!!!!!!!!appJsInterface!!!!!!!');
            appJsInterface.getAccountHistoryList();
        } else {
            callIosNativeApp('getAccountHistoryList', '');
        }

    };

    callNativeInterface.inputAccount = function(ip, projectName, username, password, remember) {
        var cbObj = {};
        cbObj.ip = ip;
        cbObj.projectName = projectName;
        cbObj.username = username;
        cbObj.password = password;
        cbObj.remember = remember;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.inputAccount(cbJsonStr);
        } else {
            callIosNativeApp('inputAccount', cbJsonStr);
        }
    };
    //[{ "name": "discrete", "value": "false" }]
    callNativeInterface.getTagsListByPage = function(start, count, filters) {
        var cbObj = {};
        cbObj.start = start;
        cbObj.count = count;
        cbObj.filters = filters;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getTagsListByPage(cbJsonStr);
        } else {
            callIosNativeApp('getTagsListByPage', cbJsonStr);
        }
    };
    //  [{  "Name": "ana_1",  "Attributes":[]}]
    callNativeInterface.getTagsData = function(tags) {
        var cbObj = {};
        cbObj.tags = tags;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getTagsData(cbJsonStr);
        } else {
            callIosNativeApp('getTagsData', cbJsonStr);
        }
    };
    //tags:[{"tagName": “AI_0”}] 
    callNativeInterface.getTagValue = function(tags) {
        var cbObj = {};
        cbObj.tags = tags;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getTagValue(cbJsonStr);
        } else {
            callIosNativeApp('getTagValue', cbJsonStr);
        }
    };
    //tags: [ { "tagName": “AI_0”}]
    callNativeInterface.alarmAck = function(tagsList) {
        var cbObj = {};
        cbObj.tagsList = tagsList;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.alarmAck(cbJsonStr);
        } else {
            callIosNativeApp('alarmAck', cbJsonStr);
        }
    };
    //[‘tag1’, ‘tag2’]
    callNativeInterface.setTagValue = function(tags) {
        var cbObj = {};
        cbObj.tags = tags;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.setTagValue(cbJsonStr);
        } else {
            callIosNativeApp('setTagValue', cbJsonStr);
        }
    };
    //tags: [ { "tagName": “AI_0”, “value”:0}]
    callNativeInterface.getAlarmSummaryByPage = function(start, count, filters, sort) {
        var cbObj = {};
        cbObj.start = start;
        cbObj.count = count;
        cbObj.filters = filters;
        cbObj.sort = sort;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getAlarmSummaryByPage(cbJsonStr);
        } else {
            callIosNativeApp('getAlarmSummaryByPage', cbJsonStr);
        }
    };
    callNativeInterface.alarmAckAll = function() {
        var cbObj = {};
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.alarmAckAll();
        } else {
            callIosNativeApp('alarmAckAll', '');
        }
    };
    callNativeInterface.getNodeList = function() {
        var cbObj = {};
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getNodeList();
        } else {
            callIosNativeApp('getNodeList', '');
        }
    };
    callNativeInterface.getActionLogAndCount = function(start, count, nodeName) {
        var cbObj = {};
        cbObj.start = start;
        cbObj.count = count;
        cbObj.nodeName = nodeName;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getActionLogAndCount(cbJsonStr);
        } else {
            callIosNativeApp('getActionLogAndCount', cbJsonStr);
        }
    };
    callNativeInterface.getAlarmLogAndCount = function(start, count, nodeName) {
        var cbObj = {};
        cbObj.start = start;
        cbObj.count = count;
        cbObj.nodeName = nodeName;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getAlarmLogAndCount(cbJsonStr);
        } else {
            callIosNativeApp('getAlarmLogAndCount', cbJsonStr);
        }
    };
    callNativeInterface.getStationStatus = function(nodeName) {
        var cbObj = {};
        cbObj.nodeName = nodeName;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getStationStatus(cbJsonStr);
        } else {
            callIosNativeApp('getStationStatus', cbJsonStr);
        }
    };
    callNativeInterface.setComportStatus = function(nodeName, port, state) {
        var cbObj = {};
        cbObj.port = port;
        cbObj.state = state;
        cbObj.nodeName = nodeName;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.setComportStatus(cbJsonStr);
        } else {
            callIosNativeApp('setComportStatus', cbJsonStr);
        }
    };
    callNativeInterface.setDeviceStatus = function(nodeName, port, unit, state) {
        var cbObj = {};
        cbObj.port = port;
        cbObj.unit = unit;
        cbObj.state = state;
        cbObj.nodeName = nodeName;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.setDeviceStatus(cbJsonStr);
        } else {
            callIosNativeApp('setDeviceStatus', cbJsonStr);
        }
    };
    callNativeInterface.logout = function() {
        var cbObj = {};
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.logout();
        } else {
            callIosNativeApp('logout', '');
        }
    };

    callNativeInterface.getFunctionList = function() {
        var cbObj = {};
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getFunctionList();
        } else {
            callIosNativeApp('getFunctionList', '');
        }
    };

    callNativeInterface.saveFunctionList = function(funcList) {
        /*{
actionLog /boolean, 
alarmLog /boolean, 
alarmSummary /boolean, 
trend /boolean, 
dashboard /boolean,
map /boolean,
datalog /boolean, 
stationStatus /boolean   
}
*/
        var cbObj = funcList;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.saveFunctionList(cbJsonStr);
        } else {
            callIosNativeApp('saveFunctionList', cbJsonStr);
        }
    };

    callNativeInterface.setLanguage = function(lang) {
        var cbObj = {};
        cbObj.lang = lang;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.setLanguage(cbJsonStr);
        } else {
            callIosNativeApp('setLanguage', cbJsonStr);
        }
    };

    callNativeInterface.getLanguage = function() {
        var cbObj = {};
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getLanguage();
        } else {
            callIosNativeApp('getLanguage', '');
        }
    };


    callNativeInterface.getLocalStorageMemAll = function() {
        var cbObj = {};
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getLocalStorageMemAll();
        } else {
            callIosNativeApp('getLocalStorageMemAll', '');
        }
    };


    callNativeInterface.getLocalStorageMem = function(key) {
        var cbObj = {};
        cbObj['key'] = key;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getLocalStorageMem(cbJsonStr);
        } else {
            callIosNativeApp('getLocalStorageMem', cbJsonStr);
        }
    };


    callNativeInterface.setLocalStorageMem = function(key, value) {
        var cbObj = {};
        cbObj['key'] = key;
        cbObj['value'] = value;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.setLocalStorageMem(cbJsonStr);
        } else {
            callIosNativeApp('setLocalStorageMem', cbJsonStr);
        }
    };


    callNativeInterface.removeLocalStorageMem = function(key) {
        var cbObj = {};
        cbObj['key'] = key;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.removeLocalStorageMem(cbJsonStr);
        } else {
            callIosNativeApp('removeLocalStorageMem', cbJsonStr);
        }
    };

    callNativeInterface.getMapListByNode = function(nodeName) {
        var cbObj = {};
        cbObj.nodeName = nodeName;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getMapListByNode(cbJsonStr);
        } else {
            callIosNativeApp('getMapListByNode', cbJsonStr);
        }
    };

    callNativeInterface.getMapConfig = function(nodeName, mapType, mapName) {
        var cbObj = {};
        cbObj.nodeName = nodeName;
        cbObj.mapType = mapType;
        cbObj.mapName = mapName;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getMapConfig(cbJsonStr);
        } else {
            callIosNativeApp('getMapConfig', cbJsonStr);
        }
    };

    callNativeInterface.getRTrendGroupId = function(nodeName) {
        var cbObj = {};
        cbObj.nodeName = nodeName;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getRTrendGroupId(cbJsonStr);
        } else {
            callIosNativeApp('getRTrendGroupId', cbJsonStr);
        }
    };

    callNativeInterface.getRTrendConfig = function(nodeName, trendGroupId) {
        var cbObj = {};
        cbObj.nodeName = nodeName;
        cbObj.trendGroupId = trendGroupId;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getRTrendConfig(cbJsonStr);
        } else {
            callIosNativeApp('getRTrendConfig', cbJsonStr);
        }
    };

    callNativeInterface.getRealTimeTagValues = function(Interval, Records, tags) {
        var cbObj = {};
        cbObj.Interval = Interval;
        cbObj.Records = Records;
        cbObj.Tags = tags;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getRealTimeTagValues(cbJsonStr);
        } else {
            callIosNativeApp('getRealTimeTagValues', cbJsonStr);
        }
    };

    callNativeInterface.getHisTrendGroupId = function(nodeName) {
        var cbObj = {};
        cbObj.nodeName = nodeName;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getHisTrendGroupId(cbJsonStr);
        } else {
            callIosNativeApp('getHisTrendGroupId', cbJsonStr);
        }
    };

    callNativeInterface.getDataLog = function(StartTime, IntervalType, Interval, Records, Tags) {
        var cbObj = {};
        cbObj.StartTime = StartTime;
        cbObj.IntervalType = IntervalType;
        cbObj.Interval = Interval;
        cbObj.Records = Records;
        cbObj.Tags = Tags;
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getDataLog(cbJsonStr);
        } else {
            callIosNativeApp('getDataLog', cbJsonStr);
        }
    };

    callNativeInterface.getNodeStatus = function() {
        var cbObj = {};
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getNodeStatus();
        } else {
            callIosNativeApp('getNodeStatus', '');
        }
    };

    callNativeInterface.getVersion = function() {
        var cbObj = {};
        var cbJsonStr = JSON.stringify(cbObj);
        if (typeof(appJsInterface) != 'undefined') {
            appJsInterface.getVersion();
        } else {
            callIosNativeApp('getVersion', '');
        }
    };

    global.callNativeInterface = callNativeInterface;
})(this);