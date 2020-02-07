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
        if (this.props.cart.includes(currItem)) { return alert('It is a unique instrument... Impossible to buy it twice!') }
        this.props.dispatch({ type: "ADD_TO_CART", cart: this.props.cart.concat(currItem) })
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
    miniaturesClick = (event, idx) => {
        event.preventDefault()
        this.setState({ index: idx })
    }
    clickEdit = event => {
        event.preventDefault()
        this.props.history.push('/item/' + this.props.itemId + '/edit')
    }
    render = () => {
        let currItem = this.props.items.find(item => item._id === this.props.itemId)
        let paths = currItem.filesPaths
        let seller = currItem.seller
        return (<div id="item" className="center">
            <h1>{currItem.title}
                {seller === this.props.logged.username
                    && (<span className="mini"><img src="/uploads/logo/pen.png" onClick={this.clickEdit} height="25px" /></span>)}
            </h1>
            <div className="image-div">
                <img className="item-image" src={paths[this.state.index]} onClick={this.changeImage} />
            </div>
            <div>{paths.map((path, idx) => <img className="miniatures" key={idx} src={path} height="50px" onClick={event => this.miniaturesClick(event, idx)} />)}</div>
            <p>{currItem.description}</p>
            <h2 style={{ textAlign: 'left' }}>{currItem.price + " $CAD"}</h2>
            <div className="margin center">
                <Link className="button" to="/shop">Back to shop!</Link>
                {this.props.logged.status
                    ? seller !== this.props.logged.username && (<button className="button" onClick={this.addToCart}>Add to cart</button>)
                    : <Link className="button" to="/login">Login to buy</Link>}
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