<?php 
// mod_rewrite

if (isset ($_GET['route'])){
	$temp = explode ('/', $_GET['route']); 
	if ($temp[0]=='admin') {
		Core::$dir='modules/admin';
		Core::$skin='admin';
		$i=1;	
	} 				
	else $i=0;
	
	
	foreach ($temp as $k=>$v){
		if ($k==$i)
			$_GET['modules']=$v; 
		elseif ($k==$i+1)
			$_GET['page']=$v;   
		else $_GET['key'.($k-1)]=$v;
		
	}
	// unset ($_GET['route']);	
}

$link=mysqli_connect(Core::$dbhost, Core::$dblogin  , Core::$dbpassword, Core::$dbname) or exit (mysqli_error($link));

$pages=array('main','auth','reg','404','edit','new');

if (!isset($_GET['page'])){
	$_GET['page']='main';
}

if  (!in_array  ($_GET['page'], $pages)){
	header ('Location: /error/404'); // адресс относительно сайта (HTML)
	exit ();
}
// router modules

$modules=array('error','static','auth');

if (!isset($_GET['modules'])){
	$_GET['modules']='static';
}

if  (!in_array  ($_GET['modules'], $modules)){
	header ('Location: /error/404');
	exit ();
}