import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }
    handleLogout = async event => {
        event.preventDefault()
        let data = await fetch('logout', { method: "POST" })
        let body = await data.text()
        let parsed = JSON.parse(body)
        if (parsed.success) {
            this.props.dispatch({ type: "LOGOUT" })
        }
        this.props.history.push('/')
    }
    render = () => {
        return (<div className="center">
            <h1>Profile here...</h1>
            <Link to="/add-item" className="button">Sell a guitar</Link>
            <span className="button" onClick={this.handleLogout}>Logout</span>
        </div>)
    }
}

export default connect()(Profile)