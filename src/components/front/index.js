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

  componentDidMount(){

    //微信分享处
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

        if(values.title.length>=8){

          this.props.form.setFields({
            title:{
              value:values.title,
                errors: [new Error('标题不能超过8个字符')]
            }
          })
          this.resetBtn();
          return false;
        }
        if (values.phone) {
          if(!(/^1(3|4|5|7|8)\d{9}$/.test(values.phone))){
                this.props.form.setFields({
                  phone:{
                    value:"",
                      errors: [new Error('请输入正确的手机号码')]
                  }
                })
                this.resetBtn();
                return false;
            }
        }

        axios.post("api/front.php",{id:this.state.id,...values})
        .then((res)=>{
          if(res.data>0){
            message.success("提交成功!",()=>{
              this.resetBtn();
              this.props.history.push("/list");
            })
          }else{
            message.error("异常!",()=>{
              this.resetBtn();
            })
          }
        })
        .catch(e=>{
            console.log(e);
        })
      }else{
        this.resetBtn();
      }
    });
  }

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
      action:"api/index.php",
      onChange(info){

      },onRemove(file){
          axios.post("/api/index.php",JSON.stringify({
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
           <div  style={{margin:"0 auto",maxWidth:"800px",float:"unset"}} className="ant-col-16 ant-form-item-control-wrapper">
              <img src={banner} style={{width:"100%"}}/>
           </div>
      </div>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('username', {
            rules: [{

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

              typeL:"number",
              message: '请填写手机号'
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
        style={{margin:"0 auto"}}
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button  type="primary" htmlType="submit" disabled={this.state.submitStatus}>提交</Button>
        </FormItem>

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
