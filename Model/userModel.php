<?php
header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json; charset=UTF-8");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

$con = mysqli_connect("localhost","root","","test");
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

echo $request->username;
// $rows = array();

// $sql = mysqli_query($con,"SELECT * FROM user");


// while($rs = mysqli_fetch_array($sql)) {
	
// 	$rows[] = $rs;
	
// }

// echo json_encode($rows);


?>
