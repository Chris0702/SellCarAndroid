function responseFunc(functionType, result){
	var resultObj = result;
	//var resultObj = JSON.parse(result);
	if(functionType == 'insertTagsList'){
		tagsInfoList.insertTagsList(resultObj);
	}else if(functionType == 'insertLanguage'){
		if(localStorage.getItem('langJs') != resultObj.lang){
			dashboardMui.initLanguage(resultObj.lang);
			dashboardMui.muiFunctions.run();
		}
	}else if(functionType == 'insertLocalStorageMem'){
		
	}else if(functionType == 'insertLocalStorageMemAll'){
		tagsInfoList.successInit(resultObj);
	}else if(functionType == 'error'){
		console.log('----------------------error');
		console.log(resultObj);
	}else{

	}
};


(function (global) {
    if (global.tagsInfoList) {
        return;
    }
    var tagsInfoList = new Object();

    tagsInfoList.currentPage = 1;//callNativeInterface.setLocalStorageMem('tagLiCurPage',groupName);
    tagsInfoList.pageSize = 100;
    tagsInfoList.totalCount = 0;
    tagsInfoList.totalPage = 0;

    tagsInfoList.searchStart = false;//callNativeInterface.setLocalStorageMem('tagLiSearchStart',groupName);
    tagsInfoList.searchCurrentPage = 1;//callNativeInterface.setLocalStorageMem('tagLiSearchCurPage',groupName);
    tagsInfoList.searchPageSize = 100;
    tagsInfoList.searchTotalCount = 0;
    tagsInfoList.searchTotalPage = 0;
    tagsInfoList.filters = [];
    tagsInfoList.jObj = {};
	
    tagsInfoList.beforeInit = function(){
    	callNativeInterface.getLocalStorageMemAll();
    };

    tagsInfoList.successInit = function(jObj){
    	tagsInfoList.jObj = jObj;
    	if(tagsInfoList.jObj){
    		if(typeof(tagsInfoList.jObj.tagLiCurPage) != "undefined" && tagsInfoList.jObj.tagLiCurPage!==""){
    			tagsInfoList.currentPage = tagsInfoList.jObj.tagLiCurPage * 1;
    		}
    		if(typeof(tagsInfoList.jObj.tagLiSearchStart) != "undefined" && tagsInfoList.jObj.tagLiSearchStart!==""){
    			tagsInfoList.searchStart = tagsInfoList.jObj.tagLiSearchStart * 1;
    		}
    		if(typeof(tagsInfoList.jObj.tagLiSearchCurPage) != "undefined" && tagsInfoList.jObj.tagLiSearchCurPage!==""){
    			tagsInfoList.searchCurrentPage = tagsInfoList.jObj.tagLiSearchCurPage * 1;
    		}	
    	}
    	
    	tagsInfoList.init();
    };

	tagsInfoList.init = function(){
		//if(localStorage.getItem('tagsGroupName')){
		//	tagsInfoList.getGroupTagsList(localStorage.getItem('tagsGroupName'));	
		//}
		if(tagsInfoList.jObj['tagsGroupName']){
			tagsInfoList.getGroupTagsList(tagsInfoList.jObj['tagsGroupName']);
		}else{
			tagsInfoList.backTagsGroup();
		}

		dashboardMui.initLanguage();
		dashboardMui.muiFunctions.run();
		callNativeInterface.getLanguage();

		$('#backHome').on('click',function(){
			tagsInfoList.backTagsGroup();
		});

		$('#prevPage').on('click',function(){
			if(tagsInfoList.searchStart){
				if(tagsInfoList.searchCurrentPage != 1){
					tagsInfoList.searchCurrentPage -= 1*1;
					callNativeInterface.setLocalStorageMem('tagLiSearchCurPage',tagsInfoList.searchCurrentPage);
					tagsInfoList.getGroupTagsList('searchTagsListA');	
				}
			}else{
				if(tagsInfoList.currentPage != 1){
					tagsInfoList.currentPage -= 1*1;
					callNativeInterface.setLocalStorageMem('tagLiCurPage',tagsInfoList.currentPage);
					//if(localStorage.getItem('tagsGroupName')){
					//	tagsInfoList.getGroupTagsList(localStorage.getItem('tagsGroupName'));	
					//}
					if(tagsInfoList.jObj['tagsGroupName']){
						tagsInfoList.getGroupTagsList(tagsInfoList.jObj['tagsGroupName']);
					}
				}
			}
		});

		$('#nextPage').on('click',function(){
			if(tagsInfoList.searchStart){
				if(tagsInfoList.searchCurrentPage * tagsInfoList.searchPageSize < tagsInfoList.searchTotalCount){
					tagsInfoList.searchCurrentPage += 1*1;
					callNativeInterface.setLocalStorageMem('tagLiSearchCurPage',tagsInfoList.searchCurrentPage);
					tagsInfoList.getGroupTagsList('searchTagsListA');
				}
			}else{
				if(tagsInfoList.currentPage * tagsInfoList.pageSize < tagsInfoList.totalCount){
					tagsInfoList.currentPage += 1*1;
					callNativeInterface.setLocalStorageMem('tagLiCurPage',tagsInfoList.currentPage);
					//tagsInfoList.getGroupTagsList(localStorage.getItem('tagsGroupName'));
					if(tagsInfoList.jObj['tagsGroupName']){
						tagsInfoList.getGroupTagsList(tagsInfoList.jObj['tagsGroupName']);
					}
				}	
			}
		});

		$('#tagsListArea').on('click',function(e){
			if($(e.target).parents('li[data-value]').length > 0
				|| $(e.target).is('li[data-value]')){
				if($(e.target).parents('li[data-value]').length > 0){
					var dataValue = $(e.target).parents('li[data-value]').first().attr('data-value');
					tagsInfoList.gotoTagsValue(dataValue);	
				}else{
					var dataValue = $(e.target).attr('data-value');
					tagsInfoList.gotoTagsValue(dataValue);
				}
			}
		});

		$('#rightTopBtnA').on('click',function(){
			tagsInfoList.openSearch();
		});
		$('#closeSearchBtn').on('click',function(){
			tagsInfoList.closeSearch();
		});
		$('#searchTagsList').on('input',function(){
			tagsInfoList.searchTags();
		});
		$('#searchTagsList').on('keydown',function(e){
			var code = e.which;
			if(code==13){
				tagsInfoList.searchTags();	
			}
		});

	};

	tagsInfoList.backTagsGroup = function(){
		//localStorage.removeItem('tagsGroupName');
		if(tagsInfoList.jObj['tagsGroupName']){
			callNativeInterface.removeLocalStorageMem('tagsGroupName');
		}
		callNativeInterface.changePage('tagsInfoGroup');
	};

	tagsInfoList.gotoTagsValue = function(tagName){
		//localStorage.setItem('currentTag', tagName);
		callNativeInterface.setLocalStorageMem('currentTag',tagName);
		callNativeInterface.changePage('tagsInfoValue');
	};

	tagsInfoList.getGroupTagsList = function(groupName){
		if(groupName == 'all'){
			var start = ( tagsInfoList.currentPage - 1 ) * tagsInfoList.pageSize;
			var count = tagsInfoList.pageSize;
			var filters = [];
			callNativeInterface.getTagsListByPage(start,count,filters);
		}else if(groupName == 'searchTagsListA'){
			var start = ( tagsInfoList.searchCurrentPage - 1 ) * tagsInfoList.searchPageSize;
			var count = tagsInfoList.searchPageSize;
			var filters = tagsInfoList.filters;
			callNativeInterface.getTagsListByPage(start,count,filters);
		}else{

		}
	};	

	tagsInfoList.insertTagsList = function(resultObj){
		if(resultObj){
			var tagsList = [];
			var totalCount = 0;
			var totalPage = 0;
			//var currentPage = 0;
			if(tagsInfoList.searchStart){
				tagsList = resultObj.tagsList;
				totalCount = resultObj.totalCount * 1;
				tagsInfoList.searchTotalCount = totalCount * 1;
				tagsInfoList.searchTotalPage = Math.ceil(tagsInfoList.searchTotalCount / tagsInfoList.searchPageSize);
				totalPage = tagsInfoList.searchTotalPage;
				//currentPage = tagsInfoList.searchCurrentPage;
			}else{
				tagsList = resultObj.tagsList;
				totalCount = resultObj.totalCount * 1;
				tagsInfoList.totalCount = totalCount * 1;
				tagsInfoList.totalPage = Math.ceil(tagsInfoList.totalCount / tagsInfoList.pageSize);
				totalPage = tagsInfoList.totalPage;
				//currentPage = tagsInfoList.currentPage;
			}
			//$('#totalPageNum').text(totalPage);
			var str = '';
			for (var i = 0; i < tagsList.length; i++) {
				str += tagsInfoList.tagsListStructure(tagsList[i]['tagName']);
			}
			$('#tagsListArea > ul').html(str);
			//$('#pageNum').val(currentPage);	
			$('#currentListCount').text(tagsInfoList.pagetext());
		}
	};

	tagsInfoList.tagsListStructure = function(name){
		var str = '';
		str += '<li class="gItem" data-value="'+name+'">';
		str += '	<span class="itemSelect"></span>';
		str += '	<span class="itemText">'+name+'</span>';
		str += '	<button class="itemNext"></button>';
		str += '</li>';
		return str;
	};

	tagsInfoList.pagetext = function(){
		var start = '';
		var count = '';
		if(tagsInfoList.searchStart){
			start = ( tagsInfoList.searchCurrentPage - 1 ) * tagsInfoList.searchPageSize;
			count = tagsInfoList.searchPageSize;
		}else{
			start = ( tagsInfoList.currentPage - 1 ) * tagsInfoList.pageSize;
			count = tagsInfoList.pageSize;
		}
		var text = '';
		text = start + '~' + (start + count);
		return text;
	};

	tagsInfoList.openSearch = function(){
		tagsInfoList.searchStart = true;
		callNativeInterface.setLocalStorageMem('tagLiSearchStart',tagsInfoList.searchStart);
		$('#searchBar').show();
	};

	tagsInfoList.closeSearch = function(){
		tagsInfoList.searchStart = false;
		callNativeInterface.setLocalStorageMem('tagLiSearchStart',tagsInfoList.searchStart);
    	tagsInfoList.searchCurrentPage = 1;
    	callNativeInterface.setLocalStorageMem('tagLiSearchCurPage',tagsInfoList.searchCurrentPage);
    	tagsInfoList.searchPageSize = 100;
    	tagsInfoList.searchTotalCount = 0;
    	tagsInfoList.searchTotalPage = 0;
    	tagsInfoList.filters = [];
		//tagsInfoList.getGroupTagsList(localStorage.getItem('tagsGroupName'));
		if(tagsInfoList.jObj['tagsGroupName']){
			tagsInfoList.getGroupTagsList(tagsInfoList.jObj['tagsGroupName']);
		}
		$('#searchBar').hide();
	};


	tagsInfoList.searchTags = function(){
		var text = $('#searchTagsList').val();
		//console.log(text);
    	tagsInfoList.filters = [{ "name": "TagName", "value": $.trim(text)}];
		tagsInfoList.getGroupTagsList('searchTagsListA');
	};


    global.tagsInfoList = tagsInfoList;
})(this);