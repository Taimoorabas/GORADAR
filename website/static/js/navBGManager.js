"use strict";

/*************
NAV/LOGO BG MANAGER

This controls whether these should appear (to stop the text from clashing with the logo/nav), and what colour they should be
*************/

function NavBBGManager() {
  this.logoBGHTML = document.querySelector( '.js-blocker--logo' );
  this.navBGHTML = document.querySelector( '.js-blocker--nav' );
  this.navBGColor;
  this.hasChanged = false;
  this.prevWidth;
  this.prevzIndex;
}


NavBBGManager.prototype.setZindex = function( newZIndex ) {
  if( this.logoBGHTML && this.navBGHTML ) {
    if( aboutPaneCheckOpen() ) {
      newZIndex = 5;
    }

    this.logoBGHTML.style.zIndex = newZIndex;
    this.navBGHTML.style.zIndex = newZIndex;
  }
}


NavBBGManager.prototype.setBGColour = function( newBGColour ) {
  if( this.logoBGHTML && this.navBGHTML ) {
    // this.logoBGHTML.style.backgroundColor = newBGColour;
    // this.navBGHTML.style.backgroundColor = newBGColour;
  }
}


NavBBGManager.prototype.storeWidth = function() {
  if( this.logoBGHTML.style.width.length > 0 ) {
    this.prevWidth = this.logoBGHTML.style.width;
  }
}


NavBBGManager.prototype.restoreWidth = function() {
  this.logoBGHTML.style.width = this.prevWidth;
  this.navBGHTML.style.width = this.prevWidth;
}


NavBBGManager.prototype.removeWidth = function() {
  this.logoBGHTML.style.removeProperty( 'width' );
  this.navBGHTML.style.removeProperty( 'width' );
}


NavBBGManager.prototype.storezIndex = function() {
  if( this.logoBGHTML.style.zIndex.length > 0 ) {
    this.prevzIndex = this.logoBGHTML.style.zIndex;
  }
}


NavBBGManager.prototype.restorezIndex = function() {
  this.logoBGHTML.style.zIndex = this.prevzIndex;
  this.navBGHTML.style.zIndex = this.prevzIndex;
}



/*******

DESCRIPTION OF EVENTS

Portrait:

- ball: both trans
- anim: both grey
- about: both orange

Landscape:

- ball: both trans
- anim: both grey
- about: both orange

Other:

- normal: both grey
- about: both orange

*******/