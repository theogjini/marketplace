import React, { Component } from 'react'
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
import Navbar from "./Navbar.jsx"
import Home from "./Home.jsx"
import Shop from "./Shop.jsx"
import Item from "./Item.jsx"
import AddItem from "./AddItem.jsx"
import Profile from "./Profile.jsx"
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class App extends Component {
    async componentDidMount() {
        console.log('appMounted')
        let data = await fetch('session')
        let response = await data.text()
        let parsed = JSON.parse(response)
        console.log(parsed)
        if (parsed.success) {
            this.props.dispatch({
                type: 'LOGIN_SUCCESS',
                username: parsed.username
            })
        }
    }
    renderLogin = routerData => {
        return <Login history={routerData.history} />
    }
    renderSignup = routerData => {
        return <Signup history={routerData.history} />
    }
    renderHome = routerData => {
        return <Home history={routerData.history} />
    }
    render = () => {
        return (
            <BrowserRouter>
                <div>
                    <Navbar />
                    <div className="content">
                        <Route exact={true} path='/' render={this.renderHome} />
                        <Route exact={true} path='/login' render={this.renderLogin} />
                        <Route exact={true} path='/signup' render={this.renderSignup} />
                        <Route exact={true} path='/shop' render={routerData => { return <Shop history={routerData.history} /> }} />
                        <Route exact={true} path='/profile' render={routerData => { return <Profile history={routerData.history} /> }} />
                        <Route exact={true} path='/add-item' render={routerData => { return <AddItem history={routerData.history} /> }} />
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect()(App)
