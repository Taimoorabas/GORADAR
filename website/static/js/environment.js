"use strict";

/*************
ENVIRONMENT
*************/


//I don't think this object should really include the canvas...
function Environment( canvasID ) {
  this.canvas = document.querySelector( canvasID );
  this.context = this.canvas.getContext( '2d' );

  this.HTMLtextbox = document.querySelector( '.js-textbox' );

  this.HTMLtextHeadings = document.querySelectorAll( '.js-textbox h3' );
  this.HTMLtextParagraphs = document.querySelectorAll( '.js-textbox p' );

  //where text top should be
  this.textTop = 0;

  //general page padding, unrelated to size of square
  this.pagePadding = 0;       

  //size of anim square
  this.squareWidth;
  this.squareHeight;

  //position of anim square
  this.squareTop = 0;
  this.squareLeft = 0;

  //padding around anim square
  this.squarePadding = 0;

  //where to start drawing (relative to anim square)
  this.drawStartX = 0;
  this.drawStartY = 0;

  //string: portrait, landscape or square
  this.orientation;

  //size of square grid
  this.x = 10;
  this.y = 10;
  this.cellWidth;
  this.cellHeight;

  //whether to draw just in square or across whole canvas
  this.clipSquare = true;

  //whether the clip has been reset (see clipping funciton below)
  this.clipReset = false;

  //anim track - the ratio of viewport height to length of anim track
  this.animTrackHTML = document.querySelector( '.longAnimTrack' );

  this.animHTML = document.querySelector( '.container--longAnim' );

  //position of anim track onscreen
  this.animTrackPosY;

  //meters setup

  //temp disabled so I can make the scrolly version- but might need if I have to do different versions for portrait and landscape
  //this.HTMLMeterContainer = document.querySelector( '.js-meters' );
  this.HTMLMeterContainerWidth;
  this.HTMLMeterContainerHeight;

  this.HTMLMeterLabel = document.querySelectorAll( '.meter__label' );
  this.HTMLMeterInner = document.querySelectorAll( '.meter__inner' );

  this.HTMLMeterLabelFloatLandscape = document.querySelectorAll( '.js-floatLandscape' );

  //textblocker- this ensures the text can't be seen behind the anim in portrait mode
  this.HTMLTextBlocker = document.querySelector( '.textBlockerPortrait' );

  //meters - second one (quantity)
  this.meterWidthQuant;
  this.meterLabelWidthQuant;

  //meters - all
  this.meterFontSizeMain;
  this.meterFontSizeLabel;

  //meter positioners (in portrait, they get fixed to the top of the square)
  this.meterPositioners = document.querySelectorAll( '.js-meterPositioner' );


  //this is a magic number by which to position the text and meters left pad in portrait
  this.magicNumberPadMultiplier = 2.8

}


Environment.prototype.setCanvasSize = function() {
  this.canvas.width = getViewportWidth() * getViewportDPI();
  this.canvas.height = ( getViewportHeight() * getViewportDPI() );
}



Environment.prototype.setOrientation = function() {
  var screenWidth = getViewportWidth();
  var screenHeight = getViewportHeight();

  if( screenWidth > screenHeight ) {
    this.orientation = 'landscape';
  } else if( screenWidth < screenHeight ) {
    this.orientation = 'portrait';
  } else {
    //square is considered landscape
    this.orientation = 'landscape';
  }
}


//set text top position
Environment.prototype.setTextTop = function() {
  if( this.orientation === 'landscape' ) {
    this.textTop = getViewportHeight() * .32;
  }
}


//set textbox layout. Setting of orientation body class now done in setOrientationBodyClass() in main.js
Environment.prototype.setTextboxLayout = function() {

  if( this.orientation == 'landscape' ) {

    //set top and left offsets
    this.HTMLtextbox.style.top = this.textTop + 'px';
    this.HTMLtextbox.style.left = ( this.squarePadding / getViewportDPI() ) + 'px';

    //set size of side textbox
    this.HTMLtextbox.style.width = ( ( this.squareWidth / getViewportDPI() ) / 2.5 ) + 'px';

    //set width of text blockers
    if( !aboutPaneCheckOpen() ) {
      document.querySelector( '.js-blocker--logo' ).style.width = ( ( this.squareWidth / getViewportDPI() ) / 2.2 ) + 'px';
      document.querySelector( '.js-blocker--nav' ).style.width = ( ( this.squareWidth / getViewportDPI() ) / 2.2 ) + 'px';
    }

  } else {

    

    //set width
    this.HTMLtextbox.style.width = getViewportWidth() - ( ( ( this.squarePadding * this.magicNumberPadMultiplier ) / getViewportDPI() ) * 2 ) + 'px';

    //set top and left offsets
    this.HTMLtextbox.style.top = ( this.squarePadding / getViewportDPI() ) + 'px';
    this.HTMLtextbox.style.left = ( ( this.squarePadding * this.magicNumberPadMultiplier ) / getViewportDPI() ) + 'px';

    //remove any width set on text blockers
    document.querySelector( '.js-blocker--logo' ).style.removeProperty( 'width' );
    document.querySelector( '.js-blocker--nav' ).style.removeProperty( 'width' );
  }

  //set font sizes
  if( this.orientation == 'landscape' ) {
    var headingFontSize = ( this.squareWidth / 35 ) / getViewportDPI();
    var paraFontSize = ( this.squareWidth / 35 ) / getViewportDPI();

    if( paraFontSize > 25 )    {
      paraFontSize = 25;
    }

    if( headingFontSize > 25 )    {
      headingFontSize = 25;
    }

  } else {
    var headingFontSize = ( this.squareWidth / 25 ) / getViewportDPI();
    var paraFontSize = ( this.squareWidth / 25 ) / getViewportDPI();

    if( paraFontSize > 25 )    {
      paraFontSize = 25;
    }

    if( headingFontSize > 25 )    {
      headingFontSize = 25;
    }
  }

  for( var q = 0; q < this.HTMLtextHeadings.length; q++ ) {
    this.HTMLtextHeadings[q].style.fontSize = headingFontSize + 'px';
  }

  for( var q = 0; q < this.HTMLtextParagraphs.length; q++ ) {
    this.HTMLtextParagraphs[q].style.fontSize = paraFontSize + 'px';
  }

}


Environment.prototype.setMetersLayout = function() {

  //define font sizes
  this.meterFontSizeMain = ( this.squareWidth / getViewportDPI() ) / 25;
  this.meterFontSizeLabel = ( this.squareWidth / getViewportDPI() ) / 40;

  //cap meter label font size
  if( this.meterFontSizeLabel > 21 ) {
    this.meterFontSizeLabel = 21;
  }

  //cap meter quant font size
  if( this.meterFontSizeMain > 30 ) {
    this.meterFontSizeMain = 30;
  }

  //set font size and padding on meter inners
  for( var q = 0; q < this.HTMLMeterInner.length; q++ ) {
    this.HTMLMeterInner[ q ].style.fontSize = this.meterFontSizeMain + 'px';

    var paddingSides = ( this.squareWidth / getViewportDPI() ) / 100;
    var paddingTopBottom = ( this.squareWidth / getViewportDPI() ) / 160;

    //cap values
    if( paddingSides > 10 ) {
      paddingSides = 10;
    }

    if( paddingTopBottom > 7 ) {
      paddingTopBottom = 7;
    }

    //convert to px
    paddingSides = paddingSides + 'px';
    paddingTopBottom = paddingTopBottom + 'px';

    this.HTMLMeterInner[ q ].style.padding = paddingTopBottom + ' ' + paddingSides + ' ' +  paddingTopBottom  + ' ' + paddingSides;
  }

  if( this.orientation == 'portrait' ) {

    //set label font sizes
    for( var q = 0; q < this.HTMLMeterLabel.length; q++ ) {
      //set font size
      this.HTMLMeterLabel[ q ].style.fontSize = this.meterFontSizeLabel + 'px';
    }

    //set label Y positions
    var heightMetersContainer = document.querySelector( '.meter__inner' ).getBoundingClientRect().height;

    for( var q = 0; q < this.HTMLMeterLabel.length; q++ ) {
      var labelHeight = this.HTMLMeterLabel[ q ].getBoundingClientRect().height;
      this.HTMLMeterLabel[ q ].style.top = ( heightMetersContainer / 2 ) - ( labelHeight / 2 ) + 'px';
    }

  } else {

    //set label font sizes
    for( var q = 0; q < this.HTMLMeterLabel.length; q++ ) {
      //set font size
      this.HTMLMeterLabel[ q ].style.fontSize = this.meterFontSizeLabel + 'px';
    }

    //set label Y positions for reads/precision only
    var heightMetersContainer = document.querySelector( '.meter__inner' ).getBoundingClientRect().height;

    for( var q = 0; q < this.HTMLMeterLabelFloatLandscape.length; q++ ) {

      var labelHeight = this.HTMLMeterLabel[ q ].getBoundingClientRect().height;
      this.HTMLMeterLabelFloatLandscape[ q ].style.top = ( ( heightMetersContainer / 2 ) - ( labelHeight / 2 ) ) * .9 + 'px';
    }
  }

  //set the "know your stuff" up/down arrow box
  var heightMetersContainer = document.querySelector( '.meter__inner--quantity' ).getBoundingClientRect().height;
  document.querySelector( '.js-arrowUpDown' ).style.height = heightMetersContainer + 'px';
  document.querySelector( '.js-arrowUpDown' ).style.width = heightMetersContainer + 'px';
}


//get height of tallest textElement
Environment.prototype.getTextSize = function() {
  var texts = document.querySelectorAll( '.textAbsolute' );
  var tallest = 0;

  for( var q = 0; q < texts.length; q++ ) {
    if( texts[q].offsetHeight > tallest ) {
      tallest = texts[q].offsetHeight;
    }
  }

  return tallest;
}


//setup square area where most of the anim takes place
//this is being set but will be reset again at later date
//(some of the text stuff relies on this, but then we need
//to check if the text is touching the anim square)
Environment.prototype.setAnimSquare = function() {
  
  if( this.orientation == 'landscape' ) {

    //if we're landscape
    this.squareHeight = this.canvas.height;
    this.squareWidth = this.canvas.height;
    this.squareTop = 0;
    this.squareLeft = this.canvas.width - this.squareWidth;

  } else {

    //orientation is portrait or square
    this.squareHeight = this.canvas.width;
    this.squareWidth = this.canvas.width;

    this.squareTop = this.canvas.height - this.squareHeight;
    this.squareLeft = 0;
  }
}


//setup cell with and height, padding size, where to start drawing
//but, this will be adjusted again later...
Environment.prototype.setAnimSquareCells = function() {
  //this sets up a grid with half a square's worth of padding around it
  //this will probably need to change at some point..?
  this.cellWidth = this.squareWidth / ( this.x + 1 );
  this.cellHeight = this.squareWidth / ( this.y + 1 );

  this.squarePadding = this.cellWidth / 2;

  //set draw X/Y start cp-ords (everything will be drawn relative to this)
  this.drawStartX = this.squareLeft + this.squarePadding;
  this.drawStartY = this.squareTop + this.squarePadding;
}


//once everything's setup, we need to check if the textarea and anim square are touching each other (or if there's enough room on top on mobile)
//if they are, we need to adjust the anim square to crush it down a bit
Environment.prototype.adjustAnimSquare = function() {

  this.HTMLTextBlocker.style.height = 0;

  if( this.orientation == 'landscape' ) {

    //if the square and text are touching
    if( this.HTMLtextbox.clientWidth + ( ( this.squareWidth + this.squarePadding ) / getViewportDPI() ) > getViewportWidth() ) {

      var squareWidthNew = ( getViewportWidth() - ( this.squarePadding / getViewportDPI() ) - this.HTMLtextbox.clientWidth ) * getViewportDPI();

      this.cellWidth = ( squareWidthNew - this.squarePadding ) / this.x;
      this.cellHeight = ( squareWidthNew - this.squarePadding ) / this.y;
      this.drawStartX = ( this.squarePadding ) + this.HTMLtextbox.clientWidth * getViewportDPI();

      this.squareWidth = ( this.cellWidth * this.x ) + ( this.squarePadding * 2 );
      this.squareHeight = ( this.cellHeight * this.y ) + ( this.squarePadding * 2 );

      this.drawStartY = ( getViewportHeight() / 2 ) * getViewportDPI() - ( ( ( this.cellWidth ) * this.x ) / 2 );

    }

  } else {
    //we're in portrait

    //work out percentage of remaining space
    var remainingSpace = getViewportHeight() - ( this.squareHeight / getViewportDPI() );
    var percentageRemainingSpace = ( remainingSpace / getViewportHeight() ) * 100;

    //if we're in "near portrait" mode, squish down the square a bit

    var magicNumberPercentage = 32;

    if( percentageRemainingSpace < magicNumberPercentage ) {

      //alert( 'near portrait' );

      var desiredSpace = getViewportHeight() * ( magicNumberPercentage / 100 );

      var squareHeightNew = ( getViewportHeight() - desiredSpace );

      this.cellWidth = ( squareHeightNew - ( this.squarePadding / getViewportDPI() ) ) / this.x;
      this.cellHeight = ( squareHeightNew - ( this.squarePadding / getViewportDPI() ) ) / this.y;

      this.cellWidth = this.cellWidth * getViewportDPI();
      this.cellHeight = this.cellHeight * getViewportDPI();

      this.squareWidth = ( this.cellWidth * this.x ) + ( this.squarePadding * 2 );
      this.squareHeight = ( this.cellHeight * this.y ) + ( this.squarePadding * 2 );
      
      this.drawStartY = getViewportHeight() - squareHeightNew;
      this.drawStartY = this.drawStartY * getViewportDPI();
      this.drawStartX = ( getViewportWidth() / 2 ) * getViewportDPI() - ( ( ( this.cellWidth ) * this.x ) / 2 );
      
      //maybe the height for this should be in px, not in %
      //this.HTMLTextBlocker.style.height = ( squareHeightNew / getViewportHeight() ) * 100 + '%';
      this.HTMLTextBlocker.style.height = ( this.squareHeight / getViewportDPI() ) + 'px';

      //this.positionMetersPortrait( ( getViewportHeight() - squareHeightNew ) + 'px' );

    } else {

      //alert( 'portrait' );

      /*ellWidth = ( squareHeightNew - ( this.squarePadding / getViewportDPI() ) ) / this.x;
      this.cellHeight = ( squareHeightNew - ( this.squarePadding / getViewportDPI() ) ) / this.y;

      this.squareWidth = ( this.cellWidth * this.x ) + ( this.squarePadding * 3 );
      this.squareHeight = ( this.cellHeight * this.y ) + ( this.squarePadding * 2 );*/

      this.drawStartX = this.drawStartX + this.squarePadding;
      this.drawStartY = this.drawStartY + this.squarePadding;

      //setup text blocker div
      this.HTMLTextBlocker.style.height = ( 100 - percentageRemainingSpace ) + '%';

    }

  }

}


//remove meter top style
Environment.prototype.cancelMetersPostionPortrait = function() {
  for( var q = 0; q < this.meterPositioners.length; q++ ) {
    this.meterPositioners[ q ].style.removeProperty( 'top' );
  }
}


//add meter top style
Environment.prototype.positionMetersPortrait = function() {

  if( this.orientation == 'portrait' ) {

    for( var q = 0; q < this.meterPositioners.length; q++ ) {
      this.meterPositioners[ q ].style.top =  getViewportHeight() - ( this.squareHeight / getViewportDPI() ) + ( ( this.squarePadding / 2 ) / getViewportDPI() ) + 'px';
      this.meterPositioners[ q ].style.left = ( this.squarePadding * this.magicNumberPadMultiplier ) / getViewportDPI() + 'px';
    }

  }
}


Environment.prototype.setAnimTrackPos = function() {
  this.animTrackPosY = this.animTrackHTML.offsetTop;
}



Environment.prototype.setup = function() {
  
  //remove any meter position stuff
  this.cancelMetersPostionPortrait();

  //resize canvas to viewport size (whole viewport is canvas, even though everything is confined to the square most of the time)
  this.setCanvasSize();

  //work out orientation (portrait, landscape, square)
  this.setOrientation();

  //set text top, if applicable
  this.setTextTop();

  //set portion of canvas within which most of the action happens
  this.setAnimSquare();

  //set grid cell dimensions, padding around square
  this.setAnimSquareCells()

  //setup whether the textbox is landscape or portrait
  this.setTextboxLayout()

  this.adjustAnimSquare();

  //meters set
  this.setMetersLayout();

  //set position of anim track
  this.setAnimTrackPos();

  //set position of meters, if in portrait
  this.positionMetersPortrait();
}


//clear canvas, choosing between the two modes
Environment.prototype.clearCanvas = function() {
  //NOTE not doing this til I need to optimise
  this.clearCanvasAll();
  /*if( this.clearAll ) {
    this.clearCanvasAll();
  } else {
    this.clearAnimSquare();
  }*/
}

//clear the square where animation takes place
Environment.prototype.clearAnimSquare = function() {
  this.context.clearRect( this.drawStartX, this.drawStartY, this.squareWidth, this.squareHeight );
}


//clear entire canvas
Environment.prototype.clearCanvasAll = function() {
  this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
}


//return co-ords in pixels
Environment.prototype.getCoOrds = function( x, y ) {
  return new StructXY( x * this.cellWidth, y * this.cellHeight );
}


//clip canvas
Environment.prototype.canvasClip = function() {
  if( this.clipSquare ) {
    this.clipReset = false;
    //this.context.save();
    this.context.beginPath();
    this.context.rect( this.drawStartX, this.drawStartY, this.squareWidth - ( this.squarePadding * 2 ), this.squareHeight  - ( this.squarePadding * 2 ) );
    this.context.clip();
  } else {
    //restore the canvas back to its original width to reset the clip
    if( this.clipReset == false ) { //don't do it every frame though
      this.canvas.width = this.canvas.width;
      this.canvas.height = this.canvas.height;
      this.clipReset = true;
    }
  }
  
}


//check whether the anim is visible, and update if so
Environment.prototype.trackWatcher = function() {

  //all the scrolledIn/scrollingIn stuff is to fix a problem re the anim going glitchy on first run if you scroll down then back up quickly
  //if we've scrolled ahead of the long animation track
  if( getCurrentScrollPos() > this.animTrackPosY ) {
    return 'scrolledIn';

  //if it's scrolling onscreen
  } else if( getCurrentScrollPos() + getViewportHeight() > this.animTrackPosY ) {
    return 'scrollingIn';

  //not onscreen
  } else {
    //do nothing :)
  }
}


//fix anim cont
Environment.prototype.fixAnimCont = function() {
  this.animHTML.style.position = 'fixed';
  this.HTMLTextBlocker.style.position = 'fixed';
}


//unfix anim cont
Environment.prototype.unfixAnimCont = function() {
  this.animHTML.style.position = 'absolute';
  this.HTMLTextBlocker.style.position = 'absolute';
}