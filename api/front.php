<?php
    $datas=JSON_decode(file_get_contents("php://input"),true);
    $db=new PDO("mysql:host=localhost;dbname=weixin","root","root");

    if(isset($datas)){
      $id=$datas['id'];
      $t=date("Y-m-d H-i-s",time());
      $upload="";
      if(isset($datas['uploads'])){
        $upload=json_encode($datas['uploads']);
      }
      $stmt=$db->prepare("UPDATE `bl_contents` SET `name`=?, `title`=?, `contents`=?, `uploads`=?, `time`=?,`phone`=? WHERE (`openid`=?)");
      $stmt->bindValue(1, $datas['username']);
      $stmt->bindValue(2, $datas['title']);
      $stmt->bindValue(3, $datas['contents']);
      $stmt->bindValue(4,$upload);
      $stmt->bindValue(5,$t);
      $stmt->bindValue(6,$datas['phone']);
      $stmt->bindValue(7, $datas['id']);
      $num = $stmt->execute();
      $count = $stmt->rowCount();//受影响行数
      if($num && $count){
        echo 200;
      }
    }

 ?>
