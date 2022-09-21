<?php

include "config.php";

$username=$decodedData['username'];
$password=$decodedData['password'];

$select="SELECT * FROM users WHERE username='$username'AND password='$password'";
$query=mysqli_query($con,$select);
if(mysqli_num_rows($query)>0){
    $row=mysqli_fetch_array($query);
    $response['Message']=true;
    $response['detail']="Login successful";
    $response['userID']=$row['user_id'];
    $response['firstName']=$row['first_name'];
    $response['lastName']=$row['last_name'];
    $response['username']=$row['username'];
}else{
    $response['Message']=false;
    $response['detail']='Failed to login. Please confirm username and password';
}


echo json_encode($response);
?>