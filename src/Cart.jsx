import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Cart extends Component {
    constructor(props) {
        super(props)
    }
    deleteItem = (event, idx) => {
        event.preventDefault()
        let cartUpdated = this.props.cart.slice()
        cartUpdated.splice(idx, 1)
        this.props.dispatch({ type: "DELETE_ITEM", cart: cartUpdated })
    }
    render = () => {
        if (!this.props.cart.length) {
            return <div className="cart-div">
                <h2>Your cart is empty :(</h2>
            </div>
        }
        let prices = this.props.cart.map(item => item.price)
        console.log('prices: ', prices)
        return (<div className="cart-div">
            <h2>Your Cart:</h2>
            <div>
                {this.props.cart.map((item, idx) => {
                    return (<div key={idx}>
                        <div className="flex center">
                            <button style={{ fontSize: "10px" }} className="button" onClick={() => this.deleteItem(event, idx)}>x</button>
                            <p>{item.title}</p>
                            <Link to={"/item/" + item._id}><img src={item.filesPaths[0]} className="mini" height="75px" /></Link>
                            <h4>{item.price + " $"}</h4>
                        </div>
                    </div>)
                })}
            </div>
            <h4 style={{ marginBottom: "10px" }}>Your total:
            <div>{prices.reduce((total, price) => parseInt(total) + parseInt(price)) + " $"}</div></h4>
            <Link to='/checkout' className="button">Checkout</Link>
        </div>)
    }
}

const mapStateToProps = state => {
    cart: state.cart
}

export default connect()(Cart)