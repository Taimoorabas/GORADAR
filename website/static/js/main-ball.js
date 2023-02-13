
var navBGManager = new NavBBGManager();



(function () {
  "use strict";

  var canvas;

  /*************
  GRAPHICS
  *************/

  //draw square primative
  //there is another function in the anim JS files which basically does the same thing, but
  //I'm not going to refactor anything right now (17/10/17). ;)
  function drawSquarePerfect( x, y, width, colour ) {
    ctx.fillStyle = colour;
    ctx.fillRect( x - ( width / 2 ), y - ( width / 2 ), width, width );
  }


  function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height );
  }



  /*************
  CANVAS SETUP
  *************/

  //make a canvas which is the size of the viewport
  //ID is the ID of the element to put the canvas in
  //this is for the particle ball only
  function createCanvas( ID ) {
    if( document.getElementById( ID ) ) {
      var newCanvas = document.createElement('canvas');
      newCanvas.id = 'js-canvas__ball';
      newCanvas.classList.add( 'fitLandscape', 'panel--intro__canvasBall' );
      document.getElementById('js-panel--intro').appendChild(newCanvas);
      return newCanvas;
    } else {
      console.log( 'canvas ID not present' );
    }
  }


    function setCanvasSize( newCanvas) {
    
      newCanvas.width = getViewportWidth() * getViewportDPI();
      newCanvas.height = ( getViewportHeight() * getViewportDPI() );

      return newCanvas;
    }


  function setCanvasContext( newCanvas ) {
    return newCanvas.getContext( '2d' );
  }



  /*************
  WINDOW SCROLL EVENT HANDLER
  *************/

  function scrollEventHandler( e ) {
    last_known_scroll_position = window.scrollY;
    updateLastViewportSize();

    if (!ticking) {
      window.requestAnimationFrame( function() {
        watchTracks();
        ticking = false;
      });
    }
    ticking = true;
  }



  /*************
  WINDOW RESIZE EVENT HANDLER

  If resize is vertical only, the canvas resizes
  If resize is horizontal (or horiz and vert at same time) the animation resets and
  updates, this is to compensate for iOS viewport resize.
  This does mean that f the window is resized vertically on a desktop system, the ball 
  doesn't get repositioned, but prob not enough time to solve this right now
  The resizing logic isn't inside the throttler as the canvas wouldn't resize at an even
  framerate
  *************/

  function resizeEventHandler( e ) {

    var threshRebuild = 60;

    //this is to stop a resize event being triggered when the toolbars didsappear on iOS
    //note I think this gets the whole page size, not the viewport
    var newSizeX = document.documentElement.clientWidth;
    var newSizeY = document.documentElement.clientHeight;

    //if resize happens on horiz, or if scroll pos is 0
    if( resizeXLast !== newSizeX || getCurrentScrollPos() == 0 ) {

      //reset the animation (this is throttled)
      if( !resizeTimeout ) {
        resizeTimeout = setTimeout( function() {
          resizeTimeout = null;
          setupAnim();
        }, resizeThrottleRate );
      }
    } else {
      //vertical resize - reset canvas only
      canvas = setCanvasSize( canvas);
    }
  }


  
  /*************
  WINDOW RESIZE- GET LAST VALUES
  *************/

  function updateLastViewportSize() {
    //note I think this gets the whole page size, not the viewport
    resizeXLast = document.documentElement.clientWidth;
    resizeYLast = document.documentElement.clientHeight;
  }


  /*************
  BALL
  *************/

  function Ball( width, x, y ) {
    this.width = width;

    this.x = x / 2;
    this.y = y / 2;

    //offset of specular highlight
    this.offsetX = -( width / 4.41 );
    this.offsetY = this.offsetX;

    this.particles = [];
    this.particleWidth = this.determineParticleWidth();
    this.frequency = 100;

    this.steps = 1;   //360 / steps

    this.explosionWidth = 500;

    this.ballImage = new Image();
    this.ballImage.src = "../../static/img/ball-temp-3.png"
  }


  //load and init particles
  Ball.prototype.initData = function() {
    
    //1000 is the resolution of the data
    var unit = ( this.width * 2 ) / 1000;

    for( var g = 0; g < particleJSON.length - 1; g+=2 ) {
      var newParticle = new Particle(
        ( particleJSON[ g ] * unit ) + ( this.x - ( this.width ) ),
        ( particleJSON[ g + 1 ] * unit ) + ( this.y - ( this.width ) ),
        this.particleWidth
      );

      newParticle.setDirs( this.x, this.y );

      this.particles.push(
        newParticle
      );
    }

  }


  //update ball
  Ball.prototype.update = function( distance ) {
    for( var f = 0; f < this.particles.length; f++ ) {
      this.particles[f].update( distance );
    }
  };


  //draw ball particles
  Ball.prototype.draw = function() {
    for( var f = 0; f < this.particles.length; f++ ) {
      this.particles[f].draw();
    }
  };


  Ball.prototype.drawImage = function() {
    ctx.drawImage( this.ballImage, this.x - ( this.width ), this.y - ( this.width), this.width * 2, this.width * 2 );
  }


  //determine particle width
  Ball.prototype.determineParticleWidth = function() {
    var particleWidth = ( this.width ) / 80;
    if( particleWidth < 1 ) {
      particleWidth = 1;
    }

    return particleWidth;
  }



  /*************
  LAYOUT MANAGER

  This manages layout/orientation, also sets the width of the orange particle
  *************/

  function LayoutManager() {
    this.orientation;
    this.ballWidth;
    this.viewportSizeX;
    this.viewportSizeY;

    this.setViewportSize();
    this.setOrientation();
    this.applyOrientation();
  }


  //this is probably duplicated elsewhere....?
  LayoutManager.prototype.setViewportSize = function() {
    this.viewportSizeX = document.documentElement.clientWidth;
    this.viewportSizeY = window.innerHeight;
  }


  //set orientation
  LayoutManager.prototype.setOrientation = function() {
    if( this.viewportSizeX > this.viewportSizeY ) {
      this.orientation = 'landscape';
    } else {
      this.orientation = 'portrait';
    }
  }


  //apply orientation class
  LayoutManager.prototype.applyOrientation = function() {
    var panelIntro = document.querySelector( '#js-panel--intro' );
    panelIntro.classList.remove( 'portrait' );
    panelIntro.classList.remove( 'landscape' );
    panelIntro.classList.add( this.orientation );
  }


  /*
    I was using a lot more CSS to lay this out, but it didn't work in MS Edge
    So using JS to position everything, which is a bit of a nightmare
  */  
  LayoutManager.prototype.setLayout = function(
      straplineLeft,
      straplineMid,
      arrowDown
    ) {
    if( this.orientation == 'landscape' ) {
      straplineLeft.clearStyles();
      straplineMid.clearStyles();
      arrowDown.clearStyles();

      //set arrow position via JS due to discrepancies between iOS and desktop browsers (when using CSS)
      arrowDown.setPosition( this.viewportSizeX / 2, this.viewportSizeY - 50, true );

      //approx col percentage
      var colWidth = .3333333;

      this.ballWidth = ( ( this.viewportSizeX * colWidth ) * getViewportDPI() ) / 2;

      if( this.ballWidth * 2 > this.viewportSizeY * .8 ) {
        this.ballWidth = this.viewportSizeY * .8 / 2;
      }

      //in this instance we can set most of the text positions in CSS
    } else {
      //clear styles
      straplineLeft.clearStyles();
      straplineMid.clearStyles();
      arrowDown.clearStyles();

      //set arrow position via JS due to discrepancies between iOS and desktop browsers
      arrowDown.setPosition( this.viewportSizeX / 2, this.viewportSizeY - 50, true );

      var arrowOffset = document.querySelector( '#js-panel--intro__arrowDown' ).getBoundingClientRect().top;

      this.ballWidth = ( ( this.viewportSizeX * getViewportDPI() ) / 2 ) * .7;

      //setting some text positions via JS due to discrepancies between iOS and desktop browsers
      straplineLeft.setPosition( 0, arrowOffset - 80, true );
      straplineMid.setPosition( 0, arrowOffset - 80, true );
    }
  }


  LayoutManager.prototype.setOrangeParticleWidth = function( width ) {
    //select the particle
    var orangeParticle = document.querySelector( '#js-orangeDot' );
    orangeParticle.style.width = width + 'px';
    orangeParticle.style.height = width + 'px';
    //set the width
  }


  /*************
  ELEMENT HANDLER

  This is to show/hide or position a HTML element
  *************/

  function ElementHandler( id ) {
    this.element = document.getElementById( id );
  }


  ElementHandler.prototype.showOrHide = function( showOrHide ) {
    if( showOrHide ) {
      this.element.classList.add( 'active' );
    } else {
      this.element.classList.remove( 'active' );
    }
  }


  //set position
  ElementHandler.prototype.setPosition = function( left, top, topOrBottom ) {
    this.element.style.position = 'absolute';
    this.element.style.left = left + 'px';
    if( topOrBottom ) {
      this.element.style.top = top  + 'px';
    } else {
      this.element.style.bottom = top + 'px';
    }
  }


  //clear inline styles
  ElementHandler.prototype.clearStyles = function() {
    this.element.setAttribute( 'style', '' );
  }



  /*************
  PARTICLE
  *************/

  function Particle( x, y, radius ) {
    this.radius = radius;
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.dirX;
    this.dirY;
    // this.colour = '#414141';
    this.colour = 'blue';
  }


  Particle.prototype.update = function( distance ) {
    this.x = this.startX + this.dirX * distance;
    this.y = this.startY + this.dirY * distance;
  };


  Particle.prototype.draw = function() {
    drawSquarePerfect(
      this.x,
      this.y,
      this.radius,
      this.colour
    );
  };


  Particle.prototype.setDirs = function( ballX, ballY ) {
    var adjacent = this.x - ballX;
    var opposite = this.y - ballY;
    var hyp = distanceBetweenPoints( this.x, this.y, ballX, ballY );

    //divide the adj/oppo by the hyp to make all run at same speed (adding in some extra sweetener)
    var speedX = ( adjacent / hyp ) + ( adjacent / 50 );
    var speedY = ( opposite / hyp ) + ( opposite / 50 );

    //assign the final speeds
    var randomSweetener = Math.random() + .2;
    this.dirX = ( speedX / 3 ) * randomSweetener;
    this.dirY = ( speedY / 3 ) * randomSweetener;
  };



  /*************
  EXPERIMENTAL - ANIM TRACKS

  Note this only applies to the "ball" track- need a more generic solution
  *************/

  //set each track to its height (currently set in data-height)
  function trackSetup() {
    for( var q = 0; q < tracks.length; q++ ) {
      var viewportWidth = getViewportWidth();
      //set track height
      var trackHeight = viewportWidth * 2.25;
      var maxHeight = tracks[ q ].getAttribute( 'data-maxHeight' );
      if( trackHeight > maxHeight ) {
        trackHeight == maxHeight;
      }
      tracks[ q ].style.height = trackHeight + 'px';
    }
  }


  //this is specifically for particle ball
  //haven't had the chance to refactor the anim track of the anim into this...
  function watchTracks() {
    //for each track
    for( var q = 0; q < tracks.length; q++ ) {
      var heightViewport = getViewportHeight();

      //track position vars
      var trackID = tracks[ q ].getAttribute( 'id' );
      var positionTrackTop = tracks[ q ].getBoundingClientRect().top;
      var positionTrackBottom = tracks[ q ].getBoundingClientRect().bottom;    //counts down until offscreen (0)
      
      //height of track
      var heightTrack = tracks[ q ].offsetHeight;

      //if at top
      if( last_known_scroll_position <= 0 ) {

        clearScreen();
        ball.drawImage();
        fixElement( tracks[ q ].children[0] );
        dot.showOrHide( false );
        straplineLeft.showOrHide( true );
        straplineMid.showOrHide( false );
        straplineRight.showOrHide( true );
        dotCont.showOrHide( false );
        arrowDown.showOrHide( true );
        wholeBallAnim.showOrHide( true );

        navBGManager.setZindex( 0 );

        //scrolling offscreen but still visible
      } else if( last_known_scroll_position + heightViewport > heightTrack && last_known_scroll_position + heightViewport < heightTrack + heightViewport ) {
        
        clearScreen();
        ball.update( clampAboveZero( last_known_scroll_position ) );
        ball.draw();
        arrowDown.showOrHide( false );
        straplineLeft.showOrHide( false );
        wholeBallAnim.showOrHide( true );
        straplineRight.showOrHide( false );

        navBGManager.setZindex( 0 );

        //if in portrait, slightly different
        if( getViewportWidth() < getViewportHeight() ) {
          straplineMid.showOrHide( false );
        } else {
          straplineMid.showOrHide( true );
        }

        //this is the point where it's about a third away from the bottom of the viewport
        if( last_known_scroll_position + heightViewport > heightTrack + ( heightViewport / 4 ) ) {

          wholeBallAnim.showOrHide( false );
          navBGManager.setZindex( 2 );

          //I think this stops these from appearing if you reload at page bottom then scroll up fairly quickly (before, they were appearing when scrolling up from the long anim)
          straplineLeft.showOrHide( false );
          //straplineMid.showOrHide( true );
          straplineRight.showOrHide( false );

          //if in portrait, slightly different
          if( getViewportWidth() < getViewportHeight() ) {
            straplineMid.showOrHide( false );
          } else {
            straplineMid.showOrHide( true );
          }

        }

        //track no longer visible
      } else if( last_known_scroll_position + heightViewport > heightTrack + heightViewport ) {

        wholeBallAnim.showOrHide( false );
        navBGManager.setZindex( 2 );

        //onscreen (bottom below viewport)
      } else {

        clearScreen();
        fixElement( tracks[ q ].children[0] );

        if( last_known_scroll_position > heightTrack / 6 ) {      //higher val = sooner

          straplineLeft.showOrHide( false );
          straplineMid.showOrHide( true );
          straplineRight.showOrHide( false );
          dotCont.showOrHide( true );
          ball.update( clampAboveZero( last_known_scroll_position ) );
          ball.draw();

        } else {

          //if in portrait, slightly different
          if( getViewportWidth() < getViewportHeight() ) {

            if( last_known_scroll_position > heightTrack / 12 ) {      //this is to change the timing a little in portrait mode
              
              straplineLeft.showOrHide( false );
              straplineMid.showOrHide( true );
              straplineRight.showOrHide( false );
              dotCont.showOrHide( true );
              ball.update( clampAboveZero( last_known_scroll_position ) );
              ball.draw();

            } else {

              ball.update( clampAboveZero( last_known_scroll_position ) );
              ball.draw();
              dot.showOrHide( true );
              arrowDown.showOrHide( true );
              wholeBallAnim.showOrHide( true );

            }

          } else {

            ball.update( clampAboveZero( last_known_scroll_position ) );
            ball.draw();
            dot.showOrHide( true );
            arrowDown.showOrHide( true );
            wholeBallAnim.showOrHide( true );

          }

        }
      }
    }
  }


  //these should be merged into ElementHandler, but they're used on the tracks rather than being used on the text elements I suppose...
  function fixElement( element ) {
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
  }


  //this actually sets to position: absolute bottom 0
  function unfixElement( element ) {
    element.style.position = 'absolute';
    element.style.bottom = 0;
    element.style.top = 'auto';
    element.style.left = '0';
  }



  /*************
  SETUP
  *************/

  /*
  This is a bit shit. There's a load of global vars below. Then they
  get assigned values in setupAnim(). This is so I can call setupAnim()
  again if window resizes. But this could do with a re-org...
  */

  //anim tracks
  var tracks = document.getElementsByClassName( 'js-track' );

  //for scroll event
  var last_known_scroll_position = 0;
  var ticking;

  //for resize event
  var resizeTimeout;
  var resizeThrottleRate;
  var resizeXLast;
  var resizeYLast;

  //canvas and context
  var canvas;
  var ctx;

  //layout (portrait or landscape)
  var layoutManager;

  //can the ball determine its width without needing this var?
  var ballWidth;
  
  var ball;

  var wholeBallAnim;        //this is so we can fade it out at the end

  var straplineLeft;
  var straplineMid;
  var straplineRight;
  //var canvasShowHide;

  var dotCont;
  var dot;

  var arrowDown;

  function setupAnim() {

    if( checkIsFrontPage() ) {

      //anim tracks
      tracks = document.getElementsByClassName( 'js-track' );

      //for scroll event
      //last_known_scroll_position = 0;
      ticking = false;

      //for resize event
      resizeThrottleRate = 500;

      window.addEventListener( 'scroll', scrollEventHandler );
      window.addEventListener( 'resize', resizeEventHandler );

      //create the canvas - maybe this should already be present, rather than being injected into the DOM
      if( !document.querySelector( '#js-panel--intro canvas' ) ) {
        canvas = createCanvas( 'js-panel--intro' );
        ctx = setCanvasContext( canvas );
      }

      wholeBallAnim = new ElementHandler( 'js-track--intro' );

      straplineLeft = new ElementHandler( 'js-intro__strapline--left' );
      straplineMid = new ElementHandler( 'js-intro__strapline--mid' );
      straplineRight = new ElementHandler( 'js-intro__strapline--right' );
      //canvasShowHide = new ElementHandler( 'js-canvas__ball' );

      dot = new ElementHandler( 'js-orangeDot' );
      dotCont = new ElementHandler( 'js-orangeDot__animCont' );

      arrowDown = new ElementHandler( 'js-panel--intro__arrowDown' );
      arrowDown.clearStyles();

      canvas = setCanvasSize( canvas );

      layoutManager = new LayoutManager();
      layoutManager.setLayout(
        straplineLeft,
        straplineMid,
        arrowDown
      );

      ballWidth = layoutManager.ballWidth;
      
      ball = new Ball( ballWidth, canvas.width, canvas.height );

      ball.initData();
      layoutManager.setOrangeParticleWidth( Math.ceil( ball.particleWidth ) );

      ball.ballImage.onload = function() {
        if (canvas.getContext) {

          trackSetup();
          watchTracks();

        } else {

          console.log( 'no context' );

        }
      }
    }
  }

  window.addEventListener( 'load', function() {
    setupAnim();
  });

}()); 