import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Homepage from './Homepage'

class Routes extends Component {

render() {

return (
      <main>
        <Switch>
          <Route exact path='/' component={Homepage}/>
        </Switch>
      </main>

    )
  }
}
export default Routes;
