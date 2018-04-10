<?php
    $datas=JSON_decode(file_get_contents("php://input"),true);
    $db=new PDO("mysql:host=localhost;dbname=weixin","root","102098hchab");
    $res=array();
    switch ($datas['action']) {
      case 'get':
        $result=$db->query("select * from bl_contents where contents is not null and contents !=''");
        $res[]=$result->fetchAll(PDO::FETCH_ASSOC);
        break;
      case 'delete':
        # code...
        break;
      case 'mark':
        # code...
        break;
      default:
        # code...
        break;
    }
    echo json_encode($res);

 ?>
