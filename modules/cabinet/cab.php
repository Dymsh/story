<?php
if (isset($_SESSION['user']['email'])) {
  $row = query(
    "SELECT `id`, `name`, `type`, `public`, `rating`
    FROM `stories`
    WHERE `user_email` = '".$_SESSION['user']['email']."'
  ");
}
else {
  echo 'Вы не авторизированы, <a href="/auth/reg">Авторизоваться</a>';
  exit();
}

if (isset($_GET['del'])) {
  query("DELETE FROM `stories` WHERE `id` = '".$_GET['del']."' ");
  $_SESSION['info'] = 'Ваша работа ('.$_GET['name'].') успешно удалена.';
  header('Location: /cabinet/cab');
  exit();
}
// exit();*/
