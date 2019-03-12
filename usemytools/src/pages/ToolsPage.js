import React, { Component } from 'react';
import Tools from '../containers/ToolsContainer';
import { connect } from 'react-redux';
import { fetchTools, fetchTool } from '../actions';

class ToolsPage extends Component {
    componentDidMount() {
        if(this.props.tools.length === 0){
            this.props.fetchTools();
        }
    }

    render() {
        console.log(this.props.tool);
        return (
            <>
                <h1>Tools page</h1>
                {this.props.authenticated && <Tools tools={this.props.tools} />}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated || false,
        tools: state.items.tools || [],
        tool: state.items.tool || null
    }
}

const mapDispatchToProps = {
    fetchTools,
    fetchTool
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPage);