<?php
include "config.php";

$polygonID=$decodedData['polygonID'];

$select="SELECT id,latitude,longtitude,polygon_id FROM coordinates WHERE polygon_id='$polygonID'";
$query=mysqli_query($con,$select);
if(mysqli_num_rows($query)>0){
    $response['status']=true;
    $response['details']=array();
while($row=mysqli_fetch_array($query)){
    $index['id']=$row['id'];
    $index['latitude']=$row['latitude'];
    $index['longitude']=$row['longtitude'];
    array_push($response['details'],$index);
}
}else{
    $response['status']=false;
    $response['message']="polygon  has no coordinates ";
}
print json_encode($response);

?>