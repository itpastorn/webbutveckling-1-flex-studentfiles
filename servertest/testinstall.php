<?php
/**
 * Detta skript kontrollerar att PHP-installationen inkluderar alla de moduler
 * som behövs för boken Webbserverprogrammering 1
 * 
 * @author Lars Gunther
 */

header("Content-type: text/html; charset=utf-8");

$haserrors = false;
// PHP version >= 5.4
$phpversionstatus = phpversion();
$phpversionclass  = "ok";
if ( PHP_VERSION_ID < 70008 ) {
    $phpversionstatus = "För gammal version av PHP ({$phpversionstatus})";
    $phpversionclass  = "fail";
    $haserrors = true;
}

// Testar mb-funktionerna
$mbstatus = "Multibyte funktionern (mb_) är installerade";
$mbclass  = "ok";
if ( !function_exists("mb_strlen") ) {
    $mbstatus  = "Multibyte funktionern (mb_) är inte installerade";
    $mbclass   = "fail";
    $haserrors = true;
}
// Full stöd för unicode i regexp
$regstatus = "Fullt stöd för Unicode i regexp";
$regclass  = "ok";
if ( !@preg_match("/\\pL/u", "ö") ) {
    $regstatus = "Det saknas stöd för Unicode Character Properties i regexp";
    $regclass  = "fail";
    $haserrors = true;
}
// Finns intl-biblioteket?
$intlstatus = "<a href='http://se1.php.net/manual/en/book.intl.php'>Intl-biblioteket</a> är installerat";
$intlclass  = "ok";
if ( !function_exists("collator_create") ) {
    $intlstatus  = "Intl-biblioteket är inte installerat. ";
    $intlclass   = "fail";
    $haserrors   = true;
    $tips        = "";
    if ( strpos(php_uname(), "Windows") !== false ) {
        $tips = "<a href=\"http://jumpifzero.wordpress.com/2012/07/19/intl-extension-missing-on-xampp/\">Tips</a>";
    } elseif ( strpos(php_uname(), "Ubuntu") ) {
        $tips = "<br />Ubuntuanvändare? Kör: <code>sudo apt-get install php5-intl</code>";
    } elseif ( strpos(php_uname(), "fc") ) {
        $tips = "<br />Fedoraanvändare? Kör: <code>su -c 'yum install php-intl'</code>";
    }
    $intlstatus .= $tips;
}

$tot_status = "<p>Installationen har lyckats och alla delar finns på plats.</p>";
if ( $haserrors ) {
    $tot_status = "<p class='fail'>Installationen behöver komletteras.</p>";
}

?>
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="utf-8" />
  <title>Installationstest</title>
  <style>
    body {
        font-family: sans-serif;
        max-width: 600px;
        margin: auto;
    }
    table, th, td {
        border: 1px solid;
        border-collapse: collapse;
    }
    th, td {
        padding: 0.5em;
    }
    .ok  {
    }
    .warning  {
        font-weight: bold;
    }
    .fail  {
        color: darkred;
        font-weight: bold;
    }

  </style>
</head>
<body>
  <h1>Installationstest</h1>
<?php
echo $tot_status;
?>
  <table>
      <tr>
          <th>Funktion</th>
          <th>Status</th>
          <th>Behövs i kapitel</th>
      </tr>
      <tr>
          <th scope="row">PHP-version</th>
<?php
echo <<<HTML
          <td class="{$phpversionclass}">{$phpversionstatus}</td>
HTML;
?>
      </tr>
      <tr>
          <th scope="row">Multibyte-funktionerna</th>
<?php
echo <<<HTML
          <td class="{$mbclass}">{$mbstatus}</td>
HTML;
?>
        <td>2</td>
      </tr>
      <tr>
          <th scope="row">Unicode-teckenklasser</th>
<?php
echo <<<HTML
          <td class="{$regclass}">{$regstatus}</td>
HTML;
?>
        <td>16</td>
      </tr>
      <tr>
          <th scope="row">Intl-biblioteket</th>
<?php
echo <<<HTML
          <td class="{$intlclass}">{$intlstatus}</td>
HTML;
?>
        <td>16</td>
      </tr>
  </table>
</body>
</html>