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
    medias(){
      let n=[];
      const medias=JSON.parse(this.state.data.uploads);
      medias.map((v,index)=>{
        //const path=`api/${v.thumbUrl}`;
        const path=`http://localhost/${v.thumbUrl}`;
        const name=v.name;
        if(/\.(bmp|jpg|webp|png|tiff|gif)$/i.test(name)){
          n.push(
            <div key={index}>
              <img src={path} />
            </div>
          )
        }else if(/\.(mp4|avi|wma|3gp|flv|mpeg)$/i.test(name)){
          n.push(
            <div key={index}>
              <video src={path} controls="controls">
              </video>
            </div>
          )
        }else{
            <div key={index}>
              <a href={path}>{name}</a>
            </div>
        }
      })

      return n;
    }
  render(){
    const dates=this.state.data;
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
              <div className="media">
                <div className="mediaResouce">媒体资源:</div>
                {this.medias()}
              </div>
       </div>
    )
  }
}
