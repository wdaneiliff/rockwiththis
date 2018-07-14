import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Homepage from './Homepage'
import ConnectPage from './ConnectPage'
import SingleSongPage from './SingleSongPage'

const Routes = (props) => {
    return (
            <Switch>
                <Route exact path='/' component={Homepage} />
                <Route exact path='/connect' component={ConnectPage} />
                <Route path='/songs/:id' component={SingleSongPage} />
            </Switch>
    )
}

export default Routes;
