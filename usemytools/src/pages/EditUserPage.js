import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../actions';
import UserUpdateContainer from '../containers/UserUpdateContainer';

class EditUserPage extends Component {
    componentDidMount() {
        if(this.props.first_name.length === 0 || this.props.last_name.length === 0 || this.props.email.length === 0){
            this.props.getUserData();
        }
    }

    render() {
        return (
            <>
                <h1>Edit user page</h1>
                <h2>{this.props.first_name} {this.props.last_name}</h2>
                <p>{this.props.email}</p>

                <UserUpdateContainer />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        first_name: state.auth.user ? state.auth.user.first_name : '',
        last_name: state.auth.user ? state.auth.user.last_name : '',
        email: state.auth.user ? state.auth.user.email : '',
        userID: state.auth.user ? state.auth.user.id : -1
    }
}

const mapDispatchToProps = {
    getUserData,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);