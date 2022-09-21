<?php
include 'config.php';
   
    $select = "SELECT polygon_id FROM `polygons` where polygon_status='Done'";
    $query = mysqli_query($con,$select);
  $response['details']=array();
  $response['status']=true;



while($row=mysqli_fetch_array($query)){
  $polygonID = $row['polygon_id'];
  $package = [
      "polygonID" => $row['polygon_id'],
      "coords" => getPackages($row['polygon_id']),
  ]; 

  array_push($response['details'],$package);

}

  function getPackages($polygonID) {
      include 'config.php';
      $sql = "SELECT polygon_id,latitude,longtitude FROM `coordinates` WHERE polygon_id='$polygonID'";
      $result = mysqli_query($con,$sql);
      $coordsData = [];
      if ($result->num_rows > 0) {
          while($row = $result->fetch_assoc()) {
              $coordsData[] = [
                  "latitude" => $row['latitude'],
                  "longitude" => $row['longtitude'],
              ];
          }
      }
    
      return $coordsData;
  }

   print json_encode($response);

?>