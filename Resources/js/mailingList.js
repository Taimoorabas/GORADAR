//JS for submitting mailing list

(function () {
    "use strict";
  
    /*************
    MAILCHIMP FORM SUBMISSION
  
    Maybe this should be an object.....
    *************/
  
    //var subscribeForm = document.querySelector( '#js-mailingList' );
    var subscribeForms = document.querySelectorAll( '.js-mailingList' );
  
    if( subscribeForms ) {
      for( var q = 0; q < subscribeForms.length; q++ ) {
        
        subscribeForms[ q ].addEventListener( 'submit', function( e ) {
          e.preventDefault();
          handleMailingListSubmit( this );
        });
  
      }
    } else {
  
    }
  
    //handle a submission
    function handleMailingListSubmit( thisForm ) {
  
      hideStatusText( thisForm );
      var addrEmail = thisForm.getElementsByClassName( 'js-mailingList__email' ).email.value;
  
      if( addrEmail.length > 0 ) {
  
        //get form action
        var action = subscribeForms[0].getAttribute( 'action' );
  
        var xhr = new XMLHttpRequest();
  
        xhr.open( 'POST', action );
  
        xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
  
        xhr.onload = function() {
          if( xhr.responseText.trim() === 'Thanks For Subscribing!' ) {
            showStatusText( thisForm, 'mailingList--success' );
            setStatusText( thisForm, 'Thanks for subscribing!' );
          } else {
            showStatusText( thisForm, 'mailingList--error' );
            setStatusText( thisForm, xhr.responseText );
          }
        };
        xhr.send( encodeURI( 'email=' + addrEmail ) );
      } else {
        showStatusText( thisForm, 'mailingList--error' );
        setStatusText( thisForm, 'Please enter a valid email' );
      }
    }
  
    //this assumes the error message is alrways the next sibling to the form
    function selectStatusText( whichForm ) {
      console.log( whichForm.nextElementSibling );
      return whichForm.nextElementSibling;
    }
  
    function showStatusText( whichForm, classCol ) {
  
      var statusText = selectStatusText( whichForm );
  
      statusText.classList.remove( 'active' );
      statusText.classList.remove( 'mailingList--success' );
      statusText.classList.remove( 'mailingList--error' );
      statusText.classList.add( 'active' );
  
      if( classCol ) {
        console.log( 'adding class ' + classCol );
        statusText.classList.add( classCol );
      }
    }
  
    function hideStatusText( whichForm ) {
      var statusText = selectStatusText( whichForm );
  
      statusText.classList.remove( 'active' );
    }
  
    function setStatusText( whichForm, content ) {
      var statusText = selectStatusText( whichForm );
  
      statusText.textContent = content;
    }
  
  }());