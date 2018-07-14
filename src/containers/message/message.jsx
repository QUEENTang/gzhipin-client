import React, {Component} from "react"
import {connect} from "react-redux"
import {List, Badge} from "antd-mobile"
import QueueAnim from "rc-queue-anim"

const Item = List.Item;
const Brief = Item.Brief;

function getLastMsgs(chatMsgs, meId) {
    // 1. 创建一个用于保存所有lastMsg的对象容器: lastMsgObjs
    const lastMsgObjs = {};
    // 2. 遍历每个msg, 判断msg是否是它对应的聊天lastMsg, 如果是放入
    chatMsgs.forEach(msg => {

        if(!msg.read && msg.to === meId) {
            msg.unReadCount = 1
        }else {
            msg.unReadCount = 0
        }

        const chatId = msg.chat_id;
        const lastMsg = lastMsgObjs[chatId];
        if(!lastMsg) {
            lastMsgObjs[chatId] = msg
        }else {
            const unReadCount = lastMsg.unReadCount + msg.unReadCount;

            if(msg.create_time > lastMsg.create_time) {
                lastMsgObjs[chatId] = msg
            }

            lastMsgObjs[chatId].unReadCount = unReadCount
        }
    });
    // 3. 得到lastMsgObjs中所有属性值组成的数组: lastMsgs
    const lastMsgs = Object.values(lastMsgObjs);
    // 4. 对lastMsgs进行排序(倒序)
    lastMsgs.sort(function (m1, m2) {
        return m2.create_time - m1.create_time
    });

    return lastMsgs
}


class Message extends Component {
    render () {

        const {user, chat} = this.props;
        const {users, chatMsgs} = chat;
        const meId = user._id;

        const lastMsgs = getLastMsgs(chatMsgs, meId);

        return(
            <List style={{marginBottom: 50, marginTop: 50}}>
                <QueueAnim type="scale" delay={100}>
                    {
                        lastMsgs.map((msg, index) => {
                            const targetId = msg.from === meId ? msg.to : msg.from;
                            const targetUser = users[targetId];
                            const icon = targetUser.header ? require(`../../assets/imgs/${targetUser.header}.png`) : null;
                            return(
                                <Item
                                    key={index}
                                    extra={<Badge text={msg.unReadCount}/>}
                                    thumb={icon}
                                    onClick={() => this.props.history.push(`/chat/${targetId}`)}
                                    arrow='horizontal'
                                >
                                    {msg.content}
                                    <Brief>{targetUser.username}</Brief>
                                </Item>
                            )
                        })
                    }
                </QueueAnim>
            </List>
        )
    }
}

export default connect (
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)