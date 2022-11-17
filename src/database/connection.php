<?php
try {
  $dbh = new PDO('mysql:host=harjoitus.mysql.database.azure.com:3306;dbname=harkka', 'empirica', 'XV1qWdfBg6ql4sLG');
  foreach($dbh->query('SELECT * FROM harkka.posts') as $row) {
    print_r($row);
  }
  $dbh = null;
} catch (PDOException $e) {
  print "Error: " . $e->getMessage();
}

?>