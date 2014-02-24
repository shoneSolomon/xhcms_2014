(function($){
window.isLocal = !( location.host && /news\.cn/.test(location.host) );

var conf = 	{
				'msg':{
					navLine: '<a href="javascript:void(0);">站内信</a>',
					withNav: false
				}
			};

$.initFrame = function(key){
	var _this;
	if( _this = conf[key] ){
		
	}
};


})(jQuery);