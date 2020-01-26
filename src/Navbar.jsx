import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Cart from './Cart.jsx'
class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayedCart: false
        }
    }
    async componentDidMount() {
    }
    displayCart = event => {
        event.preventDefault()
        this.setState({ displayedCart: !this.state.displayedCart })
    }
    render = () => {
        return (<div className="navbar">
            <div className="nav-left">
                <img className="logo" src="uploads/logo/guitar.png" height="30px" /><Link to="/" className="button"><h2>Guithub</h2></Link></div>
            {!this.props.logged.status && (<div>
                <Link className="button" to="/login">Log in</Link>
                <Link className="button" id="signup-button" to="/signup">Sign up</Link>
            </div>)}
            {this.props.logged.status && (
                <div className="flex" >
                    {this.state.displayedCart && (<Cart />)}
                    <div className="cart-ico button" onClick={this.displayCart}>
                        <img src="uploads/logo/cart.png" height="25px" />
                        {this.props.cart.length > 0 && (<div className="cart-number">{this.props.cart.length}</div>)}
                    </div>
                    <Link to="/profile" id="signup-button" className="button">{this.props.logged.username}</Link>
                </div>)
            }
        </div >)
    }
}

const mapStateToProps = state => {
    return {
        logged: state.logged,
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Navbar)