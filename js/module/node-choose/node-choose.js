define(function(require, exports, module) {
	var dialogContent='<div class="dialog_content clearfix">'+
		'	<div class="aready_choose clearfix">'+
		'		<span class="choose_span">已选择节点：</span>'+
		'		<div class="aready_choose_con">'+
		'			<ul id="logs">'+
		'			</ul>'+
		'		</div>'+
		'	</div>'+
		'	<div id="stageContent" class="stageContent clearfix">'+
		'		<span class="choose_span">选择节点：</span>'+
		'		<div id="stage" class="stage">'+	
		'	</div>'+
		'</div>';

	exports.dialog=function(node,url,title,data){
		$(node).empty();
		var gotUp={};
		var template=Handlebars.compile(dialogContent);
		$(node).append(template(gotUp));

		$(node).dialog({
			appendTo:"body",
			width:540,
			height:'auto',
			modal:false,
			showTitle:true,
			title:title,
			autoOpen:true,
			open:function(event, ui){
				$(node).addClass("ztree")
				var setting={
					view: {
						showIcon: false
					},
					async: {
						url:url,
						enable: true,
						autoParam: ["id"]
					},
					callback: {
						onClick: onClick
					}
				}
				function onClick(event, treeId, treeNode, clickFlag) {
					var count=0;
					for(i=0; i< logs.find("li").length; i++){
						if(logs.find("li").eq(i).attr("data-id")==treeNode.id){
							count+=1;
						}
					}
					if(count==0){
						var re="<li"+" "+"data-id="+"'"+treeNode.id+"'>"+treeNode.name+"</li>";
						logs.append(re);
					}

				}
				$.fn.zTree.init($("#stage"), setting);
				//document.getElementById("node").style.width="510px";
			},
			buttons:[
				{
					text:'保存',
					icons:{primary: "ui-submit"},
					className:'button-submit',
					id:'gatherDoc_submit',
					click:function(){
						$(node).dialog("close");
					}
				},
				{
					text:'取消',
					icons:{primary: "ui-cancel"},
					className:'button-cancel',
					id:'gatherDoc_cancel',
					click:function(){$(node).dialog("close");}
				}
			]
		});
		var logs = $("#logs");
		var redo="<i>—</i>";
		logs.on("mouseenter","li",function(){
			if($("this:has(i)").length==0){
				$(this).append(redo);
				$(this).find("i").click(function(){
					$(this).parent().remove();
				})
			}
		})
		logs.on("mouseleave","li",function(){
				$(this).find("i").remove();
		});
	}

})