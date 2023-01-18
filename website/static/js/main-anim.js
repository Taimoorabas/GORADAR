"use strict";

/*************
MAIN
*************/

//it's a bit shit that this is being called to draw the first frame, and then the same commands again within the animation loop
function resetAll() {
  environment.setup();
  timeline.reset();
  controller.update( timeline );
  controller.draw( environment, timeline );
}


//vars
if( checkIsFrontPage() ) {

  var environment = new Environment( '#canvas-anim' );
  var timeline = new Timeline();
  var controller = new Controller();
  var meterController = new MeterController();
  var boxController = new BoxController();
  var pingController = new PingController();
  var pipMeister = new Pipmeister();

  meterController.hideAllMeters();

}


//scroll anim loop
//this is where most updates take place
window.addEventListener( 'scroll', function() {

  if( checkIsFrontPage() ) {

    pipMeister.checkSlide();

    //if the anim track is within view
    //all the scrolledIn/scrollingIn stuff is to fix a problem re the anim going glitchy on first run if you scroll down then back up quickly
    if( environment.trackWatcher() == 'scrolledIn' || environment.trackWatcher() == 'scrollingIn' ) {
      timeline.update();

      controller.update( timeline );
      meterController.update( timeline );

      boxController.update();
      pingController.update();

    }

  }
  
} );

//this is to fix Safari (and Safari webviews) being a fucking bag of shite!
//See https://hackernoon.com/onresize-event-broken-in-mobile-safari-d8469027bf4d
var resizeTimeout;

window.addEventListener( 'resize', function() {

  if( checkIsFrontPage() ) {

    clearTimeout( resizeTimeout );

    //this is to fix Safari (and Safari webviews) being a fucking bag of shite!
    resizeTimeout = setTimeout( function() {
      resetAll();
    }, 500 );

  }

});



//update loop
//this is where most drawing takes place (as some animations are not tied to scroll, so can't put all draing in the scrolling loop)

function main() {

  //dot jiggle has to be independent of everything
  controller.updateJiggle();

  //this is a hack to fix the anim sometimes not resizing correctly... and it seems to work.
  environment.setAnimTrackPos();

  //if the anim track is within view
  if( environment.trackWatcher() == 'scrolledIn' ) {

    //fix the cont
    environment.fixAnimCont();

    boxController.update();
    pingController.update();

    environment.clearCanvas();
    environment.canvasClip();

    controller.draw( environment, timeline );

    boxController.draw();
    pingController.draw();

  } else if( environment.trackWatcher() == 'scrollingIn' ) {    

    environment.clearCanvas();
    environment.canvasClip();
    controller.draw( environment, timeline );
    environment.unfixAnimCont();

  } else {

    //the anim track is not within view. Unfix the cont.
    environment.unfixAnimCont();

  }

  window.requestAnimationFrame( main );
}


window.addEventListener( 'load', function() {

  bodyFadeIn();

  //start
  if( checkIsFrontPage() ) {
    resetAll();
    window.requestAnimationFrame( main );  

    pipMeister.checkSlide();
  }

});