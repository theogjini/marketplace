import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'


export default function Profile(props) {
    const [userData, setData] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchUserData() {
            const request = await fetch('/get-user-data')
            const response = await request.json()
            console.log(" dis quelque chose bordel de mderd ")
            setData(response)
        }
        fetchUserData()
        console.log('userDatas', userData)
    }, [])
    const handleLogout = async event => {
        event.preventDefault()
        let data = await fetch('logout', { method: "POST" })
        let body = await data.text()
        let parsed = JSON.parse(body)
        if (parsed.success) {
            dispatch({ type: "LOGOUT" })
            history.push('/')
        }
    }
    return (<div className="center">
        <h1>Profile here...</h1>
        <Link to="/add-item" className="button">Sell a guitar</Link>
        <Link to="/shop" className="button">Go to shop</Link>
        <div className="button" onClick={event => handleLogout(event)}>Logout</div>

    </div>)
}
