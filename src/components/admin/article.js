import React from 'react';
import {Button,Icon,Layout} from 'antd';
import './details.css';
const { Header, Footer, Sider, Content } = Layout;

export default class article extends  React.Component {
  constructor(props){
      super(props);
      this.state={
        data:props.dates
      }

    }
    componentDidMount(){

    }
    goBack=()=>{
      this.props.handleBack();
    }
  render(){
      const dates=this.state.data;
      const medias=JSON.parse(dates.uploads);
      console.log(medias)
    return(
      <div>
          <Button type="primary" onClick={this.goBack}>
          <Icon type="step-backward" />返回上一页
          </Button>
          <div className="title">{dates.title}</div>
          <div  className="content-tag">
          <div>爆料人姓名:{dates.name} </div>
          <div>爆料时期:{dates.time} </div>
          </div>
          <div className="content-contents">
              {dates.contents}
          </div>

              <div>
                媒体资源

              </div>
       </div>
    )
  }
}
