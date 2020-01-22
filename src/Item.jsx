import React, { Component } from 'react'

class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }
    render = () => {
        return (<h1>Item here...</h1>)
    }
}

export default Item