(function($){
	if( window.IE6 ){
		alert( "IE6 or older browser is not supported!" );
		return ;
	}

	
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
		},1000,1);

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
			var tar_height = $("#tree-target").height(); 
			$.addTimeout("resize",function(){
				if( tar_height != $("#tree-target").height() ){
					tar_height = $("#tree-target").height();
					var h = $("body").height() - 40;
					$("#tree-nav, #tree-module>ul").css({"height": h-$("#tree-nav").offset().top});				
				}	
			},100);

		});

		// 二级树形菜单选择
		$("#tree-nav").on("click _click",".muti-tree",function(e){
			var _this = $(this);
			if( _this.hasClass('expended') ){
				$("#tree-module").animate({
					width: "0%",
					opacity: 0
				},'fast',function(){
					_this.removeClass('expended')
				});
				$("#tree-target").animate({
					width: "42%"
				},'fast');

			}else{
				$("#tree-target").animate({
					width: "34%"
				},'fast');
				var id = _this.attr("data-show");

				$("#"+id).show().siblings().hide().parent().animate({
					width: "8%",
					opacity: 1
				},'fast',function(){
					_this.addClass('expended')
				});

			}
		});	
		$("#tree-nav").on("click",">dd>a",function(e){
			$("#tree-nav .selected").not(this).removeClass('selected');
			$(this).addClass('selected');
			if( !$(this).hasClass('muti-tree') ){
				$("#tree-nav .expended").trigger('_click');
			}
			e.preventDefault();
		});


		//加载zTree菜单
		require(["zTree"],function(){
			$("#tree-nav").on('click','dt',function(){
				$(this).toggleClass('dt-open').next().slideToggle();
				return false;
			});
			$("#tree-nav .selected").parent().prev().trigger('click'); //触发打开
			var setting = {
				async: {
					enable: true,
					url:"json/tree-nav.json",
					autoParam:["id", "name=n", "level=lv"]
				}
			};
			$.fn.zTree.init($("#tree-mudule1"), setting);
			$.fn.zTree.init($("#tree-mudule2"), setting);

		});

	
	}


})(jQuery);