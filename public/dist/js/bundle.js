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

  // Slider
  $('.cases__menu .btn-round').click(function () {

    var caseNumber = $(this).data('case');
    var casesClient = $('.cases__client');
    var casesBg = $('.cases__wrapper__article__text');
    var casesRead = $('.read-btn');
    var letterWrapper = $('.letter-wrapper');

    // Add active class to pagination
    $('.cases__menu .btn-round').removeClass('active');
    $(this).addClass('active');

    // Add active class to current case
    $('.cases g').attr("class", "");
    $('.cases #' + caseNumber).attr("class", "active");

    // Fade out & in bg and client text on switch
    casesBg.hide();
    casesClient.hide();

    casesBg.fadeIn(1000);
    casesClient.fadeIn(1000);

    // Change text for case intros
    if (caseNumber == 'og') {
      casesClient.text(casesIntro.og.title);
      casesBg.html(casesIntro.og.background);
      casesRead.attr('href', casesIntro.og.link);
      $('.letter-wrapper').removeClass('ess-bg');
      $('.letter-wrapper').removeClass('booking-bg');
      $('.letter-wrapper').addClass('og-bg');
    } else if (caseNumber == 'booking') {
      casesClient.text(casesIntro.booking.title);
      casesBg.html(casesIntro.booking.background);
      casesRead.attr('href', casesIntro.booking.link);
      $('.letter-wrapper').removeClass('ess-bg');
      $('.letter-wrapper').removeClass('og-bg');
      $('.letter-wrapper').addClass('booking-bg');
    } else if (caseNumber == 'ess') {
      casesClient.text(casesIntro.ess.title);
      casesBg.html(casesIntro.ess.background);
      casesRead.attr('href', casesIntro.ess.link);
      $('.letter-wrapper').addClass('ess-bg');
      $('.letter-wrapper').removeClass('og-bg');
      $('.letter-wrapper').removeClass('booking-bg');
    }
  });

  // Toggle menu
  $('.menu-btn--toggle').click(function () {
    $('.menu-btn--hide').addClass('active');
    $('.menu-btn--toggle').addClass('none');

    var audio = document.getElementById('song');
    audio.volume = 0.05;
    menuAnim();
  });

  $('.menu__item a').click(function () {
    menuAnimBack();

    $('.menu-btn--hide').removeClass('active');
    $('.menu-btn--toggle').removeClass('none');
  });

  // Toggle menu back
  $('.menu-btn--hide').click(function () {
    $('.menu-btn--hide').removeClass('active');
    $('.menu-btn--toggle').removeClass('none');

    var audio = document.getElementById('song');
    audio.volume = 0.2;
    menuAnimBack();
  });

  // Case anim start
  $('.read-btn').click(function () {
    var caseId = $(this).attr('href');

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
  }
});

function footerAnim() {
  TweenMax.to($('.case__header'), 0, { opacity: 0 });
  TweenMax.to($('.case__header'), 1, { opacity: 1, ease: Power1.easeInOut }, .2);
}

function menuAnim() {
  TweenMax.to($('.menu-wrapper'), .3, { zIndex: 75, background: '#fff' });
  TweenMax.to($('.menu'), 0, { visibility: 'visible', delay: .2 });
  TweenMax.to($('.menu__item'), 0, { x: -350 + '%' });
  TweenMax.to($('.line'), .6, { height: 100 + '%', ease: Circ.easeInOut, delay: .1 });

  TweenMax.staggerTo($('.menu__item'), 1, { x: '0' + '%', ease: Power1.easeInOut }, .2);
}

function menuAnimBack() {
  TweenMax.staggerTo($('.menu__item'), 1, { x: -350 + '%', ease: Circ.easeInOut }, -.15);
  TweenMax.to($('.line'), .6, { height: 0 + '%', ease: Circ.easeInOut, delay: .6 });

  TweenMax.to($('.menu-wrapper'), 0, { zIndex: 75, background: 'transparent', delay: 1 });
  TweenMax.to($('.menu'), 0, { visibility: 'hidden', delay: 1, onComplete: removeStyleMenu });
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
  TweenMax.to($('.cases__client'), .6, { opacity: 0, y: 100, ease: Power1.easeInOut });
  TweenMax.to($('.case__title'), .6, { opacity: 1, ease: Power1.easeInOut, delay: .6, onComplete: removeCaseIntroStyle });
}

// Remove inline styling regarding animations when animation is done.
function removeCaseIntroStyle() {
  TweenMax.to($('.cases'), 0, { clearProps: "all" });
  TweenMax.to($('.read-btn'), 0, { clearProps: "all" });
  TweenMax.to($('.letter-wrapper__blob'), 0, { clearProps: "all" });
  TweenMax.to($('.cases__menu'), 0, { clearProps: "all" });
  TweenMax.to($('.cases__client'), 0, { clearProps: "all" });
  TweenMax.to($('.big-btn'), 0, { clearProps: "all" });
  TweenMax.to($('.after-case'), 0, { clearProps: "all" });
}

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

  $('.loader').addClass('remove');

  // Audio visualizer bar music
  var audio = document.getElementById('song');
  var ctx = new AudioContext();
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();

  audio.play();
  audio.volume = 0.3;
  audioSrc.connect(analyser);
  audioSrc.connect(ctx.destination);

  // get data
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);

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

  animateBars();
};

// Globals:
var deltas = [null, null, null, null, null, null, null, null, null],
    timer = null,
    lock = 0,
    seen = 0;

// Search for an inertial peak (which represents a trackpade mouse wheel gesture):
function hasPeak() {

  // Decrement the lock.

  if (lock > 0) {
    lock--;
    return false;
  }

  // If the oldest delta is null, there can't be a peak yet; so return.

  if (deltas[0] == null) return false;

  // Otherwise, check for a peak signature where the middle delta (4)
  // is the highest among all other deltas to the left or right.

  if (deltas[0] < deltas[4] && deltas[1] <= deltas[4] && deltas[2] <= deltas[4] && deltas[3] <= deltas[4] && deltas[5] <= deltas[4] && deltas[6] <= deltas[4] && deltas[7] <= deltas[4] && deltas[8] < deltas[4]) return true;

  // If no peak is found, return false.

  return false;
}

// Handle mouse wheel events:
$('.cases').on('mousewheel DOMMouseScroll', function (e) {

  // Convert the delta into a usable number (pretty standard).

  var delta = e.type == 'mousewheel' ? e.originalEvent.wheelDelta * -1 : 40 * e.originalEvent.detail;

  // Check for an inertial peak. And if found, lock the peak
  // checking for 10 more events (decremented in hasPeak on
  // each new event) to prevent the sample window from registering
  // true more than once for each peak.

  if (hasPeak()) {
    lock = 10;
    seen++;
  }

  // Otherwise, check for normal mouse wheel events by assuming
  // past and present deltas would be 120 exactly, and skip nulls.

  else if ((deltas[8] == null || deltas[8] == 120) && Math.abs(delta) == 120)

      // @ To do
      // Make this more dynamic - this is slide change on scroll
      var casesClient = $('.cases__client');
  var casesBg = $('.cases__wrapper__article__text');
  var casesRead = $('.read-btn');
  var letterWrapper = $('.letter-wrapper');

  $('.cases g').attr("class", "");
  $('.cases #og').attr("class", "active");

  casesClient.text(casesIntro.og.title);
  casesBg.html(casesIntro.og.background);
  casesRead.attr('href', casesIntro.og.link);
  $('.letter-wrapper').removeClass('ess-bg');
  $('.letter-wrapper').removeClass('booking-bg');
  $('.letter-wrapper').addClass('og-bg');

  // Shift the deltas backward and add the newest (maintaining the sample window).

  deltas.shift();
  deltas.push(Math.abs(delta));
});

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

},{}]},{},[1]);
