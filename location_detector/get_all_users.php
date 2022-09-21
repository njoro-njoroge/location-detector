<?php
include "config.php";

$select="SELECT user_id,first_name,last_name,username,latitude,longitude FROM users";
$query=mysqli_query($con,$select);
if(mysqli_num_rows($query)>0){
$response['status']=true;
$response['details']=array();
while($row=mysqli_fetch_array($query)){
    $index['userID']=$row['user_id'];
    $index['name']=$row['first_name']." ".$row['last_name'];
    $index['username']=$row['username'];
    $index['latitude']=$row['latitude'];
    $index['longtitude']=$row['longitude'];

    array_push($response['details'],$index);
}

}else{
    $response['status']=false;
    $response['message']="No record found";
}
print json_encode($response)
?>