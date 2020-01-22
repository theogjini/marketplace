import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            price: "",

        }
    }
    titleHandler = event => {
        this.setState({ ...this.state, title: event.target.value })
    }
    descChangeHandler = event => {
        this.setState({ ...this.state, description: event.target.value })
    }
    priceChangeHandler = event => {
        this.setState({ ...this.state, price: event.target.value })
    }
    render = () => {
        return (<div>
            <h1>Sell a guitar</h1>
            <form onSubmit={this.submitHandler}>
                <div >
                    <div><input type="text" onChange={this.titleHandler} value={this.state.title} placeholder="Title..." /></div>
                    <div><textarea id="description" onChange={this.descChangeHandler} value={this.state.description} placeholder="Description..."></textarea></div>
                    <div><input type="text" onChange={this.priceChangeHandler} value={this.state.price} placeholder="Price..." /></div>
                    <div><input type="file" placeholder="" /></div>
                </div>
                <button className="button">Add!</button>
            </form>
        </div>)
    }
}

export default AddItem