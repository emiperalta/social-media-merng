import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';

import { AuthContext } from '../context/AuthContext';
import { useForm } from '../util/hooks';
import { LOGIN_USER } from '../util/graphql.queries';

const Login = props => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { inputValues, inputValuesHandler, submitHandler } = useForm(
        loginUserCallback,
        {
            username: '',
            password: '',
        },
        errors
    );

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update: (proxy, result) => {
            context.login(result.data.login);
            props.history.push('/');
        },
        onError: err => {
            setErrors(err.graphQLErrors[0].extensions.exception.errors); //errors variable come from the server
        },
        variables: inputValues, // == variables: { username: inputValues.username, ... etc }
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div className='form-container'>
            <div className='register-title'>
                <h1>Login</h1>
            </div>
            <Form
                onSubmit={submitHandler}
                noValidate
                className={loading ? 'loading' : ''}
            >
                <Form.Input
                    label='Username'
                    name='username'
                    type='text'
                    placeholder='Example99'
                    value={inputValues.username}
                    error={errors.username ? true : false}
                    onChange={inputValuesHandler}
                />
                <Form.Input
                    label='Password'
                    name='password'
                    type='password'
                    placeholder='••••••'
                    value={inputValues.password}
                    error={errors.password ? true : false}
                    onChange={inputValuesHandler}
                />
                <div style={{ textAlign: 'center' }}>
                    <Button
                        type='submit'
                        content='Login'
                        secondary
                        icon='right arrow'
                        labelPosition='right'
                        style={{ marginTop: 15, fontSize: 17 }}
                    />
                </div>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors).map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Login;
