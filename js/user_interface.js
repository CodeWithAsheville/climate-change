


$(document).ready(function(){
	jQuery('.climate-change-content').not('.climate-change-content-present').hide();
	jQuery(".next-arrow").click(function(){
		jQuery(this).closest('.climate-change-content').hide();
		jQuery(this).closest('.climate-change-content').next().show();
	});

	jQuery(".prev-arrow").click(function(){
		jQuery(this).closest('.climate-change-content').hide();
		elm = jQuery(this).closest('.climate-change-content').prev();
		elm.show();
	});
});