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
    limitY: 0,
  });

  $('.mute-btn').click(function () {
    toggleMute();
    $(this).toggleClass('active');
  });

  $('.big-btn--down').click(function () {
    animStart();
    $(this).addClass('big-btn--up');

    Reveal.next();
  });

  // Check if cases is the starting point, if so run anim start function
  if($('.cases').hasClass('present')){
    animStart();
    toggleMute();
  };

  if($('.case').hasClass('present')){
    toggleMute();
  };

  perfectScrollbar();

  // Slider
  $('.cases__menu .btn-round').click(function() {

    var caseNumber = $(this).data('case');
    var casesClient = $('.cases__client');
    var casesBg = $('.cases__wrapper__article__text');
    var casesRead = $('.read-btn');

    // Add active class to pagination
    $('.cases__menu .btn-round').removeClass('active');
    $(this).addClass('active');

    // Add active class to current case
    $('.cases g').attr("class", "");
    $('.cases #' + caseNumber).attr("class", "active");

    // Fade out & in bg and client text on switch
    casesBg.hide();
    casesClient.hide();

    casesBg.fadeIn(1000)
    casesClient.fadeIn(1000);

    // Change text for case intros
    if (caseNumber == 'og') {
      casesClient.text(casesIntro.og.title);
      casesBg.html(casesIntro.og.background);
      casesRead.attr('href', casesIntro.og.link);
    }
    else if (caseNumber == 'booking') {
      casesClient.text(casesIntro.booking.title);
      casesBg.html(casesIntro.booking.background);
      casesRead.attr('href', casesIntro.booking.link);
    }
    else if (caseNumber == 'ess') {
      casesClient.text(casesIntro.ess.title);
      casesBg.html(casesIntro.ess.background);
      casesRead.attr('href', casesIntro.ess.link);
    }
  });

  // Case anim start
  $('.read-btn').click(function () {
    var caseId = $(this).attr('href');

    if (caseId == '#og-case') {
    }
    else if (caseId == '#booking-case') {
      caseAnimBooking();
    }
    else if (caseId == '#ess-case') {
    }
  });
});

// When you enter a case
function caseAnimBooking() {
  TweenMax.to($('.case__title'), 0, {opacity: 0});

  TweenMax.to($('.cases__menu'), .6, {x: 150, ease:Power1.easeInOut});
  TweenMax.to($('.big-btn'), .6, {y: -150, ease:Power1.easeInOut});
  TweenMax.to($('.cases'), 0, {display: 'block'});
  TweenMax.to($('.read-btn'), .6, {opacity: 0, y: -100, ease:Power1.easeInOut});
  TweenMax.to($('.cases'), 0, {display: 'none', delay: .6});
  TweenMax.to($('.letter-wrapper__blob'), 1, {opacity: 0});
  TweenMax.to($('.cases__client'), .6, {opacity: 0, y: 100, ease:Power1.easeInOut});

  TweenMax.to($('.case__title'), .6, {opacity: 1, ease:Power1.easeInOut, delay: .6, onComplete: removeCaseIntroStyle});
}

// Remove inline styling regarding animations when animation is done.
function removeCaseIntroStyle() {
  TweenMax.to($('.cases'), 0, {clearProps:"all"});
  TweenMax.to($('.read-btn'), 0, {clearProps:"all"});
  TweenMax.to($('.letter-wrapper__blob'), 0, {clearProps:"all"});
  TweenMax.to($('.cases__menu'), 0, {clearProps:"all"});
  TweenMax.to($('.cases__client'), 0, {clearProps:"all"});
}

Reveal.addEventListener( 'slidechanged', function( event ) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    console.log('hej')
});

// Add custom scrollbar to cases
function perfectScrollbar() {
  $('.case').perfectScrollbar({
    suppressScrollX: true
  });
}

// Start animation for top video and case intro
function animStart() {

  // Cases and start animation
  TweenMax.to($('.cases'), 0, {y:100 + '%', force3D:true, ease:Power1.easeInOut});
  TweenMax.to($('.start-section'), 2, {display: 'block', y:-70 + '%', scale: .4, force3D:true, ease:Power1.easeInOut});
  TweenMax.to($('.cases'), 1, {display: 'block', y:0 + '%', force3D:true, ease:Power1.easeInOut, onComplete: colorChange});
  TweenMax.to($('.start-section'), 0, {y:0 + '%', scale: 1, force3D:true , ease:Power1.easeInOut, delay: 2, onComplete: removeStyleStart});

  // Fade in menu btn with new color
  TweenMax.to($('.menu-btn'), .3, {opacity: 0, ease:Power1.easeInOut});
  TweenMax.to($('.menu-btn'), 1, {opacity: 1, ease:Power1.easeInOut, delay:1});

  // Fade in social media with new color
  TweenMax.to($('.social-media'), .3, {opacity: 0, ease:Power1.easeInOut});
  TweenMax.to($('.social-media'), 1, {opacity: 1, ease:Power1.easeInOut, delay:1});


  // Animate big button up top
  TweenMax.to($('.big-btn'), 1, {y: 90, ease:Power1.easeInOut});
  TweenMax.to($('.big-btn'), 0, {opacity: 0, display: 'none', position: 'absolute', bottom: 'auto', top: 'auto', y: -150, ease:Power1.easeInOut, delay: .1});
  TweenMax.to($('.big-btn'), 1, {display: 'block', opacity: 1, y: -50, ease:Power1.easeInOut, delay: .6});
  TweenMax.to($('.big-btn svg'), .3, {margin: '45px auto 0 auto', animation: 'float-reverse 2s infinite ease-in-out', ease:Power1.easeInOut});
}

// Color change for social media and menu icon
function colorChange() {

  // Add class to body to change colors on SM and Menu
  $('body').addClass('color-change');

  // Turn music down when on next slide
  var audio = document.getElementById('song');
  audio.volume = 0;
}

// Remove inline styling regarding animations when animation is done.
function removeStyleStart() {
  TweenMax.to($('.start-section'), 0, {clearProps:"all"});
  TweenMax.to($('.cases'), 0, {clearProps:"all"});
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

$(document).bind('mousemove', function(e){
  var height = $('.letter-wrapper').outerHeight();
  var width = $('.letter-wrapper').outerWidth();

  $('.letter-wrapper__blob').css({
     left:  e.pageX - width + 20,
     top:   e.pageY - height + 250 // 250 is half the height of wrapper
  });
});

// Data for cases intros
var casesIntro = {
  "booking": {
    title:"Malmö opera group",
    background:"booking system <br /> for Malmös <br /> cultural life. ",
    link:"#booking-case",
  },
  "og": {
    title:"Olsson & Gerthel",
    background:"E-commerce for <br /> high quality <br /> furniture",
    link:"#og-case",
  },
  "ess": {
    title:" European Spallation Source",
    background:"intranet for the worlds largest science research centre ",
    link:"#ess-case",
  },
}
