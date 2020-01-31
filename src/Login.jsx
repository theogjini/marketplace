import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props)
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
        if (this.state.username === "" || this.state.password === "") {
            return alert("Please fill every fields")
        }
        let data = new FormData()
        data.append("username", this.state.username)
        data.append("password", this.state.password)
        let response = await fetch("login", { method: "POST", body: data })
        let responseBody = await response.text()
        let parsed = await JSON.parse(responseBody)
        console.log(parsed)
        if (!parsed.success) { alert(parsed.desc) }
        this.setState({
            username: "",
            password: ""
        })
        if (parsed.success) {
            this.props.dispatch({
                type: "LOGIN_SUCCESS",
                username: parsed.username
            })
            this.props.history.push('/shop')
        }
    }
    render = () => {
        return (
            <div className='center'>
                <h1>Login</h1>
                <form onSubmit={this.submitHandler}>
                    <div >
                        <div className='input-container'><input type="text" onChange={this.nameChangeHandler} value={this.state.username} placeholder="Username..." /></div>
                        <div className='input-container'><input type="text" onChange={this.pwdChangeHandler} value={this.state.password} placeholder="Password..." /></div>
                    </div>
                    <button className="button">Login!</button>
                </form>
                <div>
                    First time coming? <Link className="margin button" to='/signup'>Sign up!</Link>
                </div>
            </div>)
    }
}

export default connect()(Login)