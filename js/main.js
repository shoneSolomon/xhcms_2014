(function($){
	if( window.IE6 ){
		alert( "IE6 or older browser is not supported!" );
		return ;
	}

	var tree = $("#tree-nav"), treeHolder = $("#tree-module"), rightTarget = $("#tree-target");
	
	require(["requestAFrame"],function(){
		//当前日期和时间
		$.addTimeout("now-time",function(){
			$("#now-time").html( (function(d){
				return "现在时间： "+d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日 "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+" 星期"+"日一二三四五六".charAt(d.getDay())
			})(new Date()) );	
		},1000);

		$.addTimeout("top-toggle",function(){
			$(".head_nav").slideUp(600,function(){
				var flashTip = $('<p style="width:200px; position:absolute; right:50%; margin-right:-100px; color:#f60;">点击顶部展开/收起导航栏</p>');
				var _this = $(this), _top = _this.prev();
				flashTip.appendTo(_top).fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn();
				_top.one('click',function(){
					flashTip.fadeOut('slow', function() {
						$(this).remove();
					});;
				}).on('click',function(){
					_this.stop().slideToggle();
				});
			});
		},5000,1);

		$.addTimeout("close-tree",function(){	//检测关闭二级选框
			var handle = tree.find(".tree-link");
				
			if( treeHolder.width() ){
				if( !handle.length || !handle.hasClass('selected')){
					treeHolder.animate({
						width: "0%",
						opacity: 0
					},'fast',function(){
						handle.removeClass('expended')
					});
					rightTarget.animate({
						width: "42%"
					},'fast');
				}
			}
				
		});

	});
		
	require(["form-style"],function(){
		$("#site-select").toSelect({
			width: 136,
			colorful: true
		}).on('change',function(){
			// 执行 切换站点
		}).trigger("change");
	});
	
	//含左边菜单的布局，额外添加事件
	if( $("#tree-nav").length ){
		

		require(["requestAFrame"],function(){
			// 判断 $("#tree-target") 的实时高度，如果发生变化，触发重新修改高度 [相当于模拟resize]
			var tar_height = null; //使用null，确保至少触发一遍。
			$.addTimeout("resize",function(){
				if( tar_height != rightTarget.height() ){
					tar_height = rightTarget.height();
					var h = $("body").height() - 40;
					$("#tree-nav, #tree-module>ul").css({"height": h-tree.offset().top});				
				}	
			},100);

		});
			
		tree.on("click","a",function(e){
			$("#tree-nav .selected").not(this).removeClass('selected');
			$(this).addClass('selected');
		});
		tree.on('click','dt',function(e){
			$(this).toggleClass('dt-open').next().slideToggle("fast");
			if( !$(this).hasClass('link') )e.preventDefault();
		});

		
		require(["zTree"],function(){

			// 二级树形菜单选择
			tree.on("click _click",".tree-link",function(e){
				var _this = $(this);
				if( _this.hasClass('expended') ){
					treeHolder.animate({
						width: "0%",
						opacity: 0
					},'fast',function(){
						_this.removeClass('expended')
					});
					rightTarget.animate({
						width: "42%"
					},'fast');

				}else{
					rightTarget.animate({
						width: "34%"
					},'fast');

					//加载zTree菜单
					$.fn.zTree.init($("#ztree-inner"), {
						async: {
							enable: true,
							url:_this.attr("href"),
							autoParam:["id", "name=n", "level=lv"]
						}
					});

					treeHolder.animate({
						width: "8%",
						opacity: 1
					},'fast',function(){
						_this.addClass('expended');

					});

				}
				e.preventDefault();
			});

			
		});
	}

})(jQuery);