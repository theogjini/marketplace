import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    constructor(props) {
        super(props)
    }
    render = () => {
        return (<div className="navbar">
            <Link to="/" className="button"><h1>My Music Shop</h1></Link>
            {!this.props.logged.status && (<Link className="button" to="/login">Log in</Link>)}
            {this.props.logged.status && (<div>Logged in as: {this.props.logged.username}</div>)}
        </div >)
    }
}

const mapStateToProps = state => {
    return { logged: state.logged }
}

export default connect(mapStateToProps)(Navbar)