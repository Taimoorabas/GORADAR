"use strict";

/*************
DOT

Dot collection is owned by animController, shouldn't really be but it is...
*************/

//individual dot
function Dot() {
  this.defaultWidth = .6;
  this.defaultColour = new StructRGBA( 0, 0, 0, 1 );

  this.pos = new StructXY();
  this.posStart = new StructXY();
  this.posEnd = new StructXY();
  this.width;
  this.widthStart = this.defaultWidth;
  this.widthEnd = this.defaultWidth;
  this.colour = this.defaultColour;
  this.colourStart = this.defaultColour;
  this.colourEnd = this.defaultColour;

  this.greyPingVanish = false;            //whether to do a grey ping when dot disappears (used in grid scene)
  
  this.greyPingExit = false;            //whether to do a grey ping when leaving scene on right

  this.text;
  
  this.fontRatio = .025;
  this.fontSize = environment.squareWidth * this.fontRatio;

  //offset for the text values which can appear next to a dot
  //doing this as a multiplication of the width seemed to be the easiest way of accomodating different screen sizes
  this.textOffsetX = environment.squareWidth / 150;
  this.textOffsetY = environment.squareWidth / 40;

  //this is so the text fades in. There's no functionality for fading out atm.
  this.textOpacity = 0;
  this.textOpacityAccel = 0.05;

  //jiggle (slight up and down motion)
  this.jiggle = false;

  this.amplitude = .05;         //the max distance to go up/down - this is proportional to width also
  this.jiggleY = 0;           //the actual value by which it will go up or down
  this.angle = 0;             //the angle to put into sin(). This will accumulate. Should never be more than pi * 2.
  this.increment = 0.045;  //the value to be added onto the angle

}


//update the dot- normalise location value to percentage
//(eg, 50, 50 is right in the middle of the canvas)
Dot.prototype.update = function( environment, timeline ) {

  var unitPercentage = ( environment.squareWidth - ( environment.squarePadding * 2 ) ) / 100;

  //movement interpolation
  var unitX = ( this.posEnd.x - this.posStart.x ) / timeline.getCurrentSceneLength();
  var unitY = ( this.posEnd.y - this.posStart.y ) / timeline.getCurrentSceneLength();

  //width interpolation
  var unitWidth = ( this.widthEnd - this.widthStart ) / timeline.getCurrentSceneLength();

  //color interpolation
  var unitR = ( this.colourEnd.r - this.colourStart.r ) / timeline.getCurrentSceneLength();
  var unitG = ( this.colourEnd.g - this.colourStart.g ) / timeline.getCurrentSceneLength();
  var unitB = ( this.colourEnd.b - this.colourStart.b ) / timeline.getCurrentSceneLength();
  var unitA = ( this.colourEnd.a - this.colourStart.a ) / timeline.getCurrentSceneLength();

  //calculations- pos
  this.pos.x = ( this.posStart.x + ( unitX * timeline.getCurrentElapsed() ) ) * unitPercentage;
  this.pos.y = ( this.posStart.y + ( unitY * timeline.getCurrentElapsed() ) ) * unitPercentage;

  //add on the square offset
  this.pos.x += environment.drawStartX;
  this.pos.y += environment.drawStartY;

  //width
  this.width = ( this.widthStart + ( unitWidth * timeline.getCurrentElapsed() ) ) * unitPercentage;

  //with colour interpolation it seems to go wrong when multiplied by unitPercentage... dunno why
  this.colour.r = ( this.colourStart.r + ( unitR * timeline.getCurrentElapsed() ) );
  this.colour.g = ( this.colourStart.g + ( unitG * timeline.getCurrentElapsed() ) );
  this.colour.b = ( this.colourStart.b + ( unitB * timeline.getCurrentElapsed() ) );
  this.colour.a = ( this.colourStart.a + ( unitA * timeline.getCurrentElapsed() ) );

  this.textOpacity = clampMinMax( this.textOpacityAccel * timeline.getCurrentElapsedPerc(), 0, 1 );
}


//this is a separate update for the jiggle (because update works on scroll only)
Dot.prototype.updateJiggle = function() {
  if( this.jiggle ) {
    this.angle += this.increment;

    if( this.angle >= ( 6.2831853072 ) ) {       //pi * 2
        this.angle = 0;
    }

    this.jiggleY = Math.sin( this.angle ) * ( this.amplitude * this.width );

  } else {
    this.jiggleY = 0;
  }
}


Dot.prototype.draw = function( environment, timeline ) {

  //draw the grey ping on exit during queue sequence. This is tied to scrolling.
  if( this.greyPingExit ) {

    var pingStart = environment.drawStartX + ( environment.squareWidth / 1.32 );
    var pingEnd = environment.drawStartX + environment.squareWidth;
    var pingDistance = ( pingEnd - pingStart );

    if( this.pos.x > pingStart ) {

      //but this always needs to be calced
      var distanceSoFar = ( this.pos.x - pingStart );

      //units for opacity and width
      var distanceUnit = 1 / pingDistance;

      drawCircle( environment.context, this.pos.x, this.pos.y, ( this.width * ( distanceSoFar * distanceUnit ) * 25 ), RGBA_darkGrey.strRGBA( 1 - ( ( distanceSoFar * distanceUnit ) / .38 ) ) );
    }
  }

  //draw grey ping for "vanish" during grid
  //note the timings for this depending on length of scene
  if( this.greyPingVanish ) {
    var opacityUnit = 1 / timeline.getCurrentSceneLength();

    drawCircle( environment.context, this.pos.x, this.pos.y, ( this.width * getViewportDPI() ) * timeline.getCurrentElapsed() * 9, RGBA_darkGrey.strRGBA( 1 - ( timeline.getCurrentElapsed() * opacityUnit ) ) );
  }

  //this is the drawing of the actual dot
  drawCircle( environment.context, this.pos.x, this.pos.y + this.jiggleY, this.width, this.colour.strRGBA() );

  if( this.text ) {
    //text is assumed to always be orange
    environment.context.fillStyle = 'rgba( ' + RGBA_orange.r + ', ' + RGBA_orange.g + ', ' + RGBA_orange.b + ', ' + this.textOpacity  + ' )';
    environment.context.font = this.fontSize + 'px "GT Pressura Mono"';
    environment.context.fillText( this.text, this.pos.x + this.textOffsetX, this.pos.y + this.textOffsetY );
  }
}