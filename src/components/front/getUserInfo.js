import React from 'react';
export default class redirect extends React.Component{
  componentWillMount(){
    window.location.href="http://localhost/userinfo.php"
  }
  render(){
    return(
        <div></div>
    )
  }
}
