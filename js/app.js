$(function () {
  const worksSlider = $('[data-slider="slick"]');
  let introH = $('#intro').innerHeight();
  let header = $('#header');
  let scrollOffset = $(window).scrollTop();

  /* Fixed Header show 
  =============================================*/
  checkScroll(scrollOffset);

  $(window).on('scroll', function () {
    scrollOffset = $(this).scrollTop();

    checkScroll(scrollOffset);
  });

  function checkScroll(scrollOffset) {
    if (scrollOffset >= introH - 130) {
      header.addClass('header--fixed');
    } else {
      header.removeClass('header--fixed');
    }
  }

  /* filter work category 
  ==========================================*/
  let filter = $('[data-filter]');

  filter.on('click', function (event) {
    event.preventDefault();
    let cat = $(this).data('filter');

    if (cat == 'all') {
      $('[data-cat]').removeClass('hide');
    } else {
      $('[data-cat]').each(function () {
        let workCat = $(this).data('cat');

        if (workCat != cat) {
          $(this).addClass('hide');
        } else {
          $(this).removeClass('hide');
        }
      });
    }
  });
  /* Modal window show&hide 
  =========================================*/

  const modalCall = $('[data-modal]');
  const modalClose = $('[data-close]');

  modalCall.on('click', function (event) {
    event.preventDefault();

    $('#nav').removeClass('show'); // Close burger menu

    let $this = $(this);
    let modalId = $this.data('modal');

    $(modalId).addClass('show');
    $('body').addClass('no-scroll');

    setTimeout(function () {
      $(modalId).find('.modal__dialog').css({ transform: 'rotateX(0)' });
    }, 200);
    worksSlider.slick('setPosition'); // slick-slider update position
  });

  modalClose.on('click', function (event) {
    event.preventDefault();
    let $this = $(this);
    let modalParent = $this.parents('.modal');

    modalParent.find('.modal__dialog').css({ transform: 'rotateX(90deg)' });

    setTimeout(function () {
      modalParent.removeClass('show');
      $('body').removeClass('no-scroll');
    }, 200);
  });

  $('.modal').on('click', function (event) {
    let $this = $(this);
    $this.find('.modal__dialog').css({ transform: 'rotateX(90deg)' });

    setTimeout(function () {
      $this.removeClass('show');
      $('body').removeClass('no-scroll');
    }, 200);
  });

  $('.modal__dialog').on('click', function (event) {
    event.stopPropagation();
  });

  /*Slider 
  ===============================================
  https://kenwheeler.github.io/slick/ 
  ==============================================*/
  worksSlider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true,
  });

  $('.slickPrev').on('click', function (event) {
    event.preventDefault();
    let currentSlider = $(this).parents('.modal').find('[data-slider="slick"');
    currentSlider.slick('slickPrev');
  });

  $('.slickNext').on('click', function (event) {
    event.preventDefault();
    let currentSlider = $(this).parents('.modal').find('[data-slider="slick"');
    currentSlider.slick('slickNext');
  });

  /* Mobile navigation
  ================================================ */
  const navToggle = $('#navToggle');
  const nav = $('#nav');

  navToggle.on('click', function (event) {
    event.preventDefault();

    nav.toggleClass('show');
  });

  /* Smooth scroll
  =============================================== */
  $('[data-scroll]').on('click', function (event) {
    event.preventDefault();

    let blockId = $(this).data('scroll');

    let blockOffset = $(blockId).offset().top - 140;

    $('html, body').animate(
      {
        scrollTop: blockOffset,
      },
      700,
    );

    $('#nav').removeClass('show');
  });
});
