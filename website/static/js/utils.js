/*************
UTILS
*************/


//check is front page
function checkIsFrontPage() {
    if( document.body.classList.contains( 'frontPage' ) ) {
      return true;
    }
    return false;
  }
  
  //degrees to radians util function
  Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
  };
  
  
  //measure time taken to do something
  function timeTaken( t0, t1, task ) {
    console.log( task + " took " + (t1 - t0) + " milliseconds." );
  }
  
  
  //return the distance between two points
  function distanceBetweenPoints( x1, y1, x2, y2 ) {
    return Math.sqrt( ( (x2 - x1) * (x2 - x1) ) + ( (y2 - y1) * (y2 - y1) ) );
  }
  
  //check difference between two numbers (always return positive)
  /*function differenceBetweenNumbers( num1, num2 ) {
    return (num1 > num2)? num1-num2 : num2-num1;
  }*/
  
  //maybe these wrappers aren't needed? Hmm...
  function getViewportHeight() {
    return window.innerHeight;
  }
  
  function getViewportWidth() {
    return window.innerWidth;
  }
  
  function getViewportDPI() {
    return window.devicePixelRatio;
  }
  
  //stop a number from going below zero
  function clampAboveZero( clampValue ) {
    if( clampValue < 0 ) {
      clampValue = 0;
    }
    return clampValue;
  }