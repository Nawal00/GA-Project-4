import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import EventsEmbedded from '../common/EventsEmbedded'
import moment from 'moment'

import { Link } from 'react-router-dom'

class UserShow extends React.Component {
  constructor(){
    super()

    this.state = {
      user: null,
      currentEventsActive: true,
      manageClubActive: true

    }

    // this.handleFollow = this.handleFollow.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleManageToggle = this.handleManageToggle.bind(this)
  }

  // handleFollow(){
  //   axios.post(`/api/user/${this.props.match.params.id}/follow/${Auth.getUserId()}`)
  //     .then(res => this.setState({ user: res.data }))
  // }

  componentDidMount() {
    this.userRequest()
  }

  userRequest(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
  }

  handleToggle(e) {
    if(e.currentTarget.textContent === 'Future Events' && this.state.currentEventsActive){
      return
    }
    if(e.currentTarget.textContent === 'Past Events' && !this.state.currentEventsActive){
      return
    }
    this.setState({currentEventsActive: !this.state.currentEventsActive})
  }

  handleManageToggle(e) {
    if(e.currentTarget.textContent === 'Events' && this.state.manageClubActive){
      return
    }
    if(e.currentTarget.textContent === 'Clubs' && !this.state.manageClubActive){
      return
    }
    this.setState({manageClubActive: !this.state.manageClubActive})
  }

  render(){
    console.log('user state---', this.state.user)
    if(!this.state.user) return null

    return (

      <div>

        <section className="section has-background-dark user-header">
          <div className="container">
            <div className="columns is-variable is-8">
              <div className="column">
                <figure className="image">
                  <img className="image-cropper profile-pic" src={this.state.user.image ==='' ?  '/assets/images/BeeLogo.png' : this.state.user.image}  alt={this.state.user.username} />
                </figure>
              </div>
              <div className="column is-4">
                <h3 className="title is-3 has-text-info"> {this.state.user.username} </h3>
                <h6 className="title is-6 has-text-info">Member since: {moment(this.state.user.created_at).format('YYYY')} </h6>
              </div>
              <div className="column is-4">
              </div>
            </div>
          </div>
        </section>

        <div>
          <EventsEmbedded
            events={this.state.user.events_attending}
            currentEventsActive={this.state.currentEventsActive}
            handleToggle={this.handleToggle}
          />
        </div>

        <section className="section">
          <div className="container">
            <h4 className="title is-4 has-text-dark">Clubs Following</h4>
            <hr/>
            <div className="columns is-variable is-1 is-multiline">
              {this.state.user.clubs_following.map(follow =>
                <div key={follow.id} className="column is-one-fifth">
                  <Link to={`/clubs/${follow.id}`}>
                    <div className="isImage">
                      <figure className="image is-4by3">
                        <img src={follow.image} alt={follow.name}  className="clubImage"/>
                        <div className="middle">
                          <div className="text">{follow.name}</div>
                        </div>
                      </figure>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h4 className="title is-4">Manage Your Events</h4>
            <hr />
            <div className="tabs is-boxed">
              <ul>
                <li className={this.state.manageClubActive ? 'is-active': ''} onClick={this.handleManageToggle}>
                  <a>
                    <span>Events</span>
                  </a>
                </li>
                <li className={this.state.manageClubActive ? '' : 'is-active'}  onClick={this.handleManageToggle}>
                  <a>
                    <span>Clubs</span>
                  </a>
                </li>

              </ul>
            </div>
            {this.state.manageClubActive &&(
              <div className="columns is-multiline">
                {this.state.user.events_created.map(created =>
                  <div  key={created.id} className="column is-3">
                    <Link  to={`/events/${created.id}`}>
                      <div className="isImage">
                        <figure className="image is-4by3">
                          <img src={created.image} alt={created.name}/>
                          <div className="middle">
                            <div className="text">{created.name}</div>
                            <div className="text">{created.category}</div>
                            <div className="text">{created.date}</div>
                          </div>
                        </figure>
                      </div>
                    </Link>
                  </div>
                )}
                <div className="column is-3 event-btn-div">
                  <Link to={'/events/new'}>
                    <div>
                      <button className="button is-info"> <i className="fas fa-plus-circle"></i>  </button>
                    </div>

                  </Link>
                </div>
              </div>
            )}
            {!this.state.manageClubActive &&(
              <div className="columns is-multiline">
                {this.state.user.clubs_created.map(created =>
                  <div key={created.id} className="column is-3">
                    <Link  to={`/clubs/${created.id}`}>
                      <div className="isImage">
                        <figure className="image is-4by3">
                          <img src={created.image} alt={created.name}/>
                          <div className="middle">
                            <div className="text">{created.name}</div>
                            <div className="text">{created.category}</div>
                            <div className="text">{created.date}</div>
                          </div>
                        </figure>
                      </div>
                    </Link>
                  </div>
                )}
                <div className="column is-3 club-btn-div">
                  <Link to={'/clubs/new'}>
                    <button className="button is-info"><i className="fas fa-plus-circle"></i> </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default UserShow
