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

    componentDidMount() {
        this.props.fetchPosts()
        this.props.fetchFeaturedPosts()
        this.props.fetchFilters()
    }

    render() {
        return (
          <div>
             <div className="homeContainer">
                    <SongsContainer discoverLayout={this.props.discoverLayout} />
                    {/*<SidebarRight />*/}
                 </div>
           </div>
        )
    }
}

Homepage.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    fetchFeaturedPosts: PropTypes.func.isRequired,
    fetchFilters: PropTypes.func.isRequired,
}


const mapStateToProps = (state, ownProps) => Object.assign(state, ownProps)

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchPosts: () => dispatch(fetchPosts()),
    fetchFeaturedPosts: () => dispatch(fetchFeaturedPosts()),
    fetchFilters: () => dispatch(fetchFilters()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Homepage)
