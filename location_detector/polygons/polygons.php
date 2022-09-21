<?php
include 'config.php';
    $arr['message']="New data";
    $categories = array();
    $select="SELECT polygon_id,latitude,longtitude FROM `coordinates` ORDER BY polygon_id ASC";
    $query=mysqli_query($con,$select);
    if(mysqli_num_rows($query)>0){
        $response['status']=true;
        $response['details']=array(); 
        while($rs=mysqli_fetch_array($query)){
         $index[$rs['polygon_id']][]  =array(
                    'latitude'=>$rs['latitude'],
                    'longtitude'=>$rs['longtitude'],
         );
    }
         array_push($response['details'],$index  );
    }else{
        $response['status']=false;
        $response['message']="No data found";
    }
   
    print json_encode($response);



?>