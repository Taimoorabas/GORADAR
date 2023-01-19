"use strict";

/*************
VERY IMPORTANT: I've hard coded elements of this to work in a certain way, in scrollIt()
*************/

/*************
ARROW SCROLLER

When you click on the arrow on the front page, it scrolsl down to the anim start
*************/

//scroll library
//https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
//vanilla JS smooth scroll to top function
function scrollIt(element, duration, easing, callback) {
  // define timing functions
  var easings = {
    easeInOutCubic: function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
  };

  // Returns document.documentElement for Chrome and Safari
  // document.body for rest of the world
  function checkBody() {
    document.documentElement.scrollTop += 1;
    var body = document.documentElement.scrollTop !== 0 ? document.documentElement : document.body;
    document.documentElement.scrollTop -= 1;
    return body;
  }

  var body = checkBody();
  var start = body.scrollTop;
  var startTime = Date.now();

  // Height checks to prevent requestAnimationFrame from infinitely looping
  // If the function tries to scroll below the visible document area
  // it should only scroll to the bottom of the document
  var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  var destination = documentHeight - element.offsetTop < windowHeight ? documentHeight - windowHeight : element.offsetTop;

  function scroll() {
    var now = Date.now();
    var time = Math.min(1, (now - startTime) / duration);
    var timeFunction = easings[easing](time);
    body.scrollTop = timeFunction * (destination - start) + start;

    if (body.scrollTop === destination) {
      callback();
      return;
    }
    requestAnimationFrame(scroll);
  }
  scroll();
}

/*********************
SCROLLING
*********************/

//bind scroll controls
function bindScrollClick( caller, scrollTo ) {

  //select the caller
  var btnScroll = document.querySelectorAll( caller );
  var elm = document.querySelector( scrollTo );

  //if caller and scrollTo are present on page, bind click
  if( btnScroll.length > 0 && elm ) {

    btnScroll[0].addEventListener('click', function ( e ) {
      e.preventDefault();

      if( getViewportWidth() >= getViewportHeight() ) {
        var scrollSpeed = 4500;
      } else {
        var scrollSpeed = 5500;
      }

      var elm = document.querySelector( scrollTo );
      scrollIt( elm, scrollSpeed, 'easeInOutCubic', function () {} );
    });
  }
}

//bind scroll clicks
bindScrollClick( '.js-arrowScrollDown', '.arrowScrollPoint' );