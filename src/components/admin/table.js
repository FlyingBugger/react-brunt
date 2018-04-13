import React from 'react';
import {Popconfirm, Table,Button } from 'antd';
import axios from 'axios';
import './main.css';
import cookie from 'react-cookies';
let TotalDates=[];
 class TableComponents extends React.Component{
  constructor(props){
    super(props);
    this.state={
      columns:[
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',

        },{
        title: '微信昵称',
        dataIndex: 'nickname',
        key: 'nickname',

      }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',

      }, {
        title: '标题',
        dataIndex: 'title',
        key: 'title',

      },
      {
       title: '内容',
       dataIndex: 'contents',
       key: 'contents',
       render: text => <span className="ant-cell" href="#">{text}</span>,
      }, {
        title: '是否包含媒体资源',
        dataIndex: 'uploads',
        key: 'uploads',
        render:(text,record)=>{
          return (
            <span>
              <a href="javascript:void(0);">{text===''?"no":"yes"}</a>
            </span>
          )
        }
      },  {
        title: '是否已被采纳',
        dataIndex: 'status',
        key: 'status',
        render: (text,record,index) => (

          <span >
            <Popconfirm placement="topLeft" title={"确定采纳这条信息吗?"} onConfirm={()=>this.adpter(record.id,text,index)} okText="Yes" cancelText="No">
             <Button style={text==0?{backgroundColor:"red",color:"white"}:{backgroundColor:"green",color:"white"}}>{text==0?"未被采纳":"已被采纳"}</Button>
            </Popconfirm>
          </span>
        ),
      },{
       title: 'more',
       dataIndex: 'userid',
       width:200,
       key: 'userid',
       render: (text,record) => <span onClick={()=>this.toDetails(text,record)}>查看详情</span>,
      },
      ],
      loading:true,
      dataSource:[]
    }
  }

adpter=(id,text,index)=>{

  if(text==0){
    //未审核稿件
    axios.post("../api/adminApi.php",{
      action:"mark",
      id
    }).then((res)=>{
      TotalDates.map((v)=>{
        if(v.id==id){
          v.status=1;
        }
      })
      let tempDatas=this.state.dataSource
      tempDatas[index]['status']=1
      this.setState({
          dataSource:tempDatas
      })
    }).catch(e=>{
      console.log(e)
    })
  }
}
  toDetails=(text,record)=>{
    this.props.handleGetArticle(record);

  }

  filterDates=(d)=>{
    var flag;
    d==1?flag=0:flag=1;
    this.setState({
        dataSource:TotalDates.filter(v=>v.status==flag),
    })
  }

  componentDidMount(){

    const {datas,store}=this.props;
    this._fetchDate({action:"get"},(res)=>{
      TotalDates=res.data[0];
      this.setState({
        dataSource:res.data[0].filter(v=>v.status==0),
        loading:false
      })
    })
  }
  _fetchDate=(dates,callback)=>{
    axios.post("../api/adminApi.php",dates)
    .then((res)=>{
      callback(res)
    })
    .catch(e=>{console.warn(e)})
  }

  render(){
    const  dates=this.state
    return(
      <div>
        <Table {...dates}  rowKey={record => record.id}/>
      </div>
    )

  }
}


export default TableComponents;
