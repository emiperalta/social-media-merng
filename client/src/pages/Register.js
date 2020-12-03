import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';

import { AuthContext } from '../context/AuthContext';
import { useForm } from '../util/hooks';
import { REGISTER_USER } from '../util/graphql.queries';

const Register = props => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { inputValues, inputValuesHandler, submitHandler } = useForm(
        registerUser,
        {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        errors
    );

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update: (proxy, result) => {
            context.login(result.data.register);
            props.history.push('/login');
        },
        onError: err => {
            setErrors(err.graphQLErrors[0].extensions.exception.errors); //errors variable come from the server
        },
        variables: inputValues, // == variables: { username: inputValues.username, ... etc }
    });

    function registerUser() {
        // through hoisting, the addUser() method will be available to use in the useForm() method
        addUser();
    }

    return (
        <div className='form-container'>
            <div className='register-title'>
                <h1>REGISTER</h1>
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
                    label='Email'
                    name='email'
                    type='email'
                    placeholder='example@hotmail.com'
                    value={inputValues.email}
                    error={errors.email ? true : false}
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
                <Form.Input
                    label='Confirm password'
                    name='confirmPassword'
                    type='password'
                    placeholder='••••••'
                    value={inputValues.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={inputValuesHandler}
                />
                <div style={{ textAlign: 'center' }}>
                    <Button
                        type='submit'
                        content='Register'
                        primary
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

export default Register;
