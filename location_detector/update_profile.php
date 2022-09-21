<?php

include "config.php";


$userID=$decodedData['userID'];
$firstName=$decodedData['firstName'];
$lastName=$decodedData['lastName'];
$username=$decodedData['username'];

// check if username is already taken

$select="SELECT * FROM users WHERE username='$username'AND NOT user_id='$userID'";
$query=mysqli_query($con,$select);
$check=mysqli_num_rows($query);
if($check>0){
   $response['Message']=false;
   $response['detail']='Username "'.$username.'" already exist';
}else{
    // update user
    $update="UPDATE users SET first_name='$firstName',last_name='$lastName',
    username='$username' WHERE user_id='$userID'";
    if(mysqli_query($con,$update)){
      
      $response['Message']=true;
      $response['detail']='Updated successfully';
    }else{
      $response['Message']=false;
      $response['detail']="Failed to update";
     
    }
}


echo json_encode($response);
?>