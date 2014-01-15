define(function(require, exports, module) {
	var queryParam = {};
    // 包装地址栏参数
	return function(key){
	    var search = queryParam.search ||  (function(w){
	        var m = {},ar = w.location.search;
	        if(ar){
	            var arr = ar.substring(1).split('&');
	            for(var i = 0; i < arr.length; i++){
	                var t = arr[i].split('=');
	                switch( typeof m[t[0]] ){
	                	case 'string': //如果是重复参数，包装成数组
	                		m[t[0]] = new Array( m[t[0]], t[1] );
	                		break;
	                	case 'object': //如果已经是数组，push
	                		m[t[0]].push( t[1] );
	                		break; 
	                	default: 	//第一次想、设置为字符串
	                 		m[t[0]] = t[1];
	                }
	            }
	        }
	        queryParam.search = m;
	        return m;
	    })(window);
	    return key ? search[key] : search;
	}
});