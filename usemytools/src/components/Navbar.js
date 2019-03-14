import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions';

const Navbar = (props) => {
    return (
        <>
            {!props.authenticated &&
            <>
                <Link to="/">HOME</Link><br/>
                <Link to="/login">LOGIN</Link><br/>
                <Link to="/register">REGISTER</Link>
            </>}
            {props.authenticated &&
            <>
                <Link to="/tools">TOOLS_TO_RENT</Link><br/>
                <Link to="/profile">PROFILE</Link><br/>
                <Link to="/profile/tools">YOUR_TOOLS</Link><br/>
                <Link to="/profile/tools/new">NEW_TOOL</Link><br/>
                <button onClick={props.logoutUser}>LOGOUT</button>
            </>}
        </>
    );
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    }
}

const mapDispatchToProps = {
    logoutUser,
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);