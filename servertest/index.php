<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="utf-8" />
  <title>Testkatalog</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: auto;
    }
    samp {
      font-family: "Bitstream Vera Sans Mono", consolas, monaco, "Droid Sans Mono", monospace;
    }
  </style>
</head>
<body>
  <h1>Startsida</h1>
  <p>Test av teckenkodning: ÅÄÖ åäö. Ska se ut som: &Aring;&Auml;&Ouml; &aring;&auml;&ouml;.
  <p>Filens namn och plats på servern:<br /><samp>
<?php
echo __FILE__;
?></samp>
  <p><a href="phpinfo.php">Information om PHP-installationen.</a></p>
  <p><a href="testinstall.php">Klarar installationen bokens krav?</a></p>
</body>
</html>