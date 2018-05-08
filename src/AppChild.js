import React, { Component } from 'react'
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
                <OffScreen />
                <Header shrinkHeader={this.state.shrinkHeader} />
                <SocialLinks />
                <Routes />
                <MainPlayer />
            </div>
        )
    }
}

export default AppChild
