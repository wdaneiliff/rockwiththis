import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as Scroll from 'react-scroll'

class Header extends Component {
    constructor(props) {
        super(props)

        this.handleDiscoverClick = this.handleDiscoverClick.bind(this)
    }

    handleDiscoverClick() {
      Scroll.scroller.scrollTo('discoverySectionScroll', {
        duration: 500,
        smooth: true
      })
    }

    render() {
        return (
            <div className={`headerContainer shrunk `}>
              <div className="content-wrapper">
                <a className="nav-link left" onClick={this.handleDiscoverClick}>Discover</a>
                <Link id="headerLogo" to="/">
                  <img src="http://dashboard.rockwiththis.com/wp-content/uploads/2018/03/logo-hi-res.png" />
                </Link>
                <Link id="headerLogoMobile" to="/">
                  <img src="http://www.dashboard.rockwiththis.com/wp-content/uploads/2018/06/RWT-head.png" />
                </Link>
                <a className="nav-link right" href="/connect">Connect</a>
              </div>
            </div>
        )
    }
}

export default Header
