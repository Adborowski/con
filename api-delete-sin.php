<?php

require_once "database.php";

$sinId = $_POST['sinId'];

try{

    $sQuery = $db->prepare('DELETE FROM sins WHERE id = :sinId');
    $sQuery->bindValue(":sinId", $sinId);
    $aResults = $sQuery->rowCount();
    $sQuery->execute();
    echo '{"status": 1, "text": "Sin deleted successfully"}';

}catch(PDOException $ex){

    echo $ex;

}