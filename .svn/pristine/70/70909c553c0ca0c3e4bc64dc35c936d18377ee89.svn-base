$(document).ready(function(){

//1.搜索新闻页面
//Ajax函数获取数据
	function funs(){ 
		var data = {};
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
			;
		}else{
			$("#load_left").html("<p class='no-result'>没有搜索结果，可更换关键词后重新搜索</p>");
			$(".btn-next").css({background:"#dadada"});
		}
	});
	

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
			src: $(this).parent("a").attr("data-href");
		})
	});


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





//2.设置时间轴页面
	$(".select-all ul li").click(function(){      
		$(this).toggleClass("cur");      ////加减背景色样式
	});
	





})