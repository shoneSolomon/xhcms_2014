(function(){

var 
uiModule = "jqueryui/jquery.ui.{{module}}.min",
paths = {
	alerts: "jqueryui/jquery.alerts",
	raphael: "raphael.min",
	template: "template/handlebars.min",
	cloudMap: "cloudspectrum.min",
	css: "css.min",
	underscore: "underscore.min",
	zTree: "zTree/jquery.ztree.all-3.5.min",
	WdatePicker: "My97DatePicker/WdatePicker",
	"form-style": "form-style" 
},
ui = [
"accordion",
"autocomplete",
"button",
"core",
"datepicker",
"dialog",
"draggable",
"droppable",
"effect-blind",
"effect-bounce",
"effect-clip",
"effect-drop",
"effect-explode",
"effect-fade",
"effect-fold",
"effect-highlight",
"effect-pulsate",
"effect-scale",
"effect-shake",
"effect-slide",
"effect-transfer",
"effect",
"menu",
"mouse",
"position",
"progressbar",
"resizable",
"selectable",
"slider",
"sortable",
"spinner",
"tabs",
"tooltip", 
"widget"
];

for (var i = 0; i < ui.length; i++) {
	paths[ui[i]] = uiModule.replace( "{{module}}",ui[i] );
};

require.config({
	baseUrl: "../js",
	paths: paths,
	shim :{
		widget:{
			deps:["core"]
		},
		dialog:{
			deps: ["widget"]
		},
		tabs:{
			deps: ["widget"]
		},
		menu:{
			deps: ["widget"]
		},
		mouse:{
			deps: ["widget"]
		},
		position:{
			deps: ["widget"]
		},
		accordion:{
			deps: ["widget"]
		},
		datepicker:{
			deps: ["widget"]
		},

		draggable:{
			deps: ["mouse"]
		},
		alerts:{
			deps: ["dialog"]
		},
		autocomplete : {
			deps: ["menu","position"]
		},
		cloudMap:{
			deps: ["raphael"]
		},
		'form-style':{
			deps: ["css!../css/form-style.min.css"]
		},
		zTree:{
			deps: ["css!../js/zTree/zTreeStyle/zTreeStyle.css","css!../css/new-tree.css"]
		}
	}
});

})();


/**



**/