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
    li {
        margin-bottom: 0.7em;
    }
  </style>
</head>
<body>
  <h1>Startsida</h1>
  <p>Test av teckenkodning: ÅÄÖ åäö. Ska se ut som: &Aring;&Auml;&Ouml; &aring;&auml;&ouml;.
  <p>Denna fils namn och plats på servern:<br /><samp>
<?php
echo __FILE__;
?></samp>
  <h2>Information och test</h2>
  <ul>
    <li><a href="phpinfo.php">Information om PHP-installationen.</a></li>
    <li><a href="testinstall.php">Klarar installationen bokens krav?</a></li>
  </ul>
  <h2>Övriga webbplatser</h2>
  <ul>
    <li><a href="http://laxhjalpen.app">Läxhjälpen</a></li>
    <li><a href="http://wu1-uppgifter.app">Övningsuppgifter</a></li>
  </ul>
</body>
</html>
