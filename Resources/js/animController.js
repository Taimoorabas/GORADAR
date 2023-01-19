"use strict";

/*************
ANIMATION CONTROLLER

This also houses the dot collection.... maybe it shouldn't, but I'm leaving it for now ;)
*************/

function Controller() {
  this.collectionDots = [];
  this.currentScene;
  this.previousScene;

  //point on Y axis where the crush/queue happens
  this.crushQueueY = 70;

  //amount of dots in "queue" scene
  //note this is carefully chosen in order to do another queue scene afterwards where the dots change colour
  //so don't go changing it for no reason...
  this.quantDotsQueue = 14;
  this.quantDotsQueueToOrange = 11;

  //text which appears towards the end in centre of screen
  this.textNoCheckoutLines = document.querySelector( '.js-textNoToCheckoutLines' );

  //get rid of the portrait text blocker (at the end)
  this.textBlockerPortrait = document.querySelector( '.textBlockerPortrait' );

  this.animMailingListBox = document.querySelector( '.mailingList--anim' );


  //startpoints and endpoints for begin phase
  this.startPoints_begin = [
    new StructXY( 15, 45 ),
    new StructXY( 41, 19 ),
    new StructXY( 75, 30 ),
    new StructXY( 74, 65 ),
    new StructXY( 41, 80 )
  ];

  //also used as startpoints for next scene (duplicated via loader)
  //in approx order of left-right/top-down
  this.endPoints_begin = [
    new StructXY( 17, 20 ),
    new StructXY( 65, 20 ),
    new StructXY( 40, 45 ),
    new StructXY( 84, 65 ),
    new StructXY( 35, 80 ),
  ];

  //also used as startpoints for next scene (duplicated via loader)
  this.endPoints_clone1 = [];

  //endpoints for clone2 (randomly go into a grid)
  this.endPoints_clone2 = [];

  //startpoint for the rogue particle which flies past during queue
  this.startPoint_queue_rogue = new StructXY( -50, 50 );

  //endpoint for the rogue particle which flies past during queue
  this.endPoint_queue_rogue = new StructXY( 110, 50 );

  //points for a 10x10 grid (to be used as startpoints and endpoints)
  this.points_grid = [];

  //temp leave endpoints- order is left-right in queue before explosion
  this.endPoints_leave = [
    new StructXY( 0, -20 ),
    new StructXY( 20, -60 ),
    new StructXY( 50, -40 ),
    new StructXY( 120, 20 ),
    new StructXY( -120, 30 ),        //this is a problem
    new StructXY( -50, -10 ),        //this is a problem
    new StructXY( 65, -50 ),
    new StructXY( -110, 110 ),
    new StructXY( 90, -10 ),
    new StructXY( 80, 120 ),
  ];

  //leave texts (the prices next to the dots) - to be generated
  this.texts_leave = [];
}



/********* PARTICLE LOADER
* load predefined start or endpoint data into a dot collection
* if more dots than data, will keep cycling over data til no more dots to fill
************************/

Controller.prototype.loadCoOrds = function( collection, data, member ) {
  for( var q = 0; q < collection.length; q++ ) {
    collection[ q ][ member ] = data[ q % data.length ];
  }
}



/********* PARTICLE GENERATORS
* generate particle datasets, should be cached into variables (but not always)
* if more dots than data, will keep cycling over data til no more dots to fill
************************/

//set the end position for the particles during the clone1 "five split into 15" scene and cache result
Controller.prototype.setClone1EndPos = function() {
  if( this.endPoints_clone1.length == 0 ) {
    var counter = 60;
    var incrementor = 120;

    var tempDots = this.createDots( 15 );
    this.loadCoOrds( tempDots, this.endPoints_begin, "posStart" );

    for( var w = 0; w < 15; w++ ) {
      var newCoOrds = getCoOrdsXAngles( counter, 10 );

      this.endPoints_clone1.push( 
        new StructXY(
          newCoOrds[ 0 ] + tempDots[ w ].posStart.x,
          newCoOrds[ 1 ] + tempDots[ w ].posStart.y
        )
      );

      counter += humaniseNumber( incrementor, 27 );
    }
  }
}


//set endpoints for clone 2 scene (go to grid randomly)
//this is generator and loader, need to change so generated output can be cached
Controller.prototype.setClone2EndPos = function() {
  if( this.endPoints_clone2.length == 0 ) {
    var arrTempPoints = [];

    for( var s = 0; s < 10; s++ ) {
      for( var t = 0; t < 10; t++ ) {
        arrTempPoints.push( new StructXY( ( s * 10 ) + 5, ( t * 10 ) + 5 ) );
      }
    }

    //setup array then shuffle
    shuffleArray( arrTempPoints );

    for( var s = 0; s < arrTempPoints.length; s++ ) {
      this.endPoints_clone2.push( arrTempPoints[ s ] );
    }
  }
}


//set startpoints for "crush" scene (the same data as the endpoints for clone2, minus the randomness)
//assumes 100 dots
Controller.prototype.setGridStartPos = function() {
  if( this.points_grid.length == 0 ) {
    for( var s = 0; s < 10; s++ ) {
      for( var t = 0; t < 10; t++ ) {
        this.points_grid.push( new StructXY( ( s * 10 ) + 5, ( t * 10 ) + 5 ) );
      }
    }
  }
}


//set endoints for "crush" scene. Assumes 100 dots
Controller.prototype.setCrushEndPos = function() {
  //set all to a grid of 10 across
  for( var s = 0; s < 10; s++ ) {
    for( var t = 0; t < 10; t++ ) {
      this.collectionDots[ ( s * 10 ) + t ].posEnd = new StructXY( ( s * 10 ) + 5, this.crushQueueY );
    }
  }
}


//set startpoints for queue anim.
Controller.prototype.setQueueStartPos = function( quantDotsQueue ) {
  var queueOffset = ( 10 * quantDotsQueue ) - 100;

  for( var s = 0; s < quantDotsQueue; s++ ) {
    this.collectionDots[ s ].posStart = new StructXY( ( s * 10 ) + 5 - queueOffset, this.crushQueueY );
  }
}


//set endpoints for queue anim.
Controller.prototype.setQueueEndPos = function( quantDotsQueue ) {
  for( var s = 0; s < quantDotsQueue; s++ ) {
    this.collectionDots[ s ].posEnd = new StructXY( ( s * 10 ) + 5, this.crushQueueY );
  }
}


//set endpoints for static version of queue
Controller.prototype.setQueueEndPosStatic = function( quantDotsQueue ) {
  var queueOffset = ( 10 * quantDotsQueue ) - 100;

  for( var s = 0; s < quantDotsQueue; s++ ) {
    this.collectionDots[ s ].posEnd = new StructXY( ( s * 10 ) + 5 - queueOffset, this.crushQueueY );
  }
}


//set startpoints for leave anim- basically the same as queue but with only 10 dots
Controller.prototype.setLeaveStartPos = function() {
  for( var s = 0; s < 10; s++ ) {
    this.collectionDots[ s ].posStart = new StructXY( ( s * 10 ) + 5, this.crushQueueY );
  }
}


//set startpoints and endpoints for leave pings
Controller.prototype.setLeavePingPos = function() {
  
  for( var s = 0; s < 10; s++ ) {

    pingController.add(
      new StructXY( ( s * 10 ) + 5, this.crushQueueY ),
      this.endPoints_leave[ s ],
      true,
      true
    );

  }
}


//generate "leave" section texts- assumes 10 dots
Controller.prototype.generateLeaveTexts = function() {
  if( this.texts_leave.length == 0 ) {
    for( var s = 0; s < 10; s++ ) {
      this.texts_leave.push( '$' + roundX( mathRandomIntSeed( 12, 80, s ), 5 ) );
    }
  }
}


//apply "leave" section texts- assumes 10 dots
Controller.prototype.setLeaveTexts = function() {
  for( var w = 0; w < this.texts_leave.length; w++ ) {
    this.collectionDots[ w ].text = this.texts_leave[ w ];
  }
}




/************ general methods ************/

//if the scene has changed, return true and store the previous scene
Controller.prototype.manageSceneChange = function() {
  if( this.currentScene != this.previousScene ) {
    this.previousScene = this.currentScene;

    //destroy everything
    //destroy the dots
    this.destroyDots();
    //destroy the boxes
    boxController.setAllOutgoing();
    //destroy persistent pings
    pingController.setAllNonPersistent();
    //set clip square
    environment.clipSquare = true;
    //hide the text which appears in centre
    this.textNoCheckoutLines.classList.remove( 'active' );

    //reset the textblocker
    this.textBlockerPortrait.classList.remove( 'hide' );

    this.animMailingListBox.classList.remove( 'show' );

    return true;
  }
}


//create dots for this.collectionDots[]
Controller.prototype.createDots = function( quant ) {
  var collectionDots = [];
  for( var e = 0; e < quant; e++ ) {
    collectionDots.push( new Dot() );
  }

  return collectionDots;
}


//blank out this.collectionDots[]
Controller.prototype.destroyDots = function( quant ) {
  this.collectionDots.length = 0;
}


//sets a member of a single dot to a given value
Controller.prototype.dotSet = function( index, key, value ) {
  if( index < this.collectionDots.length ) {
    this.collectionDots[ index ][ key ] = value;
  }
}

//sets a member of all dots to a given value
Controller.prototype.dotsSet = function( key, value, quant ) {
  if( typeof quant === 'undefined' ) {
    quant = this.collectionDots.length;
  }
  for( var s = 0; s < quant; s++ ) {
    this.collectionDots[ s ][ key ] = value;
  }
}


//draw all stuff in controller
Controller.prototype.draw = function( environment, timeline ) {
  //draw all dots
  for( var s = 0; s < this.collectionDots.length; s++ ) {
    this.collectionDots[ s ].draw( environment, timeline );
  }
}


Controller.prototype.updateJiggle = function() {
  for( var s = 0; s < this.collectionDots.length; s++ ) {
    this.collectionDots[ s ].updateJiggle();
  }
}




/************ animation script ************/

Controller.prototype.update = function( timeline ) {
  //set current scene
  this.currentScene = timeline.scenes[ timeline.currentSceneIndex ][ 0 ];

  //NOTE: the "setup" phases (this.manageSceneChange() onwards) only fire once per scene.
  //So things which change during scene need to be set outside of these.

  //SCENE: begin *****************************************************/
  if( this.currentScene == 'preBegin' ) {

    if( this.manageSceneChange() ) {

      pingController.destroyAll();
      
      this.collectionDots = this.createDots( 5 );

      this.dotsSet( 'widthStart', 27.5 );
      this.dotsSet( 'widthEnd', 27.5 );
      this.dotsSet( 'jiggle', true );

      this.dotSet( 0, 'angle', Math.random() * 6.2831853072 );
      this.dotSet( 1, 'angle', Math.random() * 6.2831853072 );
      this.dotSet( 2, 'angle', Math.random() * 6.2831853072 );
      this.dotSet( 3, 'angle', Math.random() * 6.2831853072 );
      this.dotSet( 4, 'angle', Math.random() * 6.2831853072 );

      //this scene doesn't move
      this.loadCoOrds( this.collectionDots, this.startPoints_begin, "posStart" );
      this.loadCoOrds( this.collectionDots, this.startPoints_begin, "posEnd" );

    }


  //SCENE: begin *****************************************************/
  } else if( this.currentScene == 'begin' ) {

    if( this.manageSceneChange() ) {

      pingController.destroyAll();
      
      this.collectionDots = this.createDots( 5 );

      this.dotsSet( 'widthStart', 27.5 );

      this.loadCoOrds( this.collectionDots, this.startPoints_begin, "posStart" );
      this.loadCoOrds( this.collectionDots, this.endPoints_begin, "posEnd" );

    }


  //SCENE: clone1 *****************************************************/
  } else if( this.currentScene == 'clone1' ) {

    if( this.manageSceneChange() ) {

      
      this.collectionDots = this.createDots( 15 );

      this.loadCoOrds( this.collectionDots, this.endPoints_begin, "posStart" );

      //generate the endpos for this scene
      this.setClone1EndPos();

      //then load the points in
      this.loadCoOrds( this.collectionDots, this.endPoints_clone1, "posEnd" );

    }


  //SCENE: clone2 *****************************************************/
  } else if( this.currentScene == 'clone2' ) {

    if( this.manageSceneChange() ) {

      
      this.collectionDots = this.createDots( 100 );

      //generate the startpos for this scene
      this.setClone1EndPos();
      this.setClone2EndPos();

      this.loadCoOrds( this.collectionDots, this.endPoints_clone1, "posStart" );
      this.loadCoOrds( this.collectionDots, this.endPoints_clone2, "posEnd" );

    }


  //SCENE: various grid static *****************************************************/
  } else if(
    this.currentScene == 'gridPause' ||

    this.currentScene == 'gridDisappear1' ||
    this.currentScene == 'gridDisappear2' ||
    this.currentScene == 'gridDisappear3' ||
    this.currentScene == 'gridDisappear4' ||
    this.currentScene == 'gridDisappear5' ||
    this.currentScene == 'gridDisappear6' ||
    this.currentScene == 'gridDisappear7' ||
    this.currentScene == 'gridDisappear8' ||
    this.currentScene == 'gridDisappear9' ||
    this.currentScene == 'gridDisappear10' ||
    this.currentScene == 'gridDisappear11' ||
    this.currentScene == 'gridDisappear12' ||
    this.currentScene == 'gridDisappear13' ||
    this.currentScene == 'gridDisappear14' ||
    this.currentScene == 'gridDisappear15' ||
    this.currentScene == 'gridDisappear16' ||
    this.currentScene == 'gridDisappear17' ||
    this.currentScene == 'gridDisappear18' ||
    this.currentScene == 'gridDisappear19' ||
    this.currentScene == 'gridDisappear20' ||

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
    this.currentScene == 'gridReappear10' ||
    this.currentScene == 'gridReappear11' ||
    this.currentScene == 'gridReappear12' ||
    this.currentScene == 'gridReappear13' ||
    this.currentScene == 'gridReappear14' ||
    this.currentScene == 'gridReappear15' ||
    this.currentScene == 'gridReappear16' ||
    this.currentScene == 'gridReappear17' ||
    this.currentScene == 'gridReappear18' ||
    this.currentScene == 'gridReappear19' ||
    this.currentScene == 'gridReappear20' ||
    this.currentScene == 'gridPause2'
  ) 
  {

    if( this.manageSceneChange() ) {

      this.collectionDots = this.createDots( 100 );

      this.setGridStartPos();

      this.loadCoOrds( this.collectionDots, this.points_grid, "posStart" );
      this.loadCoOrds( this.collectionDots, this.points_grid, "posEnd" );

      if( this.currentScene == 'gridPause' ) {

//this was generated using a home-made tool


} else if( this.currentScene == 'gridDisappear1' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '99' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 11, 'colourStart', RGBA_black );
this.dotSet( 11, 'colourEnd', RGBA_grey );
pingController.add(
new StructXY( 15,15 ),
new StructXY( 15,15 ),
false, false, true);
} else if( this.currentScene == 'gridDisappear2' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '98' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 71, 'colourStart', RGBA_black );
this.dotSet( 71, 'colourEnd', RGBA_grey );
pingController.add(
new StructXY( 75,15 ),
new StructXY( 75,15 ),
false, false, true);
this.dotSet( 11, 'colourStart', RGBA_grey );
this.dotSet( 11, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridDisappear3' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '97' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 45, 'colourStart', RGBA_black );
this.dotSet( 45, 'colourEnd', RGBA_grey );
pingController.add(
new StructXY( 45,55 ),
new StructXY( 45,55 ),
false, false, true);
this.dotSet( 11, 'colourStart', RGBA_grey );
this.dotSet( 11, 'colourEnd', RGBA_grey );
this.dotSet( 71, 'colourStart', RGBA_grey );
this.dotSet( 71, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridDisappear4' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '96' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 86, 'colourStart', RGBA_black );
this.dotSet( 86, 'colourEnd', RGBA_grey );
pingController.add(
new StructXY( 85,65 ),
new StructXY( 85,65 ),
false, false, true);
this.dotSet( 11, 'colourStart', RGBA_grey );
this.dotSet( 11, 'colourEnd', RGBA_grey );
this.dotSet( 71, 'colourStart', RGBA_grey );
this.dotSet( 71, 'colourEnd', RGBA_grey );
this.dotSet( 45, 'colourStart', RGBA_grey );
this.dotSet( 45, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridDisappear5' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '95' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 39, 'colourStart', RGBA_black );
this.dotSet( 39, 'colourEnd', RGBA_grey );
pingController.add(
new StructXY( 35,95 ),
new StructXY( 35,95 ),
false, false, true);
this.dotSet( 11, 'colourStart', RGBA_grey );
this.dotSet( 11, 'colourEnd', RGBA_grey );
this.dotSet( 71, 'colourStart', RGBA_grey );
this.dotSet( 71, 'colourEnd', RGBA_grey );
this.dotSet( 45, 'colourStart', RGBA_grey );
this.dotSet( 45, 'colourEnd', RGBA_grey );
this.dotSet( 86, 'colourStart', RGBA_grey );
this.dotSet( 86, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridDisappear6' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '94' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 15, 'colourStart', RGBA_black );
this.dotSet( 15, 'colourEnd', RGBA_grey );
pingController.add(
new StructXY( 15,55 ),
new StructXY( 15,55 ),
false, false, true);
this.dotSet( 11, 'colourStart', RGBA_grey );
this.dotSet( 11, 'colourEnd', RGBA_grey );
this.dotSet( 71, 'colourStart', RGBA_grey );
this.dotSet( 71, 'colourEnd', RGBA_grey );
this.dotSet( 45, 'colourStart', RGBA_grey );
this.dotSet( 45, 'colourEnd', RGBA_grey );
this.dotSet( 86, 'colourStart', RGBA_grey );
this.dotSet( 86, 'colourEnd', RGBA_grey );
this.dotSet( 39, 'colourStart', RGBA_grey );
this.dotSet( 39, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridDisappear7' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '93' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 40, 'colourStart', RGBA_black );
this.dotSet( 40, 'colourEnd', RGBA_grey );
pingController.add(
new StructXY( 45,5 ),
new StructXY( 45,5 ),
false, false, true);
this.dotSet( 11, 'colourStart', RGBA_grey );
this.dotSet( 11, 'colourEnd', RGBA_grey );
this.dotSet( 71, 'colourStart', RGBA_grey );
this.dotSet( 71, 'colourEnd', RGBA_grey );
this.dotSet( 45, 'colourStart', RGBA_grey );
this.dotSet( 45, 'colourEnd', RGBA_grey );
this.dotSet( 86, 'colourStart', RGBA_grey );
this.dotSet( 86, 'colourEnd', RGBA_grey );
this.dotSet( 39, 'colourStart', RGBA_grey );
this.dotSet( 39, 'colourEnd', RGBA_grey );
this.dotSet( 15, 'colourStart', RGBA_grey );
this.dotSet( 15, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridDisappear8' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '92' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 33, 'colourStart', RGBA_black );
this.dotSet( 33, 'colourEnd', RGBA_grey );
pingController.add(
new StructXY( 35,35 ),
new StructXY( 35,35 ),
false, false, true);
this.dotSet( 11, 'colourStart', RGBA_grey );
this.dotSet( 11, 'colourEnd', RGBA_grey );
this.dotSet( 71, 'colourStart', RGBA_grey );
this.dotSet( 71, 'colourEnd', RGBA_grey );
this.dotSet( 45, 'colourStart', RGBA_grey );
this.dotSet( 45, 'colourEnd', RGBA_grey );
this.dotSet( 86, 'colourStart', RGBA_grey );
this.dotSet( 86, 'colourEnd', RGBA_grey );
this.dotSet( 39, 'colourStart', RGBA_grey );
this.dotSet( 39, 'colourEnd', RGBA_grey );
this.dotSet( 15, 'colourStart', RGBA_grey );
this.dotSet( 15, 'colourEnd', RGBA_grey );
this.dotSet( 40, 'colourStart', RGBA_grey );
this.dotSet( 40, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridDisappear9' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '91' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 64, 'colourStart', RGBA_black );
this.dotSet( 64, 'colourEnd', RGBA_grey );
pingController.add(
new StructXY( 65,45 ),
new StructXY( 65,45 ),
false, false, true);
this.dotSet( 11, 'colourStart', RGBA_grey );
this.dotSet( 11, 'colourEnd', RGBA_grey );
this.dotSet( 71, 'colourStart', RGBA_grey );
this.dotSet( 71, 'colourEnd', RGBA_grey );
this.dotSet( 45, 'colourStart', RGBA_grey );
this.dotSet( 45, 'colourEnd', RGBA_grey );
this.dotSet( 86, 'colourStart', RGBA_grey );
this.dotSet( 86, 'colourEnd', RGBA_grey );
this.dotSet( 39, 'colourStart', RGBA_grey );
this.dotSet( 39, 'colourEnd', RGBA_grey );
this.dotSet( 15, 'colourStart', RGBA_grey );
this.dotSet( 15, 'colourEnd', RGBA_grey );
this.dotSet( 40, 'colourStart', RGBA_grey );
this.dotSet( 40, 'colourEnd', RGBA_grey );
this.dotSet( 33, 'colourStart', RGBA_grey );
this.dotSet( 33, 'colourEnd', RGBA_grey );

        
      } else if( this.currentScene == 'gridLoadsHaveGone' ) {

        //the ones which faded out during phase 1
        this.dotSet( 11, 'colourStart', RGBA_grey );
        this.dotSet( 11, 'colourEnd', RGBA_grey );

        this.dotSet( 71, 'colourStart', RGBA_grey );
        this.dotSet( 71, 'colourEnd', RGBA_grey );

        this.dotSet( 45, 'colourStart', RGBA_grey );
        this.dotSet( 45, 'colourEnd', RGBA_grey );

        this.dotSet( 86, 'colourStart', RGBA_grey );
        this.dotSet( 86, 'colourEnd', RGBA_grey );

        this.dotSet( 39, 'colourStart', RGBA_grey );
        this.dotSet( 39, 'colourEnd', RGBA_grey );


        //the ones which faded out during phase 2
        this.dotSet( 15, 'colourStart', RGBA_grey );
        this.dotSet( 15, 'colourEnd', RGBA_grey );

        this.dotSet( 40, 'colourStart', RGBA_grey );
        this.dotSet( 40, 'colourEnd', RGBA_grey );

        this.dotSet( 33, 'colourStart', RGBA_grey );
        this.dotSet( 33, 'colourEnd', RGBA_grey );

        this.dotSet( 64, 'colourStart', RGBA_grey );
        this.dotSet( 64, 'colourEnd', RGBA_grey );

} else if( this.currentScene == 'gridReappear1' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '92' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 11, 'colourStart', RGBA_orange );
this.dotSet( 11, 'colourEnd', RGBA_orange );
pingController.add(
new StructXY( 15,15 ),
new StructXY( 15,15 )
);
this.dotSet( 71, 'colourStart', RGBA_grey );
this.dotSet( 71, 'colourEnd', RGBA_grey );
this.dotSet( 45, 'colourStart', RGBA_grey );
this.dotSet( 45, 'colourEnd', RGBA_grey );
this.dotSet( 86, 'colourStart', RGBA_grey );
this.dotSet( 86, 'colourEnd', RGBA_grey );
this.dotSet( 39, 'colourStart', RGBA_grey );
this.dotSet( 39, 'colourEnd', RGBA_grey );
this.dotSet( 15, 'colourStart', RGBA_grey );
this.dotSet( 15, 'colourEnd', RGBA_grey );
this.dotSet( 40, 'colourStart', RGBA_grey );
this.dotSet( 40, 'colourEnd', RGBA_grey );
this.dotSet( 33, 'colourStart', RGBA_grey );
this.dotSet( 33, 'colourEnd', RGBA_grey );
this.dotSet( 64, 'colourStart', RGBA_grey );
this.dotSet( 64, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridReappear2' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '93' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 11, 'colourStart', RGBA_orange );
this.dotSet( 11, 'colourEnd', RGBA_orange );
this.dotSet( 71, 'colourStart', RGBA_orange );
this.dotSet( 71, 'colourEnd', RGBA_orange );
pingController.add(
new StructXY( 75,15 ),
new StructXY( 75,15 )
);
this.dotSet( 45, 'colourStart', RGBA_grey );
this.dotSet( 45, 'colourEnd', RGBA_grey );
this.dotSet( 86, 'colourStart', RGBA_grey );
this.dotSet( 86, 'colourEnd', RGBA_grey );
this.dotSet( 39, 'colourStart', RGBA_grey );
this.dotSet( 39, 'colourEnd', RGBA_grey );
this.dotSet( 15, 'colourStart', RGBA_grey );
this.dotSet( 15, 'colourEnd', RGBA_grey );
this.dotSet( 40, 'colourStart', RGBA_grey );
this.dotSet( 40, 'colourEnd', RGBA_grey );
this.dotSet( 33, 'colourStart', RGBA_grey );
this.dotSet( 33, 'colourEnd', RGBA_grey );
this.dotSet( 64, 'colourStart', RGBA_grey );
this.dotSet( 64, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridReappear3' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '94' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 11, 'colourStart', RGBA_orange );
this.dotSet( 11, 'colourEnd', RGBA_orange );
this.dotSet( 71, 'colourStart', RGBA_orange );
this.dotSet( 71, 'colourEnd', RGBA_orange );
this.dotSet( 45, 'colourStart', RGBA_orange );
this.dotSet( 45, 'colourEnd', RGBA_orange );
pingController.add(
new StructXY( 45,55 ),
new StructXY( 45,55 )
);
this.dotSet( 86, 'colourStart', RGBA_grey );
this.dotSet( 86, 'colourEnd', RGBA_grey );
this.dotSet( 39, 'colourStart', RGBA_grey );
this.dotSet( 39, 'colourEnd', RGBA_grey );
this.dotSet( 15, 'colourStart', RGBA_grey );
this.dotSet( 15, 'colourEnd', RGBA_grey );
this.dotSet( 40, 'colourStart', RGBA_grey );
this.dotSet( 40, 'colourEnd', RGBA_grey );
this.dotSet( 33, 'colourStart', RGBA_grey );
this.dotSet( 33, 'colourEnd', RGBA_grey );
this.dotSet( 64, 'colourStart', RGBA_grey );
this.dotSet( 64, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridReappear4' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '95' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 11, 'colourStart', RGBA_orange );
this.dotSet( 11, 'colourEnd', RGBA_orange );
this.dotSet( 71, 'colourStart', RGBA_orange );
this.dotSet( 71, 'colourEnd', RGBA_orange );
this.dotSet( 45, 'colourStart', RGBA_orange );
this.dotSet( 45, 'colourEnd', RGBA_orange );
this.dotSet( 86, 'colourStart', RGBA_orange );
this.dotSet( 86, 'colourEnd', RGBA_orange );
pingController.add(
new StructXY( 85,65 ),
new StructXY( 85,65 )
);
this.dotSet( 39, 'colourStart', RGBA_grey );
this.dotSet( 39, 'colourEnd', RGBA_grey );
this.dotSet( 15, 'colourStart', RGBA_grey );
this.dotSet( 15, 'colourEnd', RGBA_grey );
this.dotSet( 40, 'colourStart', RGBA_grey );
this.dotSet( 40, 'colourEnd', RGBA_grey );
this.dotSet( 33, 'colourStart', RGBA_grey );
this.dotSet( 33, 'colourEnd', RGBA_grey );
this.dotSet( 64, 'colourStart', RGBA_grey );
this.dotSet( 64, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridReappear5' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '96' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 11, 'colourStart', RGBA_orange );
this.dotSet( 11, 'colourEnd', RGBA_orange );
this.dotSet( 71, 'colourStart', RGBA_orange );
this.dotSet( 71, 'colourEnd', RGBA_orange );
this.dotSet( 45, 'colourStart', RGBA_orange );
this.dotSet( 45, 'colourEnd', RGBA_orange );
this.dotSet( 86, 'colourStart', RGBA_orange );
this.dotSet( 86, 'colourEnd', RGBA_orange );
this.dotSet( 39, 'colourStart', RGBA_orange );
this.dotSet( 39, 'colourEnd', RGBA_orange );
pingController.add(
new StructXY( 35,95 ),
new StructXY( 35,95 )
);
this.dotSet( 15, 'colourStart', RGBA_grey );
this.dotSet( 15, 'colourEnd', RGBA_grey );
this.dotSet( 40, 'colourStart', RGBA_grey );
this.dotSet( 40, 'colourEnd', RGBA_grey );
this.dotSet( 33, 'colourStart', RGBA_grey );
this.dotSet( 33, 'colourEnd', RGBA_grey );
this.dotSet( 64, 'colourStart', RGBA_grey );
this.dotSet( 64, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridReappear6' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '97' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 11, 'colourStart', RGBA_orange );
this.dotSet( 11, 'colourEnd', RGBA_orange );
this.dotSet( 71, 'colourStart', RGBA_orange );
this.dotSet( 71, 'colourEnd', RGBA_orange );
this.dotSet( 45, 'colourStart', RGBA_orange );
this.dotSet( 45, 'colourEnd', RGBA_orange );
this.dotSet( 86, 'colourStart', RGBA_orange );
this.dotSet( 86, 'colourEnd', RGBA_orange );
this.dotSet( 39, 'colourStart', RGBA_orange );
this.dotSet( 39, 'colourEnd', RGBA_orange );
this.dotSet( 15, 'colourStart', RGBA_orange );
this.dotSet( 15, 'colourEnd', RGBA_orange );
pingController.add(
new StructXY( 15,55 ),
new StructXY( 15,55 )
);
this.dotSet( 40, 'colourStart', RGBA_grey );
this.dotSet( 40, 'colourEnd', RGBA_grey );
this.dotSet( 33, 'colourStart', RGBA_grey );
this.dotSet( 33, 'colourEnd', RGBA_grey );
this.dotSet( 64, 'colourStart', RGBA_grey );
this.dotSet( 64, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridReappear7' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '98' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 11, 'colourStart', RGBA_orange );
this.dotSet( 11, 'colourEnd', RGBA_orange );
this.dotSet( 71, 'colourStart', RGBA_orange );
this.dotSet( 71, 'colourEnd', RGBA_orange );
this.dotSet( 45, 'colourStart', RGBA_orange );
this.dotSet( 45, 'colourEnd', RGBA_orange );
this.dotSet( 86, 'colourStart', RGBA_orange );
this.dotSet( 86, 'colourEnd', RGBA_orange );
this.dotSet( 39, 'colourStart', RGBA_orange );
this.dotSet( 39, 'colourEnd', RGBA_orange );
this.dotSet( 15, 'colourStart', RGBA_orange );
this.dotSet( 15, 'colourEnd', RGBA_orange );
this.dotSet( 40, 'colourStart', RGBA_orange );
this.dotSet( 40, 'colourEnd', RGBA_orange );
pingController.add(
new StructXY( 45,5 ),
new StructXY( 45,5 )
);
this.dotSet( 33, 'colourStart', RGBA_grey );
this.dotSet( 33, 'colourEnd', RGBA_grey );
this.dotSet( 64, 'colourStart', RGBA_grey );
this.dotSet( 64, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridReappear8' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '99' );meterController.meters.quantity.addClass( 'meter--bgOff' );this.dotSet( 11, 'colourStart', RGBA_orange );
this.dotSet( 11, 'colourEnd', RGBA_orange );
this.dotSet( 71, 'colourStart', RGBA_orange );
this.dotSet( 71, 'colourEnd', RGBA_orange );
this.dotSet( 45, 'colourStart', RGBA_orange );
this.dotSet( 45, 'colourEnd', RGBA_orange );
this.dotSet( 86, 'colourStart', RGBA_orange );
this.dotSet( 86, 'colourEnd', RGBA_orange );
this.dotSet( 39, 'colourStart', RGBA_orange );
this.dotSet( 39, 'colourEnd', RGBA_orange );
this.dotSet( 15, 'colourStart', RGBA_orange );
this.dotSet( 15, 'colourEnd', RGBA_orange );
this.dotSet( 40, 'colourStart', RGBA_orange );
this.dotSet( 40, 'colourEnd', RGBA_orange );
this.dotSet( 33, 'colourStart', RGBA_orange );
this.dotSet( 33, 'colourEnd', RGBA_orange );
pingController.add(
new StructXY( 35,35 ),
new StructXY( 35,35 )
);
this.dotSet( 64, 'colourStart', RGBA_grey );
this.dotSet( 64, 'colourEnd', RGBA_grey );
} else if( this.currentScene == 'gridReappear9' ) {
meterController.hideAllMeters();meterController.meters.quantity.show();meterController.meters.quantity.update( '100' );meterController.meters.quantity.removeClass( 'meter--bgOff' );meterController.meters.quantity.addClass( 'meter--bgOn' );this.dotSet( 11, 'colourStart', RGBA_orange );
this.dotSet( 11, 'colourEnd', RGBA_orange );
this.dotSet( 71, 'colourStart', RGBA_orange );
this.dotSet( 71, 'colourEnd', RGBA_orange );
this.dotSet( 45, 'colourStart', RGBA_orange );
this.dotSet( 45, 'colourEnd', RGBA_orange );
this.dotSet( 86, 'colourStart', RGBA_orange );
this.dotSet( 86, 'colourEnd', RGBA_orange );
this.dotSet( 39, 'colourStart', RGBA_orange );
this.dotSet( 39, 'colourEnd', RGBA_orange );
this.dotSet( 15, 'colourStart', RGBA_orange );
this.dotSet( 15, 'colourEnd', RGBA_orange );
this.dotSet( 40, 'colourStart', RGBA_orange );
this.dotSet( 40, 'colourEnd', RGBA_orange );
this.dotSet( 33, 'colourStart', RGBA_orange );
this.dotSet( 33, 'colourEnd', RGBA_orange );
this.dotSet( 64, 'colourStart', RGBA_orange );
this.dotSet( 64, 'colourEnd', RGBA_orange );
pingController.add(
new StructXY( 65,45 ),
new StructXY( 65,45 )
);

      } else if( this.currentScene == 'gridPause2' ) {

         //the ones which faded out during phase 1- back
        this.dotSet( 11, 'colourStart', RGBA_orange );
        this.dotSet( 11, 'colourEnd', RGBA_black );

        this.dotSet( 71, 'colourStart', RGBA_orange );
        this.dotSet( 71, 'colourEnd', RGBA_black );

        this.dotSet( 45, 'colourStart', RGBA_orange );
        this.dotSet( 45, 'colourEnd', RGBA_black );

        this.dotSet( 86, 'colourStart', RGBA_orange );
        this.dotSet( 86, 'colourEnd', RGBA_black );

        this.dotSet( 39, 'colourStart', RGBA_orange );
        this.dotSet( 39, 'colourEnd', RGBA_black );


        //the ones which faded out during phase 2 - back
        this.dotSet( 15, 'colourStart', RGBA_orange );
        this.dotSet( 15, 'colourEnd', RGBA_black );

        this.dotSet( 40, 'colourStart', RGBA_orange );
        this.dotSet( 40, 'colourEnd', RGBA_black );

        this.dotSet( 33, 'colourStart', RGBA_orange );
        this.dotSet( 33, 'colourEnd', RGBA_black );

        this.dotSet( 64, 'colourStart', RGBA_orange );
        this.dotSet( 64, 'colourEnd', RGBA_black );

      }

    }

  //SCENE: grid boxes *****************************************************/
  } else if( this.currentScene == 'gridBox1' || this.currentScene == 'gridBox2' || this.currentScene == 'gridBox3' ) {

    if( this.manageSceneChange() ) {
 
      this.collectionDots = this.createDots( 100 );

      this.setGridStartPos();

      this.loadCoOrds( this.collectionDots, this.points_grid, "posStart" );
      this.loadCoOrds( this.collectionDots, this.points_grid, "posEnd" );

      if( this.currentScene == 'gridBox1' ) {

        //set the dot start
        this.dotSet( 11, 'colourStart', RGBA_orange );

        //set the dot end
        this.dotSet( 11, 'colourEnd', RGBA_orange );

        //add the box
        var boxCoOrds = environment.getCoOrds( 1, 1 );

        boxController.add( 1, boxCoOrds.x, boxCoOrds.y, boxController.texts.whiteShirt );

        //set ping
        pingController.add(
          new StructXY( 15, 15 ),
          new StructXY( 15, 15 )
        );
      }

      if( this.currentScene == 'gridBox2' ) {

        //set the dot start
        this.dotSet( 11, 'colourStart', RGBA_orange );
        this.dotSet( 25, 'colourStart', RGBA_orange );

        //set the dot end
        this.dotSet( 11, 'colourEnd', RGBA_orange );
        this.dotSet( 25, 'colourEnd', RGBA_orange );

        //add the box
        var boxCoOrds = environment.getCoOrds( 2, 5 );

        boxController.add( 1, boxCoOrds.x, boxCoOrds.y, boxController.texts.greyShirt );

        //set ping
        pingController.add(
          new StructXY( 25, 55 ),
          new StructXY( 25, 55 )
        );
      }

      if( this.currentScene == 'gridBox3' ) {

        //set the dot start
        this.dotSet( 11, 'colourStart', RGBA_orange );
        this.dotSet( 25, 'colourStart', RGBA_orange );
        this.dotSet( 42, 'colourStart', RGBA_orange );

        //set the dot end
        this.dotSet( 11, 'colourEnd', RGBA_orange );
        this.dotSet( 25, 'colourEnd', RGBA_orange );
        this.dotSet( 42, 'colourEnd', RGBA_orange );

        //add the box
        var boxCoOrds = environment.getCoOrds( 4, 2 );

        boxController.add( 1, boxCoOrds.x, boxCoOrds.y, boxController.texts.blackJeans );

        //set ping
        pingController.add(
          new StructXY( 45, 25 ),
          new StructXY( 45, 25 )
        );

      }

    }


  //SCENE: grid boxes *****************************************************/
  } else if( this.currentScene == 'gridPause3' ) {

    if( this.manageSceneChange() ) {

      pingController.destroyAll();

      this.collectionDots = this.createDots( 100 );

      //set dots to fade from orange to black
      this.dotSet( 11, 'colourStart', RGBA_orange );
      this.dotSet( 25, 'colourStart', RGBA_orange );
      this.dotSet( 42, 'colourStart', RGBA_orange );

      //set dots to fade from orange to black
      this.dotSet( 11, 'colourEnd', RGBA_black );
      this.dotSet( 25, 'colourEnd', RGBA_black );
      this.dotSet( 42, 'colourEnd', RGBA_black );

      this.setGridStartPos();

      this.loadCoOrds( this.collectionDots, this.points_grid, "posStart" );
      this.loadCoOrds( this.collectionDots, this.points_grid, "posEnd" );

    }


  //SCENE: crush *****************************************************/
  } else if( this.currentScene == 'crush' ) {

    if( this.manageSceneChange() ) {

      pingController.destroyAll();
      
      this.collectionDots = this.createDots( 100 );

      //generate points
      this.setGridStartPos();
      this.setCrushEndPos();
      
      this.loadCoOrds( this.collectionDots, this.points_grid, "posStart" );
    }


  //SCENE: queue static *****************************************************/
  } else if( this.currentScene == 'queueStatic' ) {

    if( this.manageSceneChange() ) {
      pingController.destroyAll();
      
      this.collectionDots = this.createDots( this.quantDotsQueue );

      this.setQueueStartPos( this.quantDotsQueue );
      this.setQueueEndPosStatic( this.quantDotsQueue );
    }

  //SCENE: queue *****************************************************/
  } else if( this.currentScene == 'queue' ) {

    if( this.manageSceneChange() ) {

      this.collectionDots = this.createDots( this.quantDotsQueue );

      this.dotsSet( 'greyPingExit', true );
      
      //add one more for the "rogue" one which flies past
      this.collectionDots.push( new Dot() );

      //rogue one positions
      this.collectionDots[ this.quantDotsQueue ].posStart = this.startPoint_queue_rogue;
      this.collectionDots[ this.quantDotsQueue ].posEnd = this.endPoint_queue_rogue;

      //set the colour for the rogue one
      this.dotSet( this.collectionDots.length - 1, 'colourStart', RGBA_orange );
      this.dotSet( this.collectionDots.length - 1, 'colourEnd', RGBA_orange );
      this.dotSet( this.collectionDots.length - 1, 'text', '$90' );

      this.setQueueStartPos( this.quantDotsQueue );
      this.setQueueEndPos( this.quantDotsQueue );

      //set "rogue" ping
      pingController.add(
        this.startPoint_queue_rogue,
        this.endPoint_queue_rogue,
        true
      );

    }


  //SCENE: queueToOrange *****************************************************/
  } else if( this.currentScene == 'queueToOrange' ) {

    if( this.manageSceneChange() ) {

      pingController.destroyAll();

      this.collectionDots = this.createDots( this.quantDotsQueueToOrange );

      this.dotsSet( 'greyPing', true );

      this.dotsSet( 'greyPingExit', true );

      this.dotsSet( 'colourStart', RGBA_black );
      this.dotsSet( 'colourEnd', RGBA_orange );

      this.setQueueStartPos( this.quantDotsQueueToOrange );
      this.setQueueEndPos( this.quantDotsQueueToOrange );

      //this.textBlockerPortrait.classList.add( 'hide' );
    }


  //SCENE: leave *****************************************************/
  } else if( this.currentScene == 'leave' ) {

    if( this.manageSceneChange() ) {

      pingController.destroyAll();

      environment.clipSquare = false;

      this.collectionDots = this.createDots( 10 );

      this.dotsSet( 'colourStart', RGBA_orange );
      this.dotsSet( 'colourEnd', RGBA_orange );

      //set the dollar figures next to each dot when they leave
      this.generateLeaveTexts();
      this.setLeaveTexts();

      this.setLeaveStartPos();
      this.loadCoOrds( this.collectionDots, this.endPoints_leave, "posEnd" );

      this.setLeavePingPos();

      this.textNoCheckoutLines.classList.add( 'active' );

    }

  //SCENE: end *****************************************************/
  } else if( this.currentScene == 'end' ) {

    if( this.manageSceneChange() ) {
      pingController.destroyAll();

      this.animMailingListBox.classList.add( 'show' );
      this.textBlockerPortrait.classList.add( 'hide' );
    }
  }

  //then update all dots
  for( var s = 0; s < this.collectionDots.length; s++ ) {
    this.collectionDots[ s ].update( environment, timeline );
  }
}