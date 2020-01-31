import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'


export default function Profile(props) {
    const logged = useSelector(state => state.logged)
    const allItems = useSelector(state => state.items)
    const userItems = allItems.filter(item => item.seller === logged.username)
    const history = useHistory()
    const dispatch = useDispatch()
    if (!logged.status) {
        history.push('/shop')
    }
    useEffect(() => {
        async function fetchUserData() {
            const request = await fetch('/get-user-data')
            const response = await request.json()
            console.log(" dis quelque chose ???", response)
            dispatch({ type: "GET_USER_DATA", userData: response })
        }
        fetchUserData()
        console.log('userDatas', userData)
    }, [])
    const userData = useSelector(state => state.userData)
    const handleLogout = async event => {
        event.preventDefault()
        let data = await fetch('/logout', { method: "POST" })
        let body = await data.text()
        let parsed = JSON.parse(body)
        if (parsed.success) {
            dispatch({ type: "LOGOUT" })
            history.push('/')
        }
    }
    return (<div>
        <h1 className="center">Profile here...</h1>
        <div>
            <div className="input-container"><Link to="/add-item" className="button">Sell a guitar</Link>
                <Link to="/shop" className="button">Go to shop</Link>
                <button className="button" onClick={event => handleLogout(event)}>Logout</button></div>
        </div >
        {userItems && <div>
            <h2>Your items to sell:</h2>
            {userItems.map((item, idx) => {
                return <div key={idx}>
                    <p>{item.title}</p>
                    <Link to={"/item/" + item._id}><img src={item.filesPaths[0]} className="miniatures" height="75px" /></Link>
                </div>
            })}
        </div>}
        <div style={{ textAlign: 'left' }}>
            <h2>Previously purchased...</h2>
            {userData.purchases && userData.purchases.map((item, idx) => {
                return (<div key={idx}>
                    <p>{item.title}</p>
                    <div><img src={item.filesPaths[0]} className="miniatures" height="75px" /></div>
                </div>)
            })}
        </div>
    </div >)
}
