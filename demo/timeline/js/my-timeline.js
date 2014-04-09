$(document).ready(function(){

//1.搜索新闻页面
//Ajax函数获取数据
	function funs(){ 
		var data = {};
		// data.origin = $("#origin-result").val();  //
		$.ajax({     
			type:"post",
			url:"json/news.json", 
			data: data,
			dataType: "JSON",
			success:function ( data ) {   
				var html = "";
				for( var i=0;i<data.length;i++ ){
					html += '<li class="'+data[i].cls+'"><a href="javascript:void(0)" data-href="'+data[i].url+'"><span class="time0">'+data[i].times+'</span>'+'<i class="con">'+data[i].content+'</i>'+'<span class="right0 '+data[i].isCheck+'"></span><span class="editing"></span></a></li>';
				}
				$("#load_left ul").append( html );
			}   
		});
	}
	funs();
    

	//没有搜索结果的时候
	$("#sou").on("click",function(){
		if($("#load_left>ul>li").length!=0){
			//funs();
		}else{
			$("#load_left").html("<p class='no-result'>没有搜索结果，可更换关键词后重新搜索</p>");
			$(".btn-next").css({background:"#dadada"});
		}
		//alert($("#load_left>ul>li").length)
	})
	

	//点击是否选中  (事件代理)
	$("#load_left").on("click",".right0",function(){
		if( $(this).hasClass("checked") ){
			$(this).removeClass("checked");
			$(this).parent().parent().removeClass("addlisbg");
		}else{
			$(this).addClass("checked");
			$(this).parent().parent().addClass("addlisbg");
		}
	});
	//链接iframe
	$("#load_left").on("click",".con",function(){
		$("#show-frame").attr({
			src: $(this).parent("a").attr("data-href")
		})
	});

//新闻类型下拉框
	// //点击 中心词里的下拉按钮
	// $(".news_type").toggle(function(e){
	// 	e.stopPropagation();
	// 	$(".news_type ul").css({"display":"block"})
	// },function(e){
	// 	e.stopPropagation();
	// 	$(".news_type ul").css({"display":"none"})
	// });
 //    //点击页面下拉信息单隐藏
	// $(document).on("click",function(){
	// 	$(".news_type ul").css({"display":"none"})
	// });

	// //点击下拉信息单里的内容
	// $(".news_type").on("click","a",function(){
	// 	$(".news_type p a").html( $(this).html() );
	// });

//点击搜索时 添加关键词
	$("#sou").click(function(){
		var v = $("#txts").val();
		if( $("#keyword").children().length >= 8){
			alert( "最多输入8组关键词" );
			return;
		}
		if( v.replace(/[^x00-xff]/g,"**").length > 8 ){
			alert( "输入标签内容过长" );
			return;
		}
		if( /^[\w\u4e00-\u9fa5]+$/.test(v) ){
			$("#keyword").append('<li><a href="#"><span></span>'+$("#txts").val()+'</a></li>');
			funs();
		}else{
			alert( "只能输入字母数字或者中文" );
		}
		$("#txts").trigger("focus").val("");
	});
	//搜索时 回车
	$("#txts").on("keyup",function(e){
		if( e.keyCode == 13 ){
			$("#sou").trigger("click");
		}
	});
	//点击关键词里的 "减" 时，去除关键字
	$("#keyword").on("click","span",function(){
		$(this).parent().parent("li").remove(); 
		funs();
	});

////弹框部分
//编辑稿件
	//点击编辑稿件弹出
	// $("#load_left").on("click",".editing",function(){
	// 	var _this=$(this);
	// 	var iptVal=$(this).parent().find("i").html();   //取到与当前编辑对象对应的新闻标题内容
	// 	$("#edit_confirm").removeClass("dis");
	// 	$(".edit_title input").val(iptVal);    //弹出框中稿件标题和新闻标题内容对应
	// 	//编辑后点击确定时   。。。?
	// 	$("#determine").click(function(){
	// 		var edit_title=$(this).parent().siblings(".edit_title").children("input").val();
	// 		_this.parent().find("i").html( edit_title );
	// 		$("#edit_confirm").addClass("dis");
	// 	})
	// 	//点击关闭、取消
	// 	$("#tit_right,#edit-cancel").click(function(){
	// 		$("#edit_confirm").addClass("dis");
	// 	});
	// });


//手动添加稿件
	//点击手动添加稿件弹出
	// $("#addnews").click(function(){
	// 	$("#add_hand").removeClass("dis");
	// });
	// //点击关闭、取消
	// $("#tit1_right,#add-cancel").click(function(){
	// 	$("#add_hand").addClass("dis");
	// });



//2.设置时间轴页面
	$(".select-all ul li").click(function(){      
		$(this).toggleClass("cur");      ////加减背景色样式
	})
	//1.稿件排序方式 >
	// $("#grank_rank li").on("click",function(){
	// 	var result = [];
	// 	$(this).toggleClass("cur");
	// 	$("#grank_rank").children(".cur").each(function(){
	// 		result.push( $(this).text() );
	// 	});
	// 	$("#grank-result").val( result.join(",") );
	// 	//funs();
	// 	//console.log( $("#grank-result").val() );
	// });

	// //2.默认时间位置 >
	// $("#trank_rank li").on("click",function(){
	// 	var result = [];
	// 	$(this).toggleClass("cur");
	// 	$("#trank_rank").children(".cur").each(function(){
	// 		result.push( $(this).text() );
	// 	});
	// 	$("#trank-result").val( result.join(",") );
	// 	//funs();
	// 	//console.log( $("#trank-result").val() );
	// });

	// //3.时间刻度 >
	// $("#timel_rank li").on("click",function(){
	// 	var result = [];
	// 	$(this).toggleClass("cur");
	// 	$("#timel_rank").children(".cur").each(function(){
	// 		result.push( $(this).text() );
	// 	});
	// 	$("#timel-result").val( result.join(",") );
	// 	//funs();
	// 	console.log( $("#timel-result").val() );
	// });

	// //4.时间轴样式 >
	// $("#timer_rank li").on("click",function(){
	// 	var result = [];
	// 	$(this).toggleClass("cur");
	// 	$("#timer_rank").children(".cur").each(function(){
	// 		result.push( $(this).text() );
	// 	});
	// 	$("#timer-result").val( result.join(",") );
	// 	//funs();
	// 	console.log( $("#timer-result").val() );
	// });











})