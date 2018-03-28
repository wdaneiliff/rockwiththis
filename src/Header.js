import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleSidebar } from './actions/index'
import './Header.css'

class Header extends Component {
  constructor(props) {
    super(props)

    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  toggleSidebar() {
    this.props.toggleSidebar(!this.props.sidebarExpanded)
  }

  render() {
    // old filter button code
    // const filterButton = this.props.sidebarExpanded ? (
    //   <button onClick={this.toggleSidebar} className="filterButton">
    //     <img src="http://rockwiththis.info/wp-content/uploads/2018/02/close.png" />
    //   </button>
    // ) : (
    //   <button onClick={this.toggleSidebar} className="filterButton">
    //     <img src="http://rockwiththis.info/wp-content/uploads/2018/01/filters-button.png" />
    //   </button>
    // )

    const filterButton = (
      <button onClick={this.toggleSidebar} className='filterButton'>
        <img src={this.props.sidebarExpanded ? 'http://rockwiththis.info/wp-content/uploads/2018/02/close.png' : 'http://rockwiththis.info/wp-content/uploads/2018/01/filters-button.png'} />
      </button>
    )

    return (
        <div className="headerContainer">
          {filterButton}
          <Link id="headerLogo" to="/"><img src="http://rockwiththis.info/wp-content/uploads/2018/03/logo-hi-res.png" /></Link>
        </div>
      )
    }
}

const mapStateToProps = (state, ownProps) => Object.assign(state, ownProps)

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleSidebar: (expanded) => dispatch(toggleSidebar(expanded))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
