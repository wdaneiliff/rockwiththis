import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Sidebar.css'
import SubscribeFrom from 'react-mailchimp-subscribe'

class Sidebar extends Component {

render() {
  const formProps = {
  action: 'https://rockwiththis.us17.list-manage.com/subscribe/post?u=bfac2b1c3906a8dba6db52ab1&amp;id=ddc17b51d2" method="post" id="mc-embedded-subscribe-form',
  messages: {
    inputPlaceholder: "",
    btnLabel: "Subscribe",
    sending: "Sending",
    success: "Thanks!",
    error: "Woops... something went wrong."
  },
  styles: {
    sending: {
      fontSize: 18,
      color: "auto"
    },
    success: {
      fontSize: 18,
      color: "green"
    },
    error: {
      fontSize: 18,
      color: "red"
    }
  }
}

return (
      <div className="sidebar">
        <div className="topTrackContainer">
          <h3>Top Tracks</h3>
          <p>Dive a bit deeper. Explore top tracks we've featured in the past.</p>

        </div>
        <div className="newsletterContainer">
          <h3>Heads up</h3>
          <p>Expand your mind with new music and concert updates around the area.</p>
          <p className="emailAddress">Email Address</p>
          <SubscribeFrom {...formProps}/>
        </div>
      </div>
    )
  }
}
export default Sidebar;
