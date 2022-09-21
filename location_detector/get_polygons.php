<?php
include("config.php");

$select="SELECT polygon_id FROM polygons ";
$query=mysqli_query($con,$select);
if(mysqli_num_rows($query)>0){
    $response['message']=true;
    $response['details']=array();
    while($row=mysqli_fetch_array($query)){
        $index['polygonID']=$row['polygon_id'];
        array_push($response['details'],$index);
    }
}else{
    $response['message']="No record found";
}
print json_encode($response)
?>