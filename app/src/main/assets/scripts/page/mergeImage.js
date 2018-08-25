function responseFunc(functionType, result) {
    // var resultObj = JSON.parse(result);
    var resultObj = result;
    if (functionType == 'setMergeImageResult') {
        mergeImage.setMergeImageResult(resultObj);
    } else if (functionType == 'setMergeImageAll') {
        mergeImage.setMergeImageAll(resultObj);
    } else if (functionType == 'error') {
        console.log('----------------------error');
        console.log(resultObj);
    } else {}
};



(function(global) {
    if (global.mergeImage) {
        return;
    }
    var mergeImage = new Object();
    mergeImage.currentDrawMode = 0;
    console.log("js mergeImage init");
    var mergeImgArr = [];
    var targetImg = '';
    var step = 0;
    var clickColor = "#aaaaaa";
    var normalColor = "#ffffff";
    var resultPath = '';

    mergeImage.init = function() {
        console.log("=========mergeImage============init")

        $('#question').html('請選擇多張圖片作為基底');
        initButton();
        initImage();
        // initImage();
        // $('#projArea,#userArea,#pwdArea,#rememberMeArea,#loginArea').hide();
        // $('#top').css('height','50%');
        // $('#bottom').css('height','calc(50% - 5vh)');
        // $('#bottom').css('margin-left','20%');
        // $('#bottom').css('margin-right','20%');


        // $('#introduction').on('click',function(){
        // 	console.log("introduction  click")
        // 	callNativeInterface.changePage("introduction");
        // });

        // $('#mergeImage').on('click',function(){
        // 	console.log("mergeImage  click")
        // 	callNativeInterface.changePage("mergeImage");
        // });

        // $('#upload').on('click',function(){
        // 	console.log("upload  click")
        // 	callNativeInterface.changePage("upload");
        // });

        // $('#about').on('click',function(){
        // 	console.log("about  click")
        // 	callNativeInterface.changePage("about");
        // });



    };



    mergeImage.changePage = function(pageName) {
        callNativeInterface.changePage(pageName);
    };

    mergeImage.setMergeImageResult = function(resultObj) {
        var result = resultObj.result;
        var serverUrl = resultObj.serverUrl
        result = serverUrl + '/' + result;
        showMergeImage(result);
        addDownloadBtn();
    };

    mergeImage.setMergeImageAll = function(resultObj) {
        // callNativeInterface.changePage(pageName);
        var imgArr = resultObj.imgArr;
        var serverUrl = resultObj.serverUrl
        for (i in imgArr) {
            imgArr[i] = serverUrl + '/' + imgArr[i];
            createImgBlock(imgArr[i], i);

        }
        console.log("#########imgArr#########")
        console.log(imgArr)
        imageClickInit();
    };

    function initButton() {
        $('#nextStep').click(function(e) {
            $('.mergeImage').attr('value') == '';
            $('.mergeImage').parent().css('background-color', normalColor);
            // console.log('nextStep   click')
            if (step == 0) {
                if (mergeImgArr.length <= 0) {
                    alert("請選擇自少一張圖片");
                } else {
                    $('#question').html('請選擇欲合成的圖片');
                    $('#nextStep').html('開始合併');
                    step++;
                }
            } else if (step >= 1) {
                // console.log("send")
                // console.log(mergeImgArr)
                // console.log(targetImg)
                if (targetImg == '') {
                    alert("請選擇欲合成的圖片");
                } else {
                    callNativeInterface.mergeImageExe(mergeImgArr, targetImg);
                    step = 0;
                }
            }
        })
    };

    function showMergeImage(imgSrc) {
        resultPath = imgSrc;
        $('#content').children().remove();
        $('#question').remove();
        $('#next').remove();
        imgBlockId = 'mergeImageResultBlock';
        var div = $('<div/>', {
            id: imgBlockId,
            class: 'thumbnail col-md-12'
        }).appendTo($('#content'));;
        var img = $('<img />', {
            id: imgSrc,
            src:  imgSrc,
             width: '350px',
            height: '450px',
            class: 'mergeImage',
            value: ''
        }).appendTo($('#' + imgBlockId));
    }

    function addDownloadBtn() {
        $('<div/>', {
            class: 'col-md-3'
        }).appendTo($('#content'));
        var button = $('<button/>', {
            id: 'downloadResult',
            class: 'col-md-6 btn btn-success'
        }).appendTo($('#content'));;
        $('#downloadResult').html('DOWNLOAD');
        $('#downloadResult').click(function(e) {
            downloadImage(resultPath);
        })
        $('<div/>', {
            class: 'col-md-3'
        }).appendTo($('#content'));
    }

    function downloadImage(src) {
    // src = '/' + src;
    // console.log('============src=============');
    // console.log(src)
    // console.log('=========================');
    var $a = $("<a></a>").attr("href", src).attr("download", src);
    $a[0].click();
}


    function initImage() {
        // console.log(callNativeInterface)
        callNativeInterface.getMergeImageAllSrc();
        // $.ajax({
        //     url: '/file/getLocalPathAll',
        //     type: 'GET',
        //     data: {
        //         foldername: 'mergeImage'
        //     },
        //     error: function(xhr) {
        //         alert('圖片讀取錯誤，請重新載入');
        //     },
        //     success: function(imgArr) {
        //         // console.log('success       imgArr  ')
        //         // console.log(imgArr)
        //         for (i in imgArr) {
        //             createImgBlock(imgArr[i], i)

        //         }
        //         imageClickInit();
        //     }
        // });
    }

    function createImgBlock(imgSrc, blockIndex) {
        imgBlockId = 'imgBlock' + blockIndex;
        var div = $('<div/>', {
            id: imgBlockId,
            class: 'thumbnail col-md-2'
        }).appendTo($('#content'));;
        // console.log(imgBlockId);
        // console.log(imgSrc)
        var img = $('<img />', {
            id: imgSrc,
            src: imgSrc,
            width: '150px',
            height: '200px',
            class: 'mergeImage',
            value: ''
        }).appendTo($('#' + imgBlockId));

    }

    function imageClickInit() {
        $('.mergeImage').click(function(e) {
            var imgId = jQuery(this).attr("id");
            if (step == 0) {
                if (jQuery(this).attr('value') == '') {
                    jQuery(this).attr('value', 'click');
                    jQuery(this).parent().css('background-color', clickColor);
                } else {
                    jQuery(this).attr('value', '');
                    jQuery(this).parent().css('background-color', normalColor);
                }
                var isPush = false;
                for (var i = 0; i < mergeImgArr.length; i++) {
                    if (mergeImgArr[i] == imgId) {
                        mergeImgArr.splice(i, 1)
                        isPush = true;
                        break;
                    }
                }
                if (isPush == false) {
                    mergeImgArr.push(imgId);
                }
            } else if (step == 1) {
                $('.mergeImage').parent().css('background-color', normalColor);
                jQuery(this).parent().css('background-color', clickColor);
                targetImg = imgId
            }
            // console.log(mergeImgArr)
            // console.log(targetImg)
        })
    }

    global.mergeImage = mergeImage;
})(this);