<?php
header('Content-Type: application/json');
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if ($input) {
    // Traitez les données comme vous le souhaitez
    var_dump($input['email']); // Par exemple
    echo json_encode(["success" => true, "message" => "Data received"]);
} else {
    echo json_encode(["success" => false, "message" => "No data received"]);
}
