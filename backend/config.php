<?php
$host = "mysql";  // This is the Docker MySQL service name
$user = "user";   // MySQL username from docker-compose
$password = "userpassword";  // MySQL password from docker-compose
$database = "mydatabase";  // Database name

$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
