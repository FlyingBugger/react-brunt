<?php

    $datas=JSON_decode(file_get_contents("php://input"),true);
    $db=new PDO("mysql:host=localhost;dbname=weixin","root","102098hchab");
    $res=array();
    switch ($datas['action']) {
      case 'get':
        $result=$db->query("select * from bl_contents where contents is not null and contents !=''");
        $res[]=$result->fetchAll(PDO::FETCH_ASSOC);
        break;
      case 'login':
          $result=$db->prepare("select * from bl_admin where (username=?)");
          $result->execute(array($datas['name']));
          $userinfo=$result->fetchAll(PDO::FETCH_ASSOC);
          if(!empty($userinfo)){
            md5($datas['password'])===$userinfo[0]['pwd']?$res['flag']=200:$res['flag']=403;
          }else{
            $res['flag']=402;
          }

        # code...
        break;
      case 'mark':
      try {
        $result=$db->prepare("UPDATE bl_contents SET status = 1 WHERE (id=?)");
        echo $result->execute(array($datas['id']));

      } catch (PDOException $e) {
        $res['status']=500;
      }



      break;
        break;
      default:
        # code...
        break;
    }
    echo json_encode($res);

 ?>
