"use strict";

/*************
METER CONTROLLER

A good chunk of this I don't think is in use anymore
*************/

function MeterController() {
  this.meters = {
    precision: new Meter( '#js-meterPrecision' ),
    reads: new Meter( '#js-meterReads' ),
    quantity: new Meter( '#js-meterQuantity' ),
    total: new Meter( '#js-meterTotal' )
  };
}


MeterController.prototype.hideAllMeters = function() {
  //not sure who to do this the "proper" way (iterate over each object and call the hide method)
  this.meters.precision.hide();
  this.meters.reads.hide();
  this.meters.quantity.hide();
  this.meters.total.hide();
}


//quantity box arrow
MeterController.prototype.showArrow = function( whichArrow ) {
  var arrowToShow = document.querySelector( whichArrow );
  arrowToShow.classList.add( 'active' );
}


MeterController.prototype.hideArrow = function( whichArrow ) {
  var arrowToShow = document.querySelector( whichArrow );
  arrowToShow.classList.remove( 'active' );
}


//currently the meters have their own anim controller
MeterController.prototype.update = function( timeline ) {
  
  //set current scene
  this.currentScene = timeline.scenes[ timeline.currentSceneIndex ][ 0 ];

  //this is inefficient as no "scenechange" method
  if( this.currentScene == 'preBegin' ) {

    this.hideAllMeters();

    this.meters.precision.update( 0 );
    this.meters.reads.update( 0 );

  } else if( this.currentScene == 'begin' ) {

    this.hideAllMeters();
    this.meters.precision.show();

    var precisionMaxValue = 400;
    var precisionUnit = precisionMaxValue / 100;

    this.meters.precision.update( Math.round( ( precisionUnit * timeline.getCurrentElapsedPerc() ) ) );
    this.meters.reads.update( 0 );

    this.meters.precision.removeClass( 'meter--bgOff' );
    this.meters.reads.removeClass( 'meter--bgOff' );

  } else if( this.currentScene == 'clone1' || this.currentScene == 'clone2' ) {

    this.hideAllMeters();
    this.meters.precision.show();
    this.meters.reads.show();

    this.meters.precision.addClass( 'meter--bgOff' );
    this.meters.reads.removeClass( 'meter--bgOff' );

    //set precision at 400
    this.meters.precision.update( 400 );

    //we'll need this when in clone2
    var clone1Length = timeline.getMultipleScenesLength( 'clone1', 'clone2' );

    var readsMaxValue = 1000;
    var readsUnit = readsMaxValue / timeline.getMultipleScenesLength( 'clone1', 'gridPause' );

    if( this.currentScene == 'clone1' ) {
      this.meters.reads.update( Math.round( ( readsUnit * timeline.getCurrentElapsed() ) ) );
    } else if( this.currentScene == 'clone2' ) {
      this.meters.reads.update( Math.round( ( readsUnit * ( timeline.getCurrentElapsed() + clone1Length ) ) ) );
    }

  } else if( this.currentScene == 'gridPause' ) {

    this.hideAllMeters();
    this.meters.quantity.removeClass( 'meter--textGrey' );
   
    //this is because the meters need to fade out in portrait but not landscape
    if( getViewportWidth() >= getViewportHeight() ) {
      this.meters.precision.show();
      this.meters.reads.show();
    }

    this.meters.quantity.show();

    this.meters.precision.update( 400 );
    this.meters.reads.update( 1000 );

    this.meters.quantity.update( '100' );
    this.meters.quantity.removeClass( 'meter--bgOff' );

    this.hideArrow( '.js-arrowUpDown__up' );
    this.hideArrow( '.js-arrowUpDown__down' );

  } else if(
    //sorry
    //this.currentScene == 'gridPause' ||

    this.currentScene == 'gridDisappear1' ||
    this.currentScene == 'gridDisappear2' ||
    this.currentScene == 'gridDisappear3' ||
    this.currentScene == 'gridDisappear4' ||
    this.currentScene == 'gridDisappear5' ||
    this.currentScene == 'gridDisappear6' ||
    this.currentScene == 'gridDisappear7' ||
    this.currentScene == 'gridDisappear8' ||
    this.currentScene == 'gridDisappear9' ||

    this.currentScene == 'gridLoadsHaveGone' ||

    this.currentScene == 'gridReappear1' ||
    this.currentScene == 'gridReappear2' ||
    this.currentScene == 'gridReappear3' ||
    this.currentScene == 'gridReappear4' ||
    this.currentScene == 'gridReappear5' ||
    this.currentScene == 'gridReappear6' ||
    this.currentScene == 'gridReappear7' ||
    this.currentScene == 'gridReappear8' ||
    this.currentScene == 'gridReappear9' ||

    this.currentScene == 'gridPause2'
  ) 
  {

    this.hideAllMeters();
    this.meters.quantity.show();

    //show/hide quant arrows
    if(
      this.currentScene == 'gridDisappear1' ||
      this.currentScene == 'gridDisappear2' ||
      this.currentScene == 'gridDisappear3' ||
      this.currentScene == 'gridDisappear4' ||
      this.currentScene == 'gridDisappear5' ||
      this.currentScene == 'gridDisappear6' ||
      this.currentScene == 'gridDisappear7' ||
      this.currentScene == 'gridDisappear8' ||
      this.currentScene == 'gridDisappear9'
    ) {
      this.hideArrow( '.js-arrowUpDown__up' );
      this.showArrow( '.js-arrowUpDown__down' );

      //if( this.currentScene != 'gridDisappear1' ) {
      //  this.meters.quantity.addClass( 'meter--textGrey' );
      //} else {
      //  this.meters.quantity.removeClass( 'meter--textGrey' );
      //}

      this.meters.quantity.addClass( 'meter--textGrey' );

    } else if(
      this.currentScene == 'gridReappear1' ||
      this.currentScene == 'gridReappear2' ||
      this.currentScene == 'gridReappear3' ||
      this.currentScene == 'gridReappear4' ||
      this.currentScene == 'gridReappear5' ||
      this.currentScene == 'gridReappear6' ||
      this.currentScene == 'gridReappear7' ||
      this.currentScene == 'gridReappear8' ||
      this.currentScene == 'gridReappear9'
    ) {
      this.hideArrow( '.js-arrowUpDown__down' );
      this.showArrow( '.js-arrowUpDown__up' );
      this.meters.quantity.removeClass( 'meter--textGrey' );
    } else {
      this.hideArrow( '.js-arrowUpDown__up' );
      this.hideArrow( '.js-arrowUpDown__down' );
    }

  
  } else if( this.currentScene == 'crush' ) {

    this.hideAllMeters();

    this.meters.total.addClass( 'meter--textGrey' );
    this.meters.total.update( 0 );

  } else if( this.currentScene == 'queueStatic' ) {

    this.hideAllMeters();
    this.meters.total.show();

  } else if( this.currentScene == 'queue' || this.currentScene == 'queueToOrange' || this.currentScene == 'leave' ) {

    this.hideAllMeters();
    this.meters.total.show();

    //goes up slowly until the "rogue" appears onscreen
    //then it starts going up more quickly
    //when they all go orange and leave the scene, it starts going up really quickly

    //set the time offset for this ecene
    var timePrevScenes = timeline.getMultipleScenesLength( 'preBegin', 'queue' );
    var currentTimeThisScene = timeline.currentTimePercent - timePrevScenes;

    //the following need retuning if the values in timeline.js are changed
    var moneyMultiplierTime1 = 2.4;
    var moneyMultiplierTime2 = 9.43;

    var moneyMultiplier1 = 20;
    var moneyMultiplier2 = 100;
    var moneyMultiplier3 = 750;

    var moneyMultiplierCurrent = moneyMultiplier1;

    var accumulation = 0;

    var currentMoneyValue = 0;

    //the money multiplier value changes over time, plus the previous accumulated needs to be tracked
    //highest multiplier, when all dots are leaving scene
    if( currentTimeThisScene > moneyMultiplierTime2 ) {

      moneyMultiplierCurrent = moneyMultiplier3;
      accumulation = ( moneyMultiplierTime1 * moneyMultiplier1 ) + ( ( moneyMultiplierTime2 - moneyMultiplierTime1 ) * moneyMultiplier2 )
      currentMoneyValue = accumulation + ( ( currentTimeThisScene - moneyMultiplierTime2 ) * moneyMultiplier3 );

    //second highest multiplier, when "rogue" is going past
    } else if( currentTimeThisScene > moneyMultiplierTime1 ) {
      moneyMultiplierCurrent = moneyMultiplier2;
      accumulation = ( moneyMultiplierTime1 * moneyMultiplier1 );
      currentMoneyValue = accumulation + ( ( currentTimeThisScene - moneyMultiplierTime1 ) * moneyMultiplier2 );

      this.meters.total.removeClass( 'meter--textGrey' );
  
    //normal money multiplier (normal particle queue)
    } else {
      this.meters.total.addClass( 'meter--textGrey' );

      currentMoneyValue = currentTimeThisScene * moneyMultiplier1;
    }

    this.meters.total.update( roundX( currentMoneyValue, 5 ) );

  } else {

    //any other scenes not in the list- hide
    this.hideAllMeters();

    //hide the quantity arrows
    this.hideArrow( '.js-arrowUpDown__up' );
    this.hideArrow( '.js-arrowUpDown__down' );

  }
}

/*************
METER
*************/

function Meter( html ) {
  this.html = document.querySelector( html );
  this.htmlQuantity = document.querySelector( html + ' .js-meterQuantity' );
}


Meter.prototype.show = function() {
  //this.html.classList.add( 'meter--active' );
  this.html.classList.add( 'meter--visible' );
}


Meter.prototype.hide = function() {
  this.html.classList.remove( 'meter--visible' );
}


Meter.prototype.update = function( newQuant ) {
  this.htmlQuantity.innerHTML = newQuant;
}


Meter.prototype.addClass = function( className ) {
  this.html.classList.add( className );
}


Meter.prototype.removeClass = function( className ) {
  this.html.classList.remove( className );
}