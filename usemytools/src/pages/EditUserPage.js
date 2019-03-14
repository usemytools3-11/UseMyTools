import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../actions';
import UserUpdateContainer from '../containers/UserUpdateContainer';
import styled from 'styled-components';

const Title = styled.h1`
    text-align: center;
`;

const UserProperties = styled.div`
    width: 16rem;
    margin: 2rem auto;
`;

const Label = styled.p`
    margin-top: 2rem;
`;

const Property = styled.h3`
    border-bottom: 1px solid black;
`;

class EditUserPage extends Component {
    componentDidMount() {
        if(this.props.first_name.length === 0 || this.props.last_name.length === 0 || this.props.email.length === 0){
            this.props.getUserData();
        }
    }

    render() {
        return (
            <>
                <>
                    <Title>Edit user</Title>
                    <UserProperties>
                        <Label>User name:</Label>
                        <Property>{this.props.first_name} {this.props.last_name}</Property>
                        <Label>Email:</Label>
                        <Property>{this.props.email}</Property>
                    </UserProperties>
                </>

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