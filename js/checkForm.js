'use strict'
// var sendAuth = document.querySelector('.auth_reg');

var blockAuth = document.querySelector('.auth');
var btnAuth = document.querySelector('.auth__btn');
var fieldLogin = document.querySelector('.auth__mes');
var fieldPas = document.querySelector('.auth__pass');
var fieldMess = document.querySelector('.auth__mess');
var fieldMessPass = document.querySelector('.auth__mess--pass');

function count(obj) {
  var count = 0;
  for (var key in obj) {
    count ++;
  }
  return count;
}

btnAuth.addEventListener('click' , function() {
  var login = document.forms.auth.elements.login.value;
  var password = document.forms.auth.elements.password.value;
  var error = {};

  if (login.length === 0) {
    error.infoLog = 'Не заполнено поле "login"';
    fieldMess.innerHTML = 'Введите логин';
  } else {
    fieldMess.innerHTML = '';
  }

  if (password.length === 0) {
    error.infoPas = 'Не заполнено поле "password"';
    fieldMessPass.innerHTML = 'Введите пароль';
  } else {
    fieldMessPass.innerHTML = '';
  }

  if(!count(error)) {
    var formData = new FormData(document.forms.auth);
    var request = new XMLHttpRequest();

    request.open('POST', '/modules/auth/auth.php', true);
    request.send(formData);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var enter = JSON.parse(request.responseText);
        //console.log(request.responseText);
        if (enter.enter) {
          var blockEnter = document.querySelector('.auth');
          var header = document.querySelector('.main-header__logo');
          var openBlock = document.getElementById('openBlock');
          var closeBlock = document.getElementById('closeBlock');
          var cabinet = document.getElementById('cab');

          blockEnter.classList.remove('auth--appear'); // закрываем форму входа

          header.classList.add('main-header__logo--auth');
          header.innerHTML ='readme.' +'<span>'+enter.author +'</span>';// добавление пользователя в заголовок страныцы

          closeBlock.classList.remove('main-nav__item--hidden');
          cabinet.classList.remove('main-nav__item--hidden'); // показать кабинет
          openBlock.classList.add('main-nav__item--hidden');

        } else {
          fieldMess.innerHTML = 'Неверная пара логин пароль';
        }

        // console.log(request.responseText);
      } else {
        console.log('We reached our target server, but it returned an error');
      }
    };
    request.onerror = function() {
      console.log('There was a connection error of some sort');
    };
  }
});
