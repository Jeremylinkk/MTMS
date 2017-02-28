<?php
	$conn = new mysqli("localhost","root",'','customers');
		$data = json_decode(file_get_contents("php://input"));
			if (count($data) > 0) {
				$name = mysqli_real_escape_string($conn,$data->name);
				$email = mysqli_real_escape_string($conn,$data->email);
				$status = mysqli_real_escape_string($conn,$data->status);

				$query = "INSERT INTO customers(name,email,status) VALUES('$name','$email','$status')";
					if (mysqli_query($conn, $query)) {
						echo "Insert Data Complete";
					}else{
						echo "Cannot Insert";
					}
			}

