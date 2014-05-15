/**
 * @description 在浏览器中创建文本查找替换弹出框
 * @author shiyangyang
 * @beta 0.9
 * @date 2014/05/15
 */
define(function(require, exports, module){
	var $ = jQuery,
		base = {
			reg: /^[\u4e00-\u9fa5\w\*\-]+/,
			htmlMode: true,
			baseNode: document.body,
			eventNode: document,
			combKey : 'shift+f',
			button 	: {
				el: '#show-txt-replace',
				option: 'click mouseover'
			},
			highlighter: '<i style="color:#c00;">$1</i>'
		},
		html = 	''+
				'<div style="position:fixed;width:100%;z-index:99999;background:#d2d2d2;line-height:40px;bottom:0;left:0;padding:0;">'+
				'	<form>'+
				'		<table style="width:95%;border-spacing:0;border-collapse:collapse;text-align:center;">'+
				'			<colgroup style="width:15%"></colgroup>'+
				'			<colgroup style="width:75%"></colgroup>'+
				'			<colgroup style="width:10%"></colgroup>'+
				'			<tr>'+
				'				<td style="text-align:right;"><strong>查询关键字</strong></td>'+
				'				<td><input type="text" style="width:98%;line-height:26px;" class="txt-keyword"></td>'+
				'				<td style="text-align:left;"><input type="submit" value="查询" class="fm-button"/></td>'+
				'			</tr>'+
				'			<tr>'+
				'				<td style="text-align:right;"><strong>替换关键字</strong></td>'+
				'				<td><input type="text" style="width:98%;line-height:26px;" class="txt-replacer"></td>'+
				'				<td style="text-align:left;"><a href="javascript:;" class="fm-button txt-replace">替换</a></td>'+
				'			</tr>'+
				'		</table>'+
				'	</form>'+
				'	<a href="javascript:;" class="fm-close" style="position:absolute;right:0;top:4px;width:14px;height:14px;font:bold 14px/14px Arial;">x</a>'+
				'</div>'+
				'';

	

	/**
	 * 获取所有纯文本结点
	 * @param  {NodeElement} baseNode 父标签[必需]
	 * @param  {String} keyword 查询关键字 [必需]
	 * @param  {String} highlighter 高亮替换字符串
	 * @param  {String} change      需要替换的字符串
	 * @return {Array<NodeElement>} 数组
	 */
	var getLeafNode = function(baseNode,keyword,highlighter,change){
		var result = [], elements = $('*',baseNode);
		keyword = keyword.replace(/\*+/g,'.*');
		var keyword = new RegExp( (highlighter&&change) ? highlighter.replace('$1',keyword) : '('+keyword+')', 'g' ); 
		
		for (var i = 0; i < elements.length; i++) {
			if( elements[i].innerHTML && !elements[i].children.length && keyword.test(elements[i].innerHTML) ){

				if( change ){	//需要替换
					elements[i].innerHTML = elements[i].innerHTML.replace( keyword, change );
				}else if( highlighter ){	//需要高亮
					elements[i].innerHTML = elements[i].innerHTML.replace( keyword, highlighter );
				}else{				//只是获取匹配数目

				}
				result.push(elements[i]);
			}
		};
		return result;
	};


	return function(opt){
		var o = $.extend({},base,opt);
		var panel = $(html).appendTo('body').hide(),
			baseNode = o.baseNode,
			button = o.button,
			highlighter = o.htmlMode ? o.highlighter : null,
			keyword = panel.find('.txt-keyword'),
			replacer = panel.find('.txt-replacer'),
			replace = panel.find('.txt-replace');

		/**
		 * 关闭事件
		 */
		panel.on('click','.fm-close',function(){
			panel.slideUp();
		});

		/**
		 * 打开事件
		 */
		var keys = o.combKey.split(/\W+/),
			fnKey = keys[0]+'Key',
			keyChar = keys[1],
			keyList = 'abcdefghijklmnopqrstuvwxyz';
		$(o.eventNode).on('keypress',function(e){
			if(e[fnKey] && ( keyList.charAt( e.keyCode-65) == keyChar || keyList.charAt( e.keyCode-97) == keyChar ) ){
				panel.slideDown();
			} 
		});
		if(button){
			$(button.el).on(button.option||'click',function(){
				panel.slideDown();
			});
		}

		/**
		 * 查询以及高亮
		 */
		panel.children().on('submit',function(e){
			e.preventDefault();

			var value = $.trim(keyword.val());
			if( o.reg.test(value) ){
				var nodes = getLeafNode(baseNode,value);
				(window.jAlert || window.alert)('一共查询到<span style="color:red;">'+nodes.length+'</span>条匹配结果！');
			}else{
				(window.jAlert || window.alert)('输入字符有误!');
			}
			
		});
		
		replace.on('click',function(){
			var value = $.trim(keyword.val());
			if( o.reg.test(value) ){
				var nodes = getLeafNode(baseNode,value,null,replacer.val());
				(window.jAlert || window.alert)('一共替换了<span style="color:red;">'+nodes.length+'</span>条匹配结果！');
			}else{
				(window.jAlert || window.alert)('输入字符有误!');
			}
		});

	};

});