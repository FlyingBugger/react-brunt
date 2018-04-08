<?php
  $datas=$_GET;

  $db=new PDO("mysql:host=localhost;dbname=weixin","root","root");
  if(empty($datas)){
    //do getting getUserInfo
    try {
      //emutor datas
      $db->beginTransaction();
      $openid=uniqid();
      $nickname=uniqid();
      $headimg="http://thirdwx.qlogo.cn/mmopen/vi_32/B9eDDgEoS90sHsmFEicczSyHE7KjR3IE4dH7mUEicswWSotOYFMgeMSXiaqY8scXruzCzaaRFbmzccwDQaBmRUSaA/132";
      $userid=date("His",time()).rand(1000,10000);
      $sql="INSERT into bl_contents (`openid`,`nickname`,`headimg`,`userid`) values ('$openid','$nickname','$headimg','$userid')";
      $db->exec($sql);
      $res=$db->commit();

      if($res){
        $redirectHref="http://localhost:3000/index/$openid";
        header("Location:$redirectHref");
        exit();
      }
    } catch (PDOException $e) {
       die ("Error!: " . $e->getMessage() . "<br/>");
    }

  }elseif (isset($datas['token'])) {
      $openid=$datas['token'];
      $sql="select count(id) from bl_contents where openid='$openid' limit 1";
      $res=$db->query($sql);
      if($res->fetchAll(PDO::FETCH_ASSOC)[0]['count(id)']==0){
        echo 0;
      }else{
        echo 1;
      }
  }elseif (isset($datas['id'])) {
      $openid=$datas['id'];
      $sql="select * from bl_contents where openid='$openid'";
      $res=$db->query($sql);
      echo json_encode($res->fetchAll(PDO::FETCH_ASSOC));
  }

?>
