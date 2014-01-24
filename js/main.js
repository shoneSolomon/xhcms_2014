(function($){

	require(["iealert"],function(IEAlert){
		new IEAlert();
	});

	var tree = $("#tree-nav"), treeHolder = $("#tree-module"), rightTarget = $("#tree-target");

	$(".head_top").on('click',function(e){
		var hidden = $('.head_nav').is(":hidden");
		if( hidden ){
			$("#targetFrame, #tree-target").css({ height : "700px"});
		}
		$('.head_nav').stop().slideToggle(function(){
			$(".t-handle").html( hidden ? "-" : "+" );
			if( !hidden ){
				$("#targetFrame, #tree-target").css({ height : "860px"});
			}
		});
	}).on('click','a',function(e){
		e.stopPropagation();
	});
	
	require(["requestAFrame"],function(r){
		//当前日期和时间
		r.addTimeout("now-time",function(){
			$("#now-time").html( (function(d){
				return "现在时间： "+d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日 "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+" 星期"+"日一二三四五六".charAt(d.getDay())
			})(new Date()) );	
		},1000);

		r.addTimeout("close-tree",function(){	//检测关闭二级选框
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
		

		require(["requestAFrame"],function(r){
			// 判断 $("#tree-target") 的实时高度，如果发生变化，触发重新修改高度 [相当于模拟resize]
			var tar_height = null; //使用null，确保至少触发一遍。
			r.addTimeout("resize",function(){
				if( tar_height != rightTarget.height() ){
					tar_height = rightTarget.height();
					$("#tree-nav, #tree-module>ul").css({"height": tar_height-30});				
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

					var v_href = _this.parent().attr("href"); //存儲展示的url
					//加载zTree菜单
					$.fn.zTree.init($("#ztree-inner"), {
						async: {
							enable: true,
							url:_this.attr("href"),
							autoParam:["id", "name=n", "level=lv"],
							dataFilter:function(id, parent, data){
								for (var i = 0; i < data.length; i++) {
									data[i].target = "targetFrame";
									data[i].url = v_href ? v_href+"?root="+data[i].id : "";
								};
								return data;
							}
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