define(function(require, exports, module) {
	function isArray(obj) { 
		return ({}).toString.call(obj) === '[object Array]'; 
	}
	function expend(r) {
		var getRef = function(o,$ref){	//获取$ref索引对象
			var t = $ref.split(".");
			if(t.length <= 1){
				return o
			}else{
				var m = $ref.match(/^(.*?)\.([^.]+)$/);
				return arguments.callee(o,m[1])[m[2]];
			}
		};

		(function(o){
			for(var k in o){
				if(o[k] && typeof o[k].$ref === 'string'){
					o[k] = getRef(r,o[k].$ref.replace(/\[(\d+)\]/g,'.$1')); //有数组格式的数据要转化一下。
				}else if(typeof o[k] === 'object'){
					arguments.callee(o[k]);
				}
			}
		})(r);
		return r;
	}
	
	var objs = [];

	var _JSON = {
		parse : function(jsonStr){
			return new Function("return ("+jsonStr+")").call(this);
		},
		stringify : function(o,format){
			var tp = (null === o) ? 'undefined' : typeof o,
				callee = arguments.callee;

			if( this.stringify === callee ){	//如果是第一次的非递归调用, 初始化objs
				objs = [];
			}

			switch(tp){
				case 'undefined':
				case 'number':
				case 'boolean': return o; 
				case 'string': return '"' + o.replace(/\\/g,'\\\\').replace(/"/g,'\"') + '"'; 
				case 'function': return '"[object Function]"';
				case 'object':
					// 跟原生的JSON.stringify一样,对于循环调用的JSON抛出异常
					for (var i = 0; i < objs.length; i++) {		
						if( objs[i] === o ) throw new Error("Converting circular structure to JSON");
					}
					objs.push(o);
				default : 
					if( isArray(o) ){
						return (function(o){
							var res = [];
							for(var k = 0; k < o.length; k++){
								res.push( callee( o[k],format ) )
							}
							return format ? '[\n'+format+res.join(',\n').replace(/\n/g,'\n'+format)+'\n]' : '['+res.join(',')+']'
						})(o);
					}else{
						return (function(o){
							var res = [];
							for(var k in o){
								if( ({}).hasOwnProperty.call(o,k) ){
									res.push( "\"" + k + "\":" + callee( o[k],format ) )
								}
							}
							return format ? '{\n'+format+res.join(',\n').replace(/\n/g,'\n'+format)+'\n}' : '{'+res.join(',')+'}'
						})(o);
					}
						
			}
		}
	};

	/**
	 * 為jQuery-ajax中的get/post方法提供dataType:refJson支持
	 */
	if(window.jQuery){
		jQuery.each( [ "get", "post" ], function( i, method ) {
			jQuery[ method ] = function( url, data, callback, type ) {
				// shift arguments if data argument was omitted
				if ( jQuery.isFunction( data ) ) {
					type = type || callback;
					callback = data;
					data = undefined;
				}

				var _callback = callback;
				if ( type === 'refJson' && typeof callback === 'function' ){
					type = 'json';
					_callback = function(){
						arguments[0] = expend(arguments[0]);
						callback.apply(jQuery,arguments);
					};
				}

				return jQuery.ajax({
					url: url,
					type: method,
					dataType: type,
					data: data,
					success: _callback
				});
			};
		});
	}

	return {
		parse : (window.JSON || _JSON).parse,
		stringify : (window.JSON || _JSON).stringify,
		format : function(json,format){
			return _JSON.stringify(json,format||'\t');
		},
		/**
		 * 展开携带$ref的restful-json对象
		 */
		expend : function(arg){
			if(typeof arg === 'string' && /\$ref/.test(arg) ){
				return expend( this.parse(arg) );
			}else{
				return expend(arg);
			}
		}
	};
});