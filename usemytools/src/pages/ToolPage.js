import React, { Component } from 'react';
import ToolContainer from '../containers/ToolContainer';
import { connect } from 'react-redux';
import { fetchTool } from '../actions';

class ToolPage extends Component {
    componentDidMount() {
        if(this.props.tool === null){
            this.props.fetchTool(this.props.match.params.id);
        }
    }

    render() {
        return (
            <>
                <h1 style={{color: "red"}}>Tool page</h1>
                {this.props.tool && <ToolContainer tool={this.props.tool} />}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated || false,
        tool: state.items.tool || null,
    }
}

const mapDispatchToProps = {
    fetchTool,
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolPage);