<?php
include "config.php";

$userID=$decodedData['userID'];

$insert="INSERT INTO polygons (user_id)VALUES($userID)";
if(mysqli_query($con,$insert)){
    // get polygo id
   $response['polygonID']= mysqli_insert_id($con);
    $response['status']=true;
    $response['message']="Polygon created. Please provide polygon coordinates ";
}else{
    $response['status']=false;
    $response['message']="Failed. Please try again";
}
print json_encode($response);
?>