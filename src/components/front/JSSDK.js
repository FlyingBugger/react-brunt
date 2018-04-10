import React from 'react';
import axios from 'axios';
import WxShare from 'weixin-share';

export default (dates)=>{

          let titleA=dates.title;
         let decA=dates.desc;
         let sharelinkAimgA=dates.image;
         let sharelink=dates.link;
         axios.post("api/frontapi.php",{"act":"JSSDK"}).then(res=>{
         let infos=  res.data.signPackage;
           if(!infos){
             return false;
           }
           let wx=new WxShare();
           wx.config({
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
           });

         wx.setReadyCallBack(function () {
            wx.share({  //分享到朋友圈
              title: titleA, // 分享标题
              desc: decA,//描述
              link: sharelink,// 分享链接
              imgUrl: sharelinkAimgA, // 分享图标
            });

         });
       })
       }
