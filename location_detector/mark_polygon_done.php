<?php
include("config.php");
$polygonID=$decodedData['polygonID'];

// check if polygon has more then 4 coordinates submitted
$select="SELECT * FROM coordinates WHERE polygon_id='$polygonID'";
$result=mysqli_query($con,$select);
$rowcount=mysqli_num_rows($result);
if($rowcount < 3 ){
    $response['status']="false";
    $response['message']="A polygon should have atleast 3 coordinates ";
}else{
$update="UPDATE polygons SET polygon_status='Done' WHERE polygon_id='$polygonID'";
if(mysqli_query($con,$update)){
    $response['status']=true;
    $response['message']="Done creating polygon ";
}else{
    $response['status']=false;
    $response['message']="Failed to update!";

}
}
print json_encode($response);

?>
