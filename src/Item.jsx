import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
    }
    addToCart = event => {
        event.preventDefault()
        let currItem = this.props.items.find(item => item._id === this.props.itemId)
        this.props.dispatch({ type: "ADD_TO_CART", cart: this.props.cart.concat({ currItem }) })
    }
    changeImage = event => {
        event.preventDefault()
        let index = this.state.index + 1
        const maxIndex = this.props.items.find(item => { return item._id === this.props.itemId }).filesPaths.length
        if (index === maxIndex) {
            return this.setState({ index: 0 })
        }
        this.setState({ index })
    }
    render = () => {
        let currItem = this.props.items.find(item => item._id === this.props.itemId)
        let paths = currItem.filesPaths
        return (<div id="item" className="center card">
            <h1>{currItem.title}</h1>
            <div className="image-div">
                <img className="item-image" src={paths[this.state.index]} onClick={this.changeImage} />
            </div>
            <div>{paths.map((path, idx) => <img className="miniatures" key={idx} src={path} height="50px" />)}</div>
            <div>{currItem.description}</div>
            <div className="margin center">
                <Link className="button" to="/shop">Shop</Link>
                {this.props.logged.status === true && (<button className="button" onClick={this.addToCart}>Add to cart</button>)}
            </div>
        </div >)
    }
}

const mapStateToProps = state => {
    return {
        items: state.items,
        cart: state.cart,
        logged: state.logged
    }
}

export default connect(mapStateToProps)(Item)