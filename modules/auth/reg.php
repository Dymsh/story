<?php
if (isset($_POST['submit'])) {
  $row = query("
    SELECT * FROM `users` WHERE
    `email` = '".escape($_POST['email'])."'
    LIMIT 1
  ");

  if (!mysqli_fetch_assoc($row)) {
    query("
      INSERT INTO `users` SET
      `login`      = '".trimALL(escape($_POST['login']))."',
      `email`      = '".escape($_POST['email'])."',
      `password`   = '".myhash($_POST['password'])."',
      `author`     = '".escape($_POST['author'])."',
      `name`       = '".escape($_POST['name'])."',
      `secondname` = '".escape($_POST['secondname'])."',
      `middlename` = '".escape($_POST['middlename'])."'
    ");
    $_SESSION['user']['email'] = trimAll($_POST['email']);
    $_SESSION['info'] = $_POST['author'].' Вы успешно зарегистрированы !';
    header('Location: /cabinet/cab');
  }
  else {
    $_SESSION['info'] = 'Пользователь с такой почтой уже зарегестрирован ('.$_POST['email'].'). Мы можем отправить вам напоминание пароля<a href="/auth/rem"> Напомнить пароль</a>';
  }
}
