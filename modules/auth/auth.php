<?php
session_start();

spl_autoload_register(function ($class) {
    include '../../libs/classes/'.$class.'_class.php';
});
include_once '../../libs/default.php';
// echo myhash($_POST['password']); exit();
if (isset($_POST['login'])) {
  $link=mysqli_connect(Core::$dbhost, Core::$dblogin, Core::$dbpassword, Core::$dbname) or exit (mysqli_error($link));
  $row = mysqli_query ($link, "
          SELECT * FROM `users` WHERE
          `login`    = '".$_POST['login']."'
          LIMIT 1
        ") or exit('проблема запросса базы данных');
  $res= mysqli_fetch_assoc($row);
  if ($res && password_verify($_POST['password'], $res['password'])) {
    $_SESSION['user'] = $res;
    echo json_encode(array('enter'=>true, 'author' => $res['author']));
  }
  else {
    echo json_encode(array('enter' => false));
  }
}
?>
