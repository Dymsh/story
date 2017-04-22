<?php
error_reporting(-1);
ini_set('display_errors',1);
header('Content-Type: text/html; charset=utf-8');
session_start();

// config

include_once './config.php';
include_once './libs/default.php';
include './variables.php';
include './allpages.php';

// router
include './modules/'.$_GET['modules'].'/'.$_GET['page'].'.php';
include './modules/index.html';
