<?php
if (!$_SESSION['user']['email']) {
  $_SESSION['info']  = 'Простите но для редактирования необходимо пройти авторизацию !';
  header ('Location: /static/main');
  exit();
}

if (isset($_GET['id'])) {
  $row = query("SELECT * FROM `stories` WHERE `id` = '".$_GET['id']."' LIMIT 1");
  $res = mysqli_fetch_assoc($row);
}
else {
  echo 'Не найдено такого рассказа в БД<br><a href="/cabinet/cab">Вернутся в кабинет</a>';
  exit ();
}

if (isset($_POST['sub_form'])) {
  query("UPDATE `stories` SET
    `name`       = '".escape(trimALL($_POST['name']))."',
    `type`       = '".$_POST['type']."',
    `public`     = 1 ,
    `preview`    = '".escape($_POST['preview'])."',
    `text`       = '".escape($_POST['text'])."',
    `date`       = NOW()
    WHERE `id` = '".$_GET['id']."'
  ");
  $_SESSION['info'] = 'Данные сохранены, можно вернуться, либо продолжить правки.';
  header('Location: /cabinet/edit?id='.$_GET['id']);
  exit();
}
