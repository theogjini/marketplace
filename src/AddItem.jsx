import React, { Component } from 'react'
import { connect } from 'react-redux'

class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            price: "",
            files: null
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
    filesChangeHandler = event => {
        this.setState({ ...this.state, files: event.target.files })
    }
    submitHandler = async event => {
        event.preventDefault()
        if (this.state.title === "", this.state.description === "", this.state.price === "") { return }
        console.log(this.state.files)
        let data = new FormData()
        data.append("title", this.state.title)
        data.append("description", this.state.description)
        data.append("price", this.state.price)
        for (const file of this.state.files)
            data.append("photos", file)
        data.append("username", this.props.username)
        let request = await fetch('add-item', { method: "POST", body: data })
        let response = await request.json()
        if (response.success) {
            alert("Your guitar has been put on sale! Oh my god... so sad...")
            this.setState({
                title: "",
                description: "",
                price: "",
                files: null
            })
        }
    }
    render = () => {
        return (<div>
            <h1>Sell a guitar</h1>
            <form onSubmit={this.submitHandler}>
                <div >
                    <div className='input-container'><input type="text" onChange={this.titleHandler} value={this.state.title} placeholder="Title..." /></div>
                    <div className='input-container'><textarea id="description" onChange={this.descChangeHandler} value={this.state.description} placeholder="Description..."></textarea></div>
                    <div className='input-container'><input type="text" onChange={this.priceChangeHandler} value={this.state.price} placeholder="Price..." /></div>
                    <div className='input-container'><input id="file-input" type="file" onChange={this.filesChangeHandler} multiple /></div>
                </div>
                <div className='center'><button className="button">Add!</button></div>
            </form>
        </div >)
    }
}

const mapStateToProps = state => {
    return { username: state.logged.username }
}

export default connect(mapStateToProps)(AddItem)