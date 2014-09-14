


var animation_speed = 50;
function incrementTemperatureAnimation(elm, final_value_in){
	current_html = elm.html();

	current_value = elm.attr('data-current-value');

	final_value = parseInt(final_value_in);

	if(! current_value){
		current_from_html = current_html.replace('°', '');
		elm.attr('data-current-value', current_from_html);
		current_value = parseInt(current_from_html);
	}

	current_value = parseInt(current_value);
	update_value = false;
	if(current_value < final_value){
		update_value = current_value + 1;
		setTimeout(function(){incrementTemperatureAnimation(elm, final_value_in) }, animation_speed);
	}
	else if(current_value > final_value){
		update_value = current_value - 1;
		setTimeout(function(){incrementTemperatureAnimation(elm, final_value_in) }, animation_speed);	
	}
	else if(current_value == final_value){
		return;		
	}
	elm.attr('data-current-value', update_value);

	elm.html(update_value + '&deg;');
}

$(document).ready(function(){
	jQuery('.climate-change-content').not('.climate-change-content-present').hide();
	jQuery(".next-arrow").click(function(){
		jQuery(this).closest('.climate-change-content').hide();
		jQuery(this).closest('.climate-change-content').next().show();

		// current_high = jQuery(this).closest('.climate-change-content').find('.temp-left .degree-number');
		// console.log('Current High' + current_high);

		// future_high = jQuery(this).closest('.climate-change-content').next().find('.temp-left .degree-number');
		// console.log(future_high);

		// current_high_number = current_high.html().replace('°', '');

		// future_high_number = future_high.html().replace('°', '');
		// future_high.html(current_high_number + '&deg;');

		// incrementTemperatureAnimation(future_high, future_high_number);
	});

	jQuery(".prev-arrow").click(function(){
		jQuery(this).closest('.climate-change-content').hide();
		elm = jQuery(this).closest('.climate-change-content').prev();
		elm.show();

		// current_high = jQuery(this).closest('.climate-change-content').find('.temp-left .degree-number');
		// console.log('Current High' + current_high);

		// future_high = jQuery(this).closest('.climate-change-content').prev().find('.temp-left .degree-number');
		// console.log(future_high);

		// current_high_number = current_high.html().replace('°', '');

		// future_high_number = future_high.html().replace('°', '');
		// future_high.html(current_high_number + '&deg;');

		// incrementTemperatureAnimation(future_high, future_high_number);

	});



	jQuery(".info-link-1").on('click', function(){
		jQuery(".info-pane-2, .info-pane-3").hide(function(){
			jQuery(".info-content-pane").slideDown(function(){
				jQuery(".info-pane-1").slideDown();
			});			
		});	
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