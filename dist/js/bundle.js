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

  $('.mute-btn').click(function () {
    toggleMute();
    $(this).toggleClass('active');
  });

  $('.big-btn').click(function () {
    animStart();
    $(this).addClass('big-btn--back');
    Reveal.next();
  });

  // Check if cases is the starting point, if so run anim start function
  if ($('.cases').hasClass('present')) {
    animStart();
    toggleMute();
  };
});

// Start animation for top video and case intro
function animStart() {
  var tl = new TimelineMax();

  TweenMax.to($('.start-section'), 2, { y: -100 + '%', scale: .4, force3D: true, ease: Power1.easeInOut });
  TweenMax.to($('.cases'), 1, { y: 0 + '%', force3D: true, ease: Power1.easeInOut, onComplete: colorChange });

  // Fade in menu btn with new color
  TweenMax.to($('.menu-btn'), .3, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.menu-btn'), 1, { opacity: 1, ease: Power1.easeInOut, delay: 1 });

  // Fade in social media with new color
  TweenMax.to($('.social-media'), .3, { opacity: 0, ease: Power1.easeInOut });
  TweenMax.to($('.social-media'), 1, { opacity: 1, ease: Power1.easeInOut, delay: 1 });

  // Animate big button up top
  TweenMax.to($('.big-btn'), 1, { y: 90, ease: Power1.easeInOut });
  TweenMax.to($('.big-btn'), 0, { opacity: 0, display: 'none', position: 'absolute', bottom: 'auto', top: 'auto', y: -150, ease: Power1.easeInOut, delay: .6 });
  TweenMax.to($('.big-btn'), 1, { display: 'block', opacity: 1, y: -50, ease: Power1.easeInOut, delay: 1.3 });
  TweenMax.to($('.big-btn svg'), .3, { margin: '45px auto 0 auto', animation: 'float-reverse 2s infinite ease-in-out', ease: Power1.easeInOut, delay: 1.3 });
}

// Color change for social media and menu icon
function colorChange() {

  // Add class to body to change colors on SM and Menu
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

// Audio visualizer bar music
window.onload = function () {
  var audio = document.getElementById('song');
  var ctx = new AudioContext();
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();

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

$(document).bind('mousemove', function (e) {
  var height = $('.letter-wrapper').outerHeight();
  var width = $('.letter-wrapper').outerWidth();

  $('#letter-wrapper__blob').css({
    left: e.pageX - width + 20,
    top: e.pageY - height + 250 // 250 is half the height of wrapper
  });
});

},{}]},{},[1]);
