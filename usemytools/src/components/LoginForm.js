import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        return (
            <form>
                <input type="text" name="login" placeholder="login" />
                <input type="password" name="password" placeholder="password" />
                <input type="submit" name="submit" />
            </form>
        );
    }
}

export default LoginForm;