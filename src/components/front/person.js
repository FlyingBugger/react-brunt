import React from 'react';
import { List,  Button, Spin,message} from 'antd';
import axios from 'axios';
import   './person.css';
import { connect } from 'react-redux';
import { recordUser } from "../../action/recordUser";
const fakeDataUrl = '/frontApi.php';


 class Person extends React.Component {
  state = {
    id:this.props.match.params.id,
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: [],
  }
  componentWillMount(){
    document.title="个人中心"
  }
  componentDidMount() {
    const {record }=this.props;
    this.getData((res) => {
      const datas={
        userid:this.state.id,
        msg:res.data.msg
      }
      record(datas);
      this.setState({
        loading: false,
        data: res.data.msg,
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
          params:{"id":this.state.id}
      })
      .then((res)=>{
        callback(res);
      })
      .catch(e=>{
        console.log(e)
      })
  }
  onLoadMore = () => {
    this.setState({
      loadingMore: true,
    });
    this.getData((res) => {
      const data = this.state.data.concat(res.results);
      this.setState({
        data,
        loadingMore: false,
      }, () => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
    });
  }
  toDetails(){
    this.props.history.push("/msgdetails");
  }
  handleEdit(){
    console.log(1)
  }
  render() {
    const { loading, loadingMore, showLoadingMore, data } = this.state;

    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
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
          <List.Item actions={[<a onClick={()=>this.toDetails()}>详情</a>]}>
            <List.Item.Meta
              title={item.title}
              style={{textAlign:"center"}}
              description=""
            />
            <div className="contents">is refined by Ant UED Teamis refined by Ant UED Team</div>
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
  }

}
export default state;
