
import React, {Component} from 'react'
import logo from "./imgs/logo.png"
import "./logo.less"

export default class Login extends Component {
    render () {
        return (
            <div className="logo-container">
                <img src={logo} alt="logo" className="logo"/>
            </div>
        )
    }
}