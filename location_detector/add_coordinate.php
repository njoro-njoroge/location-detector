<?php
include "config.php";

$polygonID=$decodedData['polygonID'];
$latitude=$decodedData['latitude'];
$longitude=$decodedData['longitude'];

$select="SELECT * FROM coordinates WHERE latitude='$latitude' AND longtitude='$longitude'";
$query=mysqli_query($con,$select);
if(mysqli_num_rows($query)>0){
    $response['status']=false;
    $response['message']="Similar coordinates already submitted. Please select different coordinates";
   
}else{


$insert="INSERT INTO coordinates(polygon_id,latitude,longtitude)
VALUES('$polygonID','$latitude','$longitude')";
if(mysqli_query($con,$insert)){
$response['status']=true;
$response['message']="Submitted successfully";
}else{
    $response['status']=false;
    $response['message']='Failed to submit';
}
}

print json_encode($response);
?>
