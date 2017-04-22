<?php

$row = query(
  "SELECT `id`, `name`, `type`, `public`, `rating`
  FROM `stories`
  WHERE `user_email` = '".$_SESSION['user']['email']."'
");
// exit();*/
