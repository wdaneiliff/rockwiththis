import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './Homepage.css'
import SongsContainer from './SongsContainer.js'
import Sidebar from './Sidebar.js'
import { fetchPosts } from './actions/index'
import { fetchFeaturedPosts } from './actions/featuredPosts'


class Homepage extends Component {
    componentDidMount() {
        this.props.fetchPosts()
        this.props.fetchFeaturedPosts()
    }

    render() {
        return (
            <div className="homeContainer">
                <SongsContainer />
                <Sidebar />
            </div>
        )
    }
}

Homepage.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    fetchFeaturedPosts: PropTypes.func.isRequired,
}

Homepage.defaultProps = {

}

const mapStateToProps = (state, ownProps) => {
    const {
        posts,
        featuredPosts,
    } = state

    return {
        posts,
        featuredPosts,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchPosts: () => dispatch(fetchPosts()),
    fetchFeaturedPosts: () => dispatch(fetchFeaturedPosts()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Homepage)
