"use strict";

/*************
TIMELINE CONTROLLER
*************/

function Timeline() {
  this.maxTime;                    //page height - viewport height
  this.timePercentUnit;            //unit of time which corresponds to 1%
  this.currentTimePercent;         //current time in percent

  this.currentSceneIndex;
  this.currentScenePercent;        //current scene in percent

  //raw scenes: should be set as percentage of total animation
  //so these get "crushed" into a 100 total
  //I should have done it differently to allow scene data to be accessed by key- to be improved in the year 2167

  this.scenesRaw = [
    [ "preBegin",                  28    ],
    [ "begin",                     18    ],
    [ "clone1",                    7    ],
    [ "clone2",                    10    ],
    [ "gridPause",                 27    ],
    [ "gridDisappear1",           1.333333    ],
    [ "gridDisappear2",           1.333333    ],
    [ "gridDisappear3",           1.333333    ],
    [ "gridDisappear4",           1.333333    ],
    [ "gridDisappear5",           1.333333    ],
    [ "gridDisappear6",           1.333333    ],
    [ "gridDisappear7",           1.333333    ],
    [ "gridDisappear8",           1.333333    ],
    [ "gridDisappear9",           1.333333    ],
    [ "gridLoadsHaveGone",            2    ],
    [ "gridReappear1",           1.333333    ],
    [ "gridReappear2",           1.333333    ],
    [ "gridReappear3",           1.333333    ],
    [ "gridReappear4",           1.333333    ],
    [ "gridReappear5",           1.333333    ],
    [ "gridReappear6",           1.333333    ],
    [ "gridReappear7",           1.333333    ],
    [ "gridReappear8",           1.333333    ],
    [ "gridReappear9",           1.333333    ],
    [ "gridPause2",                18    ],
    [ "gridBox1",                  14    ],
    [ "gridBox2",                  14    ],
    [ "gridBox3",                  14    ],
    [ "gridPause3",                5    ],
    [ "crush",                     7.5    ],
    [ "queueStatic",                     15    ],
    [ "queue",                     22    ],
    [ "queueToOrange",             5    ],
    [ "leave",                     24    ],
    [ "end",                       9     ]
  ];

  //this holds the "crushed" versions of the scenes
  this.scenes = this.sceneCrush();
}


//this crushes scene timings down to total of 100%
Timeline.prototype.sceneCrush = function() {
  var totalInScene = 0;
    
  for( var w = 0; w < this.scenesRaw.length; w++ ) {
      totalInScene += this.scenesRaw[w][1];
  }
  
  var sceneUnit = 100 / totalInScene;
  var scenesOngoing = 0;
  var newScenes = new Array();

  for( var w = 0; w < this.scenesRaw.length; w++ ) {
    newScenes.push( [ this.scenesRaw[w][0], scenesOngoing ] );

    scenesOngoing += this.scenesRaw[w][1] * sceneUnit;
  }
  
  return newScenes;
}



//reset the timeline (to be invoked on page resize, etc)
Timeline.prototype.reset = function() {
  this.maxTime = getLongAnimTrackHeight() - getViewportHeight();
  this.timePercentUnit = this.maxTime / 100;
  this.setCurrentTimePercent();
  this.update();
}


//get index of scene by scene name
//should have done it differently to allow scene length to be accessed via key?
Timeline.prototype.getSceneIndex = function( scene ) {
  for( var q = 0; q < this.scenes.length; q++ ) {
    if( scene == this.scenes[ q ][ 0 ] ) {
      return q;
    }
  }

  return false;
}


//get scene by index according to how much time has elapsed
Timeline.prototype.getCurrentSceneIndex = function( value ) {

  //if zero return 0 straight away
  if( value == 0 ) { return 0 };

  for( var x = 0; x < this.scenes.length - 1; x++ ) {
    if( value >= this.scenes[ x ][ 1 ] ) {
      if( value < this.scenes[ x + 1 ][ 1 ] ) {
        return x;
      }
    }
  }

  //if it goes through the for loop without returning, return the last scene index
  var sceneIndex = this.scenes.length - 1;

  return sceneIndex;
}


//get length of current scene
Timeline.prototype.getCurrentSceneLength = function() {
  if( this.currentSceneIndex == this.scenes.length - 1 ) {
    return 100 - this.scenes[ this.currentSceneIndex ][ 1 ];
  }

  return this.scenes[ this.currentSceneIndex + 1 ][ 1 ] - this.scenes[ this.currentSceneIndex ][ 1 ];
}


//get lengths of several scenes together
Timeline.prototype.getMultipleScenesLength = function( sceneStart, sceneEnd ) {

  var sceneIndexStart = this.getSceneIndex( sceneStart );
  var sceneIndexEnd = this.getSceneIndex( sceneEnd );

  if( sceneIndexStart >= 0 && sceneIndexEnd >= 1 ) {

    var timeStart = this.scenes[ sceneIndexStart ][ 1 ];
    var timeEnd = this.scenes[ sceneIndexEnd ][ 1 ];

    return timeEnd - timeStart;

  } else {
    console.error( 'bad scene names provided' );
    return false;
  }
}


//get elapsed time in scene, relative to whole animation- eg, if called right in the middle it will display 50%
Timeline.prototype.getCurrentElapsed = function() {
  var sceneStart = this.scenes[ this.currentSceneIndex ][ 1 ];
  return this.currentTimePercent - sceneStart;
}


//get elapsed time in scene as percentage relative to scene length - eg 0% at scene start, 100% at scene end
Timeline.prototype.getCurrentElapsedPerc = function() {
  return ( this.getCurrentElapsed() / this.getCurrentSceneLength() ) * 100;
}


//set current time. This is slightly inaccurate if there's margin around the body
Timeline.prototype.setCurrentTimePercent = function() {
  this.currentTimePercent = ( getCurrentScrollPos() - environment.animTrackPosY ) / this.timePercentUnit;

  //clamp between 0 and 100 in order to not allow scrolling up above the page in safari
  this.currentTimePercent = clampMinMax( this.currentTimePercent, 0, 100 );
}


Timeline.prototype.update = function() {
  this.setCurrentTimePercent();
  this.currentSceneIndex = this.getCurrentSceneIndex( this.currentTimePercent );
}