import React, { Component } from 'react'
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"

class Content extends Component {
    render = () => {
        return (<div className="content">
            <Signup />
            <Login />
        </div>)
    }
}

export default Content