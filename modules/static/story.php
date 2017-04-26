<?php

$row = query("
  SELECT `author`, `name`, `type`, `preview`, `date`
  FROM `stories`
  WHERE `type` != 'анекдот'
  ORDER BY `date` ASC LIMIT 10
");
