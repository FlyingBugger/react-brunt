<?php

  $datas=$_GET;
  $db=new PDO("mysql:host=192.168.20.104;dbname=weixin","root","102098hchab");

    

function https_request($url,$data="")
{
    $ch=curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);//�����ַ
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//�ļ���
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);//�ر�ssl��֤
    if ($data) {
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch,CURLOPT_HEADER,0);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);//
    }
    $request=curl_exec($ch);//ִ��
    $tempArr=json_decode($request,TRUE);
   if (is_array($tempArr)) {
        return $tempArr;
    }
    else
    {
        return $request;
    }
    curl_close($ch);
}
  if(empty($datas) || isset($datas['code'])){
    //do getting getUserInfo
$appid="wx6f1fa092a4f5e263";
$appsecret="51eb6b33ee16bfa2e213c037f9d4c4f8";
$url="http://weixin.scnjnews.com/baoliao";
$uri="$url/userinfo.php";
$scope='snsapi_base';
$urlb="https://open.weixin.qq.com/connect/oauth2/authorize?appid=$appid&redirect_uri=$uri&response_type=code&scope=$scope&state=STATE#wechat_redirect";
if(!@$_GET['code']){
header("Location:$urlb");
exit;
}
$code=$_GET['code'];


$ass="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$appsecret";//ȫ��
$c=https_request($ass);
$access=$c['access_token'];//��ȡȫ��acess_token

//δ��ע
$op="https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$appsecret&code=$code&grant_type=authorization_code";
$oppp=https_request($op);

$access_token=$oppp["access_token"];
$openid=$oppp['openid'];

$wonderExit=$db->query("select openid from bl_contents where openid='$openid' limit 1");
	  if($wonderExit->fetch()){
		$redirectHref="http://weixin.scnjnews.com/baoliao/index/$openid";
        header("Location:$redirectHref");
        exit();
	  }

$sc="https://api.weixin.qq.com/cgi-bin/user/info?access_token=$access&openid=$openid";
$userinfo=https_request($sc);
$subscribe=$userinfo['subscribe'];//����ȫ��acess_token��ȡ��Ϣ������û�δ��ע���ȡ������ϸ�����
if ($subscribe==0) {
$test="https://api.weixin.qq.com/sns/userinfo?access_token=$access_token&openid=$openid&lang=zh_CN ";
$userinfo=https_request($test);
}

    try {
      //emutor datas
	

      $db->beginTransaction();
      $openid=$openid;
      $nickname=$userinfo['nickname'];
      $headimg=$userinfo['headimgurl'];
      $userid=date("His",time()).rand(1000,10000);
	
      $sql="INSERT into bl_contents (`uploads`,`openid`,`nickname`,`headimg`,`userid`) values ('','$openid','$nickname','$headimg','$userid')";
      $q=$db->exec($sql);
      $res=$db->commit();
      if($res){
    $redirectHref="http://weixin.scnjnews.com/baoliao/index/$openid";
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
	  $datas['start']==-1?$index=0:$index=$datas['start'];
	
      $sql="select * from bl_contents where openid='$openid' limit $index,5";

      $res=$db->query($sql);
	  $data=$res->fetchAll(PDO::FETCH_ASSOC);
		if(empty($data)){
			echo "[{name:'false'}]";
		}else{
			      echo json_encode($data);
		}

  }

?>
