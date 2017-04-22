<?php
$row = query("
  SELECT `author`, `name`, `type`, `preview`, `date`
  FROM `stories` ORDER BY `date` ASC LIMIT 10
");
