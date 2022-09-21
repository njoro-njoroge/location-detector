<?php

include "config.php";


$userID=$decodedData['userID'];
$latitude=$decodedData['latitude'];
$longitude=$decodedData['longitude'];


    $update="UPDATE users SET latitude='$latitude',longitude='$longitude'
     WHERE user_id='$userID'";
    if(mysqli_query($con,$update)){
      $response['Message']=true;
      $response['detail']='Location Updated successfully';
    }else{
      $response['Message']=false;
      $response['detail']="Failed to update";
     
    }
echo json_encode($response);
?>