import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Checkout(props) {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [creditCard, setCreditCard] = useState("")
    const [creditCardExpiry, setCreditCardExpiry] = useState("")
    const [CVC, setCVC] = useState("")
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const history = useHistory()
    const login = useSelector(state => state.logged.status)
    useEffect(() => {
        if (!login)
            history.push('/')
    })

    async function onSubmitHandler(event) {
        event.preventDefault()
        const check = [name, address, city, country, creditCard, creditCardExpiry, CCV].includes("")
        if (check) {
            return alert("Please fill every field!")
        }
        if (cart.length === 0) {
            alert("Your cart is empty, go shopping")
            return history.push('/shop')
        }
        let data = new FormData()
        data.append("name", name)
        data.append("adress", address)
        data.append("city", city)
        data.append("country", country)
        data.append("creditCard", creditCard)
        data.append("creditCardExpiry", creditCardExpiry)
        data.append("CCV", CCV)
        data.append("cart", JSON.stringify(cart))
        let request = await fetch('/buy-item', { method: "POST", body: data })
        let response = await request.json()
        if (response.success) {
            alert("well bought dude")
            dispatch({ type: "EMPTY_CART" })
            history.push('/')
            let loadItems = await fetch('/get-items')
            let itemsGot = await loadItems.text()
            let parsedItems = JSON.parse(itemsGot)
            if (parsedItems.success) {
                console.log('items successfully loaded', parsedItems.items)
                dispatch({ type: "LOAD_ITEMS_DB", items: parsedItems.items })
            }
        }
    }
    const prices = cart.map(item => item.price)
    return (<div>
        {cart.length > 0 && <div>< h1 >{"Your total:" + " "}
            {prices.reduce((total, price) => parseInt(total) + parseInt(price)) + " $"}</h1>
            {cart.map(item => {
                return <img className="mini" src={item.filesPaths[0]}></img>
            })}
        </div>}
        <h1>Checkout here</h1>
        <form onSubmit={onSubmitHandler}>
            <h4>Shipping address</h4>
            <div className='input-container'><input type="text" onChange={event => setName(event.target.value)} value={name} placeholder="Name..." /></div>
            <div className='input-container'><input type="text" onChange={event => setAddress(event.target.value)} value={address} placeholder="Address..." /></div>
            <div className='input-container'><input type="text" onChange={event => setCity(event.target.value)} value={city} placeholder="City and postal code..." /></div>
            <div className='input-container'><input type="text" onChange={event => setCountry(event.target.value)} value={country} placeholder="Country..." /></div>
            <h4>Credit card informations</h4>
            <div className='input-container'><input type="credit card" onChange={event => setCreditCard(event.target.value)} value={creditCard} placeholder="Credit card number..." /></div>
            <div className='input-container'><input type="CVC" onChange={event => setCVC(event.target.value)} value={CVC} placeholder="CVC..." /></div>
            <div className='input-container'><input type="month" onChange={event => setCreditCardExpiry(event.target.value)} value={creditCardExpiry} /></div>
            <div className="center"><button className="button" type="submit">Proceed!</button><Link className="button" to="/shop">Back to shop!</Link></div>
        </form>
    </div >
    )
}