<?php
    $datas=JSON_decode(file_get_contents("php://input"),true);
    $db=new PDO("mysql:host=localhost;dbname=weixin","root","102098hchab");

    if(isset($datas['contents']) && isset($datas['title'])){


      $t=date("Y-m-d H-i-s",time());
      $upload="[]";
      if(isset($datas['uploads'])){
		      $upload=json_encode($datas['uploads']);
      }
      $name=$datas['uploads'] || '';
      $phone=$datas['phone'] || '';
	  $stmt=$db->query("INSERT INTO `jbpt_contents` (`name`, `title`, `contents`, `uploads`, `time`, `phone`) VALUES ('  $name', '{$datas['title']}', '{$datas['contents']}', '$upload', '$t', '$phone')");


      $count = $stmt->lastInsertId();//受影响行数
echo $count;
    }

 ?>
