import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from '../pages/HomePage';

const Routes = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={() => <HomePage />}/>
            </Switch>
        </BrowserRouter>
    );
}
export default connect()(Routes);