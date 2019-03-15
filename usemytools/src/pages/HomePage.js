import React from 'react';
import { connect } from 'react-redux';

const HomePage = (props) => {
    return (
        <>
            <h1>HomePage</h1>
            Authenticated: {props.authenticated ? "YES" : "NO"}
        </>
    );
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);