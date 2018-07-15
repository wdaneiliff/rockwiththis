import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as Actions from './actions/index'
import { bindActionCreators } from 'redux'
import OffScreen from './OffScreen'
import SocialLinks from './SocialLinks.js'
import Header from './Header'
import MainPlayer from './MainPlayer'

class AppContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shrinkHeader: false
        }

        this.handleScroll = this.handleScroll.bind(this)
    }

    componentWillMount() {
      this.props.actions.fetchPosts()
      this.props.actions.fetchFeaturedPosts()
      this.props.actions.fetchFilters()
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
