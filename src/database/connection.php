<?php
try {
  $dbh = new PDO('');
  foreach($dbh->query('SELECT * FROM harkka.posts') as $row) {
    print_r($row);
  }
  $dbh = null;
} catch (PDOException $e) {
  print "Error: " . $e->getMessage();
}

?>