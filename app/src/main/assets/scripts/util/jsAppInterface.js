(function (global) {
    if (global.jsAppInterface) {
        return;
    }

    function removeEscapeCode (string){
        var str = string.replace(/[\u0000-\u001F]+/, "")
        return str;
    }

    var jsAppInterface = new Object();

    jsAppInterface.insertLanguage = "";

    jsAppInterface.setCarsInfo = function(result){
        if(typeof responseFunc == 'function'){
            try{
                var resultObj = JSON.parse(result);
                responseFunc('setCarsInfo',resultObj);    
            }catch(error){
                responseFunc('error',error.message); 
            }
            
        }
    };

    jsAppInterface.setImageAll = function(result){
        if(typeof responseFunc == 'function'){
            try{
                var resultObj = JSON.parse(result);
                responseFunc('setImageAll',resultObj);    
            }catch(error){
                responseFunc('error',error.message); 
            }
            
        }
    };

    jsAppInterface.setMergeImageResult = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.lang = lang;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('setMergeImageResult',resultObj);    
            }catch(error){
                responseFunc('error',error.message); 
            }
            
        }
    };

    jsAppInterface.setMergeImageAll = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.lang = lang;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('setMergeImageAll',resultObj);    
            }catch(error){
                responseFunc('error',error.message); 
            }
            
        }
    };

    jsAppInterface.insertLanguage = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.lang = lang;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertLanguage',resultObj);    
            }catch(error){
                responseFunc('error',error.message); 
            }
            
        }
    };

    jsAppInterface.cbLanguage = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.lang = lang;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('cbLanguage',resultObj);   
            }catch(error){
                responseFunc('error',error.message); 
            }
        }
    };

    jsAppInterface.cbIpStatus = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.status = status;
            //cbObj.error = error;
            //cbObj.errorMsg = errorMsg;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('cbIpStatus',resultObj); 
            }catch(error){
                responseFunc('error',error.message); 
            }
        }
    };

    jsAppInterface.insertIpHistoryList = function(result){
//[""]

        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.ipList = ipList;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertIpHistoryList',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }
    };

    jsAppInterface.insertProjectList = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.projectList = projectList;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertProjectList',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }
    };

    jsAppInterface.cbAccountLogin = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.status = status;
            //cbObj.error = error;
            //cbObj.errorMsg = errorMsg;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('cbAccountLogin',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }
    };

    jsAppInterface.insertAccountHistoryList = function(result){
/*[{username
password
projectName
}]*/
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.accountList = accountList;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertAccountHistoryList',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }
    };

    jsAppInterface.insertFunctionList = function(result){
/*funcList/object /被關閉的功能列表
{
actionLog /boolean, 
alarmLog /boolean, 
alarmSummary /boolean, 
historyTrend /boolean, 
dashboard /boolean,
map /boolean,
datalog /boolean, 
stationStatus /boolean   
}*/
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.funcList = funcList;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertFunctionList',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }


    };

    jsAppInterface.insertTagsList = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.tagsList = tagsList;
            //cbObj.totalCount = totalCount;
            //[{tagName:""},{tagName:""}]
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertTagsList',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }
    };

    jsAppInterface.insertTagsData = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.tagsData = tagsData;
            try{
                var resultObj = JSON.parse(result.replace(/[^\x20-\x7E]+/g, ''));
                responseFunc('insertTagsData',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }
/*[
{
"NAME":"AO_01",
"DESCRP":"Analog Output",
"ADDRS":"40001",
"TYPE":"ANALOG",
"PADDRS":"40001[0:16]" 
……
}
]*/


    };

    jsAppInterface.insertTagValue = function(result){
/*tagInfos : [
  {
    "tagName":"",
    "tagType":"",
    "value":""
  }
]*/
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.tagInfos = tagInfos;
            try{
                var resultObj = JSON.parse(removeEscapeCode(result));
                responseFunc('insertTagValue',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }


    };

    jsAppInterface.insertAlarmSummary = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.alarmSummaries = alarmSummaries;
            //cbObj.totalCount = totalCount;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertAlarmSummary',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }
    };

    jsAppInterface.alarmAckStatus = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.status = status;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('alarmAckStatus',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }
    };

    jsAppInterface.alarmAckAllStatus = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.status = status;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('alarmAckAllStatus',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }
    };

    jsAppInterface.insertNodeStatus = function(result){
        //nodeLists: [{ 'nodeName': 'SCADA1', 'description': '' }, { 'nodeName': 'SCADA2', 'description': ''}]
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.nodeLists = nodeLists;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertNodeStatus',resultObj);
            }catch(error){
                responseFunc('error',error.message);
            }
        }
    };
 
    // 2018.05.24 Elvis add
    jsAppInterface.insertMapListByNode = function(result){
        //console.log("jsAppInterface.insertMapListByNode")
 //mapList: [{ 'Map01.google' }, { 'Map02.google'}]
        if(typeof responseFunc == 'function'){
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertMapListByNode',resultObj);
             }catch(error){
                responseFunc('error',error.message);
             }
        }
 
    };
 
    // 2018.05.24 Elvis add
    jsAppInterface.insertMapConfig = function(result){
        //console.log("jsAppInterface.insertMapConfig")
        if(typeof responseFunc == 'function'){
             try{
                //console.log(result);
                responseFunc('insertMapConfig', result);
             }catch(error){
                responseFunc('error',error.message);
             }
        }
     };
 
 
    jsAppInterface.insertNodeList = function(result){
//nodeLists: [{ 'nodeName': 'SCADA1', 'description': '' }, { 'nodeName': 'SCADA2', 'description': ''}]
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.nodeLists = nodeLists;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertNodeList',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }

    };

    jsAppInterface.insertRTrendId = function(result){
        if(typeof responseFunc == 'function'){
             //result = decodeURIComponent(window.atob(result));
             //var cbObj = {};
             //cbObj.nodeLists = nodeLists;
             try{
                 var resultObj = JSON.parse(result);
                 responseFunc('insertRTrendId',resultObj);
             }catch(error){
                responseFunc('error',error.message);
             }
         }
    };

    jsAppInterface.insertRTrendConfig = function(result){
        if(typeof responseFunc == 'function'){
             //result = decodeURIComponent(window.atob(result));
             //var cbObj = {};
             //cbObj.nodeLists = nodeLists;
             try{
                 var resultObj = JSON.parse(result);
                 responseFunc('insertRTrendConfig',resultObj);
             }catch(error){
                responseFunc('error',error.message);
             }
         }
    };

    jsAppInterface.insertRealTimeTagValues = function(result){
         if(typeof responseFunc == 'function'){
              //result = decodeURIComponent(window.atob(result));
              //var cbObj = {};
              //cbObj.nodeLists = nodeLists;
              try{
                  var resultObj = JSON.parse(result);
                  responseFunc('insertRealTimeTagValues',resultObj);
              }catch(error){
                 responseFunc('error',error.message);
              }
          }
     };

    jsAppInterface.insertActionLog = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.totalCount = totalCount;
            //cbObj.actionLogs = actionLogs;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertActionLog',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }

    };

    jsAppInterface.insertAlarmLog = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.totalCount = totalCount;
            //cbObj.alarmLogs = alarmLogs;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertAlarmLog',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }
    };

    jsAppInterface.insertStationStatus = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.staComps = staComps;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertStationStatus',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }

    };

    jsAppInterface.insertLocalStorageMemAll = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.staComps = staComps;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertLocalStorageMemAll',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }

    };

    jsAppInterface.insertLocalStorageMem = function(result){
        if(typeof responseFunc == 'function'){
            //result = decodeURIComponent(window.atob(result));
            //var cbObj = {};
            //cbObj.staComps = staComps;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertLocalStorageMem',resultObj);
            }catch(error){
                responseFunc('error',error.message); 
            }
        }

    };

    jsAppInterface.insertVersion = function(result){
        if(typeof responseFunc == 'function'){
             //result = decodeURIComponent(window.atob(result));
             //var cbObj = {};
             //cbObj.lang = lang;
            try{
                var resultObj = JSON.parse(result);
                responseFunc('insertVersion',resultObj);
            }catch(error){
                responseFunc('error',error.message);
            }
        }
    };


    global.jsAppInterface = jsAppInterface;
})(this);
