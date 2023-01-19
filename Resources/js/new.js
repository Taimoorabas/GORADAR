'use strict'



let textArea = document.querySelector('.textarea');
let enterManuallybtn=  document.querySelector('.enter-manually');
let coverEnterManually =  document.querySelector('.cover-textarea');
let coverEnterManuallybtn=  document.querySelector('.cover-enter-manually');


enterManuallybtn.addEventListener('click',function(e){
    textArea.classList.toggle('hide')
    
})

coverEnterManuallybtn.addEventListener('click',function(e){
    coverEnterManually.classList.toggle('hide')
    console.log('hello')
   
})