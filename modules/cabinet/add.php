<?php
// wtf($_POST);
if (isset($_POST['sub_form'])) {
  query("INSERT INTO `stories` SET
    `user_email` = '".$_SESSION['user']['email']."',
    `author` = '".$_SESSION['user']['author']."',
    `name`       = '".escape(trimALL($_POST['name']))."',
    `type`       = '".$_POST['type']."',
    `public`     = 'Опубликовано' ,
    `rating`     = 0 ,
    `preview`    = '".escape($_POST['preview'])."',
    `text`       = '".escape($_POST['text'])."',
    `date`       = NOW()
  ");
  header('Location: /cabinet/add?story_name='.urlencode($_POST['name']));
}
