import React from 'react';
import {Router, Switch, Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ToolsPage from '../pages/ToolsPage';
import RegistrationPage from '../pages/RegistrationPage';

import { logoutUser } from '../actions';

const Routes = (props) => {
    return (
        <>
        <Router history={props.history}>
            <div>
            <Link to="/">HOME</Link>
            {!props.authenticated &&
            <><Link to="/login">LOGIN</Link>
            <Link to="/register">REGISTER</Link>
            </>}
            {props.authenticated && <Link to="/tools">TOOLS</Link>}
            {props.authenticated && <button onClick={props.logoutUser}>LOGOUT</button>}
            <Switch>
                <Route path="/" exact render={(props) => <HomePage />}/>
                <Route path="/login" exact render={(props) => <LoginPage />}/>
                <Route path="/register" exact render={(props) => <RegistrationPage />}/>
                <Route path="/tools" exact render={(props) => <ToolsPage />}/>
            </Switch>
            </div>
        </Router>
        </>
    );
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    }
}

const mapDispatchToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);