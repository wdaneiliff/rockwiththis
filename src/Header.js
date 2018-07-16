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
            <div className={`headerContainer ${this.props.shrinkHeader ? 'shrunk' : ''}`}>
                <a className="nav-link" onClick={this.handleDiscoverClick}>Discover</a>
                <Link id="headerLogo" to="/">
                  <img src="http://rockwiththis.com/wp-content/uploads/2018/03/logo-hi-res.png" />
                </Link>
                <Link id="headerLogoMobile" to="/">
                  <img src="http://www.rockwiththis.com/wp-content/uploads/2018/06/RWT-head.png" />
                </Link>
                <a className="nav-link" href="/connect">Connect</a>
            </div>
        )
    }
}

export default Header
