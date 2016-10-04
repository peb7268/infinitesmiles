(function($){
	window.GalleryConfig = {};
	GalleryConfig.animationSpeed = 100;

	function toggleGallery(evt){
		evt.preventDefault();
		if(evt.which == 27) return hideGallery();

		var shadeActive   = (jQuery('#shade').position().top >= 0) ? true : false;

		if(shadeActive == false) {
			showGallery().done(function(){
				showSelection(evt)
			});
		} else {
			showSelection(evt);
		}
	}

	function showSelection(evt){
		var sel = jQuery(evt.target).attr('href');
		var activeSelctions = (jQuery('.active').length > 0);

		if( activeSelctions == true) {
			hideSelection().done(function(){
				jQuery(sel).fadeIn(GalleryConfig.animationSpeed, function(){
					jQuery(this).addClass('active');
					console.log('show selection', sel);
				});
			});
		} else {
			jQuery(sel).fadeIn(GalleryConfig.animationSpeed, function(){
				jQuery(this).addClass('active');
				console.log('show selection', sel);
			});
		}
	}

	function hideSelection(){
		return jQuery('.active').fadeOut(GalleryConfig.animationSpeed, function(){
			$(this).removeClass('active');
		}).promise();
	}

	function showGallery(){
		return jQuery('.header-wrapper').slideUp((GalleryConfig.animationSpeed + 150), function(){
			showShade();
		}).promise();
	}

	function hideGallery(){
		var shadeAnmiation = hideShade();

		jQuery('.active').fadeOut(GalleryConfig.animationSpeed, function(){
			$(this).removeClass('active');
			
			shadeAnmiation.done(function(){
				jQuery('.header-wrapper').slideDown((GalleryConfig.animationSpeed + 150));
			});
		});
	}

	function showShade(){
		jQuery('#shade').animate({
			'top' : 0
		});
	}

	function hideShade(){
		return jQuery('#shade').animate({
			'top' : '-100%'
		}, function(){
			$(this).removeAttr('style');
		}).promise();
	}

	function bindEvents(){
		$(document).on('keyup', toggleGallery);
		$('#gallery_nav li a').on('click', toggleGallery);
	}


	$('document').ready(function(){
		bindEvents();
	});
})(jQuery);