import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorText: false, errorMsg: ''}

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      user_id: username,
      pin: password,
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg, showErrorText: true})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameInput = () => {
    const {username} = this.state

    return (
      <>
        <label className="form-label" htmlFor="username">
          User ID
        </label>
        <input
          onChange={this.onChangeUsername}
          className="form-input"
          id="username"
          value={username}
          type="text"
          placeholder="Enter User ID"
        />
      </>
    )
  }

  renderPasswordInput = () => {
    const {password} = this.state

    return (
      <>
        <label className="form-label" htmlFor="password">
          PIN
        </label>
        <input
          onChange={this.onChangePassword}
          id="password"
          className="form-input"
          value={password}
          type="password"
          placeholder="Enter PIN"
        />
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {showErrorText, errorMsg} = this.state
    return (
      <div className="login-main-div">
        <div className="login-inner-div">
          <div className="login-image-div">
            <img
              className="login-website-image"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <div className="login-form-div">
            <h1 className="login-form-welcome-heading">Welcome Back!</h1>
            <form onSubmit={this.onSubmitForm} className="login-form">
              <div className="login-input-div">
                {this.renderUsernameInput()}
              </div>
              <div className="login-input-div">
                {this.renderPasswordInput()}
              </div>
              <button className="login-button" type="submit">
                Login
              </button>
              {showErrorText && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
