<?php
header("Access-Control-Allow-Origin: *");
$json = file_get_contents("http://localhost:3000/pi_couchstarwars");
print_r($json);
?>