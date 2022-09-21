<?php

include "config.php";


$firstName=$decodedData['firstName'];
$lastName=$decodedData['lastName'];
$username=$decodedData['username'];
$password=$decodedData['password'];

// check if username is already taken

$select="SELECT * FROM users WHERE username='$username'";
$query=mysqli_query($con,$select);
$check=mysqli_num_rows($query);
if($check>0){
   $response['Message']="false";
   $response['detail']='Username "'.$username.'" already taken';

}else{
    // insert user details
    $insert="INSERT INTO users(first_name,last_name,username,password)
    VALUES('$firstName','$lastName','$username','$password')";
    if(mysqli_query($con,$insert)){
      $response['Message']=true;
      $response['detail']='Registered successfully. Login to confirm';
    }else{
    
          $response['Message']="false";
          $response['detail']='Failed to register';
     
    }
}

print json_encode($response);
?>