'use strict';
angular.module('core').service('Plugin', [
	function() {
		var $ = window.$,
			Dropzone = window.Dropzone,
			wNumb = window.wNumb;
		var myProfileDropzone;
		this.initializePlugins = function() {
			setInputsWidth();

			// Scrollbar on 'Results' section
			if( $('.items-list').length > 0 ) {
				$('.items-list').mCustomScrollbar({
					mouseWheel:{ scrollAmount: 350 }
				});
			}

			// Bootstrap tooltip
			$(function () {
				$('[data-toggle="tooltip"]').tooltip();
			});
			$('.off-canvas-navigation header').css( 'line-height', $('.header').height() + 'px' );

			// Date & Time picker

			if( $('.input-group.date').length > 0 ){
				$('.input-group.date').datepicker({});
			}
			if( $('.input-daterange').length > 0 ){
				$('.input-daterange').datepicker({
					todayHighlight: true
				});
			}

//  Bootstrap Select ---------------------------------------------------------------------------------------------------

			var select = $('select');
			if (select.length > 0 ){
				select.selectpicker();
			}
			var bootstrapSelect = $('.bootstrap-select');
			var dropDownMenu = $('.dropdown-menu');
			bootstrapSelect.on('shown.bs.dropdown', function () {
				dropDownMenu.removeClass('animation-fade-out');
				dropDownMenu.addClass('animation-fade-in');
			});
			bootstrapSelect.on('hide.bs.dropdown', function () {
				dropDownMenu.removeClass('animation-fade-in');
				dropDownMenu.addClass('animation-fade-out');
			});
			bootstrapSelect.on('hidden.bs.dropdown', function () {
				var _this = $(this);
				$(_this).addClass('open');
				setTimeout(function() {
					$(_this).removeClass('open');
				}, 100);
			});

//  Expand content on click --------------------------------------------------------------------------------------------

			$('.expand-content').live('click',  function(e){
				e.preventDefault();
				var children = $(this).attr('data-expand');
				var parentHeight = $(this).closest('.expandable-content').height();
				var contentSize = $( children + ' .content' ).height();
				$( children ).toggleClass('collapsed');
				$( this ).toggleClass('active');
				$( children ).css( 'height' , contentSize );
				if( !$( children).hasClass('collapsed') ){
					setTimeout(function() {
						$( children ).css('overflow', 'visible');
					}, 400);
				}
				else {
					$( children ).css('overflow', 'hidden');
				}
				$('.has-child').live('click',  function(e){
					var parent = $(this).closest('.expandable-content');
					var childHeight = $( $(this).attr('data-expand') + ' .content').height();
					if( $(this).hasClass('active') ){
						$(parent).height( parent.height() + childHeight );
					}
					else {
						$(parent).height(parentHeight);
					}
				});
			});

//  Smooth Navigation Scrolling ----------------------------------------------------------------------------------------

			$('.navigation .nav a[href^="#"], a[href^="#"].roll').live('click',function (e) {
				e.preventDefault();
				var target = this.hash,
						$target = $(target);
				if ($(window).width() > 768) {
					$('html, body').stop().animate({
						'scrollTop': $target.offset().top - $('.navigation').height()
					}, 2000);
				} else {
					$('html, body').stop().animate({
						'scrollTop': $target.offset().top
					}, 2000);
				}
				return false;
			});

//  iCheck -------------------------------------------------------------------------------------------------------------

			if ($('.checkbox').length > 0) {
				$('input').iCheck();
			}

			if ($('.radio').length > 0) {
				$('input').iCheck();
			}

			$('body').addClass('page-fade-in');

//  Dropzone -----------------------------------------------------------------------------------------------------------

			if( $('.dropzone').length > 0 ) {
				Dropzone.autoDiscover = false;
				$('#file-submit').dropzone({
					url: 'upload',
					addRemoveLinks: true
				});

				/*$('#profile-picture').dropzone({
					url: '/user/profilePicture',
					addRemoveLinks: true,
					autoProcessQueue: false
				});*/
				myProfileDropzone = new Dropzone('#profile-picture', {
					url: '/user/profilePicture',
					addRemoveLinks: true,
					autoProcessQueue: false,
					init: function() {
						this.on('sending', function(file, xhr, formData) {
							formData.append('user_id', $('#user_id').val()); // Append all the additional input data of your form here!
						});
					}
				});
			}

//  Timepicker ---------------------------------------------------------------------------------------------------------

			if( $('.oh-timepicker').length > 0 ) {
				$('.oh-timepicker').timepicker();
			}

			$('.item .quick-view').on('click',function (e) {
				e.preventDefault();
			});

//  Items scripts ------------------------------------------------------------------------------------------------------

			$('.item.admin-view .hide-item').on('click',function (e) {
				$(this).closest('.item').toggleClass('is-hidden');
			});

//  No UI Slider -------------------------------------------------------------------------------------------------------

			if( $('.ui-slider').length > 0 ){
				$('.ui-slider').each(function(){
					var step;
					if( $(this).attr('data-step') ) {
						step = parseInt( $(this).attr('data-step') );
					}
					else {
						step = 10;
					}
					var sliderElement = $(this).attr('id');
					var element = $( '#' + sliderElement);
					var valueMin = parseInt( $(this).attr('data-value-min') );
					var valueMax = parseInt( $(this).attr('data-value-max') );
					$(this).noUiSlider({
						start: [ valueMin, valueMax ],
						connect: true,
						range: {
							'min': valueMin,
							'max': valueMax
						},
						step: step
					});
					if( $(this).attr('data-value-type') === 'price' ) {
						if( $(this).attr('data-currency-placement') === 'before' ) {
							$(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ prefix: $(this).attr('data-currency'), decimals: 0, thousand: '.' }));
							$(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ prefix: $(this).attr('data-currency'), decimals: 0, thousand: '.' }));
						}
						else if( $(this).attr('data-currency-placement') === 'after' ){
							$(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ postfix: $(this).attr('data-currency'), decimals: 0, thousand: ' ' }));
							$(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ postfix: $(this).attr('data-currency'), decimals: 0, thousand: ' ' }));
						}
					}
					else {
						$(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ decimals: 0 }));
						$(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ decimals: 0 }));
					}
				});
			}

		};

		this.uploadProfilePicture = function() {
			myProfileDropzone.processQueue();
		};



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////s/
// On Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		$(window).load(function(){
			var $equalHeight = $('.equal-height');
			for( var i=0; i<$equalHeight.length; i++ ){
				equalHeight( $equalHeight );
			}
		});

		$(window).resize(function(){
			var $equalHeight = $('.equal-height');
			for( var i=0; i<$equalHeight.length; i++ ){
				equalHeight( $equalHeight );
			}
		});

		this.resizeBox = function() {
			var $equalHeight = $('.equal-height');
			for( var i=0; i<$equalHeight.length; i++ ){
				equalHeight( $equalHeight );
			}
		};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		function setInputsWidth(){
			var $inputRow = $('.search-bar.horizontal .input-row');
			for( var i=0; i<$inputRow.length; i++ ){
				if( $inputRow.find( $('button[type="submit"]') ).length ){
					$inputRow.find('.form-group:last').css('width','initial');
				}
			}

			var searchBar =  $('.search-bar.horizontal .form-group');
			for( var a=0; a<searchBar.length; a++ ){
				if( searchBar.length <= ( 1 + 1 ) ){
					$('.main-search').addClass('inputs-1');
				}
				else if( searchBar.length <= ( 2 + 1 ) ){
					$('.main-search').addClass('inputs-2');
				}
				else if( searchBar.length <= ( 3 + 1 ) ){
					$('.main-search').addClass('inputs-3');
				}
				else if( searchBar.length <= ( 4 + 1 ) ){
					$('.main-search').addClass('inputs-4');
				}
				else if( searchBar.length <= ( 5 + 1 ) ){
					$('.main-search').addClass('inputs-5');
				}
				else {
					$('.main-search').addClass('inputs-4');
				}
				if( $('.search-bar.horizontal .form-group label').length > 0 ){
					$('.search-bar.horizontal .form-group:last-child a').css('margin-top', 25);
				}
			}
		}

// Rating --------------------------------------------------------------------------------------------------------------

		this.rating = function(element) {
			var ratingElement =
							'<span class="stars">'+
							'<i class="fa fa-star s1" data-score="1"></i>'+
							'<i class="fa fa-star s2" data-score="2"></i>'+
							'<i class="fa fa-star s3" data-score="3"></i>'+
							'<i class="fa fa-star s4" data-score="4"></i>'+
							'<i class="fa fa-star s5" data-score="5"></i>'+
							'</span>'
					;
			if( !element ) { element = ''; }
			$.each( $(element + ' .star-rating'), function(i) {
				$(this).append(ratingElement);
				if( $(this).hasClass('active') ){
					$(this).append('<input readonly hidden="" name="score_' + $(this).attr('data-name') +'" id="score_' + $(this).attr('data-name') +'">');
				}
				var rating = $(this).attr('data-star');
				for( var e = 0; e < rating; e++ ){
					var rate = e+1;
					$(this).children('.stars').children( '.s' + rate ).addClass('active');
				}
			});

			var ratingActive = $('.star-rating.active i');
			ratingActive.on('hover',function(){
						for( var i=0; i<$(this).attr('data-score'); i++ ){
							var a = i+1;
							$(this).parent().children('.s'+a).addClass('hover');
						}
					},
					function(){
						for( var i=0; i<$(this).attr('data-score'); i++ ){
							var a = i+1;
							$(this).parent().children('.s'+a).removeClass('hover');
						}
					});
			ratingActive.on('click', function(){
				$(this).parent().parent().children('input').val( $(this).attr('data-score') );
				$(this).parent().children('.fa').removeClass('active');
				for( var i=0; i<$(this).attr('data-score'); i++ ){
					var a = i+1;
					$(this).parent().children('.s'+a).addClass('active');
				}
				return false;
			});
		};

// Owl Carousel in Modal Window ----------------------------------------------------------------------------------------

		this.drawOwlCarousel = function(_rtl) {
			$.getScript( 'assets/js/owl.carousel.min.js', function( data, textStatus, jqxhr ) {
				$('.image .gallery').owlCarousel({
					rtl: _rtl,
					items: 1,
					nav: true,
					navText: ['',''],
					responsiveBaseElement: '.image'
				});
			});
		};

		this.zebra_alert = function(param1,param2) {
			$.Zebra_Dialog(param1,param2);
		};

		this.autoScrollToElement = function(element, parent) {
			var listElement = $(element),
				box = $(parent);
			if ( listElement.length && box.length ) {
				box.animate({
					scrollTop: listElement.offset().top + box.scrollTop() - box.offset().top - box.height() + 2 * listElement.outerHeight()
				}, 200);
			}
		};

		function lazyLoad(selector) {
			selector.load(function() {
				$(this).parent().removeClass('loading');
			});
		}

//  Equal heights ------------------------------------------------------------------------------------------------------

		function equalHeight(container) {
			var currentTallest = 0,
					currentRowStart = 0,
					rowDivs = [],
					$el,
					topPosition = 0;

			$(container).find('.item, .price-box').each(function() {
				var currentDiv;
				$el = $(this);
				$($el).height('auto');
				topPosition = $el.position().top;
				if (currentRowStart !== topPosition) {
					for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
						rowDivs[currentDiv].height(currentTallest);
					}
					rowDivs.length = 0; // empty the array
					currentRowStart = topPosition;
					currentTallest = $el.height();
					rowDivs.push($el);
				} else {
					rowDivs.push($el);
					currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
				}
				for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
					rowDivs[currentDiv].height(currentTallest);
				}
			});
		}

// Quick View ----------------------------------------------------------------------------------------------------------

		function quickView(id) {
			$.ajax({
				type: 'POST',
				url: 'assets/external/_modal.html',
				data: id,
				success: function (data) {
					// Create HTML element with loaded data
					$('body').append(data);
				}
			});
		}
	}
]);
