import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from './actions/index'
import { bindActionCreators } from 'redux'
import OffScreen from './OffScreen'
import SocialLinks from './SocialLinks.js'
import Header from './Header'
import Routes from './Routes'
import MainPlayer from './MainPlayer'

class AppChild extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shrinkHeader: false
        }

        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        const shrinkHeader = window.scrollY > 70
        this.setState({ shrinkHeader })
    }

    render() {
        return (
            <div>
                <OffScreen {...this.props} />
                <Header shrinkHeader={this.state.shrinkHeader} />
                <SocialLinks />
                <Routes />
                <MainPlayer {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const currentlyPlayingSong = state.posts.find(post => post.id === state.queue.currentlyPlayingSong) || state.posts[0]
    return Object.assign(state, ownProps, { currentlyPlayingSong })
}

const mapDispatch = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatch)(AppChild)
