import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../actions';

class ToolsPage extends Component {
    componentDidMount() {
        if(this.props.first_name.length === 0 || this.props.last_name.length === 0 || this.props.email.length === 0){
            this.props.getUserData();
        }
    }

    render() {
        return (
            <>
                <h1>Profile page</h1>
                <h2>{this.props.first_name} {this.props.last_name}</h2>
                <p>{this.props.email}</p>

                <h1>Your items:</h1>
                {this.props.tools.map(elem =><p key={elem.id}>{elem.name}</p>)}

                <h1>Items you borrowed:</h1>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        first_name: state.auth.user ? state.auth.user.first_name : '',
        last_name: state.auth.user ? state.auth.user.last_name : '',
        email: state.auth.user ? state.auth.user.email : '',
        userID: state.auth.user ? state.auth.user.id : -1,
        tools: state.items.tools ? state.items.tools.filter(elem => elem.id === state.auth.user.id) : []
    }
}

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPage);