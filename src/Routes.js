import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Homepage from './Homepage'
import SingleSongPage from './SingleSongPage'

const Routes = (props) => {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Homepage} />
                <Route path='/songs/:id' component={SingleSongPage} />
            </Switch>
        </main>
    )
}

export default Routes;
