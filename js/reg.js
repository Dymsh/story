var errorLogin = document.querySelector('.reg__error--login');
var errorPas = document.querySelector('.reg__error--pas');
var errorRepas = document.querySelector('.reg__error--repas');
var errorName = document.querySelector('.reg__error--name');
var errorAuthor = document.querySelector('.reg__error--author');

form.addEventListener('submit', function() {
  var form = document.forms.form;
  var login = form.elements.login.value;
  var pas = form.elements.password.value;
  var repas = form.elements.repassword.value;
  var name = form.elements.name.value;
  //var email = form.elements.email.value;

  if (login.length < 2) {
    errorLogin.innerHTML = 'Слишком короткий Логин' + login ;
    event.preventDefault();
  }else {
    errorLogin.innerHTML = '';
  }
  if (pas.length >2 ) {
    if (pas.length != repas.length) {
      errorPas.innerHTML = errorRepas.innerHTML = 'Пароли не совподают';
      event.preventDefault();
    }else {
      errorPas.innerHTML = errorRepas.innerHTML = '';
    }
  }else {
    errorPas.innerHTML = 'Слишком короткий пароль';
    event.preventDefault();
  }
  if (name.length < 2) {
    errorName.innerHTML = 'Не указано имя';
    event.preventDefault();
  }else {
    errorName.innerHTML = '';
  }
  if (author.length == 0) {
    errorAuthor.innerHTML = 'Не указан псевдоним';
    event.preventDefault();
  }else {
    errorAuthor.innerHTML = '';
  }
});
