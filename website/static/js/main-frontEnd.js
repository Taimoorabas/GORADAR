"use strict";

/*************
FRONTEND

All frontend code not involved in anims goes here
*************/

/***** ABOUT PANE *****/

var logoMain = document.querySelector( '.js-logoMain' );

var aboutPane = document.querySelector( '.js-paneAbout' );
//var aboutPaneClose = document.querySelector( '.js-paneAbout__btnClose' );
let aboutLink = document.querySelector( '.js-aboutLink' );
var aboutCredit = document.querySelector( '.js-aboutCredit' );

/***** BODY FADEIN *****/
function bodyFadeIn() {
  document.body.classList.add( 'active' );
}


/***** EVENT LISTENERS *****/

//event listener - show
function clickEvent_aboutPaneShow() {
  aboutLink.addEventListener( 'click', function( e ) {
    e.preventDefault();

    //if it's already open, close
    if( aboutPaneCheckOpen() ) {
      aboutPaneHide();
    } else {
      aboutPaneShow();
    }

  }, false );
}


//event listener - hide
function clickEvent_aboutPaneHide() {
  /*aboutPaneClose.addEventListener( 'click', function( e ) {
    e.preventDefault();
    aboutPaneHide();
  }, false );*/

  //if we're on the front page, add a close event to logo too
  if( checkIsFrontPage() ) {
    logoMain.addEventListener( 'click', function( e ) {
      e.preventDefault();
      aboutPaneHide();
    }, false );
  }
}


//event listener - about pane transitionend
function transEnd_aboutPane() {
  aboutPane.addEventListener( 'transitionend', function( e ) {
    
    //the about pane has finished transitioning offscreen
    if( !aboutPane.classList.contains( 'active' ) ) {
      aboutPane.classList.remove( 'visible' );
      //setGUIBG( '#f2f2f2' );
      aboutBodyClassRemove();
      
      navBGManager.setBGColour( '#f2f2f2' );
    } else {
      //setGUIBG( '#ff6b00' );
      //the about pane has finished transitioning onscreen
      navBGManager.setBGColour( '#ff6b00' );
    }

  }, false );
}


/***** GENERAL SHOW/HIDE *****/

//set visibility (this is required as otherwise it will be visible at the bottom of the page)
function aboutPaneShow() {
  aboutPane.classList.add( 'active' );
  aboutPane.classList.add( 'visible' );
  aboutCredit.classList.add( 'active' );
  
  aboutLinkUnderlineAdd();

  bodyBlockScroll();
  aboutBodyClassAdd();

  //set it back to its natural 100% width
  navBGManager.storeWidth();
  navBGManager.removeWidth();

  navBGManager.storezIndex();
  navBGManager.setZindex( 5 );

  navBGManager.setBGColour( 'transparent' );
}


function aboutPaneHide() {
  aboutPane.classList.remove( 'active' );
  aboutCredit.classList.remove( 'active' );
  
  aboutLinkUnderlineRemove();
  
  bodyUnblockScroll();

  navBGManager.restoreWidth();
  navBGManager.restorezIndex();
  navBGManager.setBGColour( 'transparent' );
}


/***** CHECK IF ABOUT IS OPEN *****/

function aboutPaneCheckOpen() {
  if( aboutPane.classList.contains( 'active' ) ) {
    return true;
  }
  return false;
}


/***** ADD OR REMOVE "ABOUT" LINK PSEUDO ELEMENT CLASS *****/

function aboutLinkUnderlineAdd() {
  aboutLink.classList.add( 'underlinePseudo' );
}

function aboutLinkUnderlineRemove() {
  aboutLink.classList.remove( 'underlinePseudo' );
}


/***** SET BODY TO OVERFLOW HIDDEN (when About pane is active) *****/

function bodyBlockScroll() {
  document.body.classList.add( 'overflowYHidden' );
}


function bodyUnblockScroll() {
  document.body.classList.remove( 'overflowYHidden' );
}


/***** ADD ABOUT PANE OPEN BODY CLASS (when About pane is active) *****/

function aboutBodyClassAdd() {
  document.body.classList.add( 'body--aboutPaneOpen' );
}

function aboutBodyClassRemove() {
  document.body.classList.remove( 'body--aboutPaneOpen' );
}




/***** NAV BACKGROUNDS *****/

//we need to be able to set these to whatever BG, due to the text masking thing
/*var logoMainPos = document.querySelector( '.js-logoMain__posAndPad' );
var navMainElements = document.querySelectorAll( '.menu-item' );

function setGUIBG( newBGHex ) {
  //should be a better implementation than this
  logoMainPos.style.background = newBGHex;

  for( var q = 0; q < navMainElements.length; q++ ) {
    navMainElements[ q ].style.background = newBGHex;
  }
}*/


/**** MAIN ****/

document.addEventListener( "DOMContentLoaded", function() {
  clickEvent_aboutPaneShow();
  clickEvent_aboutPaneHide();
  transEnd_aboutPane();
});




