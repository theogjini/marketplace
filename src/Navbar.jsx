import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    constructor(props) {
        super(props)
    }
    render = () => {
        return (<div className="navbar">
            <div className="nav-left">
                <img className="logo" src="uploads/logo/guitar.png" height="30px" /><Link to="/" className="button"><h2>Only Guitars</h2></Link></div>
            {!this.props.logged.status && (<div>
                <Link className="button" to="/login">Log in</Link>
                <Link className="button" id="signup-button" to="/signup">Sign up</Link>
            </div>)}
            {this.props.logged.status && (<div>Logged as :<Link to="/profile" id="signup-button" className="button">{this.props.logged.username}</Link></div>)}
        </div >)
    }
}

const mapStateToProps = state => {
    return { logged: state.logged }
}

export default connect(mapStateToProps)(Navbar)