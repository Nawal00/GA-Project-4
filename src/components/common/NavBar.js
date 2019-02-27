import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../../lib/Auth'

class Navbar extends React.Component {

  constructor() {
    super()

    this.state = {
      navbarOpen: false,
      clickedIcon: false
    }

    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname){
      this.setState({ navbarOpen: false })
    }
  }

  render() {

    return (
      <nav className= {this.props.location.pathname === '/' ? 'navbar is-dark home' : 'navbar is-info'}>
        <div className="container">
          <div className="navbar-brand">
            <Link
              className="navbar-item"
              onClick={this.toggleIcon} to="/"
            >
              <strong className="has-text-white is-size-4">
              Bee Social
              </strong>
            </Link>
            <a
              className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-item has-dropdown is-hoverable navbar-start">
              <a
                className="navbar-link has-text-white">
                Discover
              </a>
              <div className="navbar-dropdown">
                <Link to="/events" className="navbar-item has-text-black">
                 The Events
                </Link>
                <hr className="navbar-divider" />
                <Link to="/clubs" className="navbar-item has-text-black">
                 Clubs
                </Link>
              </div>
            </div>
          </div>
          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {Auth.isAuthenticated() &&
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link has-text-white">
                   Create
                  </a>
                  <div className="navbar-dropdown">
                    <Link to="/events/new" className="navbar-item has-text-black">
                     Browse events
                    </Link>
                    <hr className="navbar-divider" />
                    <Link to="/clubs/new" className="navbar-item has-text-black">
                     Browse clubs
                    </Link>
                  </div>
                </div>}
              {Auth.isAuthenticated() &&<Link to={`/user/${Auth.getUserId()}`} className="navbar-item has-text-black">
              Your events
              </Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item has-text-black" to="/register">Sign Up</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item has-text-black" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <a className="navbar-item has-text-black" onClick={this.logout}>Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)