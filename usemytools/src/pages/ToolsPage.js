import React, { Component } from 'react';
import Tools from '../containers/ToolsContainer';
import { connect } from 'react-redux';
import { fetchTools } from '../actions';

class ToolsPage extends Component {
    componentDidMount() {
        if(this.props.tools.length === 0){
            this.props.fetchTools();
        }
    }

    render() {
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
    }
}

const mapDispatchToProps = {
    fetchTools,
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPage);