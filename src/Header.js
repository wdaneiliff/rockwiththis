import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleSidebar } from './actions/index'

class Header extends Component {
    constructor(props) {
        super(props)

        this.toggleSidebar = this.toggleSidebar.bind(this)
    }

    toggleSidebar() {
        this.props.toggleSidebar(!this.props.sidebarExpanded)
    }

    render() {
        const filterButton = (
            <button onClick={this.toggleSidebar} className='filterButton'>
                <img src={this.props.sidebarExpanded ? 'http://rockwiththis.com/wp-content/uploads/2018/02/close.png' : 'http://rockwiththis.com/wp-content/uploads/2018/03/filter-list-icon.png'} />
            </button>
        )

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

const mapStateToProps = (state, ownProps) => Object.assign(state, ownProps)

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleSidebar: (expanded) => dispatch(toggleSidebar(expanded))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
