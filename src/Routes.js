import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Homepage from './Homepage'
import SongDetailPage from './SongDetailPage'

class Routes extends Component {

render() {

return (
      <main>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route  path='/song' component={SongDetailPage}/>
        </Switch>
      </main>

    )
  }
}
export default Routes;
