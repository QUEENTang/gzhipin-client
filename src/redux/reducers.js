/*
包含多个用于生成新的state的reducer函数的模块
 */
import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESET_USER,
    RECEIVE_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG,
    RECEIVE_CHAT,
    MSG_UPDATE
} from "./action-types"
import {getRedirectPath} from "../utils"

const initUser = {
    username: "",
    type: "",
    msg: "",
    redirectTo: ""
};
function user(state = initUser, action) {

    switch (action.type){
        case AUTH_SUCCESS:
            const user = action.data;
            return {...user, redirectTo: getRedirectPath(user.type, user.header)};
        case ERROR_MSG:
            return {...state, msg: action.data};
        case RECEIVE_USER:
            return action.data;
        case RESET_USER:
            return {...initUser, msg: action.data};
        default:
            return state
    }
}

const initUserList = [];

function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data;
        default:
            return state
    }
}

const initChat = {
    users: {},
    chatMsgs: [],
    unReadCount: 0
};

function chat(state=initChat, action) {
    switch (action.type) {
        case RECEIVE_CHAT:
            return {
                users: action.data.users,
                chatMsgs: action.data.chatMsgs,
                unReadCount: action.data.chatMsgs.reduce((preTotal, msg) => {
                    return preTotal  + (!msg.read && msg.to === action.data.meId ? 1 : 0)
                }, 0)
            };
        case RECEIVE_MSG:
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, action.data.chatMsg],
                unReadCount: state.unReadCount + (action.data.chatMsg.to === action.data.meId ? 1 : 0)
            };
        case MSG_UPDATE:
            const {from, to, count} = action.data;
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if(msg.from === from && msg.to === to && !msg.read) {
                        return {...msg, read: true}
                    }else {
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            };
        default:
            return state
    }
}

// 返回合并后的reducer函数
export default combineReducers({
    user,
    userList,
    chat
})


