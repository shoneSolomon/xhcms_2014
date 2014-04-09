window.onData = window.parent.onAreaSelecter || function(node,isLeaf){
	alert( "选中的ID:" + node.id + (isLeaf?" 是叶子节点":"") );
};
$("#tabs").tabs();

//加工元数据,主要提供按照字母级别分类和根据ID获取带结构的数据
var ll = "abcdefghijklmnopqrstuvwxyz".split("");
var WorldFactory = function(world){
	var kw = {}, wld = [world[0],[]];
	function _exec(w){
		if( !w ) return null;
		var t = w[0].split(",");
		var o = {
			id : t[0],
			name : t[1],
			parent: t[2],
			prefix: t[3],
			en: t[4],
			children: (function(cld){
				var t = [];
				for (var i = 0; cld && i < cld.length; i++) {
					t.push( _exec(cld[i]) );
				};
				if( t.length ){
					var m = _.groupBy(t, "prefix"), r=[]; 	//按照字母分组
					for (var i = 0; i < ll.length; i++) {	//按照字母顺序排列(顺便改大写)
						r.push({			
							prefix: ll[i].toUpperCase(),
							list: m[ll[i]] || []
						});
					};
					return r;
				}else{
					return null;							
				}
			})(w[1])
		};
		kw[o.id] = o;
		if( o.id === "1560000000" ){ o.prefix = "zn", kw["0"] = o; } //中国从世界中剥离, 通过0索引
		return o;	
	}
	var zhou = world[1]
	for (var i = 0; i < zhou.length; i++) {
		wld[1] = wld[1].concat( zhou[i][1] );
	};
	kw.root = _exec(wld);
	this.getArea = function(id){
		return (id+"") ? kw[id] : kw.root;
	}
};

var factory = new WorldFactory(window.World);

var china = factory.getArea(0);
var foreign = factory.getArea(-1);
var compile = Handlebars.compile( $("#tmp-item-list").html() ), 
	chinaPannel = $("#china .pannel").html( compile(china) ),
	foreignPannel = $("#foreign .pannel").html( compile(foreign) );


function _attchEvent(Pannel,data){

	// 点击选择地点
	Pannel.on("click","a",function(e){
		var id = $(this).data("id"), detail = factory.getArea(id), isLeaf = detail && !detail.children;
		if( !isLeaf ){
			Pannel.html( compile(detail) ).scrollTop(0);
		}
		window.onData( detail, isLeaf );
		Pannel.siblings(".letter-select-2").slideDown(function(){
			$(this).find(".current").trigger("click");
		});
		e.preventDefault();
	});

	// 点击定位字母列表
	Pannel.siblings(".letter-select").on("click","li",function(e){
		var _this = $(this), key = _this.data("c"), keyClz = ".href-"+key;
		_this.addClass("current").siblings().removeClass("current");
		
		//切换第一级别定位需要重新加载数据
		if( $(e.delegateTarget).hasClass("letter-select-1") ){
			Pannel.html( compile(data) ); 
			Pannel.siblings('.letter-select-2').slideUp();
		}
		var t = (  $(keyClz,Pannel).offset().top + Pannel.scrollTop() - 38 );
		Pannel.stop().animate({scrollTop: t });

	});

};
_attchEvent( chinaPannel,china );
_attchEvent( foreignPannel,foreign );

$("#loading").remove();
