import React from 'react';
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import Homepage from './pages/Homepage'
import ConnectPage from './pages/ConnectPage'
import SingleSongPage from './pages/SingleSongPage'
import SubmitSongPage from './pages/SubmitSongPage'

const Routes = (props) => {
    return (
            <Switch>
                <Route exact path='/' render={() => <Homepage {...props} />} />
                <Route exact path='/submit' render={() => <SubmitSongPage {...props} />} />
                <Route exact path='/connect' render={() => <ConnectPage {...props} />} />
                <Route path='/songs/:id' render={(p) => <SingleSongPage {...props} {...p} />} />
            </Switch>
    )
}

export default Routes
