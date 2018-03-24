import React, { Component } from 'react'
import Routes from './Routes'
import Header from './Header'
import MainPlayer from './MainPlayer'

class AppChild extends Component {
  render() {
    return (
      <div>
        <Header />
        <Routes />
        <MainPlayer />
      </div>
    )
  }
}

export default AppChild
