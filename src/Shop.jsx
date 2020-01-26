import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Shop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            type: "",
            year: "",
            brand: "",
            displayOption: false
        }
    }
    selectBrand = event => {
        let update = event.target.value
        if (update === "Brand") update = ""
        this.setState({ ...this.state, brand: update })
    }
    selectYear = event => {
        let update = event.target.value
        if (update === "Year") update = ""
        this.setState({ ...this.state, year: update })
    }
    selectType = event => {
        let update = event.target.value
        if (update === "Type") update = ""
        this.setState({ ...this.state, type: update })
    }
    options = () => {
        let brands = [...new Set(this.props.items.map(item => item.brand))]
        let years = [...new Set(this.props.items.map(item => item.year))]
        let types = [...new Set(this.props.items.map(item => item.type))]
        console.log('unique brands', brands)
        return (<div className="center flex option">
            <select className="button" onChange={this.selectBrand}>
                <option defaultValue="">Brand</option>
                {brands.map(brand => <option value={brand}>{brand}</option>)}
            </select>
            <select className="button" onChange={this.selectYear}>
                <option defaultValue="">Year</option>
                {years.map(year => <option value={year}>{year}</option>)}
            </select>
            <select className="button" onChange={this.selectType}>
                <option defaultValue="">Type</option>
                {types.map(type => <option value={type}>{type}</option>)}
            </select>
        </div >)
    }
    onChangeSearch = event => {
        this.setState({
            ...this.state,
            search: event.target.value
        })
    }
    displaySearchOptions = event => {
        event.preventDefault()
        this.setState({
            ...this.state,
            displayOption: !this.state.displayOption,
            type: "",
            year: "",
            brand: "",
        })
    }
    render = () => {
        let allItems = this.props.items.slice()
        let itemsDisplayed = allItems.filter(item => {
            return item.title.toLowerCase().includes(this.state.search.toLowerCase())
        })
        if (this.state.year) { itemsDisplayed = itemsDisplayed.filter(item => item.year === this.state.year) }
        if (this.state.brand) { itemsDisplayed = itemsDisplayed.filter(item => item.brand === this.state.brand) }
        if (this.state.type) { itemsDisplayed = itemsDisplayed.filter(item => item.type === this.state.type) }
        return (<div>
            <div id="search-container">
                <input type="text" onChange={this.onChangeSearch} value={this.state.search} placeholder="Look for..." />
                {!this.state.displayOption
                    ? <span className="plus" onClick={this.displaySearchOptions}>+</span>
                    : <span className="plus" onClick={this.displaySearchOptions}>-</span>}
            </div>
            {this.state.displayOption && (<>{(this.options())}</>)}
            <div className="shop-container">{itemsDisplayed.map((item, idx) => {
                console.log(item.filesPaths[0])
                return (
                    <Link key={idx} to={"item/" + item._id}>
                        <div className="card">
                            <img className="card-img" src={item.filesPaths[0]} />
                            <h2>{item.title}</h2>
                            <h3>{item.price + " $CAD"}</h3>
                        </div>
                    </Link>
                )
            })}</div>
        </div >)
    }
}

const mapStateToProps = state => {
    return {
        items: state.items
    }
}

export default connect(mapStateToProps)(Shop)