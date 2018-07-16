import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Header extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className={`headerContainer ${this.props.shrinkHeader ? 'shrunk' : ''}`}>
                <a className="nav-link" href="#discover">Discover</a>
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
