import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SongsContainer from './SongsContainer.js'
import SocialLinks from './SocialLinks.js'
import SidebarRight from './SidebarRight.js'
import SidebarFiltersWrapper from './SidebarFiltersWrapper.js'
import { fetchPosts } from './actions/index'
import { fetchFeaturedPosts } from './actions/featuredPosts'
import { fetchFilters } from './actions/filters'

class Homepage extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
          <div>
             <div className="homeContainer">
                    <SongsContainer {...this.props} />
                    {/*<SidebarRight />*/}
                 </div>
           </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => Object.assign(state, ownProps)

export default connect(mapStateToProps)(Homepage)
