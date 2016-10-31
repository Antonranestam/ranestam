(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {

  $('#music-player__mute').click(function () {
    toggleMute();
    $(this).toggleClass('active');
  });

  // loaderTimeline();
  initialiseMediaPlayer();

  // Run shuffle letters animation
  shuffle();

  // Run progress bar function
  progressBar();

  // Change all data for song number 1
  $('.title-abbr').text(musicData.song0.abbr);
  $('.music-player__desc').text(musicData.song0.desc);
  $('.music-player__song').text(musicData.song0.musicname);
  $('#music source').attr('src', musicData.song0.url);
  $('body').attr('data-color', musicData.song0.class);
  $('.music-player__vis').attr('data-color', musicData.song1.class);
  $('.bg img').attr('src', musicData.song0.bg);
});

// Shuffle letters function
function shuffle() {
  $('.title span').shuffleLetters();
  $('.title-abbr').shuffleLetters();
}

// Init media player
var mediaPlayer;

function initialiseMediaPlayer() {
  mediaPlayer = document.getElementById('music');
  mediaPlayer.load();
  mediaPlayer.play();
}

// Toggle mute for music
function toggleMute() {

  if (mediaPlayer.muted) {
    mediaPlayer.muted = false;
  } else {
    mediaPlayer.muted = true;
  }
}

// Global var for song number
var songNumber = 0;

// Add 1 everytime function is called to songNumber variable
function songNumberFunction() {
  songNumber++;
}

// Update progress bar
function progressBar() {

  $('#music').on('timeupdate', function () {
    // Change value to 100 for perfect transition
    var musicTime = 100 * this.currentTime / this.duration;

    $('#progress-bar').attr("value", musicTime);

    // Callback for transition
    if (musicTime == '100') {
      songNumberFunction();
      switchMusic();
    }
  });
}

// Switch music based on song number
function switchMusic() {

  // Reload media player for new song
  mediaPlayer.load();

  // Can be made better but my lacking JS skills aint workin out :(
  if (songNumber == 1) {

    // Change background picture when fade out is done
    var changeBg = function changeBg() {
      $('.bg img').attr('src', musicData.song1.bg);
    };

    // Change all data for next song
    $('.title-abbr').text(musicData.song1.abbr);
    $('.music-player__desc').text(musicData.song1.desc);
    $('.music-player__song').text(musicData.song1.musicname);
    $('#music source').attr('src', musicData.song1.url);
    $('body').attr('data-color', musicData.song1.class);
    $('.music-player__vis').attr('data-color', musicData.song0.class);

    // Make background picture transition seem more seemless
    var tl = new TimelineMax();

    tl.to($('.bg img'), .2, { opacity: 0, ease: Power1.easeInOut, onComplete: changeBg });
    tl.to($('.bg img'), .2, { opacity: 1, ease: Power1.easeInOut });
  }

  // Shuffle letters for abbr
  $('.title-abbr').shuffleLetters();
}

// // Animate loader
function loaderTimeline() {
  var loaderTl = new TimelineMax();
  var myPath = document.getElementById("loader");
  segment = new Segment(myPath);
  var loader = $('.loader-wrapper');
  var circle1 = $('.circle-1');
  var circle2 = $('.circle-2');
  var musicContent = $('.music .title');
  var loaderSectionTop = $('.loader-wrapper__section.top');
  var loaderSectionBottom = $('.loader-wrapper__section.bottom');
  var loaderSectionLeft = $('.loader-wrapper__section.left');
  var loaderSectionRight = $('.loader-wrapper__section.right');
  var overshoot = 1;
  var period = 0.75;

  loaderTl.set(musicContent, { css: { opacity: 0 } }).to(myPath, 10, { strokeDasharray: segment.strokeDasharray('0%', '0%'), ease: Expo.easeInOut }).to(circle1, 1, { scale: 0.2, ease: Elastic.easeOut, easeParams: [overshoot, period] }).to(circle1, .5, { scale: 85, ease: Expo.easeIn }, '-=.2').to(circle2, .3, { css: { scale: 0, transformOrigin: '50% 50%' }, ease: Expo.easeIn }, '-=1.5').to(loaderSectionTop, .5, { css: { y: '-100%' }, ease: Expo.easeIn }, '-=.8').to(loaderSectionBottom, .5, { css: { y: '100%' }, ease: Expo.easeIn }, '-=.8').to(loaderSectionLeft, .5, { css: { x: '-100%' }, ease: Expo.easeIn }, '-=.8').to(loaderSectionRight, .5, { css: { x: '100%' }, ease: Expo.easeIn }, '-=.8').set(loader, { css: { display: 'none' } }).set(musicContent, { css: { opacity: 1 } });
}

// Audio visualizer bar music player
window.onload = function () {
  var ctx = new AudioContext();
  var audio = document.getElementById('music');
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();

  audioSrc.connect(analyser);
  audioSrc.connect(ctx.destination);

  // get data
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);

  // Render shake for backgrounds
  function renderShake() {
    requestAnimationFrame(renderShake);

    // update data in frequencyData
    analyser.getByteFrequencyData(frequencyData);
    console.log(frequencyData);
    // Animate transform
    $('.bg__one').css('transform', 'translateX(' + -frequencyData[5] / 25 + 'px)');

    $('.bg__two').css('transform', 'translateX(' + frequencyData[1] / 20 + 'px)', 'translateY(' + frequencyData[1] / 15 + 'px)');

    $('.bg__three').css('transform', 'translateX(' + -frequencyData[2] / 25 + 'px)');
  }

  function renderAudioVis() {
    requestAnimationFrame(renderAudioVis);

    // update data in frequencyData
    analyser.getByteFrequencyData(frequencyData);

    $('.music-player__vis__blob--one').css('transform', 'translateY(' + -frequencyData[1] / 13 + 'px)');
    $('.music-player__vis__blob--two').css('transform', 'translateY(' + -frequencyData[2] / 13 + 'px)');
    $('.music-player__vis__blob--three').css('transform', 'translateY(' + -frequencyData[3] / 13 + 'px)');
    $('.music-player__vis__blob--four').css('transform', 'translateY(' + -frequencyData[4] / 13 + 'px)');
    $('.music-player__vis__blob--five').css('transform', 'translateY(' + -frequencyData[5] / 13 + 'px)');
    $('.music-player__vis__blob--six').css('transform', 'translateY(' + -frequencyData[6] / 13 + 'px)');
  }

  renderShake();
  renderAudioVis();
};

// Store all data in objects so we can fetch.
var musicData = {
  "song0": {
    abbr: "form",
    desc: "feeling something with",
    musicname: "biggie - juciy",
    url: "music/biggie.mp3",
    bg: "img/biggie.jpg",
    class: "pink"
  },
  "song1": {
    abbr: "design",
    desc: "answering design questions with",
    musicname: "charles bradley - nobody but you",
    url: "music/charles.mp3",
    bg: "img/charles.jpg",
    class: "blue"
  }
};

},{}]},{},[1]);
