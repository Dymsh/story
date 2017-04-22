<?php
 if (isset($_POST['submit'])) {
  if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $row = query("
      SELECT * FROM `users` WHERE
      `email` = '".escape($_POST['email'])."'
      LIMIT 1
    ");
    $res = mysqli_fetch_assoc($row);

    if (!$res) {
      query("
        INSERT INTO `users` SET
        `login`      = '".trimALL(escape($_POST['login']))."',
        `email`      = '".escape($_POST['email'])."',
        `password`   = '".escape($_POST['password'])."',
        `author`   = '".escape($_POST['author'])."',
        `name`       = '".escape($_POST['name'])."',
        `secondname` = '".escape($_POST['secondname'])."',
        `middlename` = '".escape($_POST['middlename'])."'
      ");
      $_SESSION['user']['email'] = trimAll($_POST['email']);
      header('Location: /');
    }
    else {
      $_SESSION['info'] = 'Пользователь с такой почтой уже зарегестрирован';
    }
  }
  else {
    $_SESSION['info'] = 'неверно указан email';
  }
}
