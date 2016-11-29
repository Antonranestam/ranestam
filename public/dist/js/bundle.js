(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {

  $('#start').parallax({
    calibrateX: true,
    calibrateY: true,
    invertX: false,
    invertY: false,
    limitX: 10,
    limitY: 10
  });

  $('.cases__wrapper__article').parallax({
    calibrateX: true,
    calibrateY: true,
    invertX: false,
    invertY: false,
    limitX: 10,
    limitY: 10
  });

  $('.big-pic').parallax({
    calibrateX: true,
    calibrateY: true,
    invertX: false,
    invertY: true,
    limitX: 30,
    limitY: 0
  });

  // Slider menu
  $('.cases__menu .btn-round').click(function () {
    var caseNumber = $(this).data('case');
    $('.cases__menu .btn-round').removeClass('active');
    $(this).addClass('active');

    $('.cases .cases__wrapper').pagepiling.moveTo(caseNumber);
  });

  // Slider for cases
  var casesClient = $('.cases .cases__client');
  var casesBg = $('.cases .cases__wrapper__article__text');
  var casesRead = $('.read-btn');
  var letterWrapper = $('.cases .letter-wrapper');

  $('.cases .cases__wrapper').pagepiling({
    css3: false,
    scrollingSpeed: 0,
    onLeave: function onLeave(index, nextIndex, direction) {

      // // Fade out & in bg and client text on switch
      casesBg.hide();
      casesClient.hide();

      casesBg.fadeIn(1500);
      casesClient.fadeIn(1500);

      // ESS
      if (index == 2 && direction == 'down') {
        casesClient.text(casesIntro.ess.title);
        casesBg.html(casesIntro.ess.background);
        casesRead.attr('href', casesIntro.ess.link);

        $('.cases #og').attr("class", "");
        $('.cases #booking').attr("class", "");

        $('.cases #ess').attr("class", "active");

        $('.booking-case-anchor').removeClass('active');
        $('.og-case-anchor').removeClass('active');
        $('.ess-case-anchor').addClass('active');
      }

      // Booking
      else if (index == 2 && direction == 'up') {
          casesClient.text(casesIntro.booking.title);
          casesBg.html(casesIntro.booking.background);
          casesRead.attr('href', casesIntro.booking.link);

          $('.cases #og').attr("class", "");
          $('.cases #ess').attr("class", "");

          $('.cases #booking').attr("class", "active");

          $('.ess-case-anchor').removeClass('active');
          $('.og-case-anchor').removeClass('active');
          $('.booking-case-anchor').addClass('active');
        }

        // OG
        else if (index == 3 && direction == 'up') {
            casesClient.text(casesIntro.og.title);
            casesBg.html(casesIntro.og.background);
            casesRead.attr('href', casesIntro.og.link);

            $('.cases #ess').attr("class", "");
            $('.cases #booking').attr("class", "");

            $('.cases #og').attr("class", "active");

            $('.ess-case-anchor').removeClass('active');
            $('.booking-case-anchor').removeClass('active');
            $('.og-case-anchor').addClass('active');
          }

          // OG
          else if (index == 1 && direction == 'down') {
              casesClient.text(casesIntro.og.title);
              casesBg.html(casesIntro.og.background);
              casesRead.attr('href', casesIntro.og.link);

              $('.cases #ess').attr("class", "");
              $('.cases #booking').attr("class", "");

              $('.cases #og').attr("class", "active");

              $('.ess-case-anchor').removeClass('active');
              $('.booking-case-anchor').removeClass('active');
              $('.og-case-anchor').addClass('active');
            }
    }
  });

  $('.mute-btn').click(function () {
    toggleMute();
    $(this).toggleClass('active');
  });

  $('.big-btn--down').click(function () {
    animStart();
    colorChange();
  });

  $('.big-btn--up').click(function () {
    $('body').removeClass('color-change');
    animStartBack();
    Reveal.prev();

    var audio = document.getElementById('song');
    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.muted = false;
    audio.play();
  });

  // When click on footer link make sure to reset perfectScrollbar
  $('.after-case__nav__item a').click(function () {
    $('.ps-container').scrollTop(0);

    footerAnim();
  });

  perfectScrollbar();

  // Toggle menu
  $('.menu-btn--toggle').click(function () {

    var audio = document.getElementById('song');
    audio.volume = 0.05;

    menuAnim();
  });

  $('.menu__nav a').click(function () {
    menuAnimBack();
  });

  // Toggle menu back
  $('.menu-btn--hide').click(function () {

    var audio = document.getElementById('song');
    audio.volume = 0.2;
    menuAnimBack();
  });

  // Case anim start
  $('.read-btn').click(function () {
    var caseId = $(this).attr('href');

    $('.cases').addClass('slow-down');

    if (caseId == '#og-case') {
      caseAnimBooking();
    } else if (caseId == '#ess-case') {
      caseAnimBooking();
    } else if (caseId == '#booking-case') {
      caseAnimBooking();
    }
  });

  // Check if cases is the starting point, if so run anim start function
  if ($('.cases').hasClass('present')) {
    toggleMute();
    colorChange();
  };

  if ($('.case').hasClass('present')) {
    toggleMute();
    colorChange();
  };

  if ($('.cv').hasClass('present')) {
    toggleMute();
    colorChange();
  };

  window.sr = ScrollReveal();

  // as a selector...
  sr.reveal('.animate-img', {
    container: '#og-case',
    scale: 1,
    distance: '30px'
  });

  // as a selector...
  sr.reveal('.animate-img', {
    container: '#booking-case',
    scale: 1,
    distance: '30px'
  });

  // as a selector...
  sr.reveal('.animate-img', {
    container: '#ess-case',
    scale: 1,
    distance: '30px'
  });

  // as a selector...
  sr.reveal('.animate-img', {
    container: '#cv',
    scale: 1,
    distance: '30px'
  });
});

Reveal.addEventListener('slidechanged', function (event) {
  // event.previousSlide, event.currentSlide, event.indexh, event.indexv

  if (event.indexh == 0) {
    $('body').removeClass('color-change');

    var audio = document.getElementById('song');
    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.muted = false;
    audio.play();
  } else if (event.indexh == 1) {
    $('.cases-menu-item a').addClass('active');
    $('.cv-menu-item a').removeClass('active');
  } else if (event.indexh == 5) {
    $('.cases-menu-item a').removeClass('active');
    $('.cv-menu-item a').addClass('active');
  }
});

// Add custom scrollbar to cases
function perfectScrollbar() {
  $('.case').perfectScrollbar({
    suppressScrollX: true
  });
}

// Color change for social media and menu icon
function colorChange() {

  $('body').addClass('color-change');

  // Turn music down when on next slide
  var audio = document.getElementById('song');
  audio.volume = 0;
}

// Toggle mute for music
function toggleMute() {
  var audio = document.getElementById('song');

  if (audio.muted) {
    audio.muted = false;
  } else {
    audio.muted = true;
  }
}

window.onload = function () {

  // Remove loader when window has loaded
  $('.loader').addClass('remove');

  // Play song
  var audio = document.getElementById('song');
  audio.play();
  audio.volume = 0.3;

  // Audio visualizer bar music
  var ctx = new webkitAudioContext();
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();

  audioSrc.connect(analyser);
  audioSrc.connect(ctx.destination);

  // get data
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  console.log(frequencyData);
  // Run animate bars function
  animateBars();

  // Render shake for backgrounds
  function animateBars() {
    requestAnimationFrame(animateBars);

    // update data in frequencyData
    analyser.getByteFrequencyData(frequencyData);

    // Animate audio bars
    var i;

    for (i = 0; i < 32; i++) {
      $('.visualizer__wrapper span:nth-child' + '(' + i + ')').css({
        'height': +frequencyData[i] + 'px',
        'margin-top': -frequencyData[i] / 3 + 'px'
      });
    }
  }
};

// Data for cases intros
var casesIntro = {
  "booking": {
    title: "Malmö opera group",
    background: "booking system <br /> for Malmös <br /> cultural life",
    link: "#booking-case",
    class: "booking-bg"
  },
  "og": {
    title: "Olsson & Gerthel",
    background: "e-commerce for <br /> high quality <br /> furniture",
    link: "#og-case",
    class: "og-bg"
  },
  "ess": {
    title: " European Spallation Source",
    background: "intranet for the worlds largest science research centre",
    link: "#ess-case",
    class: "ess-bg"
  }
};

function footerAnim() {
  TweenMax.to($('.case__header'), 0, { opacity: 0 });
  TweenMax.to($('.case__header'), 1, { opacity: 1, ease: Power1.easeInOut }, .2);
}

function menuAnim() {
  TweenMax.to($('.menu-btn--toggle'), 0, { opacity: 1, ease: Power1.easeInOut });
  TweenMax.to($('.menu-btn--toggle'), .2, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.social-media'), 0, { opacity: 1, ease: Power1.easeInOut });
  TweenMax.to($('.social-media'), .2, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.menu'), 0, { opacity: 0, visibility: 'visible' });
  TweenMax.to($('.menu'), .4, { opacity: 1, ease: Power1.easeInOut, onComplete: toggleMenuClass });
}

function toggleMenuClass() {
  $('body').addClass('active-menu');

  $('.menu-btn--hide').addClass('active');
  $('.menu-btn--toggle').addClass('none');

  TweenMax.to($('.social-media'), 0, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.social-media'), .2, { opacity: 1, ease: Power1.easeInOut });

  TweenMax.to($('.menu-btn--toggle'), 0, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.menu-btn--toggle'), .2, { opacity: 1, ease: Power1.easeInOut });
}

function menuAnimBack() {
  TweenMax.to($('.menu-btn--hide'), 0, { opacity: 1, ease: Power1.easeInOut });
  TweenMax.to($('.menu-btn--hide'), .2, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.social-media'), 0, { opacity: 1, ease: Power1.easeInOut });
  TweenMax.to($('.social-media'), .2, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.menu'), 0, { opacity: 1, visibility: 'visible' });
  TweenMax.to($('.menu'), .2, { opacity: 0, ease: Power1.easeInOut, onComplete: removeMenuClass });
}

function removeMenuClass() {
  $('body').removeClass('active-menu');

  $('.menu-btn--hide').removeClass('active');
  $('.menu-btn--toggle').removeClass('none');

  TweenMax.to($('.social-media'), 0, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.social-media'), .3, { opacity: 1, ease: Power1.easeInOut, delay: .2 });

  TweenMax.to($('.menu-btn--toggle'), 0, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.menu-btn--toggle'), .3, { opacity: 1, ease: Power1.easeInOut, delay: .2, onComplete: removeMenuStyle });
}

function removeMenuStyle() {
  TweenMax.to($('.social-media'), 0, { clearProps: "all" });
  TweenMax.to($('.menu-btn--toggle'), 0, { clearProps: "all" });
  TweenMax.to($('.menu-btn--hide'), 0, { clearProps: "all" });
  TweenMax.to($('.menu'), 0, { clearProps: "all" });
}

// Start animation for top video and case intro
function animStart() {

  // Cases and start animation
  TweenMax.to($('.cases'), 0, { opacity: 0 });
  TweenMax.to($('.start-section'), 0, { display: 'block' });
  TweenMax.to($('.start__text'), .6, { opacity: 0 });
  TweenMax.to($('.cases'), 0.6, { opacity: 1, ease: Power1.easeInOut, delay: 1, onComplete: removeStyleStart });
  TweenMax.to($('.mute-btn'), .6, { opacity: 0, ease: Power1.easeInOut });

  // Fade in menu btn with new color
  TweenMax.to($('.menu-btn'), 0, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.menu-btn'), 1, { opacity: 1, ease: Power1.easeInOut, delay: 1.3 });

  // Fade in social media with new color
  TweenMax.to($('.social-media'), 0, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.social-media'), 1, { opacity: 1, ease: Power1.easeInOut, delay: 1.3 });

  // Animate big button up top
  TweenMax.to($('.big-btn'), 0, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.big-btn'), 1, { opacity: 1, ease: Power1.easeInOut, delay: 1.6 });
}

// When going back from cases to start
function animStartBack() {
  TweenMax.to($('.start-section'), 6, { opacity: 0 });
  TweenMax.to($('.cases'), 0, { display: 'block' });
  TweenMax.to($('.cases'), .6, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.start__text'), 1, { opacity: 1 });
  TweenMax.to($('.start-section'), .6, { opacity: 1, ease: Power1.easeInOut, onComplete: removeStyleStart });
}

// Remove inline styling regarding animations when animation is done.
function removeStyleStart() {
  TweenMax.to($('.start-section'), 0, { clearProps: "all" });
  TweenMax.to($('.cases'), 0, { clearProps: "all" });
  TweenMax.to($('.start__text'), 0, { clearProps: "all" });
  TweenMax.to($('.mute-btn'), 0, { clearProps: "all" });
}

// Remove inline styling regarding animations when animation is done.
function removeStyleMenu() {
  TweenMax.to($('.menu-wrapper'), 0, { clearProps: "all" });
  TweenMax.to($('.menu'), 0, { clearProps: "all" });
  TweenMax.to($('.menu__item'), 0, { clearProps: "all" });
  TweenMax.to($('.line'), 0, { clearProps: "all" });
}

// When you enter a case
function caseAnimBooking() {
  TweenMax.to($('.case__title'), 0, { opacity: 0 });
  TweenMax.to($('.cases__menu'), .6, { x: 150, ease: Power1.easeInOut });
  TweenMax.to($('.big-btn'), .6, { y: -150, ease: Power1.easeInOut });
  TweenMax.to($('.cases'), 0, { display: 'block', background: '#fff' });
  TweenMax.to($('.after-case'), 0, { display: 'none' });
  TweenMax.to($('.read-btn'), .6, { opacity: 0, y: -100, ease: Power1.easeInOut });
  TweenMax.to($('.cases'), 0, { display: 'none', delay: .6 });
  TweenMax.to($('.letter-wrapper__blob'), 1, { opacity: 0 });
  TweenMax.to($('.cases__client'), 0, { visibility: 'hidden', display: 'none', ease: Power1.easeInOut });
  TweenMax.to($('.case__title'), .6, { opacity: 1, ease: Power1.easeInOut, delay: .6, onComplete: removeCaseIntroStyle });
  TweenMax.to($('.case__wrapper .cases__wrapper__article__text'), 0, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.case__wrapper .cases__wrapper__article__text'), .6, { opacity: 1, ease: Power1.easeInOut, delay: .6 });
  TweenMax.to($('.case__body'), .3, { y: -50, ease: Power1.easeInOut, delay: 1.5 });
}

// Remove inline styling regarding animations when animation is done.
function removeCaseIntroStyle() {
  TweenMax.to($('g'), 0, { clearProps: "all" });
  TweenMax.to($('.cases'), 0, { clearProps: "all" });
  TweenMax.to($('.read-btn'), 0, { clearProps: "all" });
  TweenMax.to($('.letter-wrapper__blob'), 0, { clearProps: "all" });
  TweenMax.to($('.cases__menu'), 0, { clearProps: "all" });
  TweenMax.to($('.cases__client'), 0, { clearProps: "all" });
  TweenMax.to($('.big-btn'), 0, { clearProps: "all" });
  TweenMax.to($('.after-case'), 0, { clearProps: "all" });

  $('.cases').removeClass('slow-down');
}

},{}]},{},[1]);
