import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, registerUser, updateUser, getUserData } from '../actions';
import styled from 'styled-components';
import { SubmitBtn } from '../styles';

const FormComponent = styled.form`
    width: 18rem;
    margin: 0 auto;
`;

const Title = styled.h1`
    text-align: center;
    background-color: #394147;
    color: white;
    margin-bottom: 0;
    padding: 10px;
`;

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }
    
    componentDidMount() {
        if(this.props.updateForm){
            this.props.getUserData().then(_ => {
                this.setState({
                    first_name: this.props.first_name,
                    last_name: this.props.last_name,
                    email: this.props.email
                });
            });
        }
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    loginUser(e) {
        e.preventDefault();
        this.props.loginUser({
            email: this.state.email,
            password: this.state.password
        });
    }

    registerUser(e) {
        e.preventDefault();
        this.props.registerUser({
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name
        });
    }

    updateUser(e) {
        e.preventDefault();
        this.props.updateUser({
            id: this.props.userID,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        return (
            <>
                <FormComponent onSubmit={this.props.registerForm ? this.registerUser : this.props.updateForm ? this.updateUser : this.loginUser} className="card">
                    <Title>
                        {this.props.registerForm && "Register"}
                        {this.props.updateForm && "Update user"}
                        {this.props.loginForm && "Log in"}
                    </Title>
                    
                    {(this.props.registerForm || this.props.updateForm) && <>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="Your first name"
                            onChange={this.handleChange}
                            value={this.state.first_name}
                        />

                        <input
                            type="text"
                            name="last_name"
                            placeholder="Your last name"
                            onChange={this.handleChange}
                            value={this.state.last_name}
                        />
                    </>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        onChange={this.handleChange}
                        value={this.state.email}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Your password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />

                    <SubmitBtn
                        type="submit"
                        name="submit"
                        className="btn btn-primary"
                    />
                </FormComponent>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.user ? state.auth.user.id : -1,
        first_name: state.auth.user ? state.auth.user.first_name : '',
        last_name: state.auth.user ? state.auth.user.last_name : '',
        email: state.auth.user ? state.auth.user.email : ''
    }
}

const mapDispatchToProps = {
    loginUser,
    registerUser,
    updateUser,
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);