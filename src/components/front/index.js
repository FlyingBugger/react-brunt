import React from 'react';

import {
  Form, Select, InputNumber, Radio,message,
Button, Upload, Icon,Input
} from 'antd';
import banner from '../../resource/img/a.jpg';
import axios from 'axios';
import {Link} from 'react-router-dom';
import WxShare from 'weixin-share';


const FormItem = Form.Item;
const Option = Select.Option;

const { TextArea } = Input;

class Index extends React.Component {
  state={
    id:this.props.match.params.openid,
    submitStatus:false
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      submitStatus:true
    })
    this.props.form.validateFields((err, values) => {
      if (!err) {

        if(values.uploads){
          let datas=values.uploads.map((value)=>{
              return {...value.response}
          })
          values.uploads=datas;
        }
        axios.post("../api/front.php",{id:this.state.id,...values})
        .then((res)=>{
          if(res.data==200){

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
    this.props.history.push("/person/"+this.state.id);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const uploadConfig={
      accept:"image/*,video/*,audio/*",
      name:'file',
      multiple:true,
      action:"/index.php",
      onChange(info){

      },onRemove(file){
          axios.post("api/index.php",JSON.stringify({
            filename:file.response.filename,
            action:"unlinkFile"
          }),{
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then((res)=>{
            console.log(res)
          }).catch(e=>{
            console.log(e)
          })
      }
    }
    return (
      <Form onSubmit={this.handleSubmit} style={styles.mid}>
      <div  className="ant-row  ant-form-item">
           <div  style={{margin:"0 auto",float:"unset"}} className="ant-col-16 ant-form-item-control-wrapper">
              <img src={banner} style={{width:"100%"}}/>
           </div>
      </div>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('username', {
            rules: [{
              required: true,
              message: '请输入姓名',
            }],
          })(
            <Input placeholder="请输入姓名" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="标题">
          {getFieldDecorator('title', {
            rules: [{
              required: true,
              message: '请填写标题',
            }],
          })(
            <Input placeholder="请填写标题" />
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
          })(
            <Input placeholder="请填写手机号" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="填写爆料内容"
        >
        {getFieldDecorator('contents', {
          rules: [{
            required: true,
            message: '请输入爆料内容',
          }],
        })(
          <TextArea rows={4}></TextArea>
        )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="点击上传图片或视频"
        >
          <div className="dropbox">
            {getFieldDecorator('uploads', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger
                {...uploadConfig}
                >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击上传图片或视频</p>
              </Upload.Dragger>
            )}
          </div>
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit" disabled={this.state.submitStatus}>提交</Button>
        </FormItem>
        <div style={styles.icons}>

         <Icon type="user" style={{fontSize:30,display:"block"}} onClick={()=>this.toPerson()}/>
         个人中心
         </div>
      </Form>
    );
  }
}
const styles={
  mid:{
    maxWidth:"100%",
    overflow:"hidden",
  },
  icons:{
    position: "fixed",
    bottom: "5%",
    right: "5%",
    textAlign: "center"
  }
}

export default  Index = Form.create()(Index);
