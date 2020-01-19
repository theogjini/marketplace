import React, { Component } from 'react'
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
import Navbar from "./Navbar.jsx"
import Home from "./Home.jsx"
import { Route, BrowserRouter, Link } from 'react-router-dom'

class App extends Component {
    renderLogin = routerData => {
        return <Login />
    }
    renderSignup = routerData => {
        return <Signup />
    }
    renderHome = routerData => {
        return <Home />
    }
    render = () => {
        return (
            <BrowserRouter>
                <div>
                    <Navbar />
                    <Route exact={true} path='/' render={this.renderHome} />
                    <Route exact={true} path='/login' render={this.renderLogin} />
                    <Route exact={true} path='/signup' render={this.renderSignup} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App
