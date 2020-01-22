//une page avec les derniers ajouts de produits possibilité de naviguer librement sans login. Si on veut ajouter un element au panier il faut log.
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
    render = () => {
        return (<div>
            <h1>Home</h1>
            <div ><Link className="button" to="/shop">Go shopping</Link></div>
        </div>)
    }
}

export default Home