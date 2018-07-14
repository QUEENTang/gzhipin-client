import ajax from "./ajax"
// const BASE_URL = "http://localhost:4000";
const BASE_URL = "";

// export function reqLogin(username, password) {
//     return ajax("/login", {username, password}, "POST")
// }
export const reqLogin = (username, password) => ajax(BASE_URL + "/login", {username, password}, "POST");

export const reqRegister = ({username, password, type}) => ajax(BASE_URL + "/register", {username, password, type}, "POST");

export const reqUpdateUser = (user) => ajax(BASE_URL + "/update", user, "POST");

export const reqUser = () => ajax(BASE_URL + "/user");

export const reqUserList = (type) => ajax("/userlist", {type});

export const reqChatMsgList = () => ajax("/msglist");

export const reqReadChatMsg = (from) => ajax("/readmsg", {from}, "POST");