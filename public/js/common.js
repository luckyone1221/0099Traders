"use strict";
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад", 
			}, 
		}); 
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	// tabs  .
	tabscostume() {
		//ultimate tabs
		let tab ='tabs';
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});
	}, 
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	//pure js
	animateScroll(topShift=80) {
		$('.menu li a, .scroll-link').click(function(e){
			e.preventDefault();
			$([document.documentElement, document.body]).animate({
				scrollTop: $($(this).attr("href")).offset().top - 280
			}, 2000);
		})
		
		$('  .scroll-links').click(function(e){
			e.preventDefault();
			$([document.documentElement, document.body]).animate({
				scrollTop: $($(this).attr("href")).offset().top  
			}, 2000);
		})

	}, 
};
const $ = jQuery;

function eventHandler() { 
	JSCCommon.modalCall();
	JSCCommon.tabscostume(); 
	JSCCommon.heightwindow(); 
	JSCCommon.animateScroll();

	//luckyOne Js
	let headerH;
	let header = document.querySelector(".header--js");
	function calcHeaderHeight() {
		if (!header) return;
		document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
		headerH = header.offsetHeight;

		window.scrollY > 0
			? header.classList.add('fixed')
			: header.classList.remove('fixed');
	}
	window.addEventListener('resize', calcHeaderHeight, { passive: true });
	window.addEventListener('scroll', calcHeaderHeight, { passive: true });
	calcHeaderHeight();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	let freeMomentum = {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	};

	let defSlider = new Swiper('selector', {
		...defaultSl,
		...freeMomentum,
	});
	// modal window

	//
	let sLuckySlider = new Swiper('.sLucky-slider-js', {
		slidesPerView: "auto",
		spaceBetween: 32,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	
	//
	let sFeedbackSlider = new Swiper('.sFeedback-slider-js', {
		slidesPerView: "auto",
		spaceBetween: 32,
		pagination: {
			el: '.sFeedback--js .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});
	
	//
	let sRewSlider = new Swiper('.sRew__slider--js', {
		slidesPerView: "auto",
		spaceBetween: 32,
		// slidesPerGroupSkip: 1,
		navigation: {
			nextEl: '.sRew .swiper-button-next',
			prevEl: '.sRew .swiper-button-prev',
		},
		pagination: {
			el: '.sRew .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			992: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				slidesPerView: 2,
			},
		},
	});
	
	let modalwinSlider = new Swiper('.modal-win__slider--js', {
		slidesPerView: 1,
		spaceBetween: 0,
		navigation: {
			nextEl: ' .swiper-button-next',
			prevEl: ' .swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	let form = document.querySelectorAll(".form-wrap");
	form.forEach((el) => {
		const input = el.querySelector('input.invisible');
		const btn = el.querySelector('.form-wrap__btn');
		input.addEventListener('change', (event) => {
 
			if (input.checked) {
				btn.classList.remove("disabled");
			}
			else {
				btn.classList.add("disabled");
			} 
		})
	}) 

	var $htmlOrBody = $('.fancybox__slide '), // scrollTop works on <body> for some browsers, <html> for others
		scrollTopPadding = 8;

	$('#modal-form .form-control').blur(function () {
		// get textarea's offset top position
		var textareaTop = $(this).offset().top;
		console.log(this);
		// scroll to the textarea
		$htmlOrBody.scrollTop(textareaTop + scrollTopPadding);
		console.log($htmlOrBody);
	});


};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}