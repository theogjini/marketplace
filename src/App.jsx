import React, { Component } from 'react'
import Content from "./Content.jsx"
import Navbar from "./Navbar.jsx"

class App extends Component {
    render = () => {
        return (<div>
            <Navbar />
            <Content />
        </div>
        )
    }
}


export default App
