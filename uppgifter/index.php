<?php
/**
 * Lista katalogens innehåll
 *
 * Date: 2016-08-19
 * Detta är normalt sett inte tillåtet av Nginx
 */

$dircontents = scandir(__DIR__);
var_dump($dircontents);