<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "event_db";

//établir la connection
$conn = mysqli_connect($host, $username, $password, $dbname);

//verifie si la connection a été établie
if (!$conn) {
    die("connection failed: " . mysqli_connect_error());
}
?>
<?php?>