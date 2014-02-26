(function($){
window.isLocal = !( location.host && /news\.cn/.test(location.host) );

var conf = 	
{
	'msg':{
		navLine: '<a href="javascript:void(0);">站内信</a>',
		URL : (isLocal ? {
				groups : "json/groups.json",
				send_lists: "json/msgList.json",
				receive_lists: "json/msgList.json",
				recycle_lists: "json/msgList.json"
			} : {
				groups : "json/groups.json",
				send_lists: "json/msgList.json",
				receive_lists: "json/msgList.json",
				recycle_lists: "json/msgList.json"
			})
	},
	"clmConfigur":{
 		URL : (isLocal ? {
 				clmConfigur: "../json/site-mge/list-collocate.json",
	 		}:{
	 			clmConfigur: "../json/site-mge/list-collocate.json"
	 		})
	},
	"siteConfigur":{
 		URL : (isLocal ? {
 				siteConfigur: "json/site-mge/list-sites.json",
	 		}:{
	 			siteConfigur: "json/site-mge/list-sites.json"
	 		})
	},
	'newClassify':{
		URL : (isLocal ? {
				newClassify : "json/site-config.json"
			} : {
				newClassify : "json/site-config.json"
			})
	},
	'conClassifyConf':{
		URL : (isLocal ? {
				conClassifyConf : "json/site-config.json"
			} : {
				conClassifyConf : "json/site-config.json"
			})
	},
	'columnModelConf':{
		URL : (isLocal ? {
				columnModelConf : "json/list-model.json"
			} : {
				columnModelConf : "json/list-model.json"
			})
	}

};

$.initFrame = function(key){
	var _this = conf[key];
	if( _this ){
		if( window.top != window && _this.navLine ){
			$(".mainHead",top.document).html( _this.navLine );
		}
	}
	return _this;
};


})(jQuery);