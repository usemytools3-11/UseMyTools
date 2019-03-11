import React from 'react';
import Tools from '../containers/Tools';
import { connect } from 'react-redux';

const ToolsPage = (props) => {
    return (
        <>
            <h1>Tools page</h1>
            {props.authenticated && <Tools />}
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

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPage);