<?php
if (isset($_POST['submit'])) {
  query("INSERT INTO `stories` SET
    `user_email` = '".$_SESSION['user']['email']."',
    `author` = '".$_SESSION['user']['author']."',
    `name`       = '".escape(trimALL($_POST['name']))."',
    `type`       = '".$_POST['type']."',
    `public`     = 1 ,
    `rating`     = 0 ,
    `text`       = '".escape($_POST['text'])."'
  ");
  header('Location: /cabinet/add?story_name='.urlencode($_POST['name']));
}
