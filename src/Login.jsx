import React, { Component } from 'react'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
    }
    componentDidMount() {
        console.log('Login mounted')
    }
    nameChangeHandler = event => {
        this.setState({ username: event.target.value })
    }
    pwdChangeHandler = event => {
        this.setState({ password: event.target.value })
    }
    submitHandler = async (event) => {
        event.preventDefault()
        console.log('submitted')
        let data = new FormData()
        data.append("username", this.state.username)
        data.append("password", this.state.password)
        let response = await fetch("login", { method: "POST", body: data })
        let responseBody = await response.text()
        let parsed = await JSON.parse(responseBody)
        console.log(parsed)
        this.setState({
            username: "",
            password: ""
        })
    }
    render = () => {
        return (<div>
            <h2>Login</h2>
            <form onSubmit={this.submitHandler}>
                <input type="text" onChange={this.nameChangeHandler} value={this.state.username} placeholder="Username..." />
                <input type="text" onChange={this.pwdChangeHandler} value={this.state.password} placeholder="Password..." />
                <input className="button" type="submit" value="Login!" />
            </form>
        </div>)
    }
}

export default Login