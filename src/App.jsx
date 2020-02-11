import React, { Component } from 'react'
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
import Navbar from "./Navbar.jsx"
import Home from "./Home.jsx"
import Shop from "./Shop.jsx"
import Item from "./Item.jsx"
import AddItem from "./AddItem.jsx"
import Profile from "./Profile.jsx"
import Checkout from "./Checkout.jsx"
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import EditItem from './EditItem.jsx'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: true }
    }
    async componentDidMount() {
        console.log('appMounted')
        let data = await fetch('/session')
        let response = await data.text()
        console.log('user', response)
        let parsed = JSON.parse(response)
        if (parsed.success) {
            this.props.dispatch({
                type: 'LOGIN_SUCCESS',
                username: parsed.username
            })
        }
        let loadItems = await fetch('/get-items')
        let itemsGot = await loadItems.text()
        let parsedItems = JSON.parse(itemsGot)
        if (parsedItems.success) {
            console.log('items successfully loaded', parsedItems.items)
            this.props.dispatch({ type: "LOAD_ITEMS_DB", items: parsedItems.items })
        }
        this.setState({ loading: false })
    }
    render = () => {
        return (
            <BrowserRouter>
                <div>
                    <Navbar />
                    {this.state.loading === false && (
                        <div className="content">
                            {this.state.loading && (<h1>Loading...</h1>)}
                            <Route exact={true} path='/' render={routerData => <Home history={routerData.history} />} />
                            <Route exact={true} path='/login' render={routerData => <Login history={routerData.history} />} />
                            <Route exact={true} path='/signup' render={routerData => <Signup history={routerData.history} />} />
                            <Route exact={true} path='/shop' render={routerData => <Shop history={routerData.history} />} />
                            <Route exact={true} path='/profile' render={routerData => <Profile history={routerData.history} />} />
                            <Route exact={true} path='/add-item' render={routerData => <AddItem history={routerData.history} />} />
                            <Route exact={true} path='/item/:itemId' render={routerData =>
                                <Item
                                    itemId={routerData.match.params.itemId}
                                    history={routerData.history} />} />
                            <Route exact={true} path='/item/:itemId/edit' render={routerData =>
                                <EditItem
                                    itemId={routerData.match.params.itemId}
                                    history={routerData.history} />} />
                            <Route exact={true} path='/cart' render={routerData => <Cart history={routerData.history} />} />
                            <Route exact={true} path='/checkout' render={routerData => <Checkout history={routerData.history} />} />
                        </div>)}
                </div>
            </BrowserRouter>
        )
    }
}

export default connect()(App)
