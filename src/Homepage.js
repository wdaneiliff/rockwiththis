import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './Homepage.css'
import SongsContainer from './SongsContainer.js'
import Sidebar from './Sidebar.js'
import { fetchPosts } from './actions/index'

class Homepage extends Component {
    componentDidMount() {
        this.props.fetchPosts()
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
}

Homepage.defaultProps = {

}

const mapStateToProps = (state, ownProps) => {
    const {
        posts,
    } = state

    return {
        posts,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchPosts: () => dispatch(fetchPosts()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Homepage)
