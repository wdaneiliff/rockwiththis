import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Routes from './Routes'
import AppContainer from './AppContainer'
import { BrowserRouter } from 'react-router-dom'

class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
          <BrowserRouter>
              <AppContainer>
                  <Routes />
              </AppContainer>
          </BrowserRouter>
      </Provider>
    )
  }
}

export default Root
