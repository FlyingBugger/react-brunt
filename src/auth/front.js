import React from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
export default (Layout, props,action) => {
    switch (action) {
      case "PersonCenter":
        break;
      case "newSign":
        window.location.href="http://localhost/userinfo.php"
        return false;
        break;
      case "IndexSign":
      let { match }=props;
        axios.get("/userinfo.php",
        {
          params:{
            "token":match.params.openid
          }
        }
      ).then((res)=>{
          if(res.data===0){
            //跳转到获取用户信息界面
              window.location.href="http://localhost/userinfo.php"
          }else{
            cookie.save("token",match.params.openid);
          }
        }).catch(e=>{
          console.log(e)
        })
        break;
        case "PersonSign":
        //    cookie.save("token",match.params.openid);
          break;

      default:
    }

          return  <Layout {...props} />
}
