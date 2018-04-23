import React from 'react';
import { List,  Button, Spin,message} from 'antd';
import axios from 'axios';
import   './person.css';
import { connect } from 'react-redux';
import { recordUser } from "../../action/recordUser";
import Jssdk from './JSSDK'

const fakeDataUrl = '/userinfo.php';

let start=0;
 class Person extends React.Component {
  state = {
    id:this.props.match.params.id,
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: [],
  }

  componentDidMount(){
    console.log(1)
    Jssdk();
  }

  componentWillMount(){
      console.log(2)
    document.title="个人中心"
  }
  componentDidMount() {
    this.getData((res) => {
      this.setState({
        loading: false,
        data: res.data,
      });
    });

  }
  getData = (callback) => {
      if(isNaN(parseInt(this.state.id))){
        message.error("id错误!",()=>{
        this.props.history.push("/")
        });
    }
      axios.get(fakeDataUrl,{
          params:{"id":this.state.id,start}
      })
      .then((res)=>{
        if(!res.data[0].name){
          message.warning("你未曾提交过内容!");
          this.setState({
            loading:false
          })
        }else{
          if(res.data.length==5){
            start+=5;
            console.log(start)
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
  onLoadMore = () => {
    if(start<0){
      message.warning("没有更多信息了!");
      return false;
    }
    this.setState({
      loadingMore: true,
    });
    this.getData((res) => {
      const data = this.state.data.concat(res.data);

      this.setState({
        data,
        loadingMore: false,
      }, () => {
        window.dispatchEvent(new Event('resize'));
      });
    });
  }
  toDetails(item){

    const datas={
      userid:this.state.id,
      msg:item
    }
    this.props.record(datas);

    this.props.history.push("/msgdetails");
  }
  handleEdit(){
    console.log(1)
  }
  render() {
     console.log(1)
    const { loading, loadingMore, showLoadingMore, data } = this.state;

    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>加载更多</Button>}
      </div>
    ) : null;
    return (
      <div>
        <header style={styles.header}>tab</header>
      <List
        style={{minHeight:"350px"}}
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={data}
        renderItem={item => (

          <List.Item actions={[<span style={item.status==0?styles.red:styles.green}> {item.status==0?"未被查看":"已被查看"}</span>,<a onClick={()=>this.toDetails(item)}>详情</a>]}>

            <List.Item.Meta
              title={item.title}
              style={{textAlign:"center"}}
              description=""
            />
            <div className="contents">1{item.contents}</div>
          </List.Item>
        )}
      />
      </div>
    );
  }
}
//映射Redux state到组件的属性
function mapStateToProps(state) {
    return { userDates: state.appState }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        // record:(data)=>dispatch(recordUser)
          record:(data)=>dispatch(recordUser(data))
    }
}

 const state=connect(mapStateToProps, mapDispatchToProps)(Person);
const styles={
  header:{
    background: "rgba(16, 142, 233, 1)",
    textAlign: "center",
    color: "white",
    lineHeight: "53px",
    fontSize: "25px"
  },
  red:{
    color:"red"
  },
  green:{
    color:"green"
  }

}
export default state;
