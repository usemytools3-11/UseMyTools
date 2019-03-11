import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';

const Routes = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={() => <HomePage />}/>
                <Route path="/login" exact render={() => <LoginPage />}/>
            </Switch>
        </BrowserRouter>
    );
}
export default connect()(Routes);