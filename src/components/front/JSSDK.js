import React from 'react';
import axios from 'axios';
import WxShare from 'weixin-share';
export default (dates)=>{
        console.log(123);
        return false;
          let titleA=dates.title;
         let decA=dates.desc;
         let sharelinkAimgA=dates.image;
         let sharelink=dates.link;
         axios.post("http://weixin.scnjnews.com/foods/api/frontapi.php",{"act":"JSSDK"}).then(res=>{
           console.log(res);
         let infos= res.data.signPackage;
           if(!infos){
             return false;
           }
           let wx=new WxShare();
           console.log(window.wx);
           window.wx.config({
             debug: true,
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
           window.wx.ready(function () {
                   wx.onMenuShareTimeline({  //分享到朋友圈
                     title: titleA,//描述
                     link: sharelink, // 分享链接
                     imgUrl: sharelinkAimgA, // 分享图标
                     success: function () {
                      //alert("ok！");  // 用户确认分享后执行的回调函数
                     },
                     cancel: function () {
                     // alert("取消了分享！"); // 用户取消分享后执行的回调函数
                     }
                   });
                  wx.onMenuShareAppMessage({  //分享给好友
                     title: titleA, // 分享标题
                     desc: decA,//描述
                     link: sharelink,// 分享链接
                     imgUrl: sharelinkAimgA, // 分享图标
                     success: function () {
                      //alert("ok！");  // 用户确认分享后执行的回调函数
                     },
                     cancel: function () {
                      //alert("取消了分享！"); // 用户取消分享后执行的回调函数
                     }
                   });
                  wx.onMenuShareQQ({  //分享到QQ
                     title: titleA, // 分享标题
                     desc: decA,//描述
                     link: sharelink, // 分享链接
                     imgUrl: decA, // 分享图标
                     success: function () {
                      //alert("ok！");  // 用户确认分享后执行的回调函数
                     },
                     cancel: function () {
                     // alert("取消了分享！"); // 用户取消分享后执行的回调函数
                     }
                   });
                  wx.onMenuShareWeibo({  //分享到微博
                     title: titleA, // 分享标题
                     desc: decA,//描述
                     link: sharelink, // 分享链接
                     imgUrl: decA, // 分享图标
                     success: function () {
                      //alert("ok！");  // 用户确认分享后执行的回调函数
                     },
                     cancel: function () {
                     // alert("取消了分享！"); // 用户取消分享后执行的回调函数
                     }
                   });
                  wx.onMenuShareQZone({  //分享到QQ空间
                     title: titleA, // 分享标题
                     desc: decA,//描述
                     link: sharelink, // 分享链接
                     imgUrl: decA, // 分享图标
                     success: function () {
                      //alert("ok！");  // 用户确认分享后执行的回调函数
                     },
                     cancel: function () {
                      //alert("取消了分享！"); // 用户取消分享后执行的回调函数
                     }
                   });
                });

       })
       }
