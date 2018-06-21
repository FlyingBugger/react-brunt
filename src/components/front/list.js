import React from 'react';
import {  List, Avatar, Icon ,Button, Row , Col,message,Spin} from 'antd';
import axios from 'axios';
import "./person.css";
const fakeDataUrl = 'api/userinfo.php';
  let start=0
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


export default class ListC extends React.Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: [],
  }

  componentDidMount(){
    this.getData((res) => {
      res.data.map((v,k)=>{
        let d=JSON.parse(v['uploads']);
        res.data[k].uploads=d;
          res.data[k].imgUrl=`api/404.jpg`
        d.map((v)=>{
          if (/\.(bmp|jpg|webp|png|tiff|gif)$/i.test(v.name)) {
            res.data[k].imgUrl=`api/${v.thumbUrl}`
          }
        })
      })

      this.setState({
        loading: false,
        data: res.data,
      });
    });
  }


      getData = (callback) => {
          axios.get(fakeDataUrl,{
              params:{start}
          }).then((res)=>{
            if(!res.data[0].name){
              message.warning("还未有数据!");
              start=-1;
              this.setState({
                loading:false
              })
            }else{
              if(res.data.length==5){
                start+=5;
              }else{
                start=-1;
              }
              callback(res);
            }

          })
          .catch(e=>{
            console.log(e)
          })
      }

  toDetails(id){
    sessionStorage.setItem("infos",JSON.stringify(id))
    const datas={
      userid:this.state.id,
      msg:id
    }


    this.props.history.push("/listDetails");
  }
  onLoadMore = () => {
    if(start<0){
      message.warning("没有更多信息了!");
      return false;
    }
    this.setState({
      loadingMore: true
    });
    this.getData((res) => {
      res.data.map((v,k)=>{
        let d=JSON.parse(v['uploads']);
        res.data[k].uploads=d;
          res.data[k].imgUrl=`api/404.jpg`
        d.map((v)=>{
          if (/\.(bmp|jpg|webp|png|tiff|gif)$/i.test(v.name)) {
            res.data[k].imgUrl=`api/${v.thumbUrl}`
          }
        })
      })
      const data = this.state.data.concat(res.data);

      this.setState({
        data,
        loadingMore: false,
      }, () => {
        window.dispatchEvent(new Event('resize'));
      });
    });
  }

  render(){
    const { loading, loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>加载更多</Button>}
      </div>
    ) : null;
    return(

      <Row gutter={24}>
          <Col xs={{ span: 22, offset: 1 }} lg={{ span: 12, offset:6 }}>
          <List
            itemLayout="vertical"
            loading={loading}
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3
            }}
                loadMore={loadMore}
            dataSource={data}
            footer={<div>交通违法曝光</div>}
            renderItem={item => {
              return(

                <div onClick={()=>this.toDetails(item)}>
                <List.Item
                  key={item.title}

                  extra={<img width={150} alt="logo" src={item.imgUrl} />}
                >
                  <List.Item.Meta
                    title={<a href={item.href}>{item.title}</a>}
                    avatar={<Avatar src={item.imgUrl} />}
                  />
                <div className={"contents"}>
                  {item.contents}
                </div>
                </List.Item>
                </div>
              )

            }
          }
          />
          </Col>
      </Row>

    )
  }

}
