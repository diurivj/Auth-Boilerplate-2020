import React, { Component } from 'react'
import AUTH_SERVICE from './service'
import handleAsync from './utils'

import './App.css'

class App extends Component {
  state = {
    signup: {
      name: '',
      email: '',
      password: '',
    },
    login: {
      email: '',
      password: '',
    },
    msg: null,
    loading: false,
    loggedUser: null,
  }

  async componentDidMount() {
    if (this.props.location.search === '?status=success') {
      const response = await handleAsync(AUTH_SERVICE.CURRENT_USER)
      this.setState({ loggedUser: response.user })
    }
  }

  handleSignup = e => {
    const { signup } = this.state
    signup[e.target.name] = e.target.value
    this.setState({ signup })
  }

  handleLogin = e => {
    const { login } = this.state
    login[e.target.name] = e.target.value
    this.setState({ login })
  }

  submitSignup = async e => {
    e.preventDefault()
    const { signup } = this.state
    this.setState({ loading: true })
    const response = await handleAsync(() => AUTH_SERVICE.SIGNUP(signup))
    console.log(response)
    if (response.err) {
      this.setState({ msg: response.err.message })
    } else {
      this.setState({ msg: response.msg })
    }
    this.setState({ loading: false })
    this.setState({ signup: { name: '', email: '', password: '' } })
  }

  submitLogin = async e => {
    e.preventDefault()
    const { login } = this.state
    this.setState({ loading: true })
    const response = await handleAsync(() => AUTH_SERVICE.LOGIN(login))
    console.log(response)
    if (response.err) {
      this.setState({ msg: response.err.message })
    } else {
      this.setState({ loggedUser: response.user, msg: 'User logged' })
    }
    this.setState({ loading: false })
    this.setState({ login: { email: '', password: '' } })
  }

  render() {
    const { signup, login, loggedUser } = this.state

    return (
      <div className="App">
        <h1>Auth boilerplate</h1>
        {!this.state.loading && <p>{this.state.msg}</p>}
        {this.state.loading && <p>Loading...</p>}
        <section>
          <h2>Signup</h2>
          <form onSubmit={this.submitSignup}>
            <input
              onChange={this.handleSignup}
              type="text"
              name="name"
              placeholder="Name"
              value={signup.name}
            />
            <input
              onChange={this.handleSignup}
              type="email"
              name="email"
              placeholder="Email"
              value={signup.email}
            />
            <input
              onChange={this.handleSignup}
              type="password"
              name="password"
              placeholder="Password"
              value={signup.password}
            />
            <input type="submit" value="Register" />
          </form>
        </section>
        <section>
          <h2>Login</h2>
          <form onSubmit={this.submitLogin}>
            <input
              onChange={this.handleLogin}
              type="email"
              name="email"
              placeholder="Email"
              value={login.email}
            />
            <input
              onChange={this.handleLogin}
              type="password"
              name="password"
              placeholder="Password"
              value={login.password}
            />
            <input type="submit" value="Login" />
          </form>
        </section>
        <section>
          <a href="http://localhost:3000/facebook">Login with Facebook</a>
          <a href="http://localhost:3000/google">Login with Google</a>
        </section>
        <section>
          {loggedUser && <h2>Logged User</h2>}
          <p>{loggedUser?.name}</p>
          <p>{loggedUser?.email}</p>
        </section>
      </div>
    )
  }
}

export default App
