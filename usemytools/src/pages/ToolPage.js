import React, { Component } from 'react';
import ToolContainer from '../containers/ToolContainer';
import { connect } from 'react-redux';
import { fetchTool, getUserData, deleteTool, borrowTool, deleteToolBorrowing, borrowFetch, fetchUsers } from '../actions';
import { history } from '../';

class ToolPage extends Component {
    constructor(props) {
        super(props);

        this.editTool = this.editTool.bind(this);
        this.deleteTool = this.deleteTool.bind(this);
        this.deleteToolBorrowing = this.deleteToolBorrowing.bind(this);
        this.borrowTool = this.borrowTool.bind(this);
    }
    componentDidMount() {
        this.props.fetchUsers();
        this.props.fetchTool(this.props.match.params.id);
        this.props.borrowFetch();
        if(this.props.userID === -1){
            this.props.getUserData();
        }
    }

    editTool(e) {
        e.preventDefault();
        history.push(`/tools/${this.props.tool.id}/edit`);
    }

    deleteTool(e) {
        e.preventDefault();
        this.props.deleteTool(this.props.tool.id);
    }

    borrowTool(e) {
        e.preventDefault();
        this.props.borrowTool({
            borrower_id: this.props.userID,
            tool_id: this.props.tool.id
        });
    }

    deleteToolBorrowing(e) {
        e.preventDefault();
        this.props.deleteToolBorrowing(this.props.tool.id);
    }

    render() {
        let bid = {borrower_id: -1};
        if(this.props.borrowerID !== undefined && this.props.borrowerID !== null) bid = this.props.borrowerID;
        return (
            <>
                {this.props.tool && <ToolContainer userID={this.props.userID} tool={this.props.tool} borrowerID={bid} editTool={this.editTool} deleteTool={this.deleteTool} borrowTool={this.borrowTool} deleteToolBorrowing={this.deleteToolBorrowing} users={this.props.users} />}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated || false,
        tool: state.items.tool ? state.items.tool : {id: -1, lender_id: -1},
        userID: state.auth.user ? state.auth.user.id : -1,
        borrowerID: (state.items.tool && state.items.borrowed) ? state.items.borrowed.find(elem => elem.tool_id === state.items.tool.id) : {borrower_id: -1},
        users: state.users.users ? state.users.users : []
    }
}

const mapDispatchToProps = {
    fetchTool,
    getUserData,
    deleteTool,
    borrowTool,
    deleteToolBorrowing,
    borrowFetch,
    fetchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolPage);