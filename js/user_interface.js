


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
	jQuery(".info-content-pane").hide();


	jQuery(".info-link-1").on('click', function(){
		jQuery(".info-content-pane").slideDown(function(){
			jQuery(".info-pane-1").slideDown();
		});
		jQuery(".info-pane-2, .info-pane-3").slideUp();
	});
	jQuery(".info-link-2").on('click', function(){
		jQuery(".info-content-pane, .info-pane-2").slideDown();
		jQuery(".info-pane-1, .info-pane-3").slideUp();
	});	
	jQuery(".info-link-3").on('click', function(){
		jQuery(".info-content-pane, .info-pane-3").slideDown();
		jQuery(".info-pane-1, .info-pane-2").slideUp();
	});	
	jQuery(".info-content-header .close-pane").on('click', function(){
		jQuery(".info-content-pane, .info-pane-1, .info-pane-2").slideUp();
		console.log('hi');
	});
});