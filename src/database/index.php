<?php

$servername = "";
$database= "";
$username = "";
$password = "";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT title, post_date FROM harkka.posts";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    echo "title: " . $row["title"]. " - date: " . $row["post_date"]. "<br>";
  }
} else {
  echo "0 results";
}
$conn->close();
?>