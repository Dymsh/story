<?php

$row = query("
  SELECT `author`, `name`, `type`, `preview`, `date`, `text`
  FROM `stories`
  WHERE `public` = 'Опубликовано'
  ORDER BY `date` ASC LIMIT 10
");
