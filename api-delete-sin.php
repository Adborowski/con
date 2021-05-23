<?php

require_once "database.php";

$newSinContent = $_POST['sinId'];

try{

// $sQuery = $db->prepare('INSERT INTO sins VALUES (NULL, :newSinContent)');
// $sQuery->bindValue(":newSinContent", $newSinContent);
// $aResults = $sQuery->rowCount();
// $sQuery->execute();
// echo '{"status": 1, "text": "Sin added successfully"}';

}catch(PDOException $ex){

    echo $ex;

}