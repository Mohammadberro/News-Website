<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit();
}

$mysqli = new mysqli('localhost', 'root', '', 'news');

if($mysqli->connect_error){
    die("Connection Error (" . $mysqli->connect_errno . ')' . $mysqli->connect_error);
}

$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        $result = $mysqli->query("SELECT * FROM news");
        $news = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $news[] = $row;
            }
            echo json_encode([
                "status" => "Success",
                "news" => $news
            ]);
        } else {
            echo json_encode([
                "status" => "Failed to fetch news."
            ]);
        }
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if(isset($data["title"]) && isset($data["description"])){
            $title = $data["title"];
            $description = $data["description"];
            $response = createNews($title, $description);
            echo json_encode($response);
        }else{
            echo json_encode([
                "status" => "Title and description are required."
            ]);
        }
        break;
    default:
        echo json_encode([
            "status" => "Unsupported request method."
        ]);
        break;
}

function createNews($title, $description){
    global $mysqli;
    $response = [];
    $query = $mysqli->prepare("INSERT INTO news (title, description) VALUES (?, ?)");
    $query->bind_param("ss", $title, $description);
    if($query->execute()){
        $response["status"] = "Success";
    }else{
        $response["status"] = "Failed";
    }
    return $response;
}
