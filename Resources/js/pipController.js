/*************
PIPMEISTER

This tracks which slide we're on and updates the pips on the left accordingly
*************/

function Pipmeister() {
    this.slidesHTML = document.querySelectorAll( '.js-slide' );
    this.pipsHTML = document.querySelectorAll( '.js-pip' );
    this.slideHeights = [];
  }
  
  
  //check which slide is the current slide
  Pipmeister.prototype.checkSlide = function() {
  
    //clear off current pip active classes
    for( var q = 0; q < this.slidesHTML.length; q++ ) {
      this.pipsHTML[ q ].classList.remove( 'pips__pip--active' );
    }
  
    for( var q = 0; q < this.slidesHTML.length; q++ ) {
  
      //get top position of each slide
      var slidePos = this.slidesHTML[ q ].getBoundingClientRect().top + getCurrentScrollPos();
  
      if( getCurrentScrollPos() + getViewportHeight() >= slidePos ) {
        this.pipsHTML[ q ].classList.add( 'pips__pip--active' );
      } else {
        break;
      }
  
    }
  }