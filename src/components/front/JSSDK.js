import React from 'react';
import axios from 'axios';
import WxShare from "weixin-share";
export default (dates)=>{

         const href=window.location.href;
         axios.post("../api/frontapi.php",{"act":"JSSDK",href}).then(res=>{

         let infos= res.data.signPackage;
           if(!infos){
             return false;
           }
           new WxShare().config({
             debug: false,
             appId: infos['appId'],
             timestamp: infos['timestamp'],
             nonceStr: infos['nonceStr'],
             signature:infos['signature'],
             jsApiList: [
               'onMenuShareTimeline',
               'onMenuShareAppMessage',
               'onMenuShareQQ',
               'onMenuShareWeibo',
               'onMenuShareQZone'
             ]
           }
         ).setReadyCallBack(()=>{})
         .share({...dates})
       })
       }
