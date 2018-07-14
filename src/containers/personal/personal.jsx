/*
用户个人中心路由组件
 */

import React from 'react'
import {connect} from "react-redux"
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import Cookies from "js-cookie"
import {resetUser} from "../../redux/action"

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends React.Component {

    logout = () => {
        Modal.alert("退出", "确认退出登录吗？", [
            {
                text: "取消"
            },{
                text: "确认",
                onPress: () => {
                    Cookies.remove("userid");
                    this.props.resetUser()
        }
            }
            ])
    };

    render() {
        const {username, company, header, salary, info, post} = this.props.user;
        console.log(this.props);
        return (
            <div style={{marginBottom: 50, marginTop: 50}}>
                <Result
                    img={<img src={require(`../../assets/imgs/${header}.png`)} style={{width: 50}} alt="header"/>}
                    title={username}
                    message={company ? company : null}
                />

                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位: {post}</Brief>
                        <Brief>简介: {info}</Brief>
                        {salary ? <Brief>薪资: {salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        )
    }
}


export default connect (
    state => ({user: state.user}),
    {resetUser}
)(Personal)