;(function ($) {

	var $fullpage = $('#fullpage');
	var $btnMenu  = $('.offsetMenu');

	//* offSetMenu
	$btnMenu.each(function(index, element) {

		$(element).on('click', function() {
			$(document.body).toggleClass('nav-opened');
		})

	});

	// Bug Fix break page
	$(window).on("load", function() {
	  $("#fullpage").removeClass("invisible");
	  $("#myHeader").removeClass("invisible");
	});

	// -- fullPage and ScrollReveal -- //
	$fullpage.fullpage({
		anchors: ['sobre', 'habilidades', 'formacao', 'experiencia', 'portfolio', 'contato'],
		menu: '#myMenu',
		scrollOverflow: true,

		//responsiveWidth: 767,
		scrollBar: true,
		css3: true,
		onLeave: function(index, nextIndex, direction) {
			$(document.body).removeClass('nav-opened');
		},
		afterRender: function() {

			var config = {
	          viewFactor : 0.15,
	          duration   : 800,
	          distance   : "0",
	          reset: true,
	          scale      : 0.8
	        };

	        var myheader = {
	        origin   : "top",
	        distance : "40px",
	        duration : 1500,
	        scale    : 1
	      	};

	        var fromfooter = {
	        origin   : "bottom",
	        distance : "40px",
	        duration : 1500
	      	};

   			window.sr = ScrollReveal( config );


			sr.reveal("#myHeader, .display-4", myheader);
			sr.reveal(".fromBottom, #myAvatar, #myDesc", fromfooter);
			sr.reveal(".box", { scale: .2, duration: 1500 }, 100);
			sr.reveal("#folio", { duration: 1000 }, 100);
			sr.reveal(".cover-bg", { scale: 1.2, duration: 2500 });


		}
	});


	// -- Isotope -- //

	var $grid = $('#folio').isotope({
	  itemSelector: '.grid-item',
	  percentPosition: true,
	  layoutMode: 'fitRows',
	  masonry: {
	    columnWidth: '.grid-sizer'
	  }
	});
	
/*	var $grid = $('#folio').isotope({
	  // options
		itemSelector: '.foliobox',
		layoutMode: 'fitRows',
		percentPosition: true
	});*/

	$('#filter-button-group').on('click', 'button', function() {

	  $(this).parent().find('button').removeClass('active');
	  $(this).addClass("active");
	  var filterValue = $(this).attr('data-filter');
	  $grid.isotope({ filter: filterValue });

	});


	/* nanoScroller */

/*	$('.rafull').on('click', function () {
		$fullpage.toggleClass('nano-open');
		$('#nanora').toggleClass('open');
	})

	$(".nano").nanoScroller({ 
		preventPageScrolling: true
	});*/

	/* Magnific Popup */

        $('.image-popup-no-margins').magnificPopup({
          type: 'image',
          closeOnContentClick: true,
          closeBtnInside: false,
          fixedContentPos: true,
          mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
          image: {
            verticalFit: true,
            titleSrc: function(item) {
              return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">Ver Projeto</a>';
            }
          },
          zoom: {
            enabled: true,
            duration: 500 // don't foget to change the duration also in CSS
          }
        });

})(jQuery);





