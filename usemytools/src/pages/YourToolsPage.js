import React, { Component } from 'react';
import Tools from '../containers/ToolsContainer';
import { connect } from 'react-redux';
import { fetchTools, getUserData } from '../actions';
import { Link } from 'react-router-dom';

class ToolsPage extends Component {
    componentDidMount() {
        if(this.props.tools.length === 0){
            this.props.fetchTools();
        }
        if(this.props.userID === -1){
            this.props.getUserData();
        }
    }

    render() {
        return (
            <>
                <h1>Your Tools page</h1>
                <Link to="/profile/tools/new">Add new tool</Link>

                <br/>
                <h1>Available</h1>
                {this.props.authenticated && <Tools tools={this.props.tools.filter(elem => elem.lender_id === this.props.userID).filter(elem => !elem.is_borrowed)} />}

                <h1>Borrowed</h1>
                {this.props.authenticated && <Tools tools={this.props.tools.filter(elem => elem.lender_id === this.props.userID).filter(elem => elem.is_borrowed)} />}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated || false,
        userID: state.auth.user ? state.auth.user.id : -1,
        tools: state.items.tools || [],
    }
}

const mapDispatchToProps = {
    fetchTools,
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPage);