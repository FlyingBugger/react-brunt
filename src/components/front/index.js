import React from 'react';

import {
  Form, Select, InputNumber, Radio,
Button, Upload, Icon,Input
} from 'antd';
import banner from '../../resource/img/a.jpg';
import axios from 'axios';
const FormItem = Form.Item;
const Option = Select.Option;

const { TextArea } = Input;

class Index extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
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
        console.log(info)
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
            {getFieldDecorator('点击上传图片或视频', {
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

export default  Index = Form.create()(Index);
