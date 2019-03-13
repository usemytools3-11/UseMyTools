import React, { Component } from 'react';
import Tools from '../containers/ToolsContainer';
import { connect } from 'react-redux';
import { fetchTools, getUserData } from '../actions';

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
                <h1>Tools available</h1>
                {this.props.authenticated && <Tools userID={this.props.userID} tools={this.props.tools.filter(elem => elem.lender_id !== this.props.userID).filter(elem => !elem.is_borrowed)} />}
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