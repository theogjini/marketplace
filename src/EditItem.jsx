import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function EditItem(props) {
    const items = useSelector(state => state.items)
    const currItem = items.find(item => item._id === props.itemId)
    const [title, setTitle] = useState(currItem.title)
    const [description, setDescription] = useState(currItem.description)
    const [price, setPrice] = useState(currItem.price)
    const [year, setYear] = useState(currItem.year)
    const [brand, setBrand] = useState(currItem.brand)
    const [type, setType] = useState(currItem.type)
    const [files, setFiles] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()

    console.log("currItem", currItem)
    async function submitHandler() {
        event.preventDefault()
        if (title === "" || description === "" || price === "" || year === "" || brand === "" || type === "") { return alert('Please fill every field') }
        console.log("files", files)
        let data = new FormData()
        data.append("itemId", currItem._id)
        data.append("paths", JSON.stringify(currItem.filesPaths))
        data.append("title", title)
        data.append("description", description)
        data.append("price", price)
        data.append("username", currItem.seller)
        if (files != null) {
            for (const file of files)
                data.append("photos", file)
        }
        data.append("year", year)
        data.append("type", type)
        data.append("brand", brand)
        let request = await fetch('/update-item', { method: "POST", body: data })
        let response = await request.json()
        if (response.success) {
            let loadItems = await fetch('/get-items')
            let itemsGot = await loadItems.text()
            let parsedItems = JSON.parse(itemsGot)
            if (parsedItems.success) {
                console.log('items successfully loaded', parsedItems.items)
                dispatch({ type: "LOAD_ITEMS_DB", items: parsedItems.items })
            }
            history.push('/item/' + currItem._id)
        }
    }
    return (<div>
        <h1>Edit</h1>
        <form onSubmit={submitHandler}>
            <div >
                <div className='input-container'><input type="text" onChange={event => setTitle(event.target.value)} value={title} placeholder="Title..." /></div>
                <div className='input-container'><textarea id="description" onChange={event => setDescription(event.target.value)} value={description} placeholder="Description..."></textarea></div>
                <div className='input-container'><input type="text" onChange={event => setPrice(event.target.value)} value={price} placeholder="Price..." /></div>
                <div className='input-container'><input type="text" onChange={event => setYear(event.target.value)} value={year} placeholder="Year..." /></div>
                <div className='input-container'><input type="text" onChange={event => setBrand(event.target.value)} value={brand} placeholder="Brand..." /></div>
                <div className='input-container'><input type="text" onChange={event => setType(event.target.value)} value={type} placeholder="Type..." /></div>
                <div className='input-container'><input id="file-input" type="file" onChange={event => setFiles(event.target.files)} multiple /></div>
            </div>
            <div className='center'><button className="button">Save!</button></div>
        </form>
    </div>)
}