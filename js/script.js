(function($){
	$(window).on("load", function(){
		$(".preloader").fadeOut();
	});
	$(document).ready(function(){

		// Sticky Navigation Bar
		$(window).scroll(function(){
			var scrollHeight = $(document).scrollTop();
			if(scrollHeight > 50){
				$('.primary-navigation').addClass('navigation-fixed');
			}else{
				$('.primary-navigation').removeClass('navigation-fixed');
			}
		});

		// Mobile Navigation
		$('#main_nav').meanmenu({
			meanMenuContainer	: '.mobile-nav',
			meanScreenWidth		: '991',
			meanMenuClose 		: '<i class="fas fa-times"></i>'
		});

		// Home Slider	
		$(".home-slider").owlCarousel({
			"items" 		: 1,
			"navText"		: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
			"loop"			: true,
			"mouseDrag"		: false,
			"animateIn" 	: "fadeIn",
			"animateOut" 	: "fadeOut",
			"autoplay"		: false,
			"autoplaySpeed"	: 1000,
			"navSpeed"		: 1000,
			"dotsSpeed"		: 1000,
			"responsive"	: {
				992 : {
					"dots"	: true
				},
				768	: {
					"nav" 	: true,
				},
				0	: {
					"dots" 	: false,
					"nav"	: false
				}
			}
		});

		$(".home-slider").on("translate.owl.carousel", function(){
			$(".slide-item .slide-head h2, .slide-item .slide-des p").removeClass("animated fadeInUp").css("opacity", "0");
			$(".slide-item .slide-des p").removeClass("animated slideInRight").css("opacity", "0");
			$(".slide-item .header-btn").removeClass("animated fadeInUp").css("opacity", "0");
	    });

	    $(".home-slider").on("translated.owl.carousel", function(){
			$(".slide-item .slide-head h2, .slide-item .slide-des p").addClass("animated fadeInUp").css("opacity", "1");
			$(".slide-item .slide-des p").addClass("animated slideInRight").css("opacity", "1");
			$(".slide-item .header-btn").addClass("animated fadeInUp").css("opacity", "1");
	    });

	    // Scroll To Top
		$(".scrolltop a").click(function(event){
			$("html").animate({scrollTop:$("body").offset().top}, "1000");
			event.preventDefault();
		});

		// Wow Integrate
		new WOW().init();
		
	});
}(jQuery))