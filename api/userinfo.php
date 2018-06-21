<?php

  $datas=$_GET;
  $db=new PDO("mysql:host=192.168.20.104;dbname=weixin","root","102098hchab");
  if(isset($datas['start'])) {
      $datas['start']==-1?$index=0:$index=$datas['start'];
      $sql="select * from jbpt_contents  limit $index,5";
      $res=$db->query($sql);
      $data=$res->fetchAll(PDO::FETCH_ASSOC);
  		if(empty($data)){
  			echo "[{name:'false'}]";
  		}else{
  			      echo json_encode($data);
  		}
  }elseif(isset($datas['id'])){
    $sql="select * from jbpt_contents where id ='{$datas['id']}' limit 1";
    $res=$db->query($sql);
    $data=$res->fetchAll(PDO::FETCH_ASSOC);
    if(empty($data)){
      echo 0;
    }else{
            echo json_encode($data);
    }
  }


?>
