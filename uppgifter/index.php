<?php
/**
 * Lista katalogens innehåll
 *
 * Date: 2016-08-19
 * Detta är normalt sett inte tillåtet av Nginx
 */

/**
 * Sort files logically according to numbers in their name
 */
function chapsort($a, $b)
{
    preg_match('/[0-9]+/', $a, $anum);
    preg_match('/[0-9]+/', $b, $bnum);
    return $anum[0] > $bnum[0];
}
$files = glob("*.html");
usort($files, 'chapsort');
?>
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="utf-8" />
    <title>WU1 Övningar</title>
    <style>
        body {
            font-family: sans-serif;
            max-width: 600px;
            margin: auto;
        }
        li {
            margin-bottom: 0.7em;
        }
    </style>
</head>
<body>
  <h1>Här finns följande HTML-filer</h1>
  <ul>
<?php
foreach ($files as $filename) {
    echo <<<HTML
        <li><a href="{$filename}">{$filename}</a></li>
HTML;
}
?>
  </ul>
</body>
</html>
