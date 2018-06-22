/*
应用主界面路由组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import {HashRouter, Switch, Route} from 'react-router-dom'


class Main extends Component {
    render() {
        return (
            <div>Main</div>
        )
    }
}
export default connect()(Main)