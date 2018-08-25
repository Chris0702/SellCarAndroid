function responseFunc(functionType, result) {
   
};



(function(global) {
    if (global.uploadMergeImage) {
        return;
    }
    var uploadMergeImage = new Object();
    console.log("js uploadMergeImage init");
    uploadMergeImage.init = function() {
        initButton();
    };


    function initButton() {
        $('#selectImageFile').on('click', function() {
            console.log("selectFile  click")
            callNativeInterface.selectImageFile();
        });
    };

   

    global.uploadMergeImage = uploadMergeImage;
})(this);