//2.设置时间轴页面
	$(".select-all ul li").click(function(){      
		$(this).addClass("cur").siblings("li").removeClass("cur");      ////加减背景色样式
	});


  //时间轴tab切换
  /*
  require(['timeline'],function(){
    $.ajax({
      url: '../json/timeline.json',
      dataType: 'json',
      success: function(data){

        createStoryJS({
              type:       'timeline',
              width:      '100%',
              height:     '600',
              start_at_slide: 0,
              start_zoom_adjust: 3,
              lang:"zh-cn",
              // source:     data,
              embed_id:   'my-timeline',
              start_at_end : true,
              maptype:'watercolor'
          },data);
      }
    });

  });
*/

  require(['time-line','underscore'],function(Timeline){
    var data = {
      timelineContent:[]
    };
    var dd = $('#timel_rank').children('.cur').data('value'), d = 10; //时间密度
    switch(dd){
      case 'y': d = 4; break;
      case 'M': d = 7; break;
      case 'h': d = 13; break;
      case 'm': d = 16; break;
    }
    var list = [];
    //复制 & 修改属性名
    _.each(parent.timeLineFN.list,function(item){
      list.push({
        cid: item.docId,
        title: item.docName,
        date: item.releaseDate,
        url : item.docUrl
      });
    });  

    //分组
    list = _.groupBy(list,function(item){
      return item.date.substring(0,d);
    });   
    for(var k in list){
      data.timelineContent.push({
        time:k,
        data:list[k]
      });
    }     

    //生成时间轴
    var timel = Timeline({
      embed : '#my-timeline'
    },data);   

    //点击上一步时 获取删除后的结果
    $('#back').on('click',function(){
      var listIds = timel.getAllIds(),  //.join(','),   //删除之后的数组id（取得仅仅是id）（加join()的话就成字符串了）
          oldList = parent.timeLineFN.list,        //列表中选中部分
          newList = [];                 //放入删除之后的id列表

      _.each(oldList,function(item){
        if( _.indexOf(listIds,item.docId) !== -1 ){
          newList.push(item);
        }
      });

      parent.timeLineFN.list = newList;

    });


    //点击“完成”按钮
    $(".complete").on('click',function(){
      $.ajax({
        url: "json/list.json",
        data:{
          //ids: _.pluck(window.parent.timeLineFN.data, 'id').join(","),
          time_name : $("#time_name input").val(),                       //时间轴名称
          grank_rank: $('#grank_rank li.cur a').data("value"),           //稿件排序方式
          trank_rank: $('#trank_rank li.cur a').data("value"),           //默认时间位置
          timel_rank: $('#timel_rank li.cur a').data("value"),           //时间刻度
          timer_rank: $('#timer_rank li.cur a').data("value"),           //时间轴样式
          ids : timel.getAllIds()
        },
        success: function(data){
          for( var i=0;i<data.content.length;i++ ){
            //window.parent.timeLineFN.complete( data.content[i].docId );
          }
        }
      }); 
    });

  });




