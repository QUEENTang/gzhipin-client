import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, WingBlank, List, WhiteSpace, InputItem, Radio, Button} from "antd-mobile"

import Logo from "../../components/logo/logo"

const ListItem = List.Item;

class Register extends Component {

    state = {
        username: "",
        password: "",
        password2: "",
        type: "dashen"
    };

    handleChange = (name, value) => {

        this.setState({
            [name]: value
        })
    };

    goLogin = () => {
        this.props.history.replace("/login")
    };

    render() {
        const {type} = this.state;
        return (
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
                <WingBlank/>
                <List>
                    <InputItem placeholder="请输入用户名" onChange={val=>this.handleChange("username", val)}>用户名：</InputItem>
                    <InputItem type="password" placeholder="请输入密码" onChange={val=>this.handleChange("password", val)}>密码：</InputItem>
                    <InputItem type="password" placeholder="请确认密码" onChange={val=>this.handleChange("password2", val)}>确认密码：</InputItem>
                    <WhiteSpace/>
                    <ListItem>
                        <span>用户类型：</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio onChange={()=>this.handleChange("type", "dashen")} checked={type==="dashen"}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio onChange={()=>this.handleChange("type", "laoban")} checked={type==="laoban"}>老板</Radio>
                    </ListItem>
                    <WhiteSpace/>
                    <Button type="primary">注册</Button>
                    <Button onClick={this.goLogin}>已有账户</Button>
                </List>
                <WhiteSpace/>
            </div>
        )
    }
}

export default connect()(Register)