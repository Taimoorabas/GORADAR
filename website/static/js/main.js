"use strict";

/*************
MAIN

This is the overall main.js file for the whole site
*************/

//add no-touch class if not a touch device
if ( ("ontouchstart" in document.documentElement) ) {
  document.documentElement.className += "touchDevice";
} else {
  document.documentElement.className += "no-touch";
}

//this is a bit of a copy of Environment.prototype.setOrientation(), but when needs must...
function setOrientationBodyClass() {

  //remove current body class
  document.body.classList.remove( 'texts--portrait', 'texts--landscape' );

  var screenWidth = getViewportWidth();
  var screenHeight = getViewportHeight();

  if( screenWidth >= screenHeight ) {
    document.body.classList.add( 'texts--landscape' );
  } else if( screenWidth < screenHeight ) {
    document.body.classList.add( 'texts--portrait' );
  }
}


//there are at elast 3 resize events in the whole project. They need to be consolidated into one.
window.addEventListener( 'resize', function() {
  setOrientationBodyClass();
});


//stuff to be done before window.load
document.addEventListener("DOMContentLoaded", function() {
  setOrientationBodyClass();
});