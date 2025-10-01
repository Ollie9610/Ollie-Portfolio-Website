<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['type']) || !isset($input['data'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$type = $input['type'];
$data = $input['data'];

// Define file paths
$srcFile = "../src/data/{$type}.json";
$publicFile = "data/{$type}.json";

// Create the data structure
$jsonData = json_encode([$type => $data], JSON_PRETTY_PRINT);

// Save to src/data directory
if (file_put_contents($srcFile, $jsonData) === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save to src/data']);
    exit;
}

// Save to public/data directory
if (file_put_contents($publicFile, $jsonData) === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save to public/data']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Data saved successfully']);
?>
