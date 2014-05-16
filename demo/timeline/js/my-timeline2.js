//2.设置时间轴页面
  require(['time-line','timeline','underscore','alerts'],function(Timeline){
    
    var list = [], timel;
    //复制 & 修改属性名
    _.each(parent.timeLineFN.list,function(item){
      list.push({
        cid: item.docId,
        title: item.docName,
        date: item.releaseDate,
        url : item.docUrl
      });
    }); 

    function renderTimeline(){
      var dd = $('#timel_rank').children('.cur').data('value'), d = 10; //时间密度
      var rank = $('#timer_rank').children('.cur').data('value'); 

      switch(dd){
        case 'y': d = 4; break;
        case 'M': d = 7; break;
        case 'h': d = 13; break;
        case 'm': d = 16; break;
      }
      var data = {
        timelineContent:[]
      }; 
      //分组
      var _list = _.groupBy(list,function(item){
        return item.date.substring(0,d);
      });   
      for(var k in _list){
        data.timelineContent.push({
          time:k,
          data:_list[k]
        });
      }     

      //生成时间轴 (标题横轴式/图文横轴式可切换)
      $('#my-timeline').html("");
      if( "title" == rank ){
        timel = Timeline({
          embed : '#my-timeline',
          onDel : function(){
            var listIds = this.getAllIds(),  //.join(','),   //删除之后的数组id（取得仅仅是id）（加join()的话就成字符串了）
                oldList = parent.timeLineFN.list,            //列表中选中部分
                newList = [],                                //放入删除之后的id列表
                newList2 = [];                               //放入删除之后的id列表（对应list列表，相当于复制newList）
            for (var i = 0; i < oldList.length; i++) {
              if( _.indexOf(listIds,oldList[i].docId) !== -1 ){
                newList.push(oldList[i]);
                newList2.push(list[i]);
              }
            };

            list = newList2; 
            console.log( list );
            parent.timeLineFN.list = newList;
          }
        },data);
      }else{
        createStoryJS({
            type:       'timeline',
            width:      '100%',
            height:     '720',
            start_at_slide: 0,
            start_zoom_adjust:  8,
            lang:"zh-cn",
            source:     null,
            embed_id:   'my-timeline'
        },data);
      }

    }
    
    $(".select-all ul li").click(function(){      
      if( $(this).hasClass('cur') ){
        return false;
      }
      $(this).addClass("cur").siblings("li").removeClass("cur");      ////加减背景色样式
      renderTimeline();
    });

    renderTimeline();
       

    //点击上一步时 获取删除后的结果
    // $('#back').on('click',function(){
      
    // });


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




