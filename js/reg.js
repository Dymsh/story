var errorLogin = document.querySelector('.reg__error--login');
var errorEmail = document.querySelector('.reg__error--email');
var errorPas = document.querySelector('.reg__error--pas');
var errorRepas = document.querySelector('.reg__error--repas');
var errorName = document.querySelector('.reg__error--name');
var errorAuthor = document.querySelector('.reg__error--author');
var btnSubmit = document.querySelector('.reg__btn');

btnSubmit.addEventListener('click', function() {
  var form = document.forms.form;
  var login = form.elements.login.value;
  var email = form.elements.email.value;
  var pas = form.elements.password.value;
  var repas = form.elements.repassword.value;
  var name = form.elements.name.value;
  var author = form.elements.author.value;
  //var email = form.elements.email.value;

  if (email.length < 2) {
    errorEmail.innerHTML = 'Неверный формат email'; // переделать валидацию с регулярными вырожениями
    var error =true;
  }else {
    errorEmail.innerHTML = '';
  }

  if (login.length < 2) {
    errorLogin.innerHTML = 'Слишком короткий Логин ' + login;
    var error = true;
  }else {
    errorLogin.innerHTML = '';
  }
  if (pas.length >2 ) {
    if (pas.length != repas.length) {
      errorPas.innerHTML = errorRepas.innerHTML = 'Пароли не совподают';
      var error = true;
    }else {
      errorPas.innerHTML = errorRepas.innerHTML = '';
    }
  }else {
    errorPas.innerHTML = 'Слишком короткий пароль';
    var error = true;
  }
  if (name.length < 2) {
    errorName.innerHTML = 'Не указано имя';
    var error = true;
  }else {
    errorName.innerHTML = '';
  }
  if (author.length == 0) {
    errorAuthor.innerHTML = 'Не указан псевдоним';
    var error = true;
  }else {
    errorAuthor.innerHTML = '';
  }

  if (error) {
    event.preventDefault();
  }

});
