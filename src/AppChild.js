import React, { Component } from 'react'
import OffScreen from './OffScreen'
import Header from './Header'
import Routes from './Routes'
import MainPlayer from './MainPlayer'

class AppChild extends Component {
    render() {
        return (
            <div>
                <OffScreen />
                <Header />
                <Routes />
                <MainPlayer />
            </div>
        )
    }
}

export default AppChild
