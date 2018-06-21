import React from 'react';

import axios from 'axios';
import { Carousel,Row,Col} from 'antd';
const fakeDataUrl = 'api/userinfo.php';



export default class ListDetails extends React.Component {
  state = {
    data: [],
  }
  componentDidMount(){
    if(!sessionStorage.getItem("infos")){
          this.props.history.push("/list");
          return false;
    }
    const datas=JSON.parse(sessionStorage.getItem("infos"));
    console.log(datas)
        this.setState({
            data:datas
        })

  }

  medias(){
    let n=[];
    const medias=JSON.parse(sessionStorage.getItem("infos")).uploads;

    medias.map((v,index)=>{
      //const path=`api/${v.thumbUrl}`;
      const path=`api/${v.thumbUrl}`;

      const name=v.name;
      if(/\.(bmp|jpg|webp|png|tiff|gif)$/i.test(name)){
        n.push(
          <Col xs={{ span: 24}} lg={{ span: 8 }} key={index}>
            <img  className="medias"  src={path} />
          </Col>
        )
      }else if(/\.(mp4|avi|wma|3gp|flv|mpeg)$/i.test(name)){
        n.push(
          <Col  xs={{ span: 24}} lg={{ span: 8 }}   key={index}>
            <video style={{margin:"10px auto",maxWidth:"100%"}} src={path} controls="controls">
            </video>
          </Col>
        )
      }else{
          <Col  xs={{ span: 24}} lg={{ span: 8 }} key={index}>
            <a href={path}>{name}</a>
          </Col>
      }
    })

    return n;
  }
  render(){
      const datas=this.state.data
    return(
      <div>

        <h1 className="title">{datas.title}</h1>
        <div className="content">{datas.contents}</div>
        <Row className="mutire">
            {this.medias()}
        </Row>

      </div>


    )
  }

}
