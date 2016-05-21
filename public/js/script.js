$(document).on('DOMContentLoaded', function () {
	var gallerySize;
	var MAXGALLERYHEIGHT = 830;
	var GALLERYHEIGHT = 670;
	var bootstrapCarousel = $('.carousel');
	var gallery = {
		firstInit: false,
		time: 6000,// промежуток времени,через которое меняются слайды
		next: $(".gallery-control.right"),
		prev: $(".gallery-control.left"),
		wrapper: $(".gallery-images"),
		pageWrapper: $(".portfolio-container"),
		container: $('.portfolio-slides-container'),
		activeClass: 'active',
		thumb: $('.thumb'),
		thumbsWrapper: $('.portfolio-thumbnails'),
		bigImg: $('.gallery-image-big'),
		changeActiveClass: function (el, i) {
			el.removeClass(gallery.activeClass).eq(i).addClass(gallery.activeClass);
		},
		imgLength: function () {return gallery.bigImg.length},
		nextImage: function (flag) {
			var isLeft = flag === false,
				totalLength = gallery.imgLength(),
				i = $('.gallery-image-big.active').index() || 0,
				next = isLeft ? i - 1 : i + 1;
			next = (isLeft && next < 0) ? -1 : (!isLeft && next === totalLength) ? 0 : next;
			gallery.changeActiveClass(gallery.thumb, next);
			gallery.changeActiveClass(gallery.bigImg, next);
			gallerySize = gallery.getGallerySize(next);
			gallery.wrapper.animate(gallerySize, 900);
		},
		getGallerySize: function (index) {
			index = index || $('.gallery-image-big.active').index();
			var curImg = $('.gallery-image-big').eq(index).find('img');
			var pageWidth = gallery.pageWrapper.css('width');
			var size;
			gallery.checkVerticalImages(index);
			if (curImg.hasClass('vertical')) {
				if ($(window).innerWidth() < 1200) {
					curImg.css({"height": 'auto', width: pageWidth});
					size = {"height": curImg.css('height'), width: curImg.css('width')};
				}
				else {
					curImg.css({"height": MAXGALLERYHEIGHT, width: 'auto'});
					size = {"height": curImg.css('height'), width: curImg.css('width')};
				}

				return size;
			}
			else {
				if ($(window).innerWidth() < 1200) {
					curImg.css({"height": 'auto', width: pageWidth});
					size = {"height": curImg.css('height'), width: curImg.css('width')};

				}
				else {
					size = {"height": GALLERYHEIGHT, width: pageWidth};
					curImg.css(size);
				}

				return size;
			}

		},
		setImagesClass: function () {
			[].forEach.call(gallery.bigImg, function (div) {
				var img = div.getElementsByTagName("img")[0];
				if (img.scrollHeight > img.scrollWidth) {
					img.classList.add("vertical");
					div.classList.add("vertical");
				}
			});
		},
		checkVerticalImages: function (i) {
			var img = gallery.bigImg.eq(i).find('img');
			if ((img.scrollHeight > img.scrollWidth) && !img.hasClass('vertical')) {
				img.classList.add("vertical");
			}
		},
		init: function () {
			gallery.setImagesClass();
			var autoplay = setInterval(gallery.nextImage, gallery.time);
			gallery.bigImg.eq(0).addClass(gallery.activeClass);
			gallery.thumb.eq(0).addClass(gallery.activeClass);
			gallerySize = gallery.getGallerySize();
			gallery.wrapper.css(gallerySize);
			gallery.thumbsWrapper.on('click', '.thumb', function () {
				if (!$(this).hasClass("active") && !gallery.bigImg.is(":animated")) {
					clearInterval(autoplay);
					var i = $(this).index();
					gallery.changeActiveClass(gallery.thumb, i);
					gallery.changeActiveClass(gallery.bigImg, i);
					gallerySize = gallery.getGallerySize(i);
					gallery.wrapper.animate(gallerySize, 500);
					autoplay = setInterval(gallery.nextImage, gallery.time);

				}
			});

			gallery.next.on('click', function () {
				if (!gallery.wrapper.is(":animated")) {
					clearInterval(autoplay);
					gallery.nextImage();
					autoplay = setInterval(gallery.nextImage, gallery.time);
				}
			});
			//gallery.wrapper.on('click', '.gallery-image-big', gallery.nextImage);
			gallery.prev.on('click', function () {
				if (!gallery.wrapper.is(":animated")) {
					clearInterval(autoplay);
					gallery.nextImage(false);
					autoplay = setInterval(gallery.nextImage, gallery.time);
				}
			});

			$(window).on('resize', function () {
				gallerySize = gallery.getGallerySize();
				gallery.wrapper.css(gallerySize);
			});

			gallery.bigImg.swipe({
				//Generic swipe handler for all directions
				swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
					clearInterval(autoplay);
					if (direction === 'left') {
						gallery.nextImage();
					} else if (direction === 'right') {
						gallery.nextImage(false);
					}
					autoplay = setInterval(gallery.nextImage, gallery.time);
				}
			});

		}
	};

	function setPortfolioNavigation() {
		var imgs = [];
		[].forEach.call($('.gallery-image.thumb'), function (div) {
			imgs.push(div)
		});
		if (imgs.length) {
			$('#pagination-container').pagination({
				dataSource: imgs,
				pageSize: 20,
				callback: function (data, pagination) {
					$('#data-container').html(data);
				}
			});
		}
	}

	$(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
		var $this = $(this);
		if (!$this.attr('data-target')) e.preventDefault();
		$this.toggleClass('open');
		$(".social-icons").fadeToggle(100);
	});

	setTimeout(gallery.init, 200);
	setPortfolioNavigation();
	bootstrapCarousel.carousel();
	bootstrapCarousel.swipe({
		//Generic swipe handler for all directions
		swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
			if (direction === 'left') {
				$(".right.carousel-control").trigger('click');
			} else if (direction === 'right') {
				$(".left.carousel-control").trigger('click');
			}
		}
	});

	$('.navbar-nav>li').click(function () {
		console.log($(window).innerWidth())
		if ($(window).innerWidth() < 585) {
			var $this = $(this);
			if ($this.has("ul")) {
				if ($this.hasClass('active')) {
					$this.removeClass('active').find('ul').slideUp();
				}
				else {
					$('.navbar-nav>li').removeClass('active').find('ul').slideUp();
					$this.addClass('active').find('ul').slideDown();
				}
			}
		}
	});

});



