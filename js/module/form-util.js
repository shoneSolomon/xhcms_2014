define(function(require, exports, module) {
	var $ = jQuery;

	return {
		checkedVal : function(name,form){
			var result = [];
			$( ':checkbox[name="'+name+'"]', form ).filter(":checked").each(function(){
				result.push( this.value );
			});
			return result;
		},
		selectAll : function(opt){
			var o = $.extend({
				handle : null,
				checkList : null,
			},opt);
			var handle = $(o.handle), checkList = $(o.checkList);
			handle.on('click',function(){ 
				var checked = this.checked;
				checkList.each(function(){
					if(this.checked != checked){
						this.click();
					}
				}); 
			});
		}
	};

});