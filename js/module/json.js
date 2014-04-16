define(function(require, exports, module) {
	function isArray(obj) { 
		return ({}).toString.call(obj) === '[object Array]'; 
	}
	var JSON = window.JSON || {
		parse : function(jsonStr){
			return new Function("return ("+jsonStr+")").call(this);
		},
		stringify : function(o){
			var tp = (null === o) ? 'undefined' : typeof o,
				callee = arguments.callee;
			switch(tp){
				case 'undefined':
				case 'number':
				case 'boolean': return o; 
				case 'string': return '"' + o.replace(/\\/g,'\\\\').replace(/"/g,'\"') + '"'; 
				case 'function': return '"[object Function]"';
				case 'object':
				default : 
					if( isArray(o) ){
						return (function(o){
							var res = [];
							for(var k = 0; k < o.length; k++){
								res.push( callee(o[k]) )
							}
							return '['+res.join(',')+']'
						})(o);
					}else{
						return (function(o){
							var res = [];
							for(var k in o){
								if( ({}).hasOwnProperty.call(o,k) ){
									res.push( k + ":" + callee(o[k]) )
								}
							}
							return '{'+res.join(',')+'}'
						})(o);
					}
						
			}
				
		}
	};

	return {
		parse : function(jsonStr,with_ref){
			var r = JSON.parse(jsonStr);

			var getRef = function(o,$ref){	//获取$ref索引对象
				var t = $ref.split(".");
				if(t.length <= 1){
					return o
				}else{
					var m = $ref.match(/^(.*?)\.([^.]+)$/);
					return arguments.callee(o,m[1])[m[2]];
				}
			};

			if(with_ref){
				(function(o){
					for(var k in o){
						if(typeof o[k].$ref === 'string'){
							o[k] = getRef(r,o[k].$ref.replace(/\[(\d+)\]/g,'.$1')); //有数组格式的数据要转化一下。
						}else if(typeof o[k] === 'object'){
							arguments.callee(o[k]);
						}
					}
				})(r);				
			}
			return r;
		},
		stringify:JSON.stringify
	};
});