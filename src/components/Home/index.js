import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Home extends Component {
  state = {}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  render() {
    return (
      <div className="home-div">
        <nav className="home-nav">
          <div className="nav-content">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
              alt="website logo"
            />
            <button
              onClick={this.onClickLogout}
              className="logout-button"
              type="button"
            >
              Logout
            </button>
          </div>
        </nav>
        <div className="home-content">
          <div>
            <h1>Your Flexibility, Our Excellence</h1>
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
              alt="digital card"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
