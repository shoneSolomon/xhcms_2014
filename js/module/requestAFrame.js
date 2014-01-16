window.requestAFrame = (function () {
	return  window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function (fn) {
				return window.setTimeout(fn, 1000/60); 
			};
})();

define(function(require, exports, module) {
	var _timeoutQueue = {}, index = 0;

	exports.addTimeout = function(k,fn,timer,times,until){
		fn.timer = Math.floor( (timer||200) * 60 / 1000);
		fn.times = times || Infinity;
		fn.until = typeof until === "function" ? until : function(){return false;};
		_timeoutQueue[k] = fn;
	};
	exports.deleteTimeout = function(k){
		delete _timeoutQueue[k];
	};

	function queueTimeout(){
		for(var i in _timeoutQueue){
			var fn = _timeoutQueue[i];
			if( index % fn.timer === 0 ){	//如果按照时间轮训到了，执行代码
				if(!fn.times-- || fn.until() ){	//如果可执行次数为0,或者until方法返回true， 移除方法
					delete _timeoutQueue[i];
				}else{
					fn();
				}
			}
		}
		requestAFrame(queueTimeout);
		index = ( index + 1) % (18000) ; //最高时隔5分钟
	}

	queueTimeout();	


});
