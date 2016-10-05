(function($){
	window.GalleryConfig = {};
	GalleryConfig.animationSpeed = 100;

	function toggleGallery(evt){
		evt.preventDefault();

		if(evt.which == 39 || evt.which == 37) return selectPic(evt.which);
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

	function selectPic(keycode){
		//right
		if(keycode == 39){
			var limit = jQuery('.photos.active li').length;
			var next  = jQuery('.photos.active li.active').index() + 1;
			if(next == limit) next = 0;

			jQuery('.photos.active li:eq(' + next + ') img').click();
		}  

		//left
		if(keycode == 37){
			var prev = jQuery('.photos.active li.active').index() - 1;
			jQuery('.photos.active li:eq(' + prev + ') img').click();
		}
	}

	function showSelection(evt){
		var sel = jQuery(evt.target).attr('href');
		var activeSelctions = (jQuery('.photos.active').length > 0);

		if( activeSelctions == true) {
			hideSelection().done(function(){

				jQuery(sel).fadeIn(GalleryConfig.animationSpeed, function(){
					jQuery(this).addClass('active');
					jQuery('.photos.active li:first-child img').click();					
				});
			});
		} else {
			jQuery(sel).fadeIn(GalleryConfig.animationSpeed, function(){
				jQuery(this).addClass('active');
				jQuery('.photos.active li:first-child img').click();
			});
		}
	}

	function hideSelection(){
		return jQuery('.photos.active').fadeOut(GalleryConfig.animationSpeed, function(){
			$(this).removeClass('active');
		}).promise();
	}

	function showGallery(){
		return jQuery('.header-wrapper').slideUp((GalleryConfig.animationSpeed + 150), function(){
			showShade().promise().done(function(){
				jQuery('.gallery .close').show();
				showCanvas();
			});
		}).promise();
	}

	function deactivateGallery(){
		jQuery('.gallery .close').hide().removeAttr('style');
		return jQuery('#canvas').fadeOut((GalleryConfig.animationSpeed + 300), function(){
			$(this).find('.frame img').attr('src', '');
			$('.photos.active li.active').removeClass('active');
		}).promise();
	}

	function hideGallery(evt){
		if(typeof evt !== 'undefined') evt.preventDefault();
		var shadeAnmiation;

		deactivateGallery().done(function(){
			shadeAnmiation = hideShade();
			jQuery('.photos.active').fadeOut(GalleryConfig.animationSpeed, function(){
				$(this).removeClass('active');

				shadeAnmiation.done(function(){
					jQuery('.header-wrapper').slideDown((GalleryConfig.animationSpeed + 150));
				});
			});
		});
	}

	function showCanvas(){
		return $('#canvas').fadeIn(GalleryConfig.animationSpeed).promise();
	}

	function showShade(){
		return jQuery('#shade').animate({
			'top' : 0
		}).promise();
	}

	function hideShade(){
		return jQuery('#shade').animate({
			'top' : '-100%'
		}, function(){
			$(this).removeAttr('style');
		}).promise();
	}

	function selectPhoto(evt){
		$('.photos.active li.active').removeAttr('class');

		evt.target.parentElement.classList.add('active');

		var src = evt.target.getAttribute('src');
		var img = document.querySelectorAll('.frame img')[0];

		img.setAttribute('src', src);

		return $(img).fadeIn(GalleryConfig.animationSpeed).promise();
	}

	function bindEvents(){
		$(document).on('keyup', toggleGallery);
		$('#gallery_nav li a').on('click', toggleGallery);
		$('#canvas .photos li img').on('click', selectPhoto);
		$('.gallery .close').on('click', hideGallery);
	}


	$('document').ready(function(){
		bindEvents();
	});
})(jQuery);