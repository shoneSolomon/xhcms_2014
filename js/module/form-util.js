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
				checkList : null
			},opt);
			var handle = $(o.handle), _handle = handle[0], checkList = $(o.checkList);
			handle.on('click',function(){ 
				var checked = this.checked;
				checkList.each(function(){
					if(this.checked != checked){
						this.click();
					}
				}); 
			});
			checkList.parent().on('click',function(){
				if( !_handle.checked && !checkList.not(":checked").length){
					_handle.checked = true;
					handle.trigger('checked');
				}else if( _handle.checked && checkList.not(":checked").length){
					_handle.checked = false;
					handle.trigger('checked');
				}
			});
		}
	};

});