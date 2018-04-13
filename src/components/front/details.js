import React from 'react';
import {
  Form,message,
Button, Upload, Icon,Input
} from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import './details.css';
import { emptyUser } from "../../action/recordUser";
const FormItem = Form.Item;
const { TextArea } = Input;

class Index extends React.Component {
  state={
    submitStatus:false,
    uploads:[]
  }
  componentWillMount(){
    document.title="查看详情";


    this.props.userDates.userid===''?this.props.history.goBack():this.setState({...this.props.userDates},()=>{});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      submitStatus:true
    })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.uploads=this.state.uploads;
        axios.post("api/front.php",{id:this.state.userid,...values})
        .then((res)=>{
          if(res.data===200){
            message.success("提交成功!",()=>{
              this.resetBtn();
              this.toPerson();
            })
          }else{
            message.error("异常!",()=>{
              this.resetBtn();
            })
          }
        })
        .catch(e=>{
          message.error(e,()=>{
          })
        })
      }
    });
  }
  checkPhone=(rule, value, callback) =>{
        if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))){
            callback("手机号码有误，请重填");
        }else{
            callback();
        }
    };
  resetBtn=()=>{
    this.setState({
      submitStatus:false
    })
  }
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  toPerson(){
    this.props.history.push("/person/"+this.state.userid);
  }
  mergeDates=(target)=>{
    this.setState({
      uploads:[...target]
    },()=>{
      console.log(this.state)
    })
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    let dates={...this.state.msg};
    let {mergeDates}={...this}


    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    let fileList=[];
    if(this.state.msg && this.state.msg.uploads!==''){
      const x =JSON.parse(this.state.msg.uploads);
       x.map((v,k)=>{
        v.uid=k
//        x.uid=k;
      })
      fileList=x;
    }

    const uploadConfig={
      accept:"image/*,video/*,audio/*",
      name:'file',
      multiple:true,
      defaultFileList:[...fileList],
      action:"api/index.php",
      className: 'upload-list-inline',
      onChange(info){

        if(info.hasOwnProperty("fileList")){
          let   target=Array.from(info.fileList)
          target.map((v,k)=>{
            if(v.hasOwnProperty("response")){
              target[k]=v.response
            }
          })
          mergeDates(target)
        }
      },onRemove(file){
          axios.post("../api/index.php",JSON.stringify({
            filename:file.relPath,
            action:"unlinkFile"
          }),{
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then((res)=>{

          }).catch(e=>{

          })
      }
    }

    return (
      <Form onSubmit={this.handleSubmit} style={styles.mid}>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('username', {
            initialValue:dates.name,
            rules: [{
              required: true,
              message: '请输入姓名',
            }],
          })(
            <Input placeholder="请输入姓名"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="标题">
          {getFieldDecorator('title', {
            initialValue:dates.title,
            rules: [{
              required: true,
              message: '请填写标题',
            }],
          })(
            <Input placeholder="请填写标题"  />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号">
          {getFieldDecorator('phone', {
            rules: [{
              required: true,
              typeL:"number",
              message: '请填写手机号'
            },{
              validator: this.checkPhone,
              }],
              initialValue:dates.phone,
          })(
            <Input placeholder="请填写手机号" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="填写爆料内容"
        >
        {getFieldDecorator('contents', {
          initialValue:dates.contents,
          rules: [{
            required: true,
            message: '请输入爆料内容',
          }],
        })(
          <TextArea rows={4} ></TextArea>
        )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="点击上传图片或视频"
        >

        </FormItem>
        <Upload {...uploadConfig}>
         <Button>
           <Icon type="upload" /> 点击开始上传
         </Button>
       </Upload>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit" disabled={this.state.submitStatus}>提交</Button>
        </FormItem>

      </Form>
    );
  }
}
const styles={
  mid:{
    maxWidth:"100%",
    overflow:"hidden",
  }
}
function mapStateToProps(state) {
    return { userDates: state.appState }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        // record:(data)=>dispatch(recordUser)
          record:(data)=>dispatch(emptyUser())
    }
}
 const __FORM=Form.create()(Index);
 const state=connect(mapStateToProps, mapDispatchToProps)(__FORM);

 export default  state;
