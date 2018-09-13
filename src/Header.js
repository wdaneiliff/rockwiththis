import React, { Component } from 'react'
import { Link, NavLink, Nav } from 'react-router-dom'
// import * as Scroll from 'react-scroll'
import {  Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
          thisWeek: true,
        }

        this.scrollToDiscover = this.scrollToDiscover.bind(this)
        this.scrollToTop = this.scrollToTop.bind(this)
        this.checkDiscoverOrThisWeek = this.checkDiscoverOrThisWeek.bind(this)
        this.scrollToDiscover = this.scrollToDiscover.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.checkDiscoverOrThisWeek)
        window.addEventListener('resize', this.checkDiscoverOrThisWeek);
    }


    checkDiscoverOrThisWeek() {
        const scrollHeight = document.getElementById('hero-post').clientHeight + 45
        const thisWeek = window.scrollY < scrollHeight
        this.setState({ thisWeek })
    }

    scrollToDiscover() {

      const scrollHeight = document.getElementById('hero-post').clientHeight + 45

        scroll.scrollTo(scrollHeight)

    }

    scrollToTop() {
      this.setState({ thisWeek: true })

        scroll.scrollTo(0)
  }

    render() {

        return (
            <div className={`headerContainer shrunk `}>
              <div className="content-wrapper">

                  {   location.pathname == "/" ?
                  <div className="nav-left">
                    <Link className={`nav-link ${!this.state.thisWeek ? 'active' : ''}`} onClick={this.scrollToDiscover} to="/" >Discover</Link>
                    <Link className={`nav-link ${this.state.thisWeek ? 'active' : ''}`} onClick={this.scrollToTop} to="/" >This Week</Link>
                  </div>

                    :
                    <div className="nav-left">
                      <NavLink className="nav-link" to="/" activeClassName='none'>HOME</NavLink>
                    </div>


                  }

              {   location.pathname == "/" ?

              <Link id="headerLogo" onClick={this.scrollToTop}  to="/">
                <img src="http://dashboard.rockwiththis.com/wp-content/uploads/2018/03/logo-hi-res.png" />
              </Link>
                :
                <Link id="headerLogo" to="/">
                  <img src="http://dashboard.rockwiththis.com/wp-content/uploads/2018/03/logo-hi-res.png" />
                </Link>


              }
              {   location.pathname == "/" ?

              <Link id="headerLogoMobile" onClick={this.scrollToTop} to="/">
                <img src="http://www.dashboard.rockwiththis.com/wp-content/uploads/2018/06/RWT-head.png" />
              </Link>
                :
                <Link id="headerLogoMobile" to="/">
                  <img src="http://www.dashboard.rockwiththis.com/wp-content/uploads/2018/06/RWT-head.png" />
                </Link>


              }
              <div className="nav-right">
                <NavLink className="nav-link" to="/submit" activeClassName='is-active' >Submit</NavLink>
                <NavLink className="nav-link" to="/connect" activeClassName='is-active' >About</NavLink>
              </div>
              </div>
            </div>
        )
    }
}

export default Header
