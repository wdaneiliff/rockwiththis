import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Homepage from './Homepage'
import SingleSongPage from './SingleSongPage'

class Routes extends Component {

render() {

return (
      <main>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route  path='/songs/:songId' component={SingleSongPage}/>
        </Switch>
      </main>

    )
  }
}
export default Routes;
