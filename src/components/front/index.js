import React from 'react';

import {
  Form, Select, InputNumber, Radio,
Button, Upload, Icon,Input
} from 'antd';
import banner from '../../resource/img/a.jpg';
import axios from 'axios';
import {Link} from 'react-router-dom';
const FormItem = Form.Item;
const Option = Select.Option;

const { TextArea } = Input;

class Index extends React.Component {
  state={
    id:this.props.match.params.openid
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.uploads){
          let datas=values.uploads.map((value)=>{
              return value.response.filename
          })
          values.uploads=datas;
        }
        axios.post("/front.php",params:{...values})
        .then((res)=>{
          console.log(res)
        })
        .catch(e=>{
          console.log(e)
        })
        console.log('Received values of form: ', values);

      }
    });
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

          axios.post("/index.php",JSON.stringify({
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
          <Button type="primary" htmlType="submit">提交</Button>
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
