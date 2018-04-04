<?php
// && $_SERVER['HTTP_REFERER']==="http://weixin.scnjnews"
$datas=JSON_decode(file_get_contents("php://input"),true);
if(!empty($_FILES['file'])  ){
    $_FILES['file']['error']===0?null:exit(500);
    $time=date("Ymd",time());
    $dirFile=pathinfo(__FILE__);
    $preParedDir=$dirFile['dirname'].'\\'.$time;
    preg_match('/[^.]+$/',$_FILES['file']['name'],$result);
    $newName=uniqid().".".$result[0];
    if(!file_exists($preParedDir)){
      mkdir($preParedDir);
    }
    if(move_uploaded_file($_FILES['file']['tmp_name'],$preParedDir."\\".$newName)){
      echo json_encode(array(
        "status"=>200,
        "filename"=>$preParedDir."\\".$newName
      ));
    }
}elseif(isset($datas['action'])) {
  switch ($datas['action']) {
    case 'unlinkFile':
      echo unlink($datas['filename']);
      break;
    default:
      # code...
      break;
  }
}
