<?php
if (isset($_POST['search'])){
	$_GET['modules']='static';
	$_GET['page'] = 'main';
}

if (!isset($_SESSION['auth'])) {
	$_GET['modules']='auth';
	$_GET['page'] = 'auth';
}
