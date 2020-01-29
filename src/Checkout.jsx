import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function Checkout(props) {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [creditCard, setCreditCard] = useState("")
    const [creditCardExpiry, setCreditCardExpiry] = useState("")
    const [CCV, setCCV] = useState("")
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
        let data = new FormData()
        data.append("name", name)
        data.append("adress", address)
        data.append("city", city)
        data.append("country", country)
        data.append("creditCard", creditCard)
        data.append("creditCardExpiry", creditCardExpiry)
        data.append("CCV", CCV)
        data.append("cart", JSON.stringify(cart))
        let request = await fetch('buy-item', { method: "POST", body: data })
        let response = await request.json()
        if (response.success) {
            alert("well bought dude")
            dispatch({ type: "EMPTY_CART" })
            history.push('/')
            let loadItems = await fetch('get-items')
            let itemsGot = await loadItems.text()
            let parsedItems = JSON.parse(itemsGot)
            if (parsedItems.success) {
                console.log('items successfully loaded', parsedItems.items)
                dispatch({ type: "LOAD_ITEMS_DB", items: parsedItems.items })
            }
        }
    }
    return (<div>
        <h1>Checkout here</h1>
        <form onSubmit={onSubmitHandler}>
            <h4>Shipping address</h4>
            <div className='input-container'><input type="text" onChange={event => setName(event.target.value)} value={name} placeholder="Name..." /></div>
            <div className='input-container'><input type="text" onChange={event => setAddress(event.target.value)} value={address} placeholder="Address..." /></div>
            <div className='input-container'><input type="text" onChange={event => setCity(event.target.value)} value={city} placeholder="City and postal code..." /></div>
            <div className='input-container'><input type="text" onChange={event => setCountry(event.target.value)} value={country} placeholder="Country..." /></div>
            <h4>Credit card informations</h4>
            <div className='input-container'><input type="credit card" onChange={event => setCreditCard(event.target.value)} value={creditCard} placeholder="Credit card number..." /></div>
            <div className='input-container'><input type="CCV" onChange={event => setCCV(event.target.value)} value={CCV} placeholder="CCV..." /></div>
            <div className='input-container'><input type="month" onChange={event => setCreditCardExpiry(event.target.value)} value={creditCardExpiry} /></div>
            <div className="center"><button className="button" type="submit">Proceed!</button></div>
        </form>
    </div >
    )
}