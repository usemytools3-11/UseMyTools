import React from 'react';
import UserForm from '../components/UserForm';

export default () => {
    return (
        <>
            <UserForm registerForm={false} loginForm={true} updateForm={false} />
        </>
    );
}