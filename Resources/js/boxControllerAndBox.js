"use strict";

/*************
BOX CONTROLLER
*************/

function BoxController() {
  this.collection = [];

  this.texts = {
    whiteShirt : [
      'FITTED WHITE SHIRT',
      '40 USD',
      '-',
      'CUSTOMERS PICKED UP',
      'THIS ITEM',
      '12 TIMES TODAY'
    ],
    greyShirt : [
      'GRAY SHIRT, MEDIUM',
      '60 USD',
      '-',
      'TRIED ON 7 TIMES TODAY'
    ],
    blackJeans : [
      'TAPERED BLACK JEANS',
      '50 USD',
      '-',
      'VIEWED BY CUSTOMERS',
      'HOLDING A WHITE SHIRT',
      '6 TIMES TODAY'
    ]
  }

  //this is like a lame version of preloading
  environment.context.font = '1px "GT Pressura Mono"';
  environment.context.fillText( 't', -50, -50 );
}


//the ID is to prevent more boxes being created during a scene (otherwise they'll be created every frame)
//not 100% sure if the ID system is required..?
BoxController.prototype.add = function( id, x, y, text ) {

  //if there's a box of this ID and it's outgoing, add another one anyway
  var boxID = arrayObjectIndexOf( this.collection, id, 'id' );

  if( boxID === -1 || this.collection[ boxID ].outgoing === true ) {
    this.collection.push(
      new Box(
        id,
        x,
        y,
        text
      )
    );
  }
}


//eliminate the eliminated
BoxController.prototype.removeEliminateds = function() {
  for( var f = 0; f < this.collection.length; f++ ) {
    objectRemoveFromArray( this.collection, true, 'eliminated' );
  }
}


BoxController.prototype.update = function() {
  //get rid of the eliminated ones first
  this.removeEliminateds();

  //update the remaining ones
  for( var f = 0; f < this.collection.length; f++ ) {
    this.collection[ f ].update();
  }
}


//draw all boxes
BoxController.prototype.draw = function() {
  for( var f = 0; f < this.collection.length; f++ ) {
    this.collection[ f ].draw();
  }
}


//flag all as outgoing (so will fade out and then die)
BoxController.prototype.setAllOutgoing = function() {
  for( var f = 0; f < this.collection.length; f++ ) {
    this.collection[ f ].outgoing = true;
  }
}



/*************
BOX
*************/

function Box( id, x, y, text ) {
  this.id = id;

  //co-ords of wireframe box
  this.x = x;            
  this.y = y;            
  //why isn't x and y a StructXY?

  //add on the drawing dimensions
  this.x += environment.drawStartX;
  this.y += environment.drawStartY;

  //dimensions of wireframe square
  this.squareWidth = 0;
  this.squareHeight = 0;

  //max dimensions of wireframe square
  this.maxSquareWidth = environment.cellWidth;
  this.maxSquareHeight = environment.cellHeight;

  //co-ords of solid orange box
  this.boxX = this.x + this.maxSquareWidth;
  this.boxY = this.y + this.maxSquareHeight;

  //width/height of solid orange box (will vary as it grows)
  this.width = 0;
  this.height = 0;

  //max dimensions of orange box
  this.maxWidth = environment.cellWidth * 4;
  this.maxHeight = environment.cellWidth * 3;

  this.text = text;
  this.opacity = 1;

  this.opacityDeath = .09;      //val to be used when a box fades out

  this.fullyGrown = false;      //flag to be set when incoming phase ends
  this.outgoing = false;        //flag to be set when outgoing phase starts
  this.eliminated = false;      //"delete me" mark

  this.fontRatio = 0.065;        //multiply this by box size to derive correct font size
  this.textPaddingX = this.maxWidth * .05;
  this.textPaddingY = this.maxWidth * .035;

  this.fontSize = Math.round( this.fontRatio * this.maxWidth );
  this.textLineHeight = Math.round( this.fontSize * 1.15 );

  //this.textLineHeight = 35;     //needs to be a scalable value

  //this.fontSize = 26;     //needs to be a scalable value


  this.growthFrames = 15;         //number of frames to be fully grown
  this.growthX = this.maxWidth / this.growthFrames;
  this.growthY = this.maxHeight / this.growthFrames;

  //outline square growth
  this.squareGrowthX = this.maxSquareWidth / this.growthFrames;
  this.squareGrowthY = this.maxSquareHeight / this.growthFrames;
}


/*
  correlation between box size and text size?

  b: 296.7
  t: 21

  b: 239
  t: 17

  b: 357
  t: 26
*/



//environment is out of scope below. But why is it within scope in the constructor?
//Box.maxWidth = environment.cellWidth * 4;
//Box.maxHeight = environment.cellWidth * 3;
Box.colourBG = RGBA_orange;
Box.colourText = RGBA_white;


Box.prototype.update = function() {

  //grow in orange box,
  if( this.width < this.maxWidth ) {
    this.width += this.growthX;
  }

  if( this.height < this.maxHeight ) {
    this.height += this.growthY;
  }

  this.width = clampMinMax( this.width, 0, this.maxWidth );
  this.height = clampMinMax( this.height, 0, this.maxHeight );

  //grow in square outline box
  if( this.squareWidth < this.maxSquareWidth ) {
    this.squareWidth += this.squareGrowthX;
  }

  if( this.squareHeight < this.maxSquareHeight ) {
    this.squareHeight += this.squareGrowthY;
  }

  this.squareWidth = clampMinMax( this.squareWidth, 0, this.maxSquareWidth );
  this.squareHeight = clampMinMax( this.squareHeight, 0, this.maxSquareHeight );


  //orage box: check has achieved full size, at which point the text appears
  if( this.width == this.maxWidth && this.height == this.maxHeight ) {
    this.fullyGrown = true;
  }

  //if has been set as "outgoing", reduce the opacity then flag as eliminated
  if( this.outgoing ) {
    this.opacity -= this.opacityDeath;

    if( this.opacity <= 0 ) {
      this.eliminated = true;
    }
  }

}


Box.prototype.draw = function() {
  
  //draw the orange solid box
  drawSquare(
    environment.context,
    this.boxX,
    this.boxY,
    this.width,
    this.height,
    'rgba(' + Box.colourBG.r + ', ' + Box.colourBG.g + ', ' + Box.colourBG.b + ', ' + this.opacity + ' )'
  );

  //draw the outline box
  drawOutlineSquare(
    environment.context,
    this.x + ( ( this.maxSquareWidth - this.squareWidth ) / 2 ),
    this.y + ( ( this.maxSquareHeight - this.squareHeight ) / 2 ),
    this.squareWidth,
    this.squareHeight,
    'rgba(' + Box.colourBG.r + ', ' + Box.colourBG.g + ', ' + Box.colourBG.b + ', ' + this.opacity + ' )',
    getViewportDPI()
  );

  //if fully transitioned in, draw the text
  if( this.fullyGrown ) {
    environment.context.textBaseline = "top";
    environment.context.fillStyle = Box.colourText.strRGBA();

    if( this.text instanceof Array ) {
      var lineCounter = this.boxY + this.textPaddingY;

      environment.context.font = this.fontSize + 'px "GT Pressura Mono"';

      for( var q = 0; q < this.text.length; q++ ) {
        environment.context.fillText( this.text[ q ], Math.round( this.boxX + this.textPaddingX ), Math.round( lineCounter ) );
        lineCounter += this.textLineHeight;
      }
    }
  }

}