import React, { Component } from 'react';
import ToolContainer from '../containers/ToolContainer';
import { connect } from 'react-redux';
import { fetchTool, getUserData, deleteTool } from '../actions';

class ToolPage extends Component {
    constructor(props) {
        super(props);

        this.editTool = this.editTool.bind(this);
        this.deleteTool = this.deleteTool.bind(this);
    }
    componentDidMount() {
        this.props.fetchTool(this.props.match.params.id);
        if(this.props.userID === -1){
            this.props.getUserData();
        }
    }

    editTool(e) {
        e.preventDefault();
        console.log("EDIT ITEM");
    }

    deleteTool(e) {
        e.preventDefault();
        this.props.deleteTool(this.props.tool.id);
    }

    render() {
        return (
            <>
                <h1 style={{color: "red"}}>Tool page</h1>
                {this.props.tool && <ToolContainer tool={this.props.tool} editTool={this.editTool} deleteTool={this.deleteTool} />}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated || false,
        tool: state.items.tool || null,
        userID: state.auth.user ? state.auth.user.id : -1,
    }
}

const mapDispatchToProps = {
    fetchTool,
    getUserData,
    deleteTool
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolPage);