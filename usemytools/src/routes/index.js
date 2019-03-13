import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import NavbarContainer from '../containers/NavbarContainer';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ToolsPage from '../pages/ToolsPage';
import ToolPage from '../pages/ToolPage';
import NewToolPage from '../pages/NewToolPage';
import EditToolPage from '../pages/EditToolPage';
import ProfilePage from '../pages/ProfilePage';
import EditUserPage from '../pages/EditUserPage';
import YourToolsPage from '../pages/YourToolsPage';
import RegistrationPage from '../pages/RegistrationPage';
import RouteAuthNeeded from '../hoc/RouteAuthNeeded';
import RouteAuthNotNeeded from '../hoc/RouteAuthNotNeeded';

const Routes = (props) => {
    return (
        <Router history={props.history}>
            <div>
                <NavbarContainer />
                <Switch>
                    <Route path="/" exact component={RouteAuthNotNeeded(HomePage)}/>
                    <Route path="/login" exact component={RouteAuthNotNeeded(LoginPage)}/>
                    <Route path="/register" exact component={RouteAuthNotNeeded(RegistrationPage)}/>
                    <Route path="/tools" exact component={RouteAuthNeeded(ToolsPage)}/>
                    <Route path="/profile/tools/new" exact component={RouteAuthNeeded(NewToolPage)}/>
                    <Route path="/tools/:id" exact component={RouteAuthNeeded(ToolPage)}/>
                    <Route path="/tools/:id/edit" exact component={RouteAuthNeeded(EditToolPage)}/>
                    <Route path="/profile" exact component={RouteAuthNeeded(ProfilePage)}/>
                    <Route path="/profile/edit" exact component={RouteAuthNeeded(EditUserPage)}/>
                    <Route path="/profile/tools" exact component={RouteAuthNeeded(YourToolsPage)}/>
                </Switch>
            </div>
        </Router>
    );
}

export default Routes;