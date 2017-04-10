<?php
function wtf($print,$stop=0){
	echo '<pre>'.print_r($print,1).'</pre>';
	if ($stop == 1) {
		exit();
	}
}

function generatePassword($length = 8){
  $chars = 'abdefhiknrstyzABDEFGHKNQRSTYZ23456789';
  $numChars = strlen($chars);
  $string = '';
  for ($i = 0; $i < $length; $i++) {
    $string .= substr($chars, rand(1, $numChars) - 1, 1);
  }
  return $string;
}

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

function query ($query) {
	global $link;
	$temp = debug_backtrace();
	$file_puth = 'mysqli.log';
	$res = mysqli_query($link, $query);
	$error = date('Y-m-d h:i:s')."\n".mysqli_error($link)."\n\n".'file -'.$temp[0]['file']."\n".'line -'.$temp[0]['line']."\n".'function-'.$temp[0]['function']."\n\n";
	
	if (!$res) {
		file_put_contents($file_puth, $error, FILE_APPEND);
		$_SESSION['info']='<span style="color: red">Сбой работы БД! Операция не выполнена. </span>';
		//header('Location: /static/main'); 
		exit();
	} 
	return $res;
} 