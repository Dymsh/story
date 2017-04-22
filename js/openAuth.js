'use strict'

var moveBlock = document.getElementById('openBlock');
var blockAuth = document.querySelector('.auth');
var page = document.querySelector('.page');

// open close authorization form
moveBlock.addEventListener('click', function() {
  if (blockAuth.classList.contains('auth--appear')){
    blockAuth.classList.remove('auth--appear');
  }
  else {blockAuth.classList.add('auth--appear')}
});

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 27 && blockAuth.classList.contains('auth--appear')) {
    blockAuth.classList.remove('auth--appear')
  }
});
