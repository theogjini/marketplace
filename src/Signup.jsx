import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            email: ""
        }
    }
    componentDidMount() {
        console.log('signup mounted')
    }
    nameChangeHandler = event => {
        this.setState({ username: event.target.value })
    }
    pwdChangeHandler = event => {
        this.setState({ password: event.target.value })
    }
    emailChangeHandler = event => {
        this.setState({ email: event.target.value })
    }
    submitHandler = async (event) => {
        event.preventDefault()
        if (this.state.username === "" || this.state.password === "") {
            return alert("Please fill every fields")
        }
        let data = new FormData()
        data.append("username", this.state.username)
        data.append("email", this.state.email)
        data.append("password", this.state.password)
        let response = await fetch("signup", { method: "POST", body: data })
        let responseBody = await response.text()
        let parsed = await JSON.parse(responseBody)
        console.log(parsed)
        alert(parsed.desc)
        this.setState({
            username: "",
            password: "",
            email: ""
        })
    }
    render = () => {
        return (
            <div className='center'>
                <h1>Sign up</h1>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <div className='input-container'><input type="text" onChange={this.nameChangeHandler} value={this.state.username} placeholder="Username..." /></div>
                        <div className='input-container'><input type="text" onChange={this.emailChangeHandler} value={this.state.email} placeholder="Email..." /></div>
                        <div className='input-container'><input type="text" onChange={this.pwdChangeHandler} value={this.state.password} placeholder="Password..." /></div>
                    </div>
                    <button className="button">Sign up!</button>
                </form>
                <div>
                    Already signed up? <Link className="margin button" to="/login">Log in!</Link>
                </div>
            </div>)
    }
}

export default Signup