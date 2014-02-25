(function($){
window.isLocal = !( location.host && /news\.cn/.test(location.host) );

var conf = 	{
				'msg':{
					navLine: '<a href="javascript:void(0);" class="super-nav">站内信</a>',
					withNav: false
				}
			};

$.initFrame = function(key){
	var _this;
	if( _this = conf[key] ){
		if( window.top != window ){
			$(".mainHead",top.document).html( _this.navLine );
		}
	}
};


})(jQuery);