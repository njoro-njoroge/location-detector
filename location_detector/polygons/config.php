<?php

$con=mysqli_connect("localhost","root","","react_location");
if(!$con){
  print "failed to connect to the database";
}else{
   // print "Connection successful";
}

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);    // decoding the received JSON and store into $obj variable.

?>