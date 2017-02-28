<?php
    $conn = mysqli_connect("localhost","root",'','customers');
    $query = "SECECT * FROM motorcycle";
    $outp = "";
    $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result)>0){
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"brand":"' .$rs["mc_brand"]. '"}';
            }
            $outp = '{"records":['.$outp.']}';
            echo ($outp);

        }