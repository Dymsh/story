<?php
if (isset($_SESSION['info'])) {
  $session_info = $_SESSION['info'];
  unset($_SESSION['info']);
};

$hide = 'main-nav__item--hidden'; // конфигурация основного меню

if (isset($_GET['exit'])) {
  unset ($_SESSION['user']);
}

if (isset($_SESSION['user']['email'])) {
  $row = query("
    SELECT * FROM `users` WHERE
    `email` = '".$_SESSION['user']['email']."'
    LIMIT 1
  ");
  $_SESSION['user'] = mysqli_fetch_assoc($row);
}
