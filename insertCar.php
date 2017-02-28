<?php
	$conn = new mysqli("localhost","root",'','customers');
		$data = json_decode(file_get_contents("php://input"));
			if (count($data) > 0) {
				$brand = mysqli_real_escape_string($conn,$data->brand);
				$model = mysqli_real_escape_string($conn,$data->model);
				$color = mysqli_real_escape_string($conn,$data->color);
                $serial_number = mysqli_real_escape_string($conn,$data->serial_number);
                $count_mc = mysqli_real_escape_string($conn,$data->count_mc);

				$query = "INSERT INTO motorcycle(mc_brand,mc_model,mc_color,mc_serial_number,mc_count) 
                        VALUES('$brand','$model','$color','$serial_number',$count_mc)";
					if (mysqli_query($conn, $query)) {
						echo "Insert Data Complete";
					}else{
						echo "Cannot Insert";
					}
			}