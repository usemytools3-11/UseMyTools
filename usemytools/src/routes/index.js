import React from 'react';
import {Router, Switch, Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ToolsPage from '../pages/ToolsPage';
import ProfilePage from '../pages/ProfilePage';
import RegistrationPage from '../pages/RegistrationPage';
import RouteAuthNeeded from '../hoc/RouteAuthNeeded';
import RouteAuthNotNeeded from '../hoc/RouteAuthNotNeeded';

import { logoutUser } from '../actions';

const Routes = (props) => {
    return (
        <>
        <Router history={props.history}>
            <div>
            {!props.authenticated &&
            <><Link to="/">HOME</Link>
            <Link to="/login">LOGIN</Link>
            <Link to="/register">REGISTER</Link>
            </>}
            {props.authenticated &&
            <><Link to="/tools">TOOLS</Link>
            <Link to="/profile">PROFILE</Link>
            <button onClick={props.logoutUser}>LOGOUT</button></>}
            <Switch>
                <Route path="/" exact component={RouteAuthNotNeeded(HomePage)}/>
                <Route path="/login" exact component={RouteAuthNotNeeded(LoginPage)}/>
                <Route path="/register" exact component={RouteAuthNotNeeded(RegistrationPage)}/>
                <Route path="/tools" exact component={RouteAuthNeeded(ToolsPage)}/>
                <Route path="/profile" exact component={RouteAuthNeeded(ProfilePage)}/>
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