import React, { Component } from 'react';
import { Form, Icon, Input, Button,message } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginuser } from "../../action/action";
import cookie from 'react-cookies';
const FormItem = Form.Item;


class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
          axios.post(
            '../api/adminApi.php',{
              action:"login",
              name:values.userName,
              password:values.password,
            })
            .then((res)=>{
                if(res.data.flag===402){
                    this.props.form.setFields({
                      userName:{
                        value:values.userName,
                        errors:[new Error('用户名错误！')],
                      }
                    })
                }else if (res.data.flag===403) {
                  this.props.form.setFields({
                      password:{
                        value:values.password,
                        errors:[new Error('密码错误！')],
                      }
                    })
                }else{

                    cookie.save("userToken",new Date().getTime());
                    this.props.history.push("/admin/index")
                  message.info("登陆成功!");
                }
            })
            .catch(e=>{
              console.warn(e)
            })

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={mid}>
      <Form onSubmit={this.handleSubmit} className="login-form" >
        <div className="ant-col-12  ant-col-offset-6 frame">
        <div className="ant-row ant-layout-header" style={{background:'#fff',textAlign:"center"}} >登录</div>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
        </div>
      </Form>
      </div>
    );
  }
}
const mid={
  position:"absolute",
  left: 0,
  right: 0,
  height: "250px",
  top: "50%",
  marginTop:"-125px",
}

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return { loginstatus: state }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return {
        login:()=>dispatch(loginuser())
    }
}

const WrappedNormalLoginForm = connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));



//连接组件

export default WrappedNormalLoginForm;
