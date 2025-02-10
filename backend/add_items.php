<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"));

$sql = "INSERT INTO items (name, category, purpose) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt->execute([$data->name, $data->category, $data->purpose])) {
    echo json_encode(["message" => "Item added successfully"]);
} else {
    echo json_encode(["message" => "Failed to add item"]);
}
?>
