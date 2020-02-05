//une page avec les derniers ajouts de produits possibilité de naviguer librement sans login. Si on veut ajouter un element au panier il faut log.
import React, { Component } from 'react'

class Home extends Component {
    render = () => {
        return (<div>
            <h1 id='pick' style={{ cursor: "pointer", position: 'relative', zIndex: 1000, top: '130px' }}>
                <img src="/uploads/logo/pick.png" onClick={event => this.props.history.push('/shop')} height="60px"></img>
            </h1>
            <h1 style={{ cursor: "pointer", position: 'relative', zIndex: 1000, top: '150px', fontWeight: 100 }}>Welcome to a world of guitars...</h1>
            <img src="/uploads/logo/background.jpg" height="100%" width="100%"
                style={{ cursor: "pointer", objectFit: 'cover', position: 'absolute', top: '0', left: '0' }}
                onClick={event => this.props.history.push('/shop')}>
            </img>
        </div >)
    }
}

export default Home