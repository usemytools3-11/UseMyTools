import React, { Component } from 'react';
import ToolContainer from '../containers/ToolContainer';
import { connect } from 'react-redux';
import { fetchTool, getUserData, deleteTool, borrowTool, deleteToolBorrowing, borrowFetch } from '../actions';
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
        return (
            <>
                <h1 style={{color: "red"}}>Tool page</h1>
                {this.props.tool && <ToolContainer userID={this.props.userID} tool={this.props.tool} borrowerID={this.props.borrowerID} editTool={this.editTool} deleteTool={this.deleteTool} borrowTool={this.borrowTool} deleteToolBorrowing={this.deleteToolBorrowing} />}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated || false,
        tool: state.items.tool || null,
        userID: state.auth.user ? state.auth.user.id : -1,
        borrowerID: (state.items.tool && state.items.borrowed) ? state.items.borrowed.find(elem => elem.tool_id === state.items.tool.id) : {borrower_id: -1}
    }
}

const mapDispatchToProps = {
    fetchTool,
    getUserData,
    deleteTool,
    borrowTool,
    deleteToolBorrowing,
    borrowFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolPage);