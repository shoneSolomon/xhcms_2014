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
	}
};

$.initFrame = function(key){
	var _this = conf[key];
	if( _this ){
		if( window.top != window ){
			$(".mainHead",top.document).html( _this.navLine );
		}
	}
	return _this;
};


})(jQuery);