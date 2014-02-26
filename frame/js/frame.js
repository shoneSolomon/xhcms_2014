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
 				clmConfigur: "json/list-collocate.json",
	 		}:{
	 			clmConfigur: "json/list-collocate.json"
	 		})
	},
	"siteConfigur":{
 		URL : (isLocal ? {
 				siteConfigur: "json/list-sites.json",
	 		}:{
	 			siteConfigur: "json/list-sites.json"
	 		})
	},
	'new-classify':{
		URL : (isLocal ? {
				list_sites : "../../json/list-config.json"
			} : {
				list_sites : "../../json/list-config.json"
			})
	}
	// 'site-conf':{
	// 	URL : (isLocal ? {
	// 			list_sites : "../../json/list-sites.json"
	// 		} : {
	// 			list_sites : "../../json/list-sites.json"
	// 		})
	// }
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