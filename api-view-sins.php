<?php

require_once "database.php";

$sQuery = $db->prepare( "SELECT * FROM sins");
$sQuery -> execute();
$sResults = $sQuery->fetchAll();
$aResults = array();

foreach ($sResults as $sResult){
    array_push($aResults, $sResult);
}

$sResults = json_encode($aResults);
echo $sResults;
