$(document).ready(function () {

  $('#start').parallax({
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
  });
});

// $(window).scroll(function() {
//   console.log('hej');
// });

// Start animation for top video and case intro

function animStart() {
  var tl = new TimelineMax();

  TweenMax.to($('.start-section'), 2, {y:-100 + '%', scale: .4, force3D:true , ease:Power1.easeInOut});
  TweenMax.to($('.cases'), 1, {y:0 + '%', force3D:true , ease:Power1.easeInOut, onComplete: colorChange});

  // Fade in menu btn with new color
  TweenMax.to($('.menu-btn'), .3, {opacity: 0, ease:Power1.easeInOut});
  TweenMax.to($('.menu-btn'), 1, {opacity: 1, ease:Power1.easeInOut, delay:1});

  // Fade in social media with new color
  TweenMax.to($('.social-media'), .3, {opacity: 0, ease:Power1.easeInOut});
  TweenMax.to($('.social-media'), 1, {opacity: 1, ease:Power1.easeInOut, delay:1});


  // Animate big button up top
  TweenMax.to($('.big-btn'), 1, {y: 90, ease:Power1.easeInOut});
  TweenMax.to($('.big-btn'), 0, {opacity: 0, display: 'none', position: 'absolute', bottom: 'auto', top: 'auto', y: -150, ease:Power1.easeInOut, delay: .6});
  TweenMax.to($('.big-btn'), 1, {display: 'block', opacity: 1, y: -50, ease:Power1.easeInOut, delay: 1.3});
  TweenMax.to($('.big-btn svg'), .3, {margin: '45px auto 0 auto', animation: 'float-reverse 2s infinite ease-in-out', ease:Power1.easeInOut, delay: 1.3});
}

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
        'height' : + frequencyData[i] + 'px',
        'margin-top' : -frequencyData[i] / 3 + 'px'
      });
    }
  }

  animateBars();
};
