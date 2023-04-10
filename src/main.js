import 'jquery-sticky';

import {Carousel, Fancybox} from '@fancyapps/ui';
import {de} from '@fancyapps/ui/dist/fancybox/l10n/de.esm';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import "@fancyapps/ui/dist/carousel/carousel.css";
import {Autoplay} from "@fancyapps/ui/dist/carousel/carousel.autoplay.esm";
import {de as de2} from '@fancyapps/ui/dist/carousel/l10n/de.esm';
import "@fancyapps/ui/dist/carousel/carousel.autoplay.css";

import 'bootstrap';

import './style.scss';

Fancybox.bind('[data-fancybox]', {l10n: de});

let answer;

$(document).ready(function ($) {
  const gFormId = '1FAIpQLSfe8WfxmyK7efmSLMzukCH-TR_F4qQX5tVA2AEXfWXtOhykCA';
  const action = `https://docs.google.com/forms/d/e/${gFormId}/formResponse?`;
  const $body = $('body');

  // Show the page and hide the overlay and loader after 1 second
  $('.loader').delay(1000).fadeOut('slow');
  $('#overlayer').delay(1000).fadeOut('slow');
  $('.site-wrap').removeAttr('style');

  // Init jQuery-sticky for a sticky navigation bar
  $('.js-sticky-header').sticky({topSpacing: 0});

  $('.service').on('click', function () {
    const $this = $(this);
    $this.toggleClass('active');
    $this.find('.content').fadeToggle();
  });

  // Clone the all nav item which are marked with the class 'js-clone-nav'
  $('.js-clone-nav').each(function () {
    $(this).clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
  });

  // Add mobile sidenav if window width is smaller than 768px
  $(window).resize(function () {
    if ($(this).width() > 768 && $body.hasClass('offcanvas-menu')) {
      $body.removeClass('offcanvas-menu');
    }
  });

  // Click on the mobile menu toggle
  $body.on('click', '.js-menu-toggle', function (e) {
    e.preventDefault();
    $body.toggleClass('offcanvas-menu');
    $(this).toggleClass('active');
  });

  // Click outside offcanvas to close the mobile side navigation menu
  $(document).mouseup(function (e) {
    const container = $('.site-mobile-menu');
    if (!container.is(e.target) && container.has(e.target).length === 0 && $body.hasClass('offcanvas-menu')) {
      $body.removeClass('offcanvas-menu');
    }
  });

  // Setup carousels
  new Carousel(document.getElementById('work-carousel'), {
    l10n: de2,
    transition: 'slide',
  }, {Autoplay});
  const carousel = new Carousel(document.getElementById('carousel'),
    {
      l10n: de2,
      infinite: true,
      slidesPerPage: 1,
      transition: 'slide',
      Autoplay: {timeout: 10000},
      Dots: false,
    }, {Autoplay});
  new Carousel(document.getElementById('carousel-text'),
    {
      l10n: de2,
      infinite: true,
      slidesPerPage: 1,
      transition: 'slide',
      Dots: false,
      Navigation: false,
      Sync: {target: carousel}
    });

  // Smooth scrolling to anchor id when link is clicked
  $body.on('click', ".footer-links[href^='#'], a.btn[href^='#'], .site-mobile-menu .site-nav-wrap li a", function (e) {
    e.preventDefault();
    if ($body.hasClass('offcanvas-menu')) {
      $body.removeClass('offcanvas-menu');
    }
    document.getElementById(this.hash.slice(1))?.scrollIntoView({block: 'start', behavior: 'smooth'});
  });

  // Change the navigation bar appearance on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.js-sticky-header').addClass('shrink');
    } else {
      $('.js-sticky-header').removeClass('shrink');
    }
  });

  function updateCaptcha() {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    $('#question').text(`Was ist das Ergebnis von ${a} plus ${b} als Zahl:`);
    answer = a + b + '';
  }
  updateCaptcha();

  // Fade out form after submit
  const form = $('#submit-form');
  form.on('submit', function () {
    $('#wrong-captcha')?.remove();
    if ($('#answer').val() === answer) {
      $('#submit-form > .row').fadeOut(2000);
      form.prepend('<div class="alert alert-success">Ihre Nachricht wurde gesendet</div>');
      form.attr('action', action);
    } else {
      $('#captcha').append('<div id="wrong-captcha" class="alert alert-danger">Das Captcha ist falsch! Nachricht nicht gesendet.</div>');
      updateCaptcha();
    }
  });
});
