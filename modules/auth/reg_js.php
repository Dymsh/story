<?php
session_start();
spl_autoload_register(function ($class) {
    include '../../libs/classes/'.$class.'_class.php';
});
function trimAll ($insert) {
	if (is_array($insert)) {
		$insert = array_map('trimAll' ,$insert);
	}
	else $insert = trim($insert);
	return $insert;
}

function escape ($insert){
	global $link;
	$insert = mysqli_real_escape_string($link ,$insert);
	return $insert;
}

$link=mysqli_connect(Core::$dbhost, Core::$dblogin, Core::$dbpassword, Core::$dbname) or exit (mysqli_error($link));
$row = mysqli_query($link, "SELECT * FROM `users` WHERE
  `email` = '".$_POST['email']."'
  LIMIT 1
");

if (mysqli_fetch_assoc($row)) {
  echo json_encode(array('process'=>false));
}
else {
  $row =
      mysqli_query($link, "
        INSERT INTO `users` SET
        `login`      = '".trimAll(escape($_POST['login']))."',
        `email`      = '".escape($_POST['email'])."',
        `password`   = '".escape($_POST['password'])."',
        `author`     = '".escape($_POST['author'])."',
        `name`       = '".escape($_POST['name'])."',
        `secondname` = '".escape($_POST['secondname'])."',
        `middlename` = '".escape($_POST['middlename'])."'
      ");
  if ($row) {
    $_SESSION['user']['email'] = trimALL($_POST['email']);
    echo json_encode(array('process'=> true));
  }
  else {
    exit ('Ошибка сервера, не подключена БД');
  }
}
?>
