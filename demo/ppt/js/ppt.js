
/**
 * Created with IntelliJ IDEA.
 * User: yangyang.shiyy@alibaba-inc.com
 * Date: 12-8-3
 * Time: 上午10:39
 * To change this template use File | Settings | File Templates.
 */
;
(function ($) {
     window.console || (window.console = {log : new Function()});

     $(document).ready(function(){

         /**
          * 生成简单导航
          */
         var nav = $('<ol id="easy-nav"></ol>').appendTo($('body'));
         
         $(".main-panel > li[id]").each(function(){
             var $this = $(this);
             nav.append($('<li class="'+$this.attr('id')+'" ><a href="javascript:void(0);">'+$this.find('h2').html()+'</a></li>').click(function(){
                 scrollTo($this);
             }));
         });


         /**
          * 在每一页PPT底部展示PPT名称和作者
          */
         $("section footer").each(function(i){
             var text = $.trim($(this).text());
             if(!text){
                 $(this).text($('title').text() + ' - ' + $("head > [name='author']").attr('content'));
             }
         });



         /**
          * 绑定翻页效果,绑定前先聚焦第一个section
          */
         var sectionLayer = $(".main-panel > li[id]").addClass('clearfix').first();
         $(".main-panel").css({top : (0 - sectionLayer.position().top)});
         var scrollTo = function(layer){
             if(layer instanceof $ && layer.not(sectionLayer).length){
                 sectionLayer = layer.eq(0);
                 $('#easy-nav > li').removeClass('current').filter("."+layer.attr('id')).addClass('current');
                 $(".main-panel").animate({top : (0 - sectionLayer.position().top)}, {duration: 500});
             }
         },goNext = function(){scrollTo(sectionLayer.nextAll('li[id]'));return false;},
           goPrev = function(){scrollTo(sectionLayer.prevAll('li[id]'));return false;};


         /**
          * 绑定PPT每页内的下一步效果
          */
         var focusIndex = -1;
         var focusTo = function(index){
                 focusIndex = index;
                 var nnn = sectionLayer.find('li[class]').eq(focusIndex);
                 nnn.length ? nnn.click() : focusIndex = -1;
             },
             focusNext = function(){focusTo(++focusIndex);},
             focusPrev = function(){focusTo(--focusIndex);};
         $(document).keydown(function(event){
             var e = event || window.event;
             var k = e.keyCode || e.which;
             switch(k){
                 case 38:  return goPrev();
                 case 40:  return goNext();
                 case 37:  return focusPrev();
                 case 39:  return focusNext();
                 default:  break;
             }
         });




         $("a[link-to]").click(function(){scrollTo( $( $(this).attr('link-to') ) );return false;});


         /**
          * code可视化&格式化
          */
         $("script[type='code']").each(function(){
             var replace = $.trim( $(this).html() ), $this = $(this);
             $this.replaceWith( $("<code class='prettyprint code'></code>").text(replace) );
             prettyPrint();

         });
         

         /**
          * CSS3动画绑定
          */
         $(".section-main li").filter("[class]").click(function(){$(this).addClass('animated');});

     });
})(jQuery);