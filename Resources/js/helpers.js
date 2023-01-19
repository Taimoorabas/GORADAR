"use strict";

/*************
DOCUMENT VARIABLES
*************/

function getCurrentScrollPos() {
  var doc = document.documentElement;
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
  return top;
}


//needs testing to guarantee works in other browsers
//the overall code assumes the page height is at least as tall as the window viewport
//this stopped working when I started using a very tall div instead of body to contain anim
/*function getPageHeight() {
  return document.documentElement.clientHeight;
}*/


//get height of track
function getLongAnimTrackHeight() {
  return document.querySelector('.longAnimTrack').clientHeight
}

/******* NOTE: these are present in other script (particle orb) ******/

//needs testing to guarantee works in other browsers
function getViewportHeight() {
  return window.innerHeight;
}

function getViewportWidth() {
  return window.innerWidth;
}

function getViewportDPI() {
  return window.devicePixelRatio;
}



/*************
NUMBER
*************/

//return a value between min and max (eg, to keep a val between 0 and 100)
function clampMinMax( value, min, max ) {
  if( typeof value == 'number' ) {

    if( typeof min == 'number' ) {
      value = value > min ? value : min;
    }

    if( typeof max == 'number' ) {
      value = value < max ? value : max;  
    }

    return value;
  }
  
  return false;
}


//get a random number between min and max
function mathRandomRange( min, max ) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//get a seeded random number
function mathRandomSeed( seed ) {
  var myrng = new Math.seedrandom( seed );
  return myrng();
}


//get a seeded int between min and max
function mathRandomIntSeed( min, max, seed ) {
  return Math.round( mathRandomSeed( seed ) * ( max - 1 - min ) + min );
}


//"humanise" a number- eg add or subtract a small amount within a certain bound
function humaniseNumber( value, range ) {
  return value - range + ( Math.random() * ( range * 2 ) );
}


//get a point X angles below 0 ,0
function getCoOrdsXAngles( angle, distance ) {
    angle = angle * Math.PI / 180;
    var hyp = distance;
    var oppo = Math.sin( angle ) * hyp;
    var adj = Math.cos( angle ) * hyp;
    
    return new Array( oppo, adj );
}


//rounds up a number to the rounding given (eg 26, 5 returns 30)
function roundX( value, rounding )
{
    return Math.ceil( value / rounding ) * rounding;
}


/*************
ARRAY
*************/

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray( array ) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//this is for use on arrays with simple variables only
//https://blog.mariusschulz.com/2016/07/16/removing-elements-from-javascript-arrays
function removeFromArray( array, element ) {
  const index = array.indexOf(element);
  
  if (index !== -1) {
      array.splice(index, 1);
  }
}


//find array index of object with certain member value
//https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
function arrayObjectIndexOf( myArray, searchTerm, property ) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}


//remove objects with certain member value from array
function objectRemoveFromArray( array, value, property ) {
  //const index = array.indexOf(element);
    const index = arrayObjectIndexOf( array, value, property );
  
  if (index !== -1) {
      array.splice(index, 1);
  }
}



/*************
GRAPHICS FUNCTIONS
*************/

//draw circle primative
//note this is mid handled
function drawCircle( context, x, y, width, colour ) {
  context.beginPath();
  context.arc( Math.round( x ), Math.round( y ), Math.round( width / 2 ), 0, 2 * Math.PI, false);
  context.fillStyle = colour;
  context.fill();
}


//draw square primative
//note this is top-left handled
function drawSquare( context, x, y, width, height, colour ) {
  context.fillStyle = colour;
  context.fillRect( x, y, width, height );
}


//draw square outline primative
//note this is top-left handled
function drawOutlineSquare( context, x, y, width, height, colour, lineWidth ) {
  context.beginPath();
  context.rect( x, y, width, height );
  context.strokeStyle = colour;
  context.lineWidth = lineWidth;
  context.stroke();
}



/*************
STRUCTS
*************/

//a struct to hold sets of co-ordinates
function StructXY( x, y ) {
  this.x = x;
  this.y = y;
}


StructXY.prototype.set = function( x, y ) {
  this.x = x;
  this.y = y;
}


//hold RGBA values
function StructRGBA( r, g, b, a ) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}


StructRGBA.prototype.set = function( r, g, b, a ) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
}


StructRGBA.prototype.strRGBA = function( opacity ) {
  if( typeof opacity === 'number' ) {
    return 'rgba( ' + Math.round( this.r ) + ', ' + Math.round( this.g ) + ', ' + Math.round( this.b ) + ', ' + opacity + ')';
  }

  return 'rgba( ' + Math.round( this.r ) + ', ' + Math.round( this.g ) + ', ' + Math.round( this.b ) + ', ' + this.a + ')';
}