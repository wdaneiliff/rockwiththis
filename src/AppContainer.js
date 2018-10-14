import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as Actions from 'actions/index'
import { bindActionCreators } from 'redux'
import OffScreen from './components/OffScreenPlayer/OffScreen'
import SocialLinks from './components/SocialLinks/SocialLinks.js'
import Header from './components/Header/Header.js'
import MainPlayer from './components/FooterPlayer/MainPlayer'
import { Element } from 'react-scroll'


class AppContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shrinkHeader: false
        }

        this.handleScroll = this.handleScroll.bind(this)
    }

    componentWillMount() {
      this.props.actions.fetchFilters()
      // this.props.actions.fetchFeaturedPosts()
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
                <Header {...this.props} shrinkHeader={this.state.shrinkHeader} />
                <SocialLinks />
                {React.cloneElement(this.props.children, { ...this.props })}
                <MainPlayer {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => Object.assign(state, ownProps)

const mapDispatch = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(AppContainer))
