(function (global) {
    if (global.valueUtil) {
        return;
    }
    var valueUtil = new Object();

    // valueUtil.filter = function (value,filterStr) {
    //   let result = "";
    //   for(let i =0;i<value.length;i++){
    //     if(value[i]!="\\"){
    //       result=result+value[i];
    //     }
    //   }
    //   return result;
    // };

    global.valueUtil = valueUtil;
})(this);
