"use strict";

/*************
PING CONTROLLER

Pings are in a queue. Individual pings get flagged as "eliminated" when the animation has run its course,
at that point it gets culled off. Unlike boxes, there's no ID as pings disappear when the animation ends,
rather than hanging around indefinitely like boxes do. Pings ca be set to be persistent, in which case the
animation will loop and they need to be set to persistent = false in order to be eliminated once the 
animation has finished.

Ping movement is same as dot (interpolates between star and end pos)
*************/

function PingController( maxWidth ) {
  this.collection = [];
}


//recalc max width, other vars which don't vary?
PingController.prototype.reset = function() {

}


PingController.prototype.add = function( posStart, posEnd, persistent, timerThrottle, greyMode ) {
  if( typeof greyMode === 'undefined' ) {
    greyMode = false;
  }

  if( typeof persistent === 'undefined' ) {
    persistent = false;
  }

  if( typeof timerThrottle === 'undefined' ) {
    timerThrottle = false;
  }

  this.collection.push(
    new Ping(
      posStart,
      posEnd,
      persistent,
      timerThrottle,
      greyMode
    )
  );
}


PingController.prototype.removeEliminateds = function() {
  for( var f = 0; f < this.collection.length; f++ ) {
    objectRemoveFromArray( this.collection, true, 'eliminated' );
  }
}


PingController.prototype.update = function() {
  this.removeEliminateds();

  for( var f = 0; f < this.collection.length; f++ ) {
    this.collection[ f ].update();
  }
}


PingController.prototype.draw = function() {
  for( var f = 0; f < this.collection.length; f++ ) {
    this.collection[ f ].draw();
  }
}


//set all persistent pings not to persist (so will be destroyed at end of anim)
PingController.prototype.setAllNonPersistent = function() {
  for( var f = 0; f < this.collection.length; f++ ) {
    this.collection[ f ].persistent = false;
  }
}


//completely destroy all pings
PingController.prototype.destroyAll = function() {
  this.collection.length = 0;
}



/*************
PING

Ping works similarly to do in that a startpos and endpos is supplied.
14/11/2017 - added a "grey" mode. This produces a smaller grey ping.
*************/

function Ping( posStart, posEnd, persistent, timerThrottle, greyMode ) {

  this.maxWidth = environment.cellWidth * 1.25;

  if( greyMode ) {
    this.colour = RGBA_darkGrey;
  } else {
    this.colour = RGBA_orange;
  }

  //how long should the anim go on for?
  if( greyMode ) {
    this.frames = 20;             
  } else {
    this.frames = 42;
  }

  this.width = 0;

  if( greyMode ) {
    this.growth = ( this.maxWidth / 2 ) / this.frames;
  } else {
    this.growth = this.maxWidth / this.frames;
  }

  this.opacity = 1;
  this.opacityLoss = 1 / this.frames;

  this.pos = new StructXY();
  this.posStart = posStart;
  this.posEnd = posEnd;

  //sets whether the ping should persist or just be a one-off
  this.persistent = persistent;
  this.throttlePersistent = 15;    //when persistent, amount of extra frames before new ping is generated

  //this is so we can create persistent ones which don't all trigger at exactly the same rate
  if( timerThrottle ) {
    this.timerThrottlePersistent = mathRandomRange( 0, this.throttlePersistent );
    this.opacity = 0;
  } else {
    this.timerThrottlePersistent = 0;
  }

  //there's no "outgoing" variable on this one as there isn't a "transition out" animation state
  this.eliminated = false;
}


Ping.prototype.update = function() {
  //var unitPercentage = environment.squareWidth / 100;
  var unitPercentage = ( environment.squareWidth - ( environment.squarePadding * 2 ) ) / 100;

  //movement interpolation
  var unitX = ( this.posEnd.x - this.posStart.x ) / timeline.getCurrentSceneLength();
  var unitY = ( this.posEnd.y - this.posStart.y ) / timeline.getCurrentSceneLength();

  //calculations- pos
  this.pos.x = ( this.posStart.x + ( unitX * timeline.getCurrentElapsed() ) ) * unitPercentage;
  this.pos.y = ( this.posStart.y + ( unitY * timeline.getCurrentElapsed() ) ) * unitPercentage;

  //handle square offset
  this.pos.x += environment.drawStartX;
  this.pos.y += environment.drawStartY;

  //handle growth
  this.width += this.growth;
  this.opacity -= this.opacityLoss;

  //at the end of the anim, if it's persistent restart the anim after the throttled frames have gone past 
  //else flag for elimination
  if( this.opacity <= 0 ) {
    if( this.persistent ) {
      if( this.timerThrottlePersistent == this.throttlePersistent ) {
        this.timerThrottlePersistent = 0; 
        this.opacity = 1;
        this.width = 0;
      } else {
        this.timerThrottlePersistent += 1;
      }

    } else {
      this.opacity = 0;
      this.eliminated = true;
    }
  }
}


Ping.prototype.draw = function() {
  drawCircle(
    environment.context,
    this.pos.x,
    this.pos.y,
    this.width,
    'rgba(' + this.colour.r + ', ' + this.colour.g + ', ' + this.colour.b + ', ' + this.opacity + ' )'
  );
}