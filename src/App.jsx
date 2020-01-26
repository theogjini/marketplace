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
    constructor(props) {
        super(props)
        this.state = { loading: true }
    }
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
        let loadItems = await fetch('get-items')
        let itemsGot = await loadItems.text()
        let parsedItems = JSON.parse(itemsGot)
        if (parsedItems.success) {
            console.log('items successfully loaded', parsedItems.items)
            this.props.dispatch({ type: "LOAD_ITEMS_DB", items: parsedItems.items })
        }
        this.setState({ loading: false })
    }
    renderItem = routerData => {
        let itemId = routerData.match.params.itemId
        return <Item
            history={routerData.history}
            itemId={itemId}
        />
    }
    render = () => {
        return (
            <BrowserRouter>
                <div>
                    <Navbar />
                    {this.state.loading === false && (
                        <div className="content">
                            {this.state.loading && (<h1>Loading...</h1>)}
                            <Route exact={true} path='/' render={routerData => { return <Home history={routerData.history} /> }} />
                            <Route exact={true} path='/login' render={routerData => { return <Login history={routerData.history} /> }} />
                            <Route exact={true} path='/signup' render={routerData => { return <Signup history={routerData.history} /> }} />
                            <Route exact={true} path='/shop' render={routerData => { return <Shop history={routerData.history} /> }} />
                            <Route exact={true} path='/profile' render={routerData => { return <Profile history={routerData.history} /> }} />
                            <Route exact={true} path='/add-item' render={routerData => { return <AddItem history={routerData.history} /> }} />
                            <Route exact={true} path='/item/:itemId' render={this.renderItem} />
                            <Route exact={true} path='/cart' render={routerData => { return <Cart history={routerData.history} /> }} />
                        </div>)}
                </div>
            </BrowserRouter>
        )
    }
}

export default connect()(App)
