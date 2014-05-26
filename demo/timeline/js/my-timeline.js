//弹出框
require(["alerts","WdatePicker","draggable","form-style"],function(){
  //新闻标题编辑
  $("#load_left").on("click",".editing",function(){
    var _this=$(this);
      jConfirm('<div class="edit_url"><label>&nbsp;稿件Url：</label><input type="text" id="url" name="url" style="border:none;" value="http://news.qq.com/zt2014/MH370/index.htm" readonly="readonly" onfocus="this.blur()" /></div> <div class="edit_title"><label>稿件标题：</label><input type="text" value="东北遭遇“史上最重雾霾”电能替代势在必行" /></div> <div class="edit_time"><label>发生时间：</label><input type="text" class="Wdate" id="d412" value="2013-12-30 13：34：43" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\'});" /></div> <div class="edit_digest"><label>稿件摘要：</label><textarea>继京津冀、长三角、珠三角等区域饱受雾霾困受雾霾扰扰之后，10月21日，东北三省也深陷雾霾，航受雾霾扰空、铁路、道路交通等受其影响严重受阻。重受雾霾扰度雾霾笼罩下的哈尔滨市民惊呼，这是一场“受雾霾扰史上最重雾霾”。</textarea></div>',"编辑稿件",{
            okButton : "确定",
            cancelButton : "取消"
          },function(result){
            if(result){
              _this.parent().parent().find("i").html( $(".edit_title>input").val() );    //编辑标题内容
              _this.siblings(".time0").html( $(".edit_time>input").val() );
            }
            
          });
      $(".edit_title>input").val( $(this).parent().parent().find("i").html() );   //把网页标题的内容对应的显示到弹框里
      $(".Wdate").val( $(this).siblings(".time0").html() );             //把时间对应的显示到弹框里
    });

    //手动添加稿件
    $("#addnews").click(function(){
        jConfirm('<div class="add_id"><label>&nbsp;&nbsp;稿件ID：</label><input type="text" value="" name="ids" /></div><div class="add_title"><label>稿件标题：</label><input type="text" id="url" name="url" style="border:none;" value="东北遭遇“史上最重雾霾”电能替代势在必行" readonly="readonly" onfocus="this.blur()" /></div><div class="add_time"><label>发生时间：</label><input type="text" id="url" name="url" style="border:none;" value="2014-01-23 12:23:22" readonly="readonly" onfocus="this.blur()" /></div>',"手动添加稿件",{
            okButton : "确定",
            cancelButton : "取消"
          },function(result){
            //alert( "点击了" + result );
          });
    });

    //下拉列表
    $("#select1").toSelect({
      width: 290,
      colorful: false
    }).on('change',function(){
      //jAlert( this.value, "你选择的值为：" );
      //$(".select-result").html( "你选择的值为："+this.value );
    }).trigger("change");

     
});



//1.搜索新闻页面
require(['alerts'],function(){
	//搜索时排除重复的列表项后再添加到列表中
	function renderList(list,ifChecked){
		var html="";
		for( var i=0;i<list.length;i++ ){
			//判断如果列表中没有相同的id就添加到列表中
			if( !$('[data-id="'+list[i].docId+'"]','#load_left').length ){
				html += '<li data-id="'+list[i].docId+'" '+(ifChecked?'class="checked addlisbg"':"")+'><a href="javascript:void(0)" data-href="'+list[i].docUrl+'"><span class="time0">'+list[i].releaseDate+'</span>'+'<i class="con">'+list[i].docName+'</i>'+'<span class="right0"></span><span class="editing"></span></a></li>';
			}
		}
		$("#load_left ul").append( $(html) );      //把搜索内容添加到列表中
	}


	//Ajax函数获取数据显示列表
	function getResultList(){
		var kws = [];
		$("#keyword li").each(function(){
			kws.push($(this).text());
		});
		$.ajax({
			type:"get",
			url:top.xhconfig ? top.xhconfig.newsSearch : "/agent?http://xuan.news.cn/xhCNS/search.htm?",          //json/list.json
			data: {
				from:$("#start-time").val(),        //开始时间   
				to:$("#end-time").val(),            //结束时间
				selectVal:$("#select1").val(),     	//下拉列表值
				keyword: kws.join(",") ,            //关键字
				pageNo:1,
				pageSize:20,
				retype:"json",
				searchType:"union"
			},
			success:function( data ){
				$("#load_left ul li:not('.checked')").remove();   //把列表中没有选中的列表项都删除
				$(".btn-next").css({background:"#00b6aa"}).attr({ href: "timeline2.html" });    
				if(data.content.length==0){
					//jAlert("没有搜索到数据");
					//列表里没有内容显示时
					if($("#load_left>ul>li").length!=0){
						;
					}else{
						$(".title").append("<p class='no-result'>没有搜索结果，可更换关键词后重新搜索</p>");
						$(".btn-next").css({background:"#dadada"}).attr({ href: "javascript:void(0)" });
					}
				}else{
					$(".title p").remove()
					renderList(data.content);
				}
			},
			error:function(){
				jAlert('服务端异常');
			}
		});
	}
	getResultList();


	//点击搜索时 添加关键词
	$("#sou").on('click',function(){
		var v = $("#txts").val();
		if( !v ){	//如果是空数据，直接查询
			getResultList();
			return;
		}
		if( $("#keyword").children().length >= 8){
			alert( "最多输入8组关键词" );
			return;
		}
		if( v.replace(/[^x00-xff]/g,"**").length > 8 ){
			alert( "输入标签内容过长" );
			return;
		}
		if( /^[\.\w\u4e00-\u9fa5]+$/.test(v) ){   //如果输入的内容匹配正则表达式，可以查询
			$("#keyword").append('<li><a href="#"><span></span>'+$("#txts").val()+'</a></li>');
			getResultList();
		}else{
			alert( "请输入字母数字或者中文" );
		}
		$("#txts").trigger("focus").val("");
	});
	

	//搜索时 回车触发click事件
	$("#txts").on("keyup",function(e){
		if( e.keyCode == 13 ){
			$("#sou").trigger("click");
		}
	});


	//点击关键词里的 "减" 时，去除关键字
	$("#keyword").on("click","span",function(){
		$(this).parent().parent("li").remove(); 
		//$("#sou").trigger("click");
	});
	

	//列表中点击是否选中  (事件代理)
	$("#load_left").on("click",".right0",function(){
		var lis=$(this).parent().parent();
		if( lis.hasClass("checked") ){
			lis.removeClass("checked addlisbg");
		}else{
			lis.addClass("checked addlisbg");
		}
	});
	//点击新闻标题时链接相应的iframe页面
	$("#load_left").on("click",".con",function(){
		$("#show-frame").attr({
			src: $(this).parent("a").attr("data-href")
		});
	});


	//点击下一步
	$('#btn-submit').on('click',function(){
		parent.timeLineFN.list = [];
		$("#load_left li.checked").each(function(){
			var _this = $(this);
			parent.timeLineFN.list.push({
				docId:_this.data('id'),  // _this.attr('data-id'),   //选中列表项的id  
				docName:_this.find(".con").html(),                  //新闻标题内容
				releaseDate:_this.find(".time0").html(),            //日期
				docUrl:_this.children("a").data('href')             //Url
			});
		});
		parent.timeLineFN.list.sort(function(a,b){                //时间排序
			return a.releaseDate > b.releaseDate ? 1 : -1;
		});
		//把搜索的关键词添加到数组中【new】
		parent.timeLineFN.keyword = [];
		$("#keyword li").each(function(){
			parent.timeLineFN.keyword.push( $(this).find("a").text() )
		});
		
	});


	//回显选中的列表项
	if( parent.timeLineFN.list.length ){
		renderList( parent.timeLineFN.list, true );
	}

	//回显（获取）关键词【new】
	function getkeyword(){
		for( var i=0;i<parent.timeLineFN.keyword.length;i++ ){
			$("#keyword").append('<li><a href="#"><span></span>'+parent.timeLineFN.keyword[i]+'</a></li>');
		}
	}
    getkeyword();





});