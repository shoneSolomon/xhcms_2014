define(function(require, exports, module) {
	var _default = {
		dialogContent:'',
		width:540,
		height:'auto',
		node:'',
		treeContainer:'',
		url:'../html/json/tree.json',
		title:'',
		showIcon:false,
		data:'',
		callback:function(){},
		unification:function(){},
	};

	var NodeChosse=function(opt){
		var o = $.extend(_default,opt);
		var obj=[];
		var node=$(o.node);
		node.empty();
		var gotUp={};
		var template=Handlebars.compile(o.dialogContent);
		node.append(template(gotUp));
		node.dialog({
			appendTo:"body",
			width:o.width,
			height:o.height,
			modal:false,
			showTitle:true,
			title:o.title,
			autoOpen:true,
			open:function(event, ui){
				node.addClass("ztree")
				var setting={
					view: {
						showIcon: o.showIcon
					},
					async: {
						url:o.url,
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
				$.fn.zTree.init($(o.treeContainer), setting);
			},
			close:function(){o.unification();},
			buttons:[
				{
					text:'保存',
					icons:{primary: "ui-submit"},
					className:'button-submit',
					id:'gatherDoc_submit',
					click:function(){
						$("#logs li").each(function(){
							obj.push($(this).attr("data-id"))
						})
						o.callback(obj);
						node.dialog("close");
					}
				},
				{
					text:'取消',
					icons:{primary: "ui-cancel"},
					className:'button-cancel',
					id:'gatherDoc_cancel',
					click:function(){node.dialog("close");}
				}
			]
		});
		var logs = $("#logs");
		var redo="<i>—</i>";
		for(var k in o.data){
			if(o.data[k]["id"]){
				var re="<li"+" "+"data-id="+"'"+o.data[k]["id"]+"'>"+o.data[k]["name"]+"</li>";
				logs.append(re);
			}
		}
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
	return NodeChosse;

})