/*
用户登陆的路由组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, WingBlank, List, WhiteSpace, InputItem, Button} from "antd-mobile"

import Logo from "../../components/logo/logo"

class Login extends Component {

    state = {
        username: "",
        password: ""
    };

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    };

    goRegister = () => {
        this.props.history.replace("/register")
    };

    render () {
        return (
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
                <WingBlank/>
                <List>
                    <InputItem placeholder="请输入用户名" onChange={val=>this.handleChange("username", val)}>用户名：</InputItem>
                    <InputItem type="password" placeholder="请输入密码" onChange={val=>this.handleChange("password", val)}>密码：</InputItem>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button type="primary">登录</Button>
                    <Button onClick={this.goRegister}>还没有账户</Button>
                </List>
                <WhiteSpace/>
            </div>
        )
    }
}
export default connect()(Login)