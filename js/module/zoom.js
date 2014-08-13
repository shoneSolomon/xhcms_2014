/**
 * @description 放大镜效果 (分别支持图片&文字等效果, 默认图片效果)
 * @author shiyangyang
 * @version 0.1.0
 * @return {[function]}   
 */
define(function(require, exports, module) {
	var $ = jQuery;

	var defaults = {
		type:'img',
		scale: 2,
		el: null, //jQuery selector 
		src: null,
		style:{}
	};

	var handler = $('<div style="position:absolute;z-index:99999;border-radius:50%;border:1px solid #d2d2d2;width:150px;height:150px; margin:-75px 0 0 -75px; box-shadow: 0px 0px 20px #333; overflow:hidden;display:none;"></div>').appendTo('body');
	var currentArea = null;

	function withIn(off,area){
		var x = off.left, y = off.top;
		if(area){
			return x >= area.left-1 && x <= area.left+area.width && y >= area.top && y <= area.top+area.height  
		}else{
			return false;
		}
	}

	function Zoom(option){
		var o = $.extend({},defaults,option);
		$(document).on('mouseover',o.el,function(){
			if( currentArea ) return;
			var _t = $(this), src = o.src || _t.attr('src'), size = {width:_t.width()*o.scale,height:_t.height()*o.scale};
			
			currentArea = $.extend(_t.offset(),{
				width: _t.width(),
				height: _t.height()
			});

			switch(o.type){
				case 'img':
					handler.html( $('<img src="'+src+'" style="position:absolute;"/>').css(size) ).css(o.style).show()
					break;
				default: 
			}
		})
		.on('mousemove',function(e){
			var off = {
				left: e.clientX,
				top: e.clientY
			};
			if( withIn(off,currentArea) ){
				handler.css(off);
				handler.children().css({
					left: -o.scale * (off.left-currentArea.left) + currentArea.width / o.scale,
					top : -o.scale * (off.top -currentArea.top ) + currentArea.height / o.scale
				});
			}else{
				handler.hide();
				currentArea = null;
			}
		})
		return handler;
	}

	return Zoom;
});
