function responseFunc(functionType, result){
	//var resultObj = JSON.parse(result);
	var resultObj = result;
	if(functionType == 'insertProjectList'){
		loginAction.insertProjectList(resultObj);
	}
	else if(functionType == 'insertAccountHistoryList'){
		loginAction.insertAccountHistoryList(resultObj);
	}
	else if(functionType == 'cbAccountLogin'){
		loginAction.successGotoHome(resultObj);
	}
	else if(functionType == 'insertProjectList'){
		loginAction.insertProjectList(resultObj);
	}
	else if(functionType == 'insertLanguage'){
		if(localStorage.getItem('langJs') != resultObj.lang){
			dashboardMui.initLanguage(resultObj.lang);
			dashboardMui.muiFunctions.run();
		}
	}
	else if(functionType == 'error'){
		console.log('----------------------error');
		console.log(resultObj);
	}
	else{}
};



(function (global) {
    if (global.loginAction) {
        return;
    }
    var loginAction = new Object();
    loginAction.currentDrawMode = 0;
	
	loginAction.init = function(){
		//first step
		$('#projArea,#userArea,#pwdArea,#rememberMeArea,#loginArea').hide();
		$('#top').css('height','70%');
		$('#bottom').css('height','calc(30% - 5vh)');

		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();
		
		callNativeInterface.getAccountHistoryList();

		$('#ipInputSubmit').on('click',function(){
			//product
			loginAction.submitIp();	
			//develop
			//loginAction.insertProjectList();
		});

		$('#inputSubmit').on('click',function(){
			loginAction.submit();			
		});

		$('#openList').on('click',function(){
			loginAction.openHistoryList();
		});
	};

	loginAction.submitIp = function(){
		var ip = $('#ipInputbox').val();
		callNativeInterface.getProjectListByIp(ip);
	};

	loginAction.submit = function(){
		var ip = $('#ipInputbox').val();
		var projectName = $('#projectName').val();
		var userName = $('#userName').val();
		var password = $('#password').val();
		var remember = $('#rememberMe').prop('checked');
		callNativeInterface.inputAccount(ip,projectName,userName,password,remember);
	};

	loginAction.successGotoHome = function(resultObj){
		if(resultObj.status == 'true'){callNativeInterface.changePage('homePage');}
	};

	loginAction.insertProjectList = function(resultObj) {
	    if (resultObj) {
	        var projectList = resultObj.projectList;
	        if(Array.isArray(projectList) && projectList.length == 0){
	        	$('#top').css('height','70%');
				$('#bottom').css('height','calc(30% - 5vh)');
	        	$('#projArea,#userArea,#pwdArea,#rememberMeArea,#loginArea').hide();
	        	$('#projectName').html('');
	        	return false;
	        }
	        var str = '';
	        for (var i = 0; i < projectList.length; i++) {
	            str += '<option value="' + projectList[i] + '">' + projectList[i] + '</option>';
	        }
	        $('#projectName').html(str);
	    }

	    //second step
	    loginAction.currentDrawMode = 1;
	    loginAction.drawBackground();
	    $('#projArea,#userArea,#pwdArea,#rememberMeArea,#loginArea').show();
	    $('#top').css('height', '35%');
	    $('#bottom').css('height', 'calc(65% - 5vh)');
	    //$('body').css('backgroundImage', 'url(./image/loginBg2.png)');
	    return true;
	};

	/*
	username  
	password  
	projectName  
	ip
	*/
	loginAction.insertAccountHistoryList = function(resultObj) {
	    if (resultObj) {
	    	console.log('insertAccountHistoryList');
	        loginAction.accountList = resultObj.accountList;
	        var accountList = loginAction.accountList;
	        var str = '';
	        str += '<div class="dialogTr" id="tableHead">';
			str += '	<div class="dialogTd"><span jql>t_0026_IP</span></div>';
			str += '	<div class="dialogTd"><span jql>t_0027_Project</span></div>';
			str += '	<div class="dialogTd"><span jql>t_0028_user</span></div>';
			str += '</div>';
	        for (var i = 0; i < accountList.length; i++) {
	            str += '<div class="dialogTr" data-pwd="' + accountList[i].password + '" ';
	            str += 'data-name="' + accountList[i].username + '" ';
	            str += 'data-proj="' + accountList[i].projectName + '" ';
	            str += 'data-ip="' + accountList[i].ip + '" ';
	            str += '>';
	            str += '	<div class="dialogTd">' + accountList[i].ip + '</div>';
				str += '	<div class="dialogTd">' + accountList[i].projectName + '</div>';
				str += '	<div class="dialogTd">' + accountList[i].username + '</div>';
	            str += '</div>';
	        }
	        $('#historyAccListUL').html(str);
	        dashboardMui.muiFunctions.runByDivId(localStorage.getItem('langJs'),'historyAccListUL');
	    }
	    $('#historyAccListUL').on('click', function(e) {
	        if ($(e.target).parents('div.dialogTr').length > 0) {
	            callNativeInterface.inputAccount(
	                $(e.target).parents('div.dialogTr').first().attr('data-ip'),
	                $(e.target).parents('div.dialogTr').first().attr('data-proj'),
	                $(e.target).parents('div.dialogTr').first().attr('data-name'),
	                $(e.target).parents('div.dialogTr').first().attr('data-pwd'),
	                false);
	        }
	    });
	};

	loginAction.openHistoryList = function(){
		$('#defaultDialog,#blockWindow').show();
		$('#dialogclose').on('click',function(){
			$('#defaultDialog,#blockWindow').hide();
		});
	};

	loginAction.drawBackground = function(){
		if(loginAction.currentDrawMode == 0){
			$('#grad2').hide();
			$('#grad1').show();
			$('#top').css('background-position', 'center 80%');
			$('#gradBackgroud').css('bottom', '35%');
		}else{
			$('#grad1').hide();
			$('#grad2').show();
			$('#top').css('background-position', 'center 100%');
			$('#gradBackgroud').css('bottom', '20%');
		}

		// var c1 = document.getElementById("myCanvas1");
		// c1.width = document.documentElement.clientWidth;
		// c1.height = document.documentElement.clientHeight;
		// var c2 = document.getElementById("myCanvas2");
		// c2.width = document.documentElement.clientWidth;
		// c2.height = document.documentElement.clientHeight;
		// var W = c1.width;
		// var H = c1.height;

		// var shiftY1 = 0.7 * H - 1.2944 * W;
		// var shiftY2 = 0.35 * H - 1.2944 * W;
		// var shiftY = 0;
		// var center1X = W / 2;
		// var center1Y = 0.1157 * W;
		// var center2X = W / 4;
		// var center2Y = 0.1694 * W;
		// var r = 1.125 * W;

		// if(loginAction.currentDrawMode == 0){
		// 	shiftY = shiftY1;
		// }else{
		// 	shiftY = shiftY2;
		// }
		// var ctx1 = c1.getContext("2d");
		// ctx1.save();
		// ctx1.beginPath();
		// ctx1.arc(center2X, center2Y + shiftY, r, 0, 2 * Math.PI);
		// ctx1.fill();
		// ctx1.globalCompositeOperation = "source-out";
		// ctx1.fillStyle = "rgba(57, 73, 171, 0.8)";
		// ctx1.fillRect(0, 0, W, H);
		// var ctx2 = c2.getContext("2d");
		// ctx2.beginPath();
		// ctx2.arc(center1X, center1Y + shiftY, r, 0, 2 * Math.PI);
		// ctx2.fill();
		// ctx2.globalCompositeOperation = "source-out";
		// ctx2.fillStyle = "rgba(57, 73, 171, 0.8)";
		// ctx2.fillRect(0, 0, W, H);
	};

    global.loginAction = loginAction;
})(this);